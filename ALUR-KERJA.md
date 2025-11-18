# Alur Kerja JAMIN-WEB

## Flow Utama

### 1. Akses Awal
```
/ (root) 
  → Redirect ke /login
```

### 2. Login
```
/login
  ↓
Cek email:
  - Mengandung "lab" → /lab (Dashboard Laboratorium)
  - Lainnya → /dashboard (Dashboard Eksportir)
```

### 3. Dashboard Eksportir (`/dashboard`)
**Yang bisa dilakukan:**
- Lihat daftar batch yang dibuat
- Buat batch baru → input nama produk, berat, pilih lab
- Download sertifikat batch yang sudah LULUS
- Tracking status: PENDING → IN_PROGRESS → LULUS/GAGAL

**Security:**
- Check `getCurrentUser()` → jika null, redirect `/login`
- Filter batch by `exporter_id`

### 4. Dashboard Lab (`/lab`)
**Yang bisa dilakukan:**
- Lihat semua batch dari eksportir
- Update status batch (IN_PROGRESS, LULUS, GAGAL)
- Upload dokumen hasil tes
- Input catatan verifikasi

**Security:**
- Check `getCurrentUser()` → jika null, redirect `/login`
- Hanya batch yang assigned ke lab ini

### 5. Verifikasi Publik (`/verify/[batch-id]`)
**Akses:** Tanpa login (public)
**Tampilan:**
- Batch LULUS → Tampil hijau, detail lengkap, QR code
- Batch GAGAL → Tampil merah, alasan gagal
- Batch NOT_FOUND → Tampil merah, tidak ditemukan

---

## Security Checklist

✅ Root page redirect ke login  
✅ Semua dashboard check user session  
✅ Redirect ke login jika user null  
✅ Environment variables required untuk database  
✅ Verify page handle missing env vars (build time)  
✅ No password hardcoded  
✅ Client-side validation sebelum API call  

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI:** shadcn/ui components
- **Deploy:** Vercel

---

## Database Schema

### Tables:
1. **users** - Data eksportir & lab
2. **laboratories** - Data lab terakreditasi
3. **batches** - Batch ekspor dengan status
4. **batch_history** - Log perubahan status

### Batch Status Flow:
```
PENDING (batch dibuat eksportir)
  ↓
IN_PROGRESS (lab mulai tes)
  ↓
LULUS / GAGAL (hasil final)
```
