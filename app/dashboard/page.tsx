"use client"

import { useState, useEffect } from "react"
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
import { Plus, Eye, QrCode, Search, Download } from "lucide-react"
import { getBatches, getLaboratories, createBatch, generateBatchId, getCurrentUser } from "@/lib/database"
import type { Batch, Laboratory } from "@/lib/supabase"

export default function ExporterDashboard() {
  const router = useRouter()
  const [batches, setBatches] = useState<Batch[]>([])
  const [laboratories, setLaboratories] = useState<Laboratory[]>([])
  const [isNewBatchOpen, setIsNewBatchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  
  // Form state
  const [productName, setProductName] = useState("")
  const [productWeight, setProductWeight] = useState("")
  const [selectedLab, setSelectedLab] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push('/login')
        return
      }
      
      setUserId(user.id)
      
      const [batchesData, labsData] = await Promise.all([
        getBatches(user.id, 'exporter'),
        getLaboratories()
      ])
      
      setBatches(batchesData)
      setLaboratories(labsData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredBatches = batches.filter(batch =>
    batch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "LULUS":
        return <Badge variant="success">LULUS</Badge>
      case "GAGAL":
        return <Badge variant="error">GAGAL</Badge>
      case "PENDING":
        return <Badge variant="warning">PENDING</Badge>
      case "IN_PROGRESS":
        return <Badge className="bg-blue-100 text-secondary border-blue-300">SEDANG DIPROSES</Badge>
      default:
        return <Badge variant="warning">{status}</Badge>
    }
  }

  const stats = {
    total: batches.length,
    lulus: batches.filter(b => b.status === "LULUS").length,
    pending: batches.filter(b => b.status === "PENDING").length,
    gagal: batches.filter(b => b.status === "GAGAL").length,
  }

  async function handleCreateBatch(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return

    try {
      const newBatch = await createBatch({
        id: generateBatchId(),
        exporter_id: userId,
        product_name: productName,
        product_weight: parseFloat(productWeight),
        laboratory_id: selectedLab,
        certificate_type: notes || undefined
      })

      setBatches([newBatch, ...batches])
      setIsNewBatchOpen(false)
      
      // Reset form
      setProductName("")
      setProductWeight("")
      setSelectedLab("")
      setNotes("")
    } catch (error) {
      console.error('Error creating batch:', error)
      alert('Gagal membuat batch. Silakan coba lagi.')
    }
  }

  if (isLoading) {
    return (
      <SidebarLayout userType="exporter">
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
    <SidebarLayout userType="exporter">
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary">
              Dasbor Eksportir
            </h1>
            <p className="text-text-secondary mt-1">
              Kelola dan pantau status batch ekspor Anda
            </p>
          </div>
          <Button 
            size="lg"
            onClick={() => setIsNewBatchOpen(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Daftarkan Batch Baru
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

          <Card className="border-status-green-border bg-status-green-light/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Lulus Verifikasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-green">
                {stats.lulus}
              </div>
            </CardContent>
          </Card>

          <Card className="border-status-yellow-border bg-status-yellow-light/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Menunggu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-yellow">
                {stats.pending}
              </div>
            </CardContent>
          </Card>

          <Card className="border-status-red-border bg-status-red-light/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Gagal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-status-red">
                {stats.gagal}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Batch Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Daftar Batch Terdaftar</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Cari batch atau produk..."
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
                    <TableHead className="hidden md:table-cell">LABORATORIUM</TableHead>
                    <TableHead className="hidden sm:table-cell">TGL. DAFTAR</TableHead>
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
                        {batch.laboratory?.name || '-'}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-text-secondary">
                        {new Date(batch.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(batch.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Lihat Detail"
                            onClick={() => router.push(`/verify/${batch.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Generate QR Code"
                            disabled={batch.status !== "LULUS"}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Unduh Sertifikat"
                            disabled={batch.status !== "LULUS"}
                          >
                            <Download className="h-4 w-4" />
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

        {/* New Batch Dialog */}
        <Dialog open={isNewBatchOpen} onOpenChange={setIsNewBatchOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Daftarkan Batch Baru</DialogTitle>
              <DialogDescription>
                Isi informasi batch yang akan didaftarkan untuk verifikasi laboratorium
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreateBatch} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="batch-product">Nama Produk *</Label>
                <Input
                  id="batch-product"
                  placeholder="Contoh: Udang Vaname Beku"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch-weight">Berat (Kg) *</Label>
                <Input
                  id="batch-weight"
                  type="number"
                  step="0.01"
                  placeholder="Contoh: 1000"
                  value={productWeight}
                  onChange={(e) => setProductWeight(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch-lab">Pilih Laboratorium *</Label>
                <select
                  id="batch-lab"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={selectedLab}
                  onChange={(e) => setSelectedLab(e.target.value)}
                  required
                >
                  <option value="">Pilih laboratorium...</option>
                  {laboratories.map(lab => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name} - {lab.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch-notes">Catatan (Opsional)</Label>
                <Input
                  id="batch-notes"
                  placeholder="Informasi tambahan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsNewBatchOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit">
                  Daftarkan Batch
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarLayout>
  )
}
