import { supabase } from './supabase'
import type { Batch, BatchStatus, Laboratory } from './supabase'

// Batch operations
export async function getBatches(userId: string, userType: 'exporter' | 'lab') {
  let query = supabase
    .from('batches')
    .select(`
      *,
      exporter:users!batches_exporter_id_fkey(full_name, organization_name),
      laboratory:laboratories(name)
    `)
    .order('created_at', { ascending: false })

  if (userType === 'exporter') {
    query = query.eq('exporter_id', userId)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Batch[]
}

export async function getBatchById(batchId: string) {
  const { data, error } = await supabase
    .from('batches')
    .select(`
      *,
      exporter:users!batches_exporter_id_fkey(full_name, organization_name, email),
      laboratory:laboratories(name, city, accreditation_type)
    `)
    .eq('id', batchId)
    .single()

  if (error) throw error
  return data as Batch
}

export async function createBatch(batch: {
  id: string
  exporter_id: string
  product_name: string
  product_weight: number
  laboratory_id: string
  certificate_type?: string
}) {
  const { data, error } = await supabase
    .from('batches')
    .insert([{
      ...batch,
      status: 'PENDING'
    }])
    .select()
    .single()

  if (error) throw error
  return data as Batch
}

export async function updateBatchStatus(
  batchId: string,
  status: BatchStatus,
  updates: {
    verification_notes?: string
    document_url?: string
    test_date?: string
  }
) {
  const { data, error } = await supabase
    .from('batches')
    .update({
      status,
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', batchId)
    .select()
    .single()

  if (error) throw error
  return data as Batch
}

// Laboratory operations
export async function getLaboratories() {
  const { data, error } = await supabase
    .from('laboratories')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data as Laboratory[]
}

// Batch statistics
export async function getBatchStatistics(userId: string, userType: 'exporter' | 'lab') {
  let query = supabase
    .from('batches')
    .select('status')

  if (userType === 'exporter') {
    query = query.eq('exporter_id', userId)
  }

  const { data, error } = await query

  if (error) throw error

  const stats = {
    total: data.length,
    lulus: data.filter(b => b.status === 'LULUS').length,
    gagal: data.filter(b => b.status === 'GAGAL').length,
    pending: data.filter(b => b.status === 'PENDING').length,
    inProgress: data.filter(b => b.status === 'IN_PROGRESS').length
  }

  return stats
}

// Generate batch ID
export function generateBatchId() {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `BATCH-${timestamp}-${random}`
}

// Authentication helpers
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}
