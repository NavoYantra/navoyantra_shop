import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcbkupdcmutzfsassrjz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYmt1cGRjbXV0emZzYXNzcmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMTMxMjksImV4cCI6MjEwMTU4OTEyOX0.Y_Jvfg_QC3FYMiiTbhUqp0nia6wpCgroswN6Fe1xk5k';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const orderId = '27a3584b-d0a9-40f4-b68a-39a02b1706ce'; // From screenshot

  const { data, error } = await supabase.from('orders').update({ status: 'archived' }).eq('id', orderId).select();
  console.log("Updated order:", data);
  if (error) console.error("error:", error);
}
run();
