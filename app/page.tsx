import { redirect } from "next/navigation"

export default function LandingPage() {
  redirect('/login')
  return null
      
      {/* Background Elements (Futuristic Grid) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full opacity-30" />
      </div>

      {/* Header / Nav */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
            <Hexagon className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">JAMIN-WEB</span>
        </div>
        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/5 px-4 py-1 uppercase tracking-widest text-xs">
          National Export System v1.0
        </Badge>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-7xl mx-auto w-full">
        
        {/* Hero Text */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Verifikasi Ekspor. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Tanpa Kompromi.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Platform notarisasi digital terpusat untuk menjamin kualitas, keamanan, dan transparansi rantai pasok ekspor Indonesia ke pasar global.
          </p>
        </div>

        {/* The 3 Gateways (Grid System) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* 1. Verifikasi Publik */}
          <Card className="group bg-slate-900/40 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm">
            <CardHeader>
              <div className="mb-4 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                <QrCode className="w-6 h-6 text-emerald-400" />
              </div>
              <CardTitle className="text-white text-xl">Verifikasi Publik</CardTitle>
              <CardDescription className="text-slate-400">
                Cek keaslian sertifikat ekspor secara instan menggunakan ID Batch.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input 
                  placeholder="Masukkan Batch ID (Contoh: B-2024)" 
                  className="pl-10 bg-slate-950 border-slate-700 text-white focus:border-emerald-500" 
                />
              </div>
              <Link href="/verify/BATCH-2024-001" className="block">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium">
                  Verifikasi Sekarang
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 2. Login Eksportir */}
          <Card className="group bg-slate-900/40 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm">
            <CardHeader>
              <div className="mb-4 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                <Container className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-white text-xl">Akses Eksportir</CardTitle>
              <CardDescription className="text-slate-400">
                Masuk ke dashboard untuk mendaftarkan batch dan mengunduh sertifikat.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link href="/login">
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-blue-950 hover:border-blue-500/50 justify-between group/btn">
                  Login Eksportir
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 3. Login Laboratorium */}
          <Card className="group bg-slate-900/40 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm">
            <CardHeader>
              <div className="mb-4 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                <FlaskConical className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-white text-xl">Akses Laboratorium</CardTitle>
              <CardDescription className="text-slate-400">
                Portal khusus teknisi Lab untuk input hasil uji dan validasi sampel.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link href="/login">
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-purple-950 hover:border-purple-500/50 justify-between group/btn">
                  Login Petugas Lab
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-slate-800/50 py-6 text-center">
        <p className="text-slate-600 text-sm">
          &copy; 2025 JAMIN-WEB Platform. Didukung oleh Kementerian Perdagangan & Bea Cukai.
        </p>
      </footer>
    </div>
  )
}