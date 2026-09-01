import { supabase } from './supabase';

// Helper to generate a unique filename for Supabase Storage
export const generateStorageFileName = (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = Math.random().toString(36).substring(2, 15);
  return `${fileName}.${fileExt}`;
};

// Upload an image to Supabase Storage and get the public URL
export const uploadImage = async (file: File) => {
  const fileName = generateStorageFileName(file);
  const { error } = await supabase.storage
    .from('product-images')
    .upload(`public/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(`public/${fileName}`);

  return publicUrl;
};

// --- Categories ---
export const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createCategory = async (category: any) => {
  const { data, error } = await supabase.from('categories').insert(category).select().single();
  if (error) throw error;
  return data;
};

export const updateCategory = async (id: string, category: any) => {
  const { data, error } = await supabase.from('categories').update(category).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
};

// --- Brands ---
export const getBrands = async () => {
  const { data, error } = await supabase.from('brands').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createBrand = async (brand: any) => {
  const { data, error } = await supabase.from('brands').insert(brand).select().single();
  if (error) throw error;
  return data;
};

export const updateBrand = async (id: string, brand: any) => {
  const { data, error } = await supabase.from('brands').update(brand).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteBrand = async (id: string) => {
  const { error } = await supabase.from('brands').delete().eq('id', id);
  if (error) throw error;
};

// --- Tags ---
export const getTags = async () => {
  const { data, error } = await supabase.from('tags').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createTag = async (tag: any) => {
  const { data, error } = await supabase.from('tags').insert(tag).select().single();
  if (error) throw error;
  return data;
};

export const updateTag = async (id: string, tag: any) => {
  const { data, error } = await supabase.from('tags').update(tag).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteTag = async (id: string) => {
  const { error } = await supabase.from('tags').delete().eq('id', id);
  if (error) throw error;
};

// --- Coupons ---
export const getCoupons = async () => {
  const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createCoupon = async (coupon: any) => {
  const { data, error } = await supabase.from('coupons').insert(coupon).select().single();
  if (error) throw error;
  return data;
};

export const updateCoupon = async (id: string, coupon: any) => {
  const { data, error } = await supabase.from('coupons').update(coupon).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteCoupon = async (id: string) => {
  const { error } = await supabase.from('coupons').delete().eq('id', id);
  if (error) throw error;
};

// --- Products ---
export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*, categories(*), brands(*)').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase.from('products').select('*, categories(*), brands(*)').eq('slug', slug).single();
  if (error) throw error;
  return data;
};

export const createProduct = async (product: any) => {
  const { data, error } = await supabase.from('products').insert(product).select().single();
  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, product: any) => {
  const { data, error } = await supabase.from('products').update(product).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

// --- Reviews ---
export const getReviews = async () => {
  const { data, error } = await supabase.from('reviews').select('*, products(name)').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const updateReviewStatus = async (id: string, status: 'approved' | 'declined') => {
  const { data, error } = await supabase.from('reviews').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteReview = async (id: string) => {
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) throw error;
};


// --- Admin Users ---
export const getAdminUsers = async () => {
  const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const addAdminUser = async (adminUser: any) => {
  const { data, error } = await supabase.from('admin_users').insert(adminUser).select().single();
  if (error) throw error;
  return data;
};

export const deleteAdminUser = async (id: string) => {
  const { error } = await supabase.from('admin_users').delete().eq('id', id);
  if (error) throw error;
};

// --- Orders ---
export const getOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*').neq('status', 'archived').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getOrdersByEmail = async (email: string) => {
  const { data: orders, error } = await supabase.from('orders').select('*').eq('customer_email', email).neq('status', 'archived').order('created_at', { ascending: false });
  if (error) throw error;

  const orderIds = orders.map((o: any) => o.id);
  const { data: items, error: itemsError } = await supabase.from('order_items').select('*').in('order_id', orderIds);
  if (itemsError) throw itemsError;

  return orders.map((order: any) => ({
    ...order,
    order_items: items?.filter((item: any) => item.order_id === order.id) || []
  }));
};

export const getOrderById = async (id: string) => {
  const { data: order, error } = await supabase.from('orders').select('*').eq('id', id).single();
  if (error) throw error;

  const { data: items, error: itemsError } = await supabase.from('order_items').select('*').eq('order_id', order.id);
  if (itemsError) throw itemsError;

  return {
    ...order,
    order_items: items || []
  };
};

export const updateOrderStatus = async (id: string, status: string, tracking_id?: string, invoice_url?: string) => {
  const updateData: any = { status };
  if (tracking_id !== undefined) updateData.shipping_tracking_id = tracking_id;
  if (invoice_url !== undefined) updateData.invoice_url = invoice_url;
  
  const { data, error } = await supabase.from('orders').update(updateData).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const updateOrderTracking = async (id: string, tracking_id: string) => {
  const { data, error } = await supabase.from('orders').update({ tracking_id }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const createOrder = async (orderData: any, items: any[]) => {
  const { data: order, error: orderError } = await supabase.from('orders').insert([orderData]).select().single();
  if (orderError) throw orderError;

  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product?.id || item.id || item.product_id,
    quantity: item.quantity,
    price_at_time: item.product?.discountPrice || item.product?.price || item.price || 0
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) throw itemsError;

  return order;
};

export const deleteOrder = async (id: string) => {
  // Soft delete: Update status to 'archived' since Supabase RLS might block hard DELETEs for the frontend
  const { data, error } = await supabase.from('orders').update({ status: 'archived' }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

// --- Notifications ---
export const getNotifications = async () => {
  const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(20);
  if (error) throw error;
  return data;
};

export const markNotificationRead = async (id: string) => {
  const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id);
  if (error) throw error;
};

// --- Blog Reviews ---
export const getBlogReviews = async () => {
  const { data, error } = await supabase.from('blog_reviews').select('*, blogs(title)').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const updateBlogReviewStatus = async (id: string, status: 'approved' | 'declined') => {
  const { data, error } = await supabase.from('blog_reviews').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteBlogReview = async (id: string) => {
  const { error } = await supabase.from('blog_reviews').delete().eq('id', id);
  if (error) throw error;
};

// --- Profiles & Avatars ---
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error && error.code !== 'PGRST116') throw error; // Ignore not found error as trigger might be delayed
  return data;
};

export const updateProfile = async (userId: string, profileData: any) => {
  const { data, error } = await supabase.from('profiles').upsert({ id: userId, ...profileData }).select().single();
  if (error) throw error;
  return data;
};

export const uploadAvatar = async (file: File, userId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  
  // Update profile with new avatar URL
  await updateProfile(userId, { avatar_url: data.publicUrl });
  
  return data.publicUrl;
};

// --- Blog Categories ---
export const getBlogCategories = async () => {
  const { data, error } = await supabase.from('blog_categories').select('*').order('name');
  if (error) throw error;
  return data;
};

export const createBlogCategory = async (category: any) => {
  const { data, error } = await supabase.from('blog_categories').insert(category).select().single();
  if (error) throw error;
  return data;
};

export const deleteBlogCategory = async (id: string) => {
  const { error } = await supabase.from('blog_categories').delete().eq('id', id);
  if (error) throw error;
};

// --- Blog Tags ---
export const getBlogTags = async () => {
  const { data, error } = await supabase.from('blog_tags').select('*').order('name');
  if (error) throw error;
  return data;
};

export const createBlogTag = async (tag: any) => {
  const { data, error } = await supabase.from('blog_tags').insert(tag).select().single();
  if (error) throw error;
  return data;
};

export const deleteBlogTag = async (id: string) => {
  const { error } = await supabase.from('blog_tags').delete().eq('id', id);
  if (error) throw error;
};

// --- Tutorial Reviews ---
export const getTutorialReviews = async () => {
  const { data, error } = await supabase
    .from('tutorial_reviews')
    .select('*, tutorials(title)')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const updateTutorialReviewStatus = async (id: string, status: 'approved' | 'declined') => {
  const { data, error } = await supabase
    .from('tutorial_reviews')
    .update({ status })
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data;
};

// --- Forms & Subscriptions ---
const WEB3FORMS_ACCESS_KEY = "486d0c7a-5af6-463e-9432-b9e32e15b392";

export const submitB2BInquiry = async (data: any) => {
  // 1. Save to Supabase
  const { data: result, error } = await supabase.from('b2b_inquiries').insert(data).select().single();
  if (error) throw error;
  
  // 2. Send Email via Web3Forms
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New B2B Quotation Request - NavoYantra Shop",
        from_name: "NavoYantra Shop Alerts",
        ...data
      })
    });
  } catch (err) {
    console.error("Web3Forms Email failed:", err);
  }

  return result;
};

export const subscribeNewsletter = async (email: string, role: string) => {
  // 1. Save to Supabase
  const { data, error } = await supabase.from('newsletter_subscribers').insert({ email, role }).select().single();
  if (error) throw error;
  
  // 2. Send Email via Web3Forms
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New Newsletter Subscriber - NavoYantra Shop",
        from_name: "NavoYantra Shop Alerts",
        email: email,
        role: role
      })
    });
  } catch (err) {
    console.error("Web3Forms Email failed:", err);
  }

  return data;
};
