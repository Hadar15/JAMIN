# JAMIN-WEB

Platform notarisasi digital untuk sertifikasi ekspor Indonesia.

## Fitur Utama
- **Eksportir**: Dashboard batch, tracking status, download sertifikat
- **Laboratorium**: Verifikasi batch, update hasil tes, upload dokumen
- **Publik**: Verifikasi sertifikat via QR code tanpa login

## Tech Stack
- Next.js 14 + TypeScript
- Supabase (Auth + Database)
- Tailwind CSS + shadcn/ui
- Vercel deployment

## Setup Lokal

1. Clone & install:
```bash
git clone <repo-url>
npm install
```

2. Setup environment:
```bash
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials
```

3. Run database schema:
- Buka Supabase dashboard → SQL Editor
- Execute `supabase/schema.sql`

4. Start dev server:
```bash
npm run dev
```

## Deployment

Lihat `DEPLOYMENT.md` untuk instruksi deploy ke Vercel.

## Struktur Project
```
app/
  ├── dashboard/       # Dashboard eksportir
  ├── lab/            # Dashboard laboratorium
  ├── login/          # Login page
  ├── verify/[id]/    # Public verification
  └── page.tsx        # Root redirect
components/
  ├── layout/         # Sidebar layout
  └── ui/             # shadcn/ui components
lib/
  ├── database.ts     # Database functions
  └── supabase.ts     # Supabase client
```

## Alur Kerja

Lihat `ALUR-KERJA.md` untuk dokumentasi lengkap flow sistem.

---

Platform ini dibangun untuk Kementerian Perdagangan RI.
