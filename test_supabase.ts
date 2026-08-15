import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcbkupdcmutzfsassrjz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYmt1cGRjbXV0emZzYXNzcmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMTMxMjksImV4cCI6MjEwMTU4OTEyOX0.Y_Jvfg_QC3FYMiiTbhUqp0nia6wpCgroswN6Fe1xk5k';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('order_items').select('*, products(id, name, sku)').limit(1);
  if (error) console.error("Error:", error.message);
  else console.log("Success:", JSON.stringify(data, null, 2));
}
run();
