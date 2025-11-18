# JAMIN-WEB - Deployment Guide

## Setup Cepat (5 Menit)

### 1. Supabase Credentials
Buka dashboard Supabase → Project Settings → API:
- Copy **Project URL**
- Copy **anon key**

### 2. Vercel Environment Variables
Di Vercel project → Settings → Environment Variables, tambah:
```
NEXT_PUBLIC_SUPABASE_URL=<url-dari-supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-dari-supabase>
```
Centang Production, Preview, Development → Save.

### 3. Deploy
Deployments tab → Redeploy.

---

## Alur Kerja Sistem

### User Flow:
1. **Landing** → Redirect otomatis ke `/login`
2. **Login** → Input email/password
   - Email mengandung "lab" → Dashboard Lab
   - Selain itu → Dashboard Eksportir
3. **Dashboard** → Buat batch/verifikasi hasil
4. **Public Verification** → `/verify/[batch-id]` (tanpa login)

### Security:
- Client-side check di setiap page dengan `getCurrentUser()`
- Redirect ke `/login` jika user null
- Environment variables tidak exposed ke client

### Database:
1. Buka Supabase → SQL Editor
2. Run file `supabase/schema.sql`
3. Tables: `users`, `laboratories`, `batches`, `batch_history`

---

## Error Fixes

**"supabaseUrl is required"**
→ Tambah env variables di Vercel, lalu redeploy.

**Build error TypeScript**
→ Cek `SidebarLayout` tidak terima prop `userType`.

**Redirect loop**
→ Pastikan `/` hanya redirect, bukan render component.
