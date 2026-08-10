import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Search, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminBlogs: React.FC = () => {
  const { showToast } = useApp();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [authorName, setAuthorName] = useState('Admin');
  const [authorRole, setAuthorRole] = useState('Editor');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState('published');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      showToast(`Error: ${err.message}`, 'warning');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCategory('');
    setAuthorName('Admin');
    setAuthorRole('Editor');
    setAuthorAvatar('');
    setReadTime('5 min read');
    setCoverImage('');
    setTags('');
    setIsFeatured(false);
    setStatus('published');
    setEditingBlog(null);
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setCategory(blog.category || '');
    setAuthorName(blog.author_name || 'Admin');
    setAuthorRole(blog.author_role || 'Editor');
    setAuthorAvatar(blog.author_avatar || '');
    setReadTime(blog.read_time || '5 min read');
    setCoverImage(blog.cover_image || '');
    setTags((blog.tags || []).join(', '));
    setIsFeatured(blog.is_featured || false);
    setStatus(blog.status || 'published');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      showToast('Blog deleted successfully', 'success');
      fetchBlogs();
    } catch (err: any) {
      console.error('Error deleting blog:', err);
      showToast(`Error: ${err.message}`, 'warning');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
    
    const blogData = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      excerpt,
      content,
      category,
      author_name: authorName,
      author_role: authorRole,
      author_avatar: authorAvatar,
      read_time: readTime,
      cover_image: coverImage,
      tags: tagsArray,
      is_featured: isFeatured,
      status
    };

    try {
      if (editingBlog) {
        const { error } = await supabase.from('blogs').update(blogData).eq('id', editingBlog.id);
        if (error) throw error;
        showToast('Blog updated successfully', 'success');
      } else {
        const { error } = await supabase.from('blogs').insert([blogData]);
        if (error) throw error;
        showToast('Blog created successfully', 'success');
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchBlogs();
    } catch (err: any) {
      console.error('Error saving blog:', err);
      showToast(`Error: ${err.message}`, 'warning');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">Blog Management</h2>
          <p className="text-sm text-slate-500 mt-1">Create and manage your knowledge hub articles.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Post</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">Loading blogs...</td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p>No blog posts found. Create your first one!</p>
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">{blog.title}</div>
                      <div className="text-xs text-slate-500 truncate max-w-xs">{blog.excerpt}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{blog.category || 'Uncategorized'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(blog)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-7xl shadow-2xl my-8 mt-24 flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Form Side */}
            <div className="flex-1 flex flex-col border-r border-slate-100 overflow-y-auto relative">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Title *</label>
                  <input 
                    required 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    placeholder="E.g., How AI is Transforming Robotics"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Slug (URL friendly)</label>
                  <input 
                    value={slug} 
                    onChange={e => setSlug(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-500" 
                    placeholder="Leave empty to auto-generate from title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Excerpt *</label>
                  <textarea 
                    required 
                    value={excerpt} 
                    onChange={e => setExcerpt(e.target.value)} 
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none" 
                    placeholder="Short summary of the blog post"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Content (HTML allowed) *</label>
                  <textarea 
                    required 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                    rows={10}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-mono text-sm" 
                    placeholder="<p>Main content goes here...</p>"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                  <input 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    placeholder="E.g., AI & Innovation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Read Time</label>
                  <input 
                    value={readTime} 
                    onChange={e => setReadTime(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    placeholder="E.g., 5 min read"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Cover Image URL</label>
                  <input 
                    value={coverImage} 
                    onChange={e => setCoverImage(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                  <input 
                    value={tags} 
                    onChange={e => setTags(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                    placeholder="Robotics, AI, Education"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Author Name</label>
                  <input 
                    value={authorName} 
                    onChange={e => setAuthorName(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Author Role</label>
                  <input 
                    value={authorRole} 
                    onChange={e => setAuthorRole(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                  <select 
                    value={status} 
                    onChange={e => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 pt-6">
                  <input 
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={e => setIsFeatured(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-semibold text-slate-700 select-none cursor-pointer">
                    Feature this post on top of the blog page
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                >
                  {editingBlog ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
            </div>
            
            {/* Preview Side */}
            <div className="flex-1 bg-slate-50 flex-col overflow-y-auto hidden md:flex relative">
               <div className="p-6 border-b border-slate-100 sticky top-0 bg-slate-50 z-10 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-slate-900">
                   Live Preview
                 </h3>
                 <button 
                   type="button"
                   onClick={() => setIsModalOpen(false)}
                   className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>
               
               <div className="p-8">
                 <article className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60">
                   {coverImage && (
                     <img src={coverImage} alt="Cover" className="w-full h-64 object-cover rounded-xl mb-8" />
                   )}
                   <div className="mb-8">
                     <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">{category || 'Category'}</span>
                     <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-4 leading-tight">
                       {title || 'Blog Title'}
                     </h1>
                     <p className="text-xl text-slate-500 italic mb-6">{excerpt || 'Blog excerpt goes here...'}</p>
                     
                     <div className="flex items-center space-x-4">
                        {authorAvatar ? (
                           <img src={authorAvatar} alt={authorName} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                             {authorName ? authorName[0].toUpperCase() : 'A'}
                           </div>
                        )}
                        <div>
                           <p className="font-bold text-slate-900">{authorName || 'Author Name'}</p>
                           <p className="text-sm text-slate-500">{authorRole || 'Author Role'} • {readTime || '5 min read'}</p>
                        </div>
                     </div>
                   </div>
                   
                   <div dangerouslySetInnerHTML={{ __html: content || '<p>Content will appear here...</p>' }} />
                 </article>
               </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};
