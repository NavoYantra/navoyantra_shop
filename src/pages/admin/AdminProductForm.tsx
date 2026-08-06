import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { ArrowLeft, Save, Trash2, Plus, Image as ImageIcon, Video, Calendar, Upload } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCategories, getBrands, getTags, createProduct, uploadImage, getProducts, deleteProduct as apiDeleteProduct } from '../../lib/api';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  tagline: z.string(),
  description: z.string(),
  price: z.number().min(0, 'Price must be positive'),
  originalPrice: z.number().min(0),
  
  // Display & Detail fields
  shortDescription: z.string().optional(),
  tileDescription: z.string().optional(),
  features: z.array(z.object({ value: z.string() })).optional(),
  youtubeVideoUrl: z.string().optional(),

  // Categorization
  category: z.array(z.string()).min(1, 'At least one category is required'),
  tags: z.array(z.string()).optional(),
  brand: z.string().optional(),
  isFeatured: z.boolean().optional(),
  
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
  const [activeTab, setActiveTab] = useState('general');
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
      shortDescription: existingProductRaw.short_description || '',
      tileDescription: '',
      features: [],
      youtubeVideoUrl: existingProductRaw.video_url || '',
      category: existingProductRaw.categories?.name ? [existingProductRaw.categories.name] : ['Robotics'],
      tags: existingProductRaw.tags?.map((t:any) => t.name) || [],
      brand: 'NavoYantra',
      isFeatured: existingProductRaw.featured || false,
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

  const productMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
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
      shortDescription: existingProduct.shortDescription,
      tileDescription: existingProduct.tileDescription,
      features: existingProduct.features.map((f: any) => ({ value: f })),
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
      inStock: true,
      stockCount: 10,
      images: [{ url: '' }],
      publishStatus: 'Draft',
      hasVariants: false,
      shipping: { weight: 0, length: 0, width: 0, height: 0, shippingClass: 'Standard' }
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control: form.control, name: "images" });
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control: form.control, name: "features" });
  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({ control: form.control, name: "variants" });

  const onSubmit = (data: ProductFormValues) => {
    // Transform arrays back to strings for the Product interface
    const formattedData = {
      ...data,
      images: data.images.map(img => img.url).filter(Boolean),
      features: data.features?.map(f => f.value).filter(Boolean) || [],
      variants: data.variants?.map((v, idx) => ({ id: `var_${idx}`, name: v.name, options: v.options.split(',').map(s => s.trim()) })) || []
    };

    if (isEditing && id) {
      // For now, we only implement creation with Supabase. Editing can be added later.
      alert('Updating product is not fully implemented in the UI yet');
      navigate('/admin/products');
    } else {
      // Map to Supabase Schema
      const supabasePayload = {
        name: formattedData.name,
        slug: formattedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        short_description: formattedData.shortDescription,
        description: formattedData.description,
        price: formattedData.price,
        sale_price: formattedData.price, // assuming price is sale price
        stock: formattedData.stockCount,
        status: formattedData.publishStatus === 'Published' ? 'published' : 'draft',
        featured: formattedData.isFeatured,
        images: formattedData.images,
        video_url: formattedData.youtubeVideoUrl,
        weight: formattedData.shipping?.weight,
        dimensions: {
          length: formattedData.shipping?.length,
          width: formattedData.shipping?.width,
          height: formattedData.shipping?.height
        },
        // brand_id, category_id will be mapped if they match
        // For simplicity, finding ID from name (in real app, form should bind to ID directly)
        brand_id: brands.find((b: any) => b.name === formattedData.brand)?.id || null,
        category_id: categories.find((c: any) => c.name === formattedData.category[0])?.id || null,
      };
      
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing && (
            <Button variant="destructive" onClick={() => {
              if (id && window.confirm('Delete product?')) {
                apiDeleteProduct(id).then(() => {
                  navigate('/admin/products');
                });
              }
            }}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          )}
          <Button onClick={form.handleSubmit(onSubmit)} disabled={productMutation.isPending || isUploading}>
            <Save className="h-4 w-4 mr-2" /> 
            {productMutation.isPending ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4 bg-slate-100 p-1 rounded-xl inline-flex overflow-x-auto w-full md:w-auto">
            <TabsTrigger value="general" activeValue={activeTab} onSelectTab={setActiveTab}>General</TabsTrigger>
            <TabsTrigger value="display" activeValue={activeTab} onSelectTab={setActiveTab}>Display & Info</TabsTrigger>
            <TabsTrigger value="media" activeValue={activeTab} onSelectTab={setActiveTab}>Media (Images/Video)</TabsTrigger>
            <TabsTrigger value="variants" activeValue={activeTab} onSelectTab={setActiveTab}>Variants</TabsTrigger>
            <TabsTrigger value="shipping" activeValue={activeTab} onSelectTab={setActiveTab}>Inventory & Shipping</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* TAB: GENERAL */}
              <TabsContent value="general" activeValue={activeTab} className="mt-0">
                <Card>
                  <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Product Name</label>
                      <Input {...form.register('name')} placeholder="e.g., Advanced Robotics Kit" />
                      {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Regular Price (₹)</label>
                        <Input type="number" {...form.register('originalPrice', { valueAsNumber: true })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sale Price (₹)</label>
                        <Input type="number" {...form.register('price', { valueAsNumber: true })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Description (Amazon Style)</label>
                      <textarea 
                        {...form.register('description')}
                        className="flex min-h-[150px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                        placeholder="Detailed product description..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB: DISPLAY & INFO */}
              <TabsContent value="display" activeValue={activeTab} className="mt-0 space-y-6">
                <Card>
                  <CardHeader><CardTitle>Quick View & Tile Displays</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Short Tagline (e.g. "Ages 8-14")</label>
                      <Input {...form.register('tagline')} placeholder="e.g., Build your first robot" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Product Tile Description</label>
                      <textarea 
                        {...form.register('tileDescription')}
                        className="flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        placeholder="Short text shown on the product card..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quick View Description</label>
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
              </TabsContent>

              {/* TAB: MEDIA */}
              <TabsContent value="media" activeValue={activeTab} className="mt-0 space-y-6">
                <Card>
                  <CardHeader><CardTitle>Product Images (Google Drive Links)</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-500 mb-4">Paste the public sharing links from Google Drive (or any image URL).</p>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>YouTube Embed</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <label className="text-sm font-medium">Video URL</label>
                    <div className="flex items-center space-x-2">
                      <Video className="w-5 h-5 text-red-500" />
                      <Input {...form.register('youtubeVideoUrl')} placeholder="https://youtube.com/watch?v=..." />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB: VARIANTS */}
              <TabsContent value="variants" activeValue={activeTab} className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Product Variants</CardTitle>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="hasVariants" {...form.register('hasVariants')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                        <label htmlFor="hasVariants" className="text-sm font-medium">This product has variants</label>
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
              </TabsContent>

              {/* TAB: INVENTORY & SHIPPING */}
              <TabsContent value="shipping" activeValue={activeTab} className="mt-0 space-y-6">
                <Card>
                  <CardHeader><CardTitle>Inventory</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="inStock" {...form.register('inStock')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                      <label htmlFor="inStock" className="text-sm font-medium">Track Stock Quantity</label>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Available Quantity</label>
                      <Input type="number" {...form.register('stockCount', { valueAsNumber: true })} className="w-48" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Shipping Dimensions & Weight</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Weight (kg)</label>
                        <Input type="number" step="0.01" {...form.register('shipping.weight', { valueAsNumber: true })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Length (cm)</label>
                        <Input type="number" {...form.register('shipping.length', { valueAsNumber: true })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Width (cm)</label>
                        <Input type="number" {...form.register('shipping.width', { valueAsNumber: true })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Height (cm)</label>
                        <Input type="number" {...form.register('shipping.height', { valueAsNumber: true })} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            {/* RIGHT SIDEBAR (Always visible) */}
            <div className="lg:col-span-1 space-y-6">
              
              <Card>
                <CardHeader><CardTitle>Publishing & Schedule</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Status</label>
                    <select {...form.register('publishStatus')} className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600">
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Schedule Publish (Optional)</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input type="datetime-local" {...form.register('scheduledPublishDate')} className="pl-9" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center space-x-2">
                    <input type="checkbox" id="isFeatured" {...form.register('isFeatured')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-600 w-4 h-4" />
                    <label htmlFor="isFeatured" className="text-sm font-bold text-slate-900 cursor-pointer">Feature this product</label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Brand</label>
                    <select {...form.register('brand')} className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                      <option value="">Select Brand...</option>
                      {brands.map((b: any) => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categories (Hold Ctrl/Cmd to select multiple)</label>
                    <select 
                      multiple
                      {...form.register('category')}
                      className="flex min-h-[120px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600"
                    >
                      {categories.map((c: any) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags (Hold Ctrl/Cmd to select multiple)</label>
                    <select 
                      multiple
                      {...form.register('tags')}
                      className="flex min-h-[100px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600"
                    >
                      {tags.map((t: any) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </Tabs>
      </form>
    </div>
  );
};
