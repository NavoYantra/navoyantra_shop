import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcbkupdcmutzfsassrjz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYmt1cGRjbXV0emZzYXNzcmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMTMxMjksImV4cCI6MjEwMTU4OTEyOX0.Y_Jvfg_QC3FYMiiTbhUqp0nia6wpCgroswN6Fe1xk5k';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('order_items').insert([{
    order_id: '27a3584b-d0a9-40f4-b68a-39a02b1706ce',
    product_id: 'ny-bot-v4',
    quantity: 1,
    price_at_time: 2800
  }]);
  console.log("Insert result:", { data, error });
}
run();
