# Deployment Guide - JAMIN Web

## Prerequisites
- Supabase project setup
- Vercel account

## Environment Variables Setup

### 1. Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Project Settings** > **API**
3. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 2. Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Make sure to add them for all environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### 3. Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button

## Local Development

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your Supabase credentials

3. Run development server:
```bash
npm install
npm run dev
```

## Troubleshooting

### Build Error: "supabaseUrl is required"
This means environment variables are not set in Vercel.
- Solution: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel environment variables

### Database Connection Issues
- Verify Supabase URL and key are correct
- Check Supabase project status
- Ensure database schema is properly initialized

## Database Setup

Run the SQL schema in Supabase:
1. Go to Supabase dashboard
2. Navigate to **SQL Editor**
3. Execute the SQL file: `supabase/schema.sql`

## Support
For issues, check:
- Vercel build logs
- Supabase logs
- Browser console for runtime errors
