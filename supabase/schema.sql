-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Brands Table
CREATE TABLE IF NOT EXISTS brands (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  website TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Tags Table
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- 'percentage', 'fixed', 'other'
  value NUMERIC,
  description TEXT,
  expiry_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  usage_count INTEGER DEFAULT 0,
  usage_limit_per_user INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  price NUMERIC NOT NULL,
  sale_price NUMERIC,
  sku TEXT,
  stock INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft', -- 'draft', 'published'
  featured BOOLEAN DEFAULT FALSE,
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  weight NUMERIC,
  dimensions JSONB,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Product Tags junction table
CREATE TABLE IF NOT EXISTS product_tags (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

-- Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for images
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) ON CONFLICT (id) DO NOTHING;

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tracking_id TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address TEXT,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT,
  quantity INTEGER NOT NULL,
  price_at_time NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS for Orders and Order Items
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (including guests) to place an order (Insert)
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on order_items" ON order_items FOR INSERT WITH CHECK (true);

-- Allow ONLY authenticated users (Admins) to read/update the data
CREATE POLICY "Allow authenticated select on orders" ON orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update on orders" ON orders FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated select on order_items" ON order_items FOR SELECT TO authenticated USING (true);

-- ==========================================
-- ADD NEW COLUMNS & INVOICE STORAGE
-- ==========================================

ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_tracking_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS invoice_url TEXT;

-- Create storage bucket for invoices
insert into storage.buckets (id, name, public) values ('invoices', 'invoices', true) ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- STORAGE POLICIES
-- ==========================================

-- Allow public read access to product-images
CREATE POLICY "Public Read product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload to product-images
CREATE POLICY "Auth Insert product-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

-- Allow public read access to invoices
CREATE POLICY "Public Read invoices" ON storage.objects FOR SELECT USING (bucket_id = 'invoices');

-- Allow authenticated users to upload invoices
CREATE POLICY "Auth Insert invoices" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'invoices');

-- ==========================================
-- BLOGS TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  author_name TEXT,
  author_role TEXT,
  author_avatar TEXT,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time TEXT,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft', -- 'draft', 'published'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blogs
CREATE POLICY "Allow public select on blogs" ON blogs FOR SELECT USING (true);

-- Allow authenticated users (Admins) to insert/update/delete blogs
CREATE POLICY "Allow authenticated insert on blogs" ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on blogs" ON blogs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on blogs" ON blogs FOR DELETE TO authenticated USING (true);
