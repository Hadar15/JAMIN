"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SidebarLayout from "@/components/layout/sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Building2, Mail, Phone, Save } from "lucide-react"
import {
  initializeStorage,
  getCurrentUser,
  updateUser,
  type User as UserType
} from "@/lib/dummy-data"

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  // Form state
  const [fullName, setFullName] = useState("")
  const [organization, setOrganization] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    initializeStorage()
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    setUser(currentUser)
    setFullName(currentUser.full_name)
    setOrganization(currentUser.organization_name || "")
    setPhone(currentUser.phone || "")
    setEmail(currentUser.email)
    setIsLoading(false)
  }, [router])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    if (!fullName.trim()) {
      alert('Nama lengkap tidak boleh kosong')
      return
    }

    setIsSaving(true)

    try {
      const updatedUser = updateUser(user.id, {
        full_name: fullName,
        organization_name: organization,
        phone: phone,
        email: email
      })

      if (updatedUser) {
        setUser(updatedUser)
        // Update session
        localStorage.setItem('jamin_current_user', JSON.stringify(updatedUser))
        alert('Profil berhasil diperbarui!')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Gagal menyimpan perubahan')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <SidebarLayout>
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
    <SidebarLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">
            Pengaturan Profil
          </h1>
          <p className="text-text-secondary mt-1">
            Kelola informasi akun Anda
          </p>
        </div>

        {/* Profile Info Card */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Akun</CardTitle>
              <CardDescription>
                Update informasi pribadi dan kontak Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    Nama Lengkap
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                {/* Organization */}
                <div className="space-y-2">
                  <Label htmlFor="organization" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    Nama Organisasi / Perusahaan
                  </Label>
                  <Input
                    id="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Nama perusahaan atau lab"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Nomor Telepon
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08123456789"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Type Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tipe Akun</CardTitle>
              <CardDescription>
                Informasi tipe akun Anda di sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-gray-600 mb-2">Tipe Pengguna</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {user?.user_type === 'exporter' ? 'Eksportir' : user?.user_type === 'lab' ? 'Laboratorium' : 'Admin'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-gray-600 mb-2">User ID</p>
                <p className="text-sm font-mono text-gray-900">
                  {user?.id}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Untuk mengubah tipe akun atau reset password, hubungi administrator sistem.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  )
}
