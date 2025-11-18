import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, Lock, User } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">JAMIN-WEB</h1>
        <p className="text-slate-500 text-sm">Platform Notarisasi Digital Ekspor Nasional</p>
      </div>

      <Card className="w-full max-w-[450px] shadow-lg border-slate-200 bg-white">
        <CardHeader className="text-center space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-slate-900">Registrasi Eksportir</CardTitle>
          <CardDescription className="text-slate-500">
            Daftarkan entitas perusahaan Anda untuk memulai
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-900 font-medium">Nama Perusahaan</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="company" 
                placeholder="PT. Samudera Makmur" 
                className="pl-10 border-slate-200 focus:border-slate-400 bg-white" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-900 font-medium">Email Bisnis</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder="contact@perusahaan.com" 
                className="pl-10 border-slate-200 focus:border-slate-400 bg-white" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-900 font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="pl-10 border-slate-200 focus:border-slate-400 bg-white" 
              />
            </div>
          </div>

          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-5">
            Daftar Akun Baru
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">Sudah punya akun?</span>
            </div>
          </div>

          <Link href="/login">
            <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50">
              Login ke Sistem
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-8 text-center space-y-2">
        <p className="text-xs text-slate-400">
          Sistem ini dilindungi dengan enkripsi tingkat enterprise.
        </p>
        <p className="text-xs text-slate-400">
          Hubungi administrator untuk bantuan akses.
        </p>
      </div>
    </div>
  )
}