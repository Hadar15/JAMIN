import { CheckCircle, XCircle, FileCheck, Calendar, Building2, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getBatchById } from "@/lib/database"

interface VerificationResult {
  status: "PASS" | "FAIL" | "NOT_FOUND"
  batchId: string
  product?: string
  verifiedBy?: string
  testDate?: string
  certificate?: string
}

async function getVerificationData(batchId: string): Promise<VerificationResult> {
  try {
    const batch = await getBatchById(batchId)
    
    if (!batch) {
      return { status: "NOT_FOUND", batchId }
    }

    const status = batch.status === "LULUS" ? "PASS" : 
                   batch.status === "GAGAL" ? "FAIL" : "NOT_FOUND"

    return {
      status,
      batchId: batch.id,
      product: batch.product_name,
      verifiedBy: batch.laboratory?.name || "Laboratorium Terakreditasi",
      testDate: batch.test_date ? new Date(batch.test_date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) : undefined,
      certificate: batch.certificate_type || batch.verification_notes || 
                  (status === "PASS" ? "Lulus Verifikasi" : "Tidak Memenuhi Standar")
    }
  } catch (error) {
    console.error('Error fetching batch:', error)
    return { status: "NOT_FOUND", batchId }
  }
}

export default async function VerifyPage({ params }: { params: { id: string } }) {
  const data = await getVerificationData(params.id)
  
  if (data.status === "PASS") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-status-green-light to-white">
        {/* Mobile-First Header */}
        <div className="bg-status-green text-white py-6 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-sm font-medium uppercase tracking-wider">
              Sistem Verifikasi JAMIN-WEB
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
          {/* Hero Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <CheckCircle className="w-32 h-32 md:w-40 md:h-40 text-status-green drop-shadow-lg" strokeWidth={2} />
            </div>
          </div>

          {/* Status Title */}
          <div className="text-center mb-12 space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold text-status-green">
              TERVERIFIKASI
            </h1>
            <p className="text-lg md:text-xl text-text-secondary">
              Sertifikat &apos;{data.certificate}&apos; Dinyatakan Sah
            </p>
          </div>

          {/* Data Card */}
          <Card className="shadow-xl border-2 border-status-green-border">
            <CardHeader className="bg-status-green-light border-b border-status-green-border">
              <CardTitle className="text-xl text-status-green flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                Detail Sertifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* ID Batch */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b">
                <span className="text-sm font-medium text-text-secondary mb-2 sm:mb-0">
                  ID Batch
                </span>
                <span className="text-lg font-bold text-text-primary font-mono">
                  {data.batchId}
                </span>
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b">
                <span className="text-sm font-medium text-text-secondary mb-2 sm:mb-0">
                  Status Verifikasi
                </span>
                <Badge variant="success" className="text-base px-4 py-1.5 w-fit">
                  LULUS VERIFIKASI
                </Badge>
              </div>

              {/* Product */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b">
                <span className="text-sm font-medium text-text-secondary mb-2 sm:mb-0 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Produk
                </span>
                <span className="text-base font-semibold text-text-primary">
                  {data.product}
                </span>
              </div>

              {/* Lab */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b">
                <span className="text-sm font-medium text-text-secondary mb-2 sm:mb-0 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Diverifikasi Oleh
                </span>
                <span className="text-base font-semibold text-text-primary text-right">
                  {data.verifiedBy}
                </span>
              </div>

              {/* Date */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
                <span className="text-sm font-medium text-text-secondary mb-2 sm:mb-0 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Tanggal Tes
                </span>
                <span className="text-base font-semibold text-text-primary">
                  {data.testDate}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto border-2 border-status-green text-status-green hover:bg-status-green hover:text-white font-semibold"
            >
              <FileCheck className="w-5 h-5 mr-2" />
              Unduh Sertifikat PDF
            </Button>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center text-sm text-text-secondary">
            <p className="mb-2">
              Sertifikat ini dikeluarkan oleh Platform JAMIN-WEB
            </p>
            <p className="text-xs">
              Platform Notarisasi Digital Ekspor Nasional
            </p>
          </div>
        </div>
      </div>
    )
  }

  // FAIL or NOT_FOUND Status
  return (
    <div className="min-h-screen bg-gradient-to-br from-status-red-light to-white">
      {/* Mobile-First Header */}
      <div className="bg-status-red text-white py-6 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-sm font-medium uppercase tracking-wider">
            Sistem Verifikasi JAMIN-WEB
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        {/* Hero Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <XCircle className="w-32 h-32 md:w-40 md:h-40 text-status-red drop-shadow-lg" strokeWidth={2} />
          </div>
        </div>

        {/* Status Title */}
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-status-red">
            VERIFIKASI GAGAL
          </h1>
          <p className="text-lg md:text-xl text-text-secondary">
            {data.status === "NOT_FOUND" 
              ? "Sertifikat tidak ditemukan atau dinyatakan tidak sah"
              : "Batch ini tidak memenuhi standar verifikasi"}
          </p>
        </div>

        {/* Data Card */}
        <Card className="shadow-xl border-2 border-status-red-border">
          <CardHeader className="bg-status-red-light border-b border-status-red-border">
            <CardTitle className="text-xl text-status-red flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Informasi Batch
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* ID Batch */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b">
              <span className="text-sm font-medium text-text-secondary mb-2 sm:mb-0">
                ID Batch
              </span>
              <span className="text-lg font-bold text-text-primary font-mono">
                {data.batchId}
              </span>
            </div>

            {/* Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b">
              <span className="text-sm font-medium text-text-secondary mb-2 sm:mb-0">
                Status Verifikasi
              </span>
              <Badge variant="error" className="text-base px-4 py-1.5 w-fit">
                {data.status === "NOT_FOUND" ? "TIDAK DITEMUKAN" : "GAGAL VERIFIKASI"}
              </Badge>
            </div>

            {data.status === "FAIL" && (
              <>
                {/* Product */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b">
                  <span className="text-sm font-medium text-text-secondary mb-2 sm:mb-0 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Produk
                  </span>
                  <span className="text-base font-semibold text-text-primary">
                    {data.product}
                  </span>
                </div>

                {/* Reason */}
                <div className="flex flex-col py-4">
                  <span className="text-sm font-medium text-text-secondary mb-2">
                    Alasan Gagal
                  </span>
                  <span className="text-base font-semibold text-status-red">
                    {data.certificate}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-text-secondary">
          <p className="mb-2">
            Untuk informasi lebih lanjut, hubungi pihak eksportir atau laboratorium yang bersangkutan
          </p>
          <p className="text-xs">
            Platform Notarisasi Digital Ekspor Nasional
          </p>
        </div>
      </div>
    </div>
  )
}
