"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FlaskConical, Settings, Clock, LogOut, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/database"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    variant: "default"
  },
  {
    title: "Laboratorium",
    href: "/lab",
    icon: FlaskConical,
    variant: "ghost"
  },
  {
    title: "Batch Pending",
    href: "/lab/pending",
    icon: Clock,
    variant: "ghost"
  },
  {
    title: "Pengaturan",
    href: "/lab/settings",
    icon: Settings,
    variant: "ghost"
  }
]

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Force redirect even if signOut fails
      router.push('/login')
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900">JAMIN</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 mb-1 ${
                    isActive 
                      ? "bg-slate-100 text-slate-900 font-medium" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <link.icon className={`w-5 h-5 ${isActive ? "text-slate-900" : "text-slate-400"}`} />
                  {link.title}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}