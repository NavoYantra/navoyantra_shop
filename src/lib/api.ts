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
