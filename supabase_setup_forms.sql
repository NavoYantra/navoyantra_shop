-- 1. Create B2B Inquiries Table
CREATE TABLE b2b_inquiries (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  institution_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  institution_type text NOT NULL,
  estimated_budget text NOT NULL,
  message text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Newsletter Subscribers Table
CREATE TABLE newsletter_subscribers (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  subscribed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Set up Row Level Security (RLS)
-- Allow anyone to insert (so public forms work)
ALTER TABLE b2b_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts for B2B" ON b2b_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin viewing B2B" ON b2b_inquiries FOR SELECT USING (true); -- Ideally restrict to admin

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts for newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin viewing newsletter" ON newsletter_subscribers FOR SELECT USING (true); -- Ideally restrict to admin
