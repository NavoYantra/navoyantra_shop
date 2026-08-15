import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcbkupdcmutzfsassrjz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYmt1cGRjbXV0emZzYXNzcmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMTMxMjksImV4cCI6MjEwMTU4OTEyOX0.Y_Jvfg_QC3FYMiiTbhUqp0nia6wpCgroswN6Fe1xk5k';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  try {
    const trackingId = 'TEST-ORDER-' + Math.floor(1000 + Math.random() * 9000);
    const orderData = {
      tracking_id: trackingId,
      customer_name: 'Test',
      customer_email: 'test@test.com',
      customer_phone: '1234567890',
      shipping_address: 'Test Address',
      total_amount: 100,
    };

    console.log('Creating order...');
    const { data: order, error: orderError } = await supabase.from('orders').insert([orderData]).select().single();
    if (orderError) {
      console.error('Order Error:', orderError);
      return;
    }
    console.log('Order created:', order.id);

    const orderItems = [
      {
        order_id: order.id,
        product_id: '17db552c-bd48-4228-b0d7-13391b4020a5', // Using a random UUID, might fail FK
        quantity: 1,
        price_at_time: 100
      }
    ];

    console.log('Inserting items...');
    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
    if (itemsError) {
      console.error('Items Error:', itemsError);
    } else {
      console.log('Items inserted successfully!');
      
      console.log('Fetching items back...');
      const { data: fetchedItems, error: fetchErr } = await supabase.from('order_items').select('*').eq('order_id', order.id);
      console.log('Fetched items:', fetchedItems);
      if (fetchErr) console.error('Fetch error:', fetchErr);
    }

  } catch(e) {
    console.error(e);
  }
}
run();
