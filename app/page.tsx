import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-slate-800 to-secondary p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            JAMIN-WEB
          </h1>
          <p className="text-xl text-slate-200">
            Platform Notarisasi Digital Ekspor Nasional
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <Link href="/verify/BATCH-124">
            <Button 
              variant="outline" 
              className="w-full h-32 text-lg bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              <div className="space-y-2">
                <div className="text-2xl">🔍</div>
                <div>Verifikasi Publik</div>
              </div>
            </Button>
          </Link>
          
          <Link href="/login">
            <Button 
              variant="outline" 
              className="w-full h-32 text-lg bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              <div className="space-y-2">
                <div className="text-2xl">🔐</div>
                <div>Login Eksportir</div>
              </div>
            </Button>
          </Link>
          
          <Link href="/lab">
            <Button 
              variant="outline" 
              className="w-full h-32 text-lg bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              <div className="space-y-2">
                <div className="text-2xl">🔬</div>
                <div>Login Lab</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
