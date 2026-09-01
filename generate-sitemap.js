import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read .env file manually
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    env[match[1]] = match[2];
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase credentials not found in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_URL = 'https://shop.navoyantra.com';

async function generateSitemap() {
  try {
    console.log('Fetching products and tutorials...');
    
    // Fetch dynamic content
    const { data: products, error: prodErr } = await supabase.from('products').select('slug, created_at');
    if (prodErr) console.error('Error fetching products:', prodErr);

    const { data: tutorials, error: tutErr } = await supabase.from('tutorials').select('id, created_at');
    if (tutErr) console.error('Error fetching tutorials:', tutErr);

    const today = new Date().toISOString().split('T')[0];

    // Static Routes
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/shop', priority: '0.9', changefreq: 'daily' },
      { url: '/lab-setup', priority: '0.8', changefreq: 'weekly' },
      { url: '/tutorials', priority: '0.8', changefreq: 'weekly' },
    ];

    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Products
    if (products) {
      products.forEach(product => {
        const lastMod = product.created_at ? product.created_at.split('T')[0] : today;
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/product/${product.slug}</loc>\n`;
        xml += `    <lastmod>${lastMod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });
      console.log(`Added ${products.length} products to sitemap.`);
    }

    // Dynamic Tutorials
    if (tutorials) {
      tutorials.forEach(tutorial => {
        const lastMod = tutorial.created_at ? tutorial.created_at.split('T')[0] : today;
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/tutorial/${tutorial.id}</loc>\n`;
        xml += `    <lastmod>${lastMod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });
      console.log(`Added ${tutorials.length} tutorials to sitemap.`);
    }

    xml += `</urlset>`;

    const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml);
    console.log('Sitemap generated successfully at public/sitemap.xml');

  } catch (err) {
    console.error('Error generating sitemap:', err);
    process.exit(1);
  }
}

generateSitemap();
