# Supabase Database Schema for JAMIN-WEB

## Tables

### 1. users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('exporter', 'lab', 'admin')),
  organization_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. laboratories
```sql
CREATE TABLE laboratories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  accreditation_type TEXT NOT NULL CHECK (accreditation_type IN ('KKP', 'Bapeten')),
  address TEXT,
  city TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. batches
```sql
CREATE TABLE batches (
  id TEXT PRIMARY KEY, -- Format: BATCH-XXX
  exporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  laboratory_id UUID REFERENCES laboratories(id),
  product_name TEXT NOT NULL,
  product_weight NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'LULUS', 'GAGAL')),
  certificate_type TEXT,
  test_date TIMESTAMP WITH TIME ZONE,
  verification_notes TEXT,
  document_url TEXT,
  qr_code_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. batch_history
```sql
CREATE TABLE batch_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id TEXT REFERENCES batches(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  old_status TEXT,
  new_status TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row Level Security (RLS) Policies

### users table
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### batches table
```sql
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;

-- Exporters can read their own batches
CREATE POLICY "Exporters can read own batches" ON batches
  FOR SELECT USING (
    exporter_id = auth.uid() OR 
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'lab')
  );

-- Exporters can insert batches
CREATE POLICY "Exporters can insert batches" ON batches
  FOR INSERT WITH CHECK (exporter_id = auth.uid());

-- Labs can update batches
CREATE POLICY "Labs can update batches" ON batches
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'lab')
  );
```

### laboratories table
```sql
ALTER TABLE laboratories ENABLE ROW LEVEL SECURITY;

-- Everyone can read active laboratories
CREATE POLICY "Anyone can read active labs" ON laboratories
  FOR SELECT USING (is_active = true);
```

### batch_history table
```sql
ALTER TABLE batch_history ENABLE ROW LEVEL SECURITY;

-- Users can read history of their batches
CREATE POLICY "Users can read batch history" ON batch_history
  FOR SELECT USING (
    batch_id IN (SELECT id FROM batches WHERE exporter_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'lab')
  );
```

## Indexes

```sql
CREATE INDEX idx_batches_exporter ON batches(exporter_id);
CREATE INDEX idx_batches_laboratory ON batches(laboratory_id);
CREATE INDEX idx_batches_status ON batches(status);
CREATE INDEX idx_batches_created_at ON batches(created_at DESC);
CREATE INDEX idx_batch_history_batch ON batch_history(batch_id);
CREATE INDEX idx_users_email ON users(email);
```

## Functions

### Update timestamp function
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_batches_updated_at BEFORE UPDATE ON batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Sample Data

### Sample Laboratories
```sql
INSERT INTO laboratories (name, accreditation_type, city) VALUES
  ('Lab KKP Jakarta', 'KKP', 'Jakarta'),
  ('Lab KKP Surabaya', 'KKP', 'Surabaya'),
  ('Lab Bapeten Bandung', 'Bapeten', 'Bandung'),
  ('Lab KKP Makassar', 'KKP', 'Makassar'),
  ('Lab KKP Medan', 'KKP', 'Medan');
```
