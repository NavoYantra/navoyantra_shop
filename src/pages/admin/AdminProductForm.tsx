import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

import { ArrowLeft, Save, Trash2, Plus, Image as ImageIcon, Video, Upload } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, getBrands, getTags, createProduct, updateProduct, uploadImage, getProducts, deleteProduct as apiDeleteProduct } from '../../lib/api';
import { ProductCard } from '../../components/product/ProductCard';
import { QuickViewContent } from '../../components/modals/ProductQuickViewModal';
import { ProductDetailHero } from '../ProductDetailPage';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  tagline: z.string(),
  description: z.string(),
  price: z.number().min(0, 'Price must be positive'),
  originalPrice: z.number().min(0),
  skuPrefix: z.string().optional(),
  
  // Display & Detail fields
  shortDescription: z.string().optional(),
  tileDescription: z.string().optional(),
  features: z.array(z.object({ value: z.string() })).optional(),
  youtubeVideoUrl: z.string().optional(),

  // Product Detail Page
  whatsInside: z.array(z.object({ value: z.string() })).optional(),
  sampleProjects: z.array(z.object({ value: z.string() })).optional(),
  technicalSpecs: z.array(z.object({ key: z.string(), value: z.string() })).optional(),

  // Categorization
  category: z.array(z.string()).min(1, 'At least one category is required'),
  tags: z.array(z.string()).optional(),
  brand: z.string().optional(),
  isFeatured: z.boolean().optional(),
  ageGroup: z.string().optional(),
  
  // Inventory & Shipping
  inStock: z.boolean(),
  stockCount: z.number().min(0),
  shipping: z.object({
    weight: z.number(),
    length: z.number(),
    width: z.number(),
    height: z.number(),
    shippingClass: z.string()
  }).optional(),

  // Media
  images: z.array(z.object({ url: z.string() })),

  // Publishing
  publishStatus: z.enum(['Draft', 'Published']).optional(),
  scheduledPublishDate: z.string().optional(),

  // Variants
  hasVariants: z.boolean().optional(),
  variants: z.array(z.object({
    name: z.string(),
    options: z.string()
  })).optional()
});

type ProductFormValues = z.infer<typeof productSchema>;

export const AdminProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const existingProductRaw = products.find((p: any) => p.id === id);
  const isEditing = !!existingProductRaw;
  
  // Transform raw product to form format
  const existingProduct = isEditing ? {
      name: existingProductRaw.name,
      tagline: existingProductRaw.short_description || '',
      description: existingProductRaw.description || '',
      price: existingProductRaw.sale_price || existingProductRaw.price,
      originalPrice: existingProductRaw.price,
      skuPrefix: existingProductRaw.sku ? existingProductRaw.sku.split('-')[1] : '',
      shortDescription: existingProductRaw.dimensions?.quickViewDescription || '',
      tileDescription: existingProductRaw.dimensions?.tileDescription || '',
      features: existingProductRaw.dimensions?.features || [],
      whatsInside: existingProductRaw.dimensions?.whatsInside || [],
      sampleProjects: existingProductRaw.dimensions?.sampleProjects || [],
      technicalSpecs: existingProductRaw.dimensions?.technicalSpecs || [],
      youtubeVideoUrl: existingProductRaw.video_url || '',
      category: existingProductRaw.categories?.name ? [existingProductRaw.categories.name] : ['Robotics'],
      tags: existingProductRaw.dimensions?.techStack || [],
      brand: existingProductRaw.brands?.name || 'NavoYantra',
      isFeatured: existingProductRaw.featured || false,
      ageGroup: existingProductRaw.dimensions?.ageGroup || '',
      inStock: existingProductRaw.stock > 0,
      stockCount: existingProductRaw.stock,
      shipping: { weight: existingProductRaw.weight || 0, length: existingProductRaw.dimensions?.length || 0, width: existingProductRaw.dimensions?.width || 0, height: existingProductRaw.dimensions?.height || 0, shippingClass: 'Standard' },
      images: existingProductRaw.images || [''],
      publishStatus: existingProductRaw.status === 'published' ? 'Published' : 'Draft',
      scheduledPublishDate: '',
      hasVariants: false,
      variants: []
  } : null;

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: getCategories });
  const { data: brands = [] } = useQuery({ queryKey: ['brands'], queryFn: getBrands });
  const { data: tags = [] } = useQuery({ queryKey: ['tags'], queryFn: getTags });

  const [isUploading, setIsUploading] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'tile' | 'quickview' | 'detail'>('tile');

  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/admin/products');
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/admin/products');
    }
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: existingProduct ? {
      name: existingProduct.name,
      tagline: existingProduct.tagline,
      description: existingProduct.description,
      price: existingProduct.price,
      originalPrice: existingProduct.originalPrice,
      skuPrefix: existingProduct.skuPrefix,
      ageGroup: existingProduct.ageGroup,
      shortDescription: existingProduct.shortDescription,
      tileDescription: existingProduct.tileDescription,
      features: existingProduct.features.map((f: any) => ({ value: f })),
      whatsInside: existingProduct.whatsInside?.map((x: string) => ({ value: x })) || [],
      sampleProjects: existingProduct.sampleProjects?.map((x: string) => ({ value: x })) || [],
      technicalSpecs: existingProduct.technicalSpecs?.map((x: any) => ({ key: x.key, value: x.value })) || [],
      youtubeVideoUrl: existingProduct.youtubeVideoUrl,
      category: existingProduct.category,
      tags: existingProduct.tags,
      brand: existingProduct.brand,
      isFeatured: existingProduct.isFeatured,
      inStock: existingProduct.inStock,
      stockCount: existingProduct.stockCount,
      shipping: existingProduct.shipping,
      images: existingProduct.images.map((img: any) => ({ url: img })),
      publishStatus: existingProduct.publishStatus as 'Draft' | 'Published',
      scheduledPublishDate: existingProduct.scheduledPublishDate,
      hasVariants: existingProduct.hasVariants,
      variants: existingProduct.variants
    } : {
      name: '',
      tagline: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: ['Robotics'],
      tags: [],
      brand: 'NavoYantra',
      isFeatured: false,
      ageGroup: '',
      inStock: true,
      stockCount: 10,
      whatsInside: [],
      sampleProjects: [],
      technicalSpecs: [],
      images: [{ url: '' }],
      publishStatus: 'Draft',
      hasVariants: false,
      shipping: { weight: 0, length: 0, width: 0, height: 0, shippingClass: 'Standard' }
    },
  });

  useEffect(() => {
    if (existingProduct) {
      form.reset({
        name: existingProduct.name,
        tagline: existingProduct.tagline,
        description: existingProduct.description,
        price: existingProduct.price,
        originalPrice: existingProduct.originalPrice,
        skuPrefix: existingProduct.skuPrefix,
        shortDescription: existingProduct.shortDescription,
        tileDescription: existingProduct.tileDescription,
        features: existingProduct.features.map((f: any) => ({ value: f })),
        whatsInside: existingProduct.whatsInside?.map((x: string) => ({ value: x })) || [],
        sampleProjects: existingProduct.sampleProjects?.map((x: string) => ({ value: x })) || [],
        technicalSpecs: existingProduct.technicalSpecs?.map((x: any) => ({ key: x.key, value: x.value })) || [],
        youtubeVideoUrl: existingProduct.youtubeVideoUrl,
        category: existingProduct.category,
        tags: existingProduct.tags,
        brand: existingProduct.brand,
        isFeatured: existingProduct.isFeatured,
        ageGroup: existingProduct.ageGroup,
        inStock: existingProduct.inStock,
        stockCount: existingProduct.stockCount,
        shipping: existingProduct.shipping,
        images: existingProduct.images.map((img: any) => ({ url: img })),
        publishStatus: existingProduct.publishStatus as 'Draft' | 'Published',
        scheduledPublishDate: existingProduct.scheduledPublishDate,
        hasVariants: existingProduct.hasVariants,
        variants: existingProduct.variants
      });
    }
  }, [existingProductRaw]);

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control: form.control, name: "images" });
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control: form.control, name: "features" });
  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({ control: form.control, name: "variants" });
  const { fields: whatsInsideFields, append: appendWhatsInside, remove: removeWhatsInside } = useFieldArray({ control: form.control, name: "whatsInside" });
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control: form.control, name: "sampleProjects" });
  const { fields: techSpecFields, append: appendTechSpec, remove: removeTechSpec } = useFieldArray({ control: form.control, name: "technicalSpecs" });

  const onSubmit = (data: ProductFormValues) => {
    // Transform arrays back to strings for the Product interface
    const formattedData = {
      ...data,
      images: data.images.map(img => img.url).filter(Boolean),
      features: data.features?.map(f => f.value).filter(Boolean) || [],
      whatsInside: data.whatsInside?.map(f => f.value).filter(Boolean) || [],
      sampleProjects: data.sampleProjects?.map(f => f.value).filter(Boolean) || [],
      technicalSpecs: data.technicalSpecs?.filter(f => f.key && f.value) || [],
      variants: data.variants?.map((v, idx) => ({ id: `var_${idx}`, name: v.name, options: v.options.split(',').map(s => s.trim()) })) || []
    };

    // Map to Supabase Schema
    const supabasePayload = {
      name: formattedData.name,
      slug: formattedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      short_description: formattedData.tagline,
      description: formattedData.description,
      price: formattedData.originalPrice,
      sale_price: formattedData.price,
      stock: formattedData.stockCount,
      status: formattedData.publishStatus === 'Published' ? 'published' : 'draft',
      featured: formattedData.isFeatured,
      images: formattedData.images,
      video_url: formattedData.youtubeVideoUrl,
      weight: formattedData.shipping?.weight,
      dimensions: {
        length: formattedData.shipping?.length,
        width: formattedData.shipping?.width,
        height: formattedData.shipping?.height,
        whatsInside: formattedData.whatsInside,
        sampleProjects: formattedData.sampleProjects,
        technicalSpecs: formattedData.technicalSpecs,
        quickViewDescription: formattedData.shortDescription,
        tileDescription: formattedData.tileDescription,
        features: formattedData.features,
        ageGroup: formattedData.ageGroup,
        techStack: formattedData.tags
      },
      // brand_id, category_id will be mapped if they match
      // For simplicity, finding ID from name (in real app, form should bind to ID directly)
      brand_id: brands.find((b: any) => b.name === formattedData.brand)?.id || null,
      category_id: categories.find((c: any) => c.name === formattedData.category[0])?.id || null,
    };
    
    // Auto-generate Custom SKU (NY-{PREFIX}-{4-DIGIT})
    const customPrefix = formattedData.skuPrefix || 'GEN';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedSku = `NY-${customPrefix.toUpperCase()}-${randomNum}`;

    if (isEditing && id) {
      // Don't overwrite SKU on edit if we wanted to keep it, but here we just re-generate if we didn't store it.
      // Ideally, the backend would ignore it or we'd fetch it. For now, it's fine.
      // We will pass the payload to update.
      updateProductMutation.mutate({ id, payload: supabasePayload });
    } else {
      (supabasePayload as any).sku = generatedSku;
      productMutation.mutate(supabasePayload);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      form.setValue(`images.${index}.url`, url);
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const formValues = form.watch();
  const mockProduct = {
    id: existingProductRaw?.id || 'preview-id',
    sku: existingProductRaw?.sku || 'preview-id',
    name: formValues.name || 'Product Name',
    tagline: formValues.tagline || 'Tagline',
    shortDescription: formValues.shortDescription || '',
    tileDescription: formValues.tileDescription || '',
    description: formValues.description || 'Description goes here.',
    price: formValues.price || 0,
    originalPrice: formValues.originalPrice || 0,
    discountPercent: formValues.originalPrice > formValues.price ? Math.round(((formValues.originalPrice - formValues.price) / formValues.originalPrice) * 100) : 0,
    rating: 5.0,
    reviewCount: 0,
    stockCount: formValues.stockCount || 0,
    inStock: formValues.inStock || false,
    category: formValues.category?.[0] || 'Category',
    ageText: formValues.ageGroup || '8-14 Yrs',
    specs: formValues.technicalSpecs?.reduce((acc: any, curr: any) => { if (curr.key) acc[curr.key.toLowerCase()] = curr.value; return acc; }, {}) || {
      microcontroller: 'Preview',
      warranty: '1 Year',
    },
    techStack: formValues.tags?.length ? formValues.tags : ['Preview Stack'],
    whatsInside: formValues.whatsInside?.map(f => f.value).filter(Boolean) || [],
    sampleProjects: ['Preview Project'],
    images: formValues.images?.map(i => i.url).filter(Boolean).length ? formValues.images.map(i => i.url).filter(Boolean) : ['https://via.placeholder.com/600'],
    badges: formValues.isFeatured ? ['Bestseller'] : [],
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12 px-4 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button type="button" variant="outline" size="icon" onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing && (
            <Button type="button" variant="destructive" onClick={() => {
              if (id && window.confirm('Delete product?')) {
                apiDeleteProduct(id).then(() => {
                  navigate('/admin/products');
                });
              }
            }}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          )}
          <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={productMutation.isPending || updateProductMutation.isPending || isUploading}>
            <Save className="h-4 w-4 mr-2" /> 
            {productMutation.isPending || updateProductMutation.isPending ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT MAIN CONTENT (FORM) */}
        <div className="space-y-8">
          
          {/* SECTION 1: General Information */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">1. General Information</h2>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Product Name</label>
                  <Input {...form.register('name')} placeholder="e.g., Advanced Robotics Kit" />
                  {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">SKU Prefix</label>
                  <p className="text-xs text-slate-500 mb-2">Middle part of the SKU. e.g., 'RBK' for NY-RBK-XXXX</p>
                  <Input {...form.register('skuPrefix')} placeholder="e.g., RBK" />
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">Product Images (Google Drive Links)</h3>
                  <div className="space-y-4">
                    {imageFields.map((field, index) => (
                      <div key={field.id} className="flex items-start space-x-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex space-x-2">
                            <Input {...form.register(`images.${index}.url` as const)} placeholder="Image URL will appear here..." readOnly />
                            <div className="relative overflow-hidden rounded-md">
                              <Button type="button" variant="outline" className="shrink-0" disabled={isUploading}>
                                <Upload className="w-4 h-4 mr-2" /> {isUploading ? 'Uploading...' : 'Upload'}
                              </Button>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleImageUpload(e, index)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={isUploading}
                              />
                            </div>
                          </div>
                          {form.watch(`images.${index}.url`) && (
                            <div className="w-24 h-24 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                              <img src={form.watch(`images.${index}.url`)} className="w-full h-full object-cover" alt="Preview" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }} />
                            </div>
                          )}
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(index)} className="mt-1">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendImage({ url: '' })}>
                      <ImageIcon className="w-4 h-4 mr-2" /> Add Another Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* SECTION 2: Pricing & Organization */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">2. Pricing & Organization</h2>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Regular Price (₹)</label>
                    <Input type="number" {...form.register('originalPrice', { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Sale Price (₹)</label>
                    <Input type="number" {...form.register('price', { valueAsNumber: true })} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Brand</label>
                    <select {...form.register('brand')} className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                      <option value="">Select Brand...</option>
                      {brands.map((b: any) => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Age Group / Target</label>
                    <Input {...form.register('ageGroup')} placeholder="e.g. 8+ Yrs, 14+ Yrs" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Categories</label>
                    <select multiple {...form.register('category')} className="flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm">
                      {categories.map((c: any) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Tags</label>
                    <select multiple {...form.register('tags')} className="flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm">
                      {tags.map((t: any) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Status</label>
                    <select {...form.register('publishStatus')} className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                    <div className="pt-4 flex items-center space-x-2">
                      <input type="checkbox" id="isFeatured" {...form.register('isFeatured')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-600 w-4 h-4" />
                      <label htmlFor="isFeatured" className="text-sm font-bold text-slate-900 cursor-pointer">Feature this product</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* SECTION 3: Tile & Quick View Display */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">3. Tile & Quick View Display</h2>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Short Tagline (Tile)</label>
                  <Input {...form.register('tagline')} placeholder="e.g., Build your first robot" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Product Tile Description</label>
                  <textarea 
                    {...form.register('tileDescription')}
                    className="flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    placeholder="Short text shown on the product card..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Quick View Description</label>
                  <textarea 
                    {...form.register('shortDescription')}
                    className="flex min-h-[100px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    placeholder="Text shown in the quick view popup modal..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Key Features / Bullet Points</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {featureFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Input {...form.register(`features.${index}.value` as const)} placeholder="e.g. Includes 10 sensors" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendFeature({ value: '' })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Feature Bullet
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* SECTION 4: Product Detail Page */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">4. Product Detail Page</h2>
            
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Description (Amazon Style)</label>
                  <p className="text-xs text-slate-500 mb-2">Detailed explanation of the product, its benefits, and what it includes.</p>
                  <textarea 
                    {...form.register('description')}
                    className="flex min-h-[150px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    placeholder="Detailed product description..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Video URL</label>
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-red-500" />
                    <Input {...form.register('youtubeVideoUrl')} placeholder="https://youtube.com/watch?v=..." />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>What's In The Box</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {whatsInsideFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Input {...form.register(`whatsInside.${index}.value` as const)} placeholder="e.g. 1x Arduino Uno" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeWhatsInside(index)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendWhatsInside({ value: '' })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Projects You Can Build</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {projectFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Input {...form.register(`sampleProjects.${index}.value` as const)} placeholder="e.g. Line Follower Robot" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeProject(index)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendProject({ value: '' })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Technical Specs</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {techSpecFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="col-span-5 space-y-1">
                      <Input {...form.register(`technicalSpecs.${index}.key` as const)} placeholder="e.g. Microcontroller" />
                    </div>
                    <div className="col-span-6 space-y-1">
                      <Input {...form.register(`technicalSpecs.${index}.value` as const)} placeholder="e.g. ATmega328P" />
                    </div>
                    <div className="col-span-1 text-right">
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeTechSpec(index)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendTechSpec({ key: '', value: '' })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Spec
                </Button>
              </CardContent>
            </Card>

          </section>
          
          {/* SECTION 5: Variants */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">5. Variants</h2>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Product Variants</CardTitle>
                  <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <input type="checkbox" id="hasVariants" {...form.register('hasVariants')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                    <label htmlFor="hasVariants" className="text-sm font-bold text-blue-800 cursor-pointer">This product has variants</label>
                  </div>
                </div>
              </CardHeader>
              {form.watch('hasVariants') && (
                <CardContent className="space-y-6 border-t border-slate-100 pt-6">
                  <p className="text-sm text-slate-500">Define variations for your product (e.g. Color, Size). Comma separate the options.</p>
                  {variantFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="col-span-4 space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Variant Name</label>
                        <Input {...form.register(`variants.${index}.name` as const)} placeholder="e.g. Color" />
                      </div>
                      <div className="col-span-7 space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Options (comma separated)</label>
                        <Input {...form.register(`variants.${index}.options` as const)} placeholder="e.g. Red, Blue, Green" />
                      </div>
                      <div className="col-span-1 pt-6 text-right">
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendVariant({ name: '', options: '' })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Variant Type
                  </Button>
                </CardContent>
              )}
            </Card>
          </section>

          {/* SECTION 6: Inventory & Shipping */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">6. Inventory & Shipping</h2>
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-700 mb-3">Inventory</h3>
                  <div className="flex items-center space-x-2 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100 w-fit">
                    <input type="checkbox" id="inStock" {...form.register('inStock')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                    <label htmlFor="inStock" className="text-sm font-bold text-blue-800 cursor-pointer">Track Stock Quantity</label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Available Quantity</label>
                    <Input type="number" {...form.register('stockCount', { valueAsNumber: true })} className="w-48" />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-bold text-slate-700 mb-3">Shipping Dimensions & Weight</h3>
                  <p className="text-sm text-slate-500 mb-4">Provide accurate dimensions to calculate shipping rates correctly.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Weight (kg)</label>
                      <Input type="number" step="0.01" {...form.register('shipping.weight', { valueAsNumber: true })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Length (cm)</label>
                      <Input type="number" {...form.register('shipping.length', { valueAsNumber: true })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Width (cm)</label>
                      <Input type="number" {...form.register('shipping.width', { valueAsNumber: true })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Height (cm)</label>
                      <Input type="number" {...form.register('shipping.height', { valueAsNumber: true })} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>

        {/* RIGHT PREVIEW */}
        <div className="lg:sticky lg:top-4 h-fit space-y-4">
          <div className="bg-slate-900 text-white rounded-t-2xl p-4 flex items-center justify-between">
            <h2 className="font-bold text-lg">Live Preview</h2>
            <div className="flex bg-slate-800 rounded-lg p-1 space-x-1 text-sm font-medium">
              <button 
                type="button" 
                onClick={() => setActivePreviewTab('tile')} 
                className={`px-3 py-1.5 rounded-md transition-colors ${activePreviewTab === 'tile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Tile
              </button>
              <button 
                type="button" 
                onClick={() => setActivePreviewTab('quickview')} 
                className={`px-3 py-1.5 rounded-md transition-colors ${activePreviewTab === 'quickview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Quick View
              </button>
              <button 
                type="button" 
                onClick={() => setActivePreviewTab('detail')} 
                className={`px-3 py-1.5 rounded-md transition-colors ${activePreviewTab === 'detail' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Detail
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-b-2xl p-6 min-h-[600px] flex items-center justify-center overflow-hidden">
            {activePreviewTab === 'tile' && (
              <div className="w-full max-w-sm mx-auto">
                <ProductCard product={mockProduct as any} />
              </div>
            )}
            
            {activePreviewTab === 'quickview' && (
              <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden transform scale-[0.85] origin-top">
                <QuickViewContent product={mockProduct} isPreview={true} />
              </div>
            )}

            {activePreviewTab === 'detail' && (
              <div className="w-full transform scale-[0.70] origin-top bg-slate-50">
                <ProductDetailHero product={mockProduct} isPreview={true} />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

