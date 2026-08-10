import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../context/AppContext';
import { 
  Save, ArrowLeft, Image as ImageIcon, Trash2, Plus, 
  Upload, FileText, Video, Eye, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { TutorialDetailPage } from '../TutorialDetailPage';

const tutorialSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  category: z.string().min(2, "Category is required"),
  difficulty: z.string().min(2, "Difficulty is required"),
  content: z.string().min(10, "Content is required"),
  video_url: z.string().optional(),
  images: z.array(z.object({ url: z.string() })),
  pdfs: z.array(z.object({ name: z.string(), url: z.string() })),
  status: z.enum(['draft', 'published']),
  is_featured: z.boolean(),
});

type TutorialFormData = z.infer<typeof tutorialSchema>;

export const AdminTutorialForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const isEditing = !!id;
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<TutorialFormData>({
    resolver: zodResolver(tutorialSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'Robotics',
      difficulty: 'Beginner',
      content: '',
      video_url: '',
      images: [],
      pdfs: [],
      status: 'draft',
      is_featured: false,
    }
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images"
  });

  const { fields: pdfFields, append: appendPdf, remove: removePdf } = useFieldArray({
    control: form.control,
    name: "pdfs"
  });

  useEffect(() => {
    if (isEditing) {
      fetchTutorial();
    }
  }, [id]);

  const fetchTutorial = async () => {
    try {
      const { data, error } = await supabase
        .from('tutorials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        form.reset({
          title: data.title || '',
          slug: data.slug || '',
          category: data.category || 'Robotics',
          difficulty: data.difficulty || 'Beginner',
          content: data.content || '',
          video_url: data.video_url || '',
          images: data.images?.map((url: string) => ({ url })) || [],
          pdfs: data.pdfs || [],
          status: data.status || 'draft',
          is_featured: data.is_featured || false,
        });
      }
    } catch (err: any) {
      showToast('Error loading tutorial', 'warning');
      navigate('/admin/tutorials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf', index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tutorials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('tutorials')
        .getPublicUrl(filePath);

      if (type === 'image') {
        form.setValue(`images.${index}.url`, publicUrl);
      } else {
        form.setValue(`pdfs.${index}.url`, publicUrl);
        if (!form.getValues(`pdfs.${index}.name`)) {
          form.setValue(`pdfs.${index}.name`, file.name);
        }
      }
      
      showToast(`${type} uploaded successfully`, 'success');
    } catch (err: any) {
      showToast(err.message, 'warning');
    } finally {
      setIsUploading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const onSubmit = async (data: TutorialFormData) => {
    setIsSaving(true);
    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        category: data.category,
        difficulty: data.difficulty,
        content: data.content,
        video_url: data.video_url,
        images: data.images.map(img => img.url).filter(Boolean),
        pdfs: data.pdfs.filter(pdf => pdf.name && pdf.url),
        status: data.status,
        is_featured: data.is_featured,
        updated_at: new Date().toISOString()
      };

      if (isEditing) {
        const { error } = await supabase
          .from('tutorials')
          .update(payload)
          .eq('id', id);
        if (error) throw error;
        showToast('Tutorial updated successfully', 'success');
      } else {
        const { error } = await supabase
          .from('tutorials')
          .insert([payload]);
        if (error) throw error;
        showToast('Tutorial created successfully', 'success');
      }
      
      navigate('/admin/tutorials');
    } catch (err: any) {
      showToast(err.message, 'warning');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200 sticky top-4 z-10">
          <div className="flex items-center space-x-4">
            <button 
              type="button" 
              onClick={() => navigate('/admin/tutorials')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">
              {isEditing ? 'Edit Tutorial' : 'Create New Tutorial'}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              type="button" 
              onClick={() => setShowPreview(true)}
              className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Tutorial'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Basic Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Title</label>
                  <input 
                    {...form.register('title')}
                    onChange={(e) => {
                      form.register('title').onChange(e);
                      if (!isEditing && !form.getValues('slug')) {
                        form.setValue('slug', generateSlug(e.target.value));
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600" 
                    placeholder="e.g. Line Follower Robot Guide"
                  />
                  {form.formState.errors.title && <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Slug</label>
                  <input 
                    {...form.register('slug')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Rich Content</label>
                  <textarea 
                    {...form.register('content')}
                    className="w-full h-64 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600" 
                    placeholder="Write your tutorial content here (supports markdown/HTML style)..."
                  />
                  {form.formState.errors.content && <p className="text-red-500 text-sm">{form.formState.errors.content.message}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Media & PDFs</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                
                {/* Video */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2"><Video className="w-4 h-4 text-red-500" /> <span>YouTube Video URL</span></label>
                  <input 
                    {...form.register('video_url')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600" 
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <hr className="border-slate-100" />

                {/* Images */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2"><ImageIcon className="w-4 h-4 text-blue-500" /> <span>Gallery Images</span></label>
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <input {...form.register(`images.${index}.url` as const)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" placeholder="Image URL" readOnly />
                      <div className="relative">
                        <button type="button" className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm hover:bg-slate-200" disabled={isUploading}>
                          <Upload className="w-4 h-4" />
                        </button>
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'image', index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      </div>
                      <button type="button" onClick={() => removeImage(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => appendImage({ url: '' })} className="text-sm text-blue-600 font-medium flex items-center"><Plus className="w-4 h-4 mr-1" /> Add Image</button>
                </div>

                <hr className="border-slate-100" />

                {/* PDFs */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2"><FileText className="w-4 h-4 text-emerald-500" /> <span>PDF Manuals / Resources</span></label>
                  {pdfFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                      <input {...form.register(`pdfs.${index}.name` as const)} className="w-1/3 px-3 py-2 border border-slate-300 rounded-lg" placeholder="File Name (e.g. Schematic)" />
                      <input {...form.register(`pdfs.${index}.url` as const)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg" placeholder="PDF URL" readOnly />
                      <div className="relative">
                        <button type="button" className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm hover:bg-slate-200" disabled={isUploading}>
                          <Upload className="w-4 h-4" />
                        </button>
                        <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, 'pdf', index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      </div>
                      <button type="button" onClick={() => removePdf(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => appendPdf({ name: '', url: '' })} className="text-sm text-blue-600 font-medium flex items-center"><Plus className="w-4 h-4 mr-1" /> Add PDF</button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Publishing</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Status</label>
                  <select {...form.register('status')} className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select {...form.register('category')} className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <option value="Robotics">Robotics</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="IoT & Smart Home">IoT & Smart Home</option>
                    <option value="Embedded Systems">Embedded Systems</option>
                    <option value="STEM Starter">STEM Starter</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Difficulty</label>
                  <select {...form.register('difficulty')} className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <input type="checkbox" {...form.register('is_featured')} id="is_featured" className="rounded text-blue-600" />
                  <label htmlFor="is_featured" className="text-sm font-medium text-slate-700">Feature this tutorial</label>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </form>

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>Live Preview</span>
            </h2>
            <button 
              onClick={() => setShowPreview(false)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-50 relative">
            <TutorialDetailPage 
              previewTutorial={{
                ...form.getValues(),
                id: id || 'preview',
                published_date: new Date().toISOString()
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
