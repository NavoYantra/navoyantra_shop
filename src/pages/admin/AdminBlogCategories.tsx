import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogCategories, createBlogCategory, deleteBlogCategory } from '../../lib/api';
import { Plus, Trash2, FolderTree, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminBlogCategories: React.FC = () => {
  const { showToast } = useApp();
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['blog_categories'],
    queryFn: getBlogCategories
  });

  const createMutation = useMutation({
    mutationFn: createBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog_categories'] });
      setNewCategory({ name: '', slug: '' });
      showToast('Category created successfully', 'success');
    },
    onError: (error: any) => {
      showToast(error.message || 'Failed to create category', 'warning');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog_categories'] });
      showToast('Category deleted successfully', 'success');
    },
    onError: (error: any) => {
      showToast(error.message || 'Failed to delete category', 'warning');
    }
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.slug) return;
    createMutation.mutate(newCategory);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setNewCategory({ name, slug });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blog Categories</h1>
            <p className="text-sm text-slate-500">Manage predefined categories for blog posts</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Add New Category</h2>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={newCategory.name}
                onChange={handleNameChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="e.g. Robotics"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Slug</label>
              <input
                type="text"
                required
                value={newCategory.slug}
                onChange={e => setNewCategory({ ...newCategory, slug: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-slate-50"
              />
            </div>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {createMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              <span>Add Category</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">All Categories</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Slug</th>
                    <th className="p-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-500">Loading categories...</td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-500">No categories found.</td>
                    </tr>
                  ) : (
                    categories.map((cat: any) => (
                      <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-bold text-slate-900">{cat.name}</td>
                        <td className="p-4 text-slate-500 text-sm font-mono">{cat.slug}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this category?')) {
                                deleteMutation.mutate(cat.id);
                              }
                            }}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
