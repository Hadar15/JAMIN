import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if env vars are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for our database tables
export type UserType = 'exporter' | 'lab' | 'admin'
export type BatchStatus = 'PENDING' | 'IN_PROGRESS' | 'LULUS' | 'GAGAL'
export type AccreditationType = 'KKP' | 'Bapeten'

export interface User {
  id: string
  email: string
  full_name: string
  user_type: UserType
  organization_name?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Laboratory {
  id: string
  name: string
  accreditation_type: AccreditationType
  address?: string
  city: string
  phone?: string
  email?: string
  is_active: boolean
  created_at: string
}

export interface Batch {
  id: string
  exporter_id: string
  laboratory_id?: string
  product_name: string
  product_weight: number
  status: BatchStatus
  certificate_type?: string
  test_date?: string
  verification_notes?: string
  document_url?: string
  qr_code_url?: string
  created_at: string
  updated_at: string
  // Joined fields
  exporter?: User
  laboratory?: Laboratory
}

export interface BatchHistory {
  id: string
  batch_id: string
  user_id: string
  action: string
  old_status?: string
  new_status?: string
  notes?: string
  created_at: string
}
