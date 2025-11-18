"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Lock, Mail } from "lucide-react"
import { signIn, getUserProfile } from "@/lib/database"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const { user } = await signIn(email, password)
      
      if (user) {
        const profile = await getUserProfile(user.id)
        
        // Route based on user type
        if (profile.user_type === 'lab') {
          router.push("/lab")
        } else if (profile.user_type === 'exporter') {
          router.push("/dashboard")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Email atau password salah')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (type: 'exporter' | 'lab') => {
    // For demo purposes, just redirect
    if (type === 'lab') {
      router.push("/lab")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center bg-gradient-to-br from-primary via-slate-800 to-secondary p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 max-w-md">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
              <Lock className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl font-bold text-white">
              JAMIN-WEB
            </h1>
            
            <p className="text-xl text-slate-200 leading-relaxed">
              Platform Notarisasi Digital Ekspor Nasional
            </p>
          </div>

          <div className="pt-8 space-y-4 text-slate-300">
            <div className="flex items-start gap-3 text-left">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm">
                Sistem verifikasi dan sertifikasi yang aman dan terpercaya
              </p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm">
                Terakreditasi oleh KKP dan Bapeten
              </p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm">
                Memulihkan kepercayaan internasional terhadap ekspor Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              JAMIN-WEB
            </h1>
            <p className="text-sm text-text-secondary">
              Platform Notarisasi Digital Ekspor Nasional
            </p>
          </div>

          {/* Login Card */}
          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Secure Sign In
              </CardTitle>
              <CardDescription className="text-center">
                Masukkan kredensial Anda untuk mengakses sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-label">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@perusahaan.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-label">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-border"
                    />
                    <label htmlFor="remember" className="text-text-secondary cursor-pointer">
                      Ingat saya
                    </label>
                  </div>
                  <a href="#" className="text-secondary hover:underline font-medium">
                    Lupa password?
                  </a>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Memproses...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-text-secondary">
                    Akses Cepat
                  </span>
                </div>
              </div>

              {/* Quick Access Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => handleDemoLogin('exporter')}
                  className="text-sm"
                >
                  Demo Eksportir
                </Button>
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => handleDemoLogin('lab')}
                  className="text-sm"
                >
                  Demo Lab
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-text-secondary">
            <p>
              Sistem ini dilindungi dengan enkripsi tingkat enterprise.
            </p>
            <p className="mt-2">
              Hubungi administrator untuk bantuan akses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
