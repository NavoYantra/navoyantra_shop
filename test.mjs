import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function test() {
  const { data, error } = await supabase.from('coupons').insert({
    code: 'TEST2',
    type: 'percentage',
    value: 10,
    description: '',
    expiry_date: null,
    is_active: true,
    usage_count: 0,
    usage_limit_per_user: null
  });
  console.log('Error:', error);
  console.log('Data:', data);
}
test();
