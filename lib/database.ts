import { supabase } from './supabase'
import type { Batch, BatchStatus, Laboratory } from './supabase'

// Helper to check if supabase is available
function checkSupabase() {
  if (!supabase) {
    throw new Error('Supabase client is not initialized. Please check your environment variables.')
  }
  return supabase
}

// Batch operations
export async function getBatches(userId: string, userType: 'exporter' | 'lab') {
  const client = checkSupabase()
  let query = client
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
  const client = checkSupabase()
  const { data, error } = await client
    .from('batches')
    .select(`
      *,
      exporter:users!batches_exporter_id_fkey(full_name, organization_name, email),
      laboratory:laboratories(name, city, accreditation_type)
    `)
    .eq('id', batchId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    throw error
  }
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
  const client = checkSupabase()
  const { data, error } = await client
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
  const client = checkSupabase()
  const { data, error } = await client
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
  const client = checkSupabase()
  const { data, error } = await client
    .from('laboratories')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data as Laboratory[]
}

// Batch statistics
export async function getBatchStatistics(userId: string, userType: 'exporter' | 'lab') {
  const client = checkSupabase()
  let query = client
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
  const client = checkSupabase()
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const client = checkSupabase()
  const { error } = await client.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const client = checkSupabase()
  const { data: { user } } = await client.auth.getUser()
  return user
}

export async function getUserProfile(userId: string) {
  const client = checkSupabase()
  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}
