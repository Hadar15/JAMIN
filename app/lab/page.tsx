"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import SidebarLayout from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search, Upload, FileText, AlertCircle } from "lucide-react"
import { getBatches, updateBatchStatus, getCurrentUser } from "@/lib/database"
import type { Batch, BatchStatus } from "@/lib/supabase"

export default function LabDashboard() {
  const router = useRouter()
  const [batches, setBatches] = useState<Batch[]>([])
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<BatchStatus>("LULUS")
  const [notes, setNotes] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push('/login')
        return
      }
      
      const batchesData = await getBatches(user.id, 'lab')
      setBatches(batchesData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleUpdateClick = (batch: Batch) => {
    setSelectedBatch(batch)
    setIsUpdateModalOpen(true)
    setVerificationStatus("LULUS")
    setNotes("")
    setUploadedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!selectedBatch || !uploadedFile) {
      alert('Mohon upload dokumen hasil lab')
      return
    }

    setIsSubmitting(true)

    try {
      // In production, upload file to storage first
      // const fileUrl = await uploadFile(uploadedFile)
      
      await updateBatchStatus(
        selectedBatch.id,
        verificationStatus,
        {
          verification_notes: notes,
          test_date: new Date().toISOString(),
          // document_url: fileUrl
        }
      )

      // Update local state
      setBatches(batches.map(b => 
        b.id === selectedBatch.id 
          ? { ...b, status: verificationStatus, verification_notes: notes }
          : b
      ))

      setIsUpdateModalOpen(false)
      alert('Status berhasil diupdate!')
    } catch (error) {
      console.error('Error updating batch:', error)
      alert('Gagal update status. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredBatches = batches.filter(batch =>
    batch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (batch.exporter as any)?.organization_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: batches.length,
    pending: batches.filter(b => b.status === "PENDING").length,
    inProgress: batches.filter(b => b.status === "IN_PROGRESS").length,
  }

  if (isLoading) {
    return (
      <SidebarLayout userType="lab">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-secondary">Memuat data...</p>
          </div>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout userType="lab">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">
            Dasbor Laboratorium
          </h1>
          <p className="text-text-secondary mt-1">
            Batch Menunggu Pengujian
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Total Batch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-text-primary">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card className="border-status-yellow-border bg-status-yellow-light/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Menunggu Pengujian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-yellow">
                {stats.pending}
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Sedang Diproses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">
                {stats.inProgress}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Box */}
        <Card className="border-status-yellow-border bg-status-yellow-light/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-status-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Prioritas Tinggi
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  Terdapat {stats.pending} batch yang menunggu untuk diproses. Harap segera lakukan pengujian untuk menghindari keterlambatan ekspor.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Batch Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Daftar Batch Masuk</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Cari batch atau eksportir..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID BATCH</TableHead>
                    <TableHead>PRODUK</TableHead>
                    <TableHead className="hidden md:table-cell">NAMA EKSPORTIR</TableHead>
                    <TableHead className="hidden sm:table-cell">TGL. MASUK</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="text-right">AKSI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-mono font-semibold">
                        {batch.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {batch.product_name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-text-secondary">
                        {(batch.exporter as any)?.organization_name || (batch.exporter as any)?.full_name || '-'}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-text-secondary">
                        {new Date(batch.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        {batch.status === "PENDING" ? (
                          <Badge variant="warning">PENDING</Badge>
                        ) : batch.status === "IN_PROGRESS" ? (
                          <Badge className="bg-blue-100 text-secondary border-blue-300">
                            SEDANG DIPROSES
                          </Badge>
                        ) : batch.status === "LULUS" ? (
                          <Badge variant="success">LULUS</Badge>
                        ) : (
                          <Badge variant="error">GAGAL</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateClick(batch)}
                            disabled={batch.status === "LULUS" || batch.status === "GAGAL"}
                          >
                            Update Status
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Update Status Modal */}
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Update Status: {selectedBatch?.id}
              </DialogTitle>
              <DialogDescription>
                Perbarui hasil pengujian laboratorium untuk batch ini
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Batch Info */}
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-text-secondary">Produk:</span>
                  <span className="text-sm font-semibold">{selectedBatch?.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-text-secondary">Eksportir:</span>
                  <span className="text-sm font-semibold">
                    {(selectedBatch?.exporter as any)?.organization_name || (selectedBatch?.exporter as any)?.full_name || '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-text-secondary">Berat:</span>
                  <span className="text-sm font-semibold">{selectedBatch?.product_weight} Kg</span>
                </div>
              </div>

              {/* Verification Status */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  Status Verifikasi <span className="text-destructive">*</span>
                </Label>
                <RadioGroup value={verificationStatus} onValueChange={(value) => setVerificationStatus(value as "LULUS" | "GAGAL")}>
                  <div className="flex items-center space-x-3 p-4 border-2 border-status-green-border rounded-lg bg-status-green-light/20 hover:bg-status-green-light/40 transition-colors cursor-pointer">
                    <RadioGroupItem value="LULUS" id="pass" />
                    <Label htmlFor="pass" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-status-green">Lulus Verifikasi</div>
                      <div className="text-xs text-text-secondary mt-0.5">
                        Produk memenuhi semua standar yang dipersyaratkan
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border-2 border-status-red-border rounded-lg bg-status-red-light/20 hover:bg-status-red-light/40 transition-colors cursor-pointer">
                    <RadioGroupItem value="GAGAL" id="fail" />
                    <Label htmlFor="fail" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-status-red">Gagal Verifikasi</div>
                      <div className="text-xs text-text-secondary mt-0.5">
                        Produk tidak memenuhi standar yang dipersyaratkan
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* File Upload */}
              <div className="space-y-3">
                <Label htmlFor="file-upload" className="text-base font-semibold">
                  Unggah Dokumen Hasil Lab (PDF) <span className="text-destructive">*</span>
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-secondary transition-colors">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-10 h-10 text-text-secondary" />
                      {uploadedFile ? (
                        <div className="flex items-center gap-2 text-sm font-medium text-status-green">
                          <FileText className="w-4 h-4" />
                          {uploadedFile.name}
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-text-primary">
                            Klik untuk mengunggah atau seret file ke sini
                          </p>
                          <p className="text-xs text-text-secondary">
                            Format: PDF (Maksimal 10MB)
                          </p>
                        </>
                      )}
                    </div>
                  </Label>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-base font-semibold">
                  Catatan (Opsional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Tambahkan catatan atau keterangan tambahan mengenai hasil pengujian..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-text-secondary">
                  Catatan ini akan terlihat oleh eksportir dan pihak terkait
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="secondary"
                onClick={() => setIsUpdateModalOpen(false)}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!uploadedFile || isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </div>
                ) : (
                  "Simpan Perubahan"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarLayout>
  )
}
