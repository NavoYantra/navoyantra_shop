-- SEED DATA FOR NAVOYANTRA SHOP

-- 1. Insert Categories
INSERT INTO categories (name, slug, description, image) VALUES
('Robotics', 'robotics', 'Build and program robots from scratch.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'),
('AI & Machine Learning', 'ai-ml', 'Learn AI concepts with hands-on kits.', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800'),
('IoT & Smart Home', 'iot-smart-home', 'Connect your devices to the internet.', 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Brands
INSERT INTO brands (name, slug, description) VALUES
('NavoLabs', 'navolabs', 'Official NavoYantra in-house kits.'),
('STEM Creators', 'stem-creators', 'Premium educational kits for schools.'),
('RoboTech', 'robotech', 'Advanced robotics components.')
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Tags
INSERT INTO tags (name, slug) VALUES
('Arduino', 'arduino'),
('ESP32', 'esp32'),
('Raspberry Pi', 'raspberry-pi'),
('Beginner', 'beginner')
ON CONFLICT (slug) DO NOTHING;

-- 4. Insert Dummy Products (We use DO UPDATE just to avoid duplicate key errors if you run it multiple times)
WITH category_ids AS (
    SELECT id, slug FROM categories
), brand_ids AS (
    SELECT id, slug FROM brands
)
INSERT INTO products (name, slug, description, price, sale_price, inventory_count, category_id, brand_id, images, status) 
VALUES
(
  'Smart AI Rover Kit', 
  'smart-ai-rover-kit', 
  'Build your first autonomous rover powered by AI. Includes camera module, motor drivers, and a detailed instruction manual.', 
  3500.00, 
  2999.00, 
  50, 
  (SELECT id FROM category_ids WHERE slug = 'robotics'), 
  (SELECT id FROM brand_ids WHERE slug = 'navolabs'), 
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', 'https://images.unsplash.com/photo-1535378273068-9bb67d5beacd?w=800'],
  'active'
),
(
  'Home Automation IoT Kit', 
  'home-automation-iot-kit', 
  'Learn IoT by building a smart home system. Control lights and fans from your smartphone using ESP32.', 
  2800.00, 
  2500.00, 
  30, 
  (SELECT id FROM category_ids WHERE slug = 'iot-smart-home'), 
  (SELECT id FROM brand_ids WHERE slug = 'stem-creators'), 
  ARRAY['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800'],
  'active'
),
(
  'Computer Vision Starter Pack', 
  'cv-starter-pack', 
  'Dive into AI with this face recognition and object detection kit. Comes with a Raspberry Pi and webcam.', 
  8500.00, 
  7999.00, 
  15, 
  (SELECT id FROM category_ids WHERE slug = 'ai-ml'), 
  (SELECT id FROM brand_ids WHERE slug = 'robotech'), 
  ARRAY['https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=800'],
  'active'
)
ON CONFLICT (slug) DO NOTHING;

-- 5. Link Products and Tags (Since there's no junction table in your schema, tags might be stored as strings in 'features' JSON or a separate array. But since the original code fetched tags from a junction table or JSON, for now the shop will just use the frontend filtering logic.)
