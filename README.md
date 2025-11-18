# JAMIN-WEB - Platform Notarisasi Digital Ekspor Nasional

## 🎯 Overview

JAMIN-WEB adalah platform B2B/B2G berskala nasional yang dirancang untuk memulihkan kepercayaan internasional terhadap ekspor Indonesia. Platform ini menyediakan sistem verifikasi dan sertifikasi digital yang aman, transparan, dan terpercaya untuk produk ekspor Indonesia.

### Core Values
- **KEPERCAYAAN** - Sistem yang dapat dipercaya oleh stakeholder internasional
- **KEJELASAN** - Setiap elemen desain menghilangkan ambiguitas
- **OTORITAS** - Desain yang profesional dan kredibel

## 🎨 Design Philosophy

**"Clarity as a Feature"** - Setiap elemen desain bekerja untuk menghilangkan ambiguitas. Pengguna tidak boleh ragu sedetik pun tentang status sebuah sertifikasi.

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Components**: shadcn/ui (Non-templated, professional component library)
- **Icons**: Lucide Icons

## 📐 Design System

### Color Palette

#### Primary Colors (Trust & Authority)
- **Primary Blue**: `hsl(222.2 47.4% 11.2%)` - Slate-800 equivalent
- **Secondary Blue**: `hsl(200 98% 39.4%)` - Sky-600 equivalent

#### Status Colors (Critical Design Elements)
- **Status Green (LULUS)**:
  - Fill: `hsl(160 84.1% 39.4%)` - Emerald-600
  - Background: `hsl(152 76% 96.1%)` - Emerald-100
  - Border: `hsl(160 70% 80%)`

- **Status Red (GAGAL)**:
  - Fill: `hsl(0 84.2% 60.2%)` - Red-600
  - Background: `hsl(0 93% 94.1%)` - Red-100
  - Border: `hsl(0 70% 85%)`

- **Status Yellow (PENDING)**:
  - Fill: `hsl(38 92% 50%)` - Amber-500
  - Background: `hsl(48 96.5% 88.8%)` - Amber-100
  - Border: `hsl(38 80% 75%)`

#### Neutral Colors
- **Background**: `#FFFFFF`
- **Page Background**: `hsl(210 40% 98%)` - Slate-50
- **Text Primary**: `hsl(222.2 84% 4.9%)` - Slate-900
- **Text Secondary**: `hsl(215.4 16.3% 46.9%)` - Slate-600
- **Border**: `hsl(215 20.2% 85.1%)` - Slate-200

### Typography

**Font Family**: Inter (Modern, professional, highly readable)

**Hierarchy**:
- **H1** (Page Title): 30px, SemiBold, text-primary
- **H2** (Section Title): 24px, SemiBold, text-primary
- **H3** (Card Title): 20px, Medium, text-primary
- **Body**: 16px, Regular, text-secondary
- **Label**: 14px, Medium, text-primary
- **Caption**: 12px, Regular, text-secondary

## 🎭 User Actors

### 1. Eksportir (Supplier)
**Persona**: Profesional yang sibuk, membutuhkan efisiensi dalam mendaftarkan batch dan melihat status verifikasi.

**Features**:
- Dashboard dengan statistik batch
- Pendaftaran batch baru
- Tracking status real-time
- Download sertifikat & QR code

### 2. Laboratorium (Lab)
**Persona**: Teknisi lab terakreditasi KKP/Bapeten yang membutuhkan alur kerja yang jelas dan akurat.

**Features**:
- Daftar batch pending
- Update status verifikasi (Lulus/Gagal)
- Upload dokumen hasil lab
- Manajemen workflow pengujian

### 3. Importir/Bea Cukai (Public)
**Persona**: Pengguna internasional (contoh: staf USFDA) yang memerlukan verifikasi instan via QR code.

**Features**:
- Verifikasi instan (1 detik response)
- Mobile-first design
- Clear PASS/FAIL indication
- Certificate details

## 📱 Pages & Features

### 1. Public Verification Page (`/verify/[id]`)
**Mobile-First Design** - Brutally simple, optimized for scanning under sunlight.

**Features**:
- ✅ PASS Status: Green theme, large checkmark icon, certificate details
- ❌ FAIL Status: Red theme, X icon, failure reason
- 📱 Fully responsive (Mobile → Desktop)
- 🎨 High contrast for outdoor visibility

### 2. Secure Login Page (`/login`)
**Bank-Grade Security Feel** - Split-screen professional design.

**Features**:
- 🔐 Split-screen layout (50/50)
- 🎨 Gradient branding side
- 📝 Clean authentication form
- 🔄 Demo access buttons

### 3. Exporter Dashboard (`/dashboard`)
**Efficiency-Focused** - Quick batch management and status tracking.

**Features**:
- 📊 Statistical overview cards
- 📋 Batch management table
- ➕ Quick batch registration
- 🔍 Search and filter
- 📥 Download certificates
- 🔲 Generate QR codes

### 4. Laboratory Dashboard (`/lab`)
**Accuracy-Focused** - Clear workflow for testing and result upload.

**Features**:
- 📊 Pending batch statistics
- 📋 Work queue management
- ✏️ Status update modal with:
  - Radio selection (Lulus/Gagal)
  - PDF document upload
  - Notes field
- 🔍 Search functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open browser**:
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
WEBMOCK/
├── app/
│   ├── dashboard/          # Exporter dashboard
│   │   └── page.tsx
│   ├── lab/               # Laboratory dashboard
│   │   └── page.tsx
│   ├── login/             # Secure login page
│   │   └── page.tsx
│   ├── verify/[id]/       # Public verification (dynamic)
│   │   └── page.tsx
│   ├── globals.css        # Global styles + design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/
│   │   └── sidebar-layout.tsx  # Dashboard sidebar
│   └── ui/                # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── radio-group.tsx
│       ├── table.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts           # Utility functions
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
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
