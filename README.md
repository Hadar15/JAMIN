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

Platform ini dibangun untuk Kementerian Perdagangan RI
├── package.json
└── README.md
```

## 🎨 Component Library (shadcn/ui)

All components are built using shadcn/ui principles:
- ✅ Non-templated (unique, customizable)
- ✅ WCAG-compliant (accessible)
- ✅ Type-safe with TypeScript
- ✅ Fully responsive
- ✅ Professional and modern

## 🔄 Responsive Design

All pages are optimized for:
- 📱 **Mobile**: 320px - 640px
- 📱 **Tablet**: 641px - 1024px
- 🖥️ **Desktop**: 1025px+

### Responsive Features:
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-optimized buttons
- Responsive tables with horizontal scroll
- Adaptive typography scaling

## 🎯 Key Features

### Status Badge System
```tsx
<Badge variant="success">LULUS</Badge>      // Green
<Badge variant="error">GAGAL</Badge>         // Red
<Badge variant="warning">PENDING</Badge>     // Yellow
```

### Data Tables
- Clean header styling (uppercase, small text)
- Hover states on rows
- Responsive overflow handling
- Action buttons (icon-based)

### Modal Dialogs
- Professional animations
- Mobile-optimized
- Clear call-to-actions
- Form validation ready

## 🔐 Security Considerations

- Client-side demo (production requires backend)
- Ready for authentication integration
- Form validation patterns included
- Secure file upload structure

## 📝 Demo Data

The application includes mock data for demonstration:
- Sample batches with various statuses
- Multiple lab entries
- Verification success/failure scenarios

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is designed for the Indonesian Export Certification Platform.

## 👥 Stakeholders

- **KKP** (Kementerian Kelautan dan Perikanan)
- **Bapeten** (Badan Pengawas Tenaga Nuklir)
- Indonesian Exporters
- International Importers
- Customs Authorities

## 🎨 Design Principles

1. **Clarity over Aesthetics** - Function before form
2. **Trust through Simplicity** - No ambiguity
3. **Professional Authority** - Enterprise-grade appearance
4. **Mobile-First** - Critical verification must work on phones
5. **Accessibility** - WCAG 2.1 AA compliant

---

**Built with precision for national-scale export certification** 🇮🇩
