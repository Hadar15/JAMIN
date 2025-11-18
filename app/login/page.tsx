"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulasi login - redirect berdasarkan email
    setTimeout(() => {
      if (email.includes("lab") || email.includes("laboratorium")) {
        router.push("/lab")
      } else {
        router.push("/dashboard")
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      
      {/* Starfield Animation - Left Side */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => {
          const size = Math.random() * 3 + 1
          const duration = Math.random() * 3 + 2
          const delay = Math.random() * 2
          return (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400/60 animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 50}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                boxShadow: `0 0 ${size * 2}px rgba(34, 211, 238, 0.5)`
              }}
            />
          )
        })}
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 items-center justify-center p-12">
        <div className="max-w-md space-y-8">
          <div className="inline-flex items-center gap-3 bg-cyan-500/10 px-6 py-3 rounded-full border border-cyan-500/20">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 font-semibold tracking-wide">SISTEM TERAKREDITASI</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white leading-tight">
              JAMIN-WEB
            </h1>
            <p className="text-2xl text-cyan-400 font-light">
              Platform Notarisasi Digital Ekspor
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Verifikasi otomatis, transparansi penuh, dan keamanan tingkat enterprise untuk rantai pasok ekspor Indonesia.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
              <p className="text-slate-300">Sertifikasi terenkripsi blockchain</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
              <p className="text-slate-300">Integrasi Lab terakreditasi KKP & Bapeten</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
              <p className="text-slate-300">QR Code untuk verifikasi publik instan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <Card className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border-slate-700 shadow-2xl">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white text-center">Login Sistem</CardTitle>
            <CardDescription className="text-slate-400 text-center">
              Masukkan kredensial untuk akses secure
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="nama@perusahaan.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-11 h-12 bg-slate-800/50 border-slate-600 focus:border-cyan-500 text-white placeholder:text-slate-500" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-11 h-12 bg-slate-800/50 border-slate-600 focus:border-cyan-500 text-white placeholder:text-slate-500" 
                  />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/20 group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-3 text-slate-500">Demo Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => router.push("/dashboard")}
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-cyan-500/50"
              >
                Eksportir
              </Button>
              <Button 
                onClick={() => router.push("/lab")}
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-purple-500/50"
              >
                Laboratorium
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Belum punya akun?{" "}
                <Link href="/register" className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-500 max-w-md">
          Sistem dilindungi enkripsi end-to-end. Hubungi admin untuk bantuan akses.
        </p>
      </div>
    </div>
  )
}