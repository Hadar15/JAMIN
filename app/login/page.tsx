import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">JAMIN-WEB</h1>
        <p className="text-slate-500 text-sm">Platform Notarisasi Digital Ekspor Nasional</p>
      </div>

      <Card className="w-full max-w-[450px] shadow-lg border-slate-200 bg-white">
        <CardHeader className="text-center space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-slate-900">Secure Sign In</CardTitle>
          <CardDescription className="text-slate-500">
            Masukkan kredensial Anda untuk mengakses sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-900 font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="email" 
                type="email"
                placeholder="nama@perusahaan.com" 
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-slate-400 data-[state=checked]:bg-slate-900" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-500"
              >
                Ingat saya
              </label>
            </div>
            <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
              Lupa password?
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="/dashboard">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-5">
                Login
                </Button>
            </Link>
            
            <div className="text-center text-sm text-slate-600">
              Belum punya akun?{" "}
              <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                Daftar sekarang
              </Link>
            </div>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">Akses Cepat</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/dashboard" className="w-full">
              <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50">
                Demo Eksportir
              </Button>
            </Link>
            <Link href="/lab" className="w-full">
              <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50">
                Demo Lab
              </Button>
            </Link>
          </div>

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