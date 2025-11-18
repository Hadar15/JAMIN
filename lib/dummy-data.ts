// Dummy Data Storage with localStorage persistence

export interface Laboratory {
  id: string
  name: string
  city: string
  accreditation_type: 'KKP' | 'Bapeten'
  is_active: boolean
}

export interface Batch {
  id: string
  exporter_id: string
  laboratory_id: string
  product_name: string
  product_weight: number
  status: 'PENDING' | 'IN_PROGRESS' | 'LULUS' | 'GAGAL'
  certificate_type?: string
  test_date?: string
  verification_notes?: string
  document_url?: string
  created_at: string
  updated_at: string
  exporter?: {
    full_name: string
    organization_name: string
    email: string
  }
  laboratory?: Laboratory
}

export interface User {
  id: string
  email: string
  full_name: string
  user_type: 'exporter' | 'lab' | 'admin'
  organization_name?: string
  phone?: string
}

// Initial Dummy Data
const INITIAL_LABS: Laboratory[] = [
  {
    id: 'LAB-001',
    name: 'Laboratorium Mutu Pangan Jakarta',
    city: 'Jakarta',
    accreditation_type: 'KKP',
    is_active: true
  },
  {
    id: 'LAB-002',
    name: 'Lab Radiologi Nasional Surabaya',
    city: 'Surabaya',
    accreditation_type: 'Bapeten',
    is_active: true
  },
  {
    id: 'LAB-003',
    name: 'Balai Pengujian Mutu Hasil Perikanan',
    city: 'Medan',
    accreditation_type: 'KKP',
    is_active: true
  }
]

const INITIAL_USERS: User[] = [
  {
    id: 'USER-EXP-001',
    email: 'eksportir@example.com',
    full_name: 'Budi Santoso',
    user_type: 'exporter',
    organization_name: 'PT Maju Bersama Ekspor',
    phone: '08123456789'
  },
  {
    id: 'USER-LAB-001',
    email: 'lab@example.com',
    full_name: 'Dr. Siti Aminah',
    user_type: 'lab',
    organization_name: 'Laboratorium Mutu Pangan Jakarta',
    phone: '02112345678'
  }
]

const INITIAL_BATCHES: Batch[] = [
  {
    id: 'BATCH-2024-001',
    exporter_id: 'USER-EXP-001',
    laboratory_id: 'LAB-001',
    product_name: 'Udang Beku Grade A',
    product_weight: 5000,
    status: 'LULUS',
    certificate_type: 'Sertifikat Kesehatan',
    test_date: '2024-11-15',
    verification_notes: 'Hasil uji laboratorium menunjukkan produk memenuhi standar ekspor',
    created_at: '2024-11-10T08:00:00Z',
    updated_at: '2024-11-15T14:30:00Z',
    exporter: {
      full_name: 'Budi Santoso',
      organization_name: 'PT Maju Bersama Ekspor',
      email: 'eksportir@example.com'
    }
  },
  {
    id: 'BATCH-2024-002',
    exporter_id: 'USER-EXP-001',
    laboratory_id: 'LAB-002',
    product_name: 'Tuna Kalengan',
    product_weight: 3000,
    status: 'IN_PROGRESS',
    test_date: '2024-11-17',
    created_at: '2024-11-16T10:00:00Z',
    updated_at: '2024-11-17T09:00:00Z',
    exporter: {
      full_name: 'Budi Santoso',
      organization_name: 'PT Maju Bersama Ekspor',
      email: 'eksportir@example.com'
    }
  },
  {
    id: 'BATCH-2024-003',
    exporter_id: 'USER-EXP-001',
    laboratory_id: 'LAB-001',
    product_name: 'Ikan Sarden Segar',
    product_weight: 2500,
    status: 'PENDING',
    created_at: '2024-11-18T07:00:00Z',
    updated_at: '2024-11-18T07:00:00Z',
    exporter: {
      full_name: 'Budi Santoso',
      organization_name: 'PT Maju Bersama Ekspor',
      email: 'eksportir@example.com'
    }
  }
]

// LocalStorage Keys
const STORAGE_KEYS = {
  BATCHES: 'jamin_batches',
  LABS: 'jamin_labs',
  USERS: 'jamin_users',
  CURRENT_USER: 'jamin_current_user'
}

// Initialize Storage
export function initializeStorage() {
  if (typeof window === 'undefined') return

  // Initialize if not exists
  if (!localStorage.getItem(STORAGE_KEYS.BATCHES)) {
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(INITIAL_BATCHES))
  }
  if (!localStorage.getItem(STORAGE_KEYS.LABS)) {
    localStorage.setItem(STORAGE_KEYS.LABS, JSON.stringify(INITIAL_LABS))
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS))
  }
}

// Batches Operations
export function getAllBatches(): Batch[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.BATCHES)
  return data ? JSON.parse(data) : []
}

export function getBatchesByExporter(exporterId: string): Batch[] {
  const batches = getAllBatches()
  return batches.filter(b => b.exporter_id === exporterId)
}

export function getBatchById(id: string): Batch | null {
  const batches = getAllBatches()
  return batches.find(b => b.id === id) || null
}

export function createBatch(batch: Omit<Batch, 'created_at' | 'updated_at'>): Batch {
  const batches = getAllBatches()
  const now = new Date().toISOString()
  
  const newBatch: Batch = {
    ...batch,
    created_at: now,
    updated_at: now
  }
  
  batches.push(newBatch)
  localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(batches))
  
  return newBatch
}

export function updateBatch(id: string, updates: Partial<Batch>): Batch | null {
  const batches = getAllBatches()
  const index = batches.findIndex(b => b.id === id)
  
  if (index === -1) return null
  
  batches[index] = {
    ...batches[index],
    ...updates,
    updated_at: new Date().toISOString()
  }
  
  localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(batches))
  return batches[index]
}

// Labs Operations
export function getAllLabs(): Laboratory[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.LABS)
  return data ? JSON.parse(data) : []
}

export function getLabById(id: string): Laboratory | null {
  const labs = getAllLabs()
  return labs.find(l => l.id === id) || null
}

// Users Operations
export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.USERS)
  return data ? JSON.parse(data) : []
}

export function getUserById(id: string): User | null {
  const users = getAllUsers()
  return users.find(u => u.id === id) || null
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getAllUsers()
  const index = users.findIndex(u => u.id === id)
  
  if (index === -1) return null
  
  users[index] = {
    ...users[index],
    ...updates
  }
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  return users[index]
}

// Current User (Session)
export function setCurrentUser(user: User) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return data ? JSON.parse(data) : null
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
}

// Generate Batch ID
export function generateBatchId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `BATCH-2024-${random}`
}

// Statistics
export function getBatchStats(userId: string, userType: 'exporter' | 'lab') {
  const batches = userType === 'exporter' 
    ? getBatchesByExporter(userId)
    : getAllBatches()
  
  return {
    total: batches.length,
    lulus: batches.filter(b => b.status === 'LULUS').length,
    gagal: batches.filter(b => b.status === 'GAGAL').length,
    pending: batches.filter(b => b.status === 'PENDING').length,
    inProgress: batches.filter(b => b.status === 'IN_PROGRESS').length
  }
}
