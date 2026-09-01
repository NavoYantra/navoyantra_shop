import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Plus, Tag as TagIcon, Trash2, Edit2, Search } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTags, createTag, deleteTag, updateTag } from '../../lib/api';

export const AdminTags: React.FC = () => {
  const { showToast } = useApp();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  // Fetch Tags
  const { data: tags = [], isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      resetForm();
      showToast('Tag added successfully!');
    },
    onError: (error: any) => {
      console.error(error);
      showToast('Error adding tag: ' + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string, tag: any }) => updateTag(data.id, data.tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      resetForm();
      showToast('Tag updated successfully!');
    },
    onError: (error: any) => {
      console.error(error);
      showToast('Error updating tag: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    }
  });

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;
    
    const tagData = {
      name,
      slug,
      description
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, tag: tagData });
    } else {
      createMutation.mutate(tagData);
    }
  };

  const handleEditTag = (tag: any) => {
    setEditingId(tag.id);
    setName(tag.name);
    setSlug(tag.slug);
    setDescription(tag.description || '');
  };

  const handleDeleteTag = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredTags = tags.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tags</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New Tag Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Tag' : 'Add New Tag'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    required
                    value={name} 
                    onChange={handleNameChange} 
                    placeholder="e.g. Summer Collection" 
                  />
                  <p className="text-xs text-slate-500">The name is how it appears on your site.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input 
                    required
                    value={slug} 
                    onChange={e => setSlug(e.target.value)} 
                    placeholder="summer-collection" 
                  />
                  <p className="text-xs text-slate-500">The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    className="flex min-h-[100px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    placeholder="Brief description of this tag..." 
                  />
                  <p className="text-xs text-slate-500">The description is not prominent by default; however, some themes may show it.</p>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingId ? 'Update Tag' : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Tag
                      </>
                    )}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Tags List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                placeholder="Search tags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <span className="text-sm text-slate-500">{filteredTags.length} items</span>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                        Loading tags...
                      </TableCell>
                    </TableRow>
                  ) : filteredTags.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                        No tags found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTags.map((tag) => (
                      <TableRow key={tag.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <TagIcon className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-slate-900">{tag.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-500 max-w-xs truncate">
                          {tag.description || '—'}
                        </TableCell>
                        <TableCell className="text-slate-500">{tag.slug}</TableCell>
                        <TableCell className="text-right font-medium text-blue-600 hover:underline cursor-pointer">
                          {tag.count}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600" onClick={() => handleEditTag(tag)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" onClick={() => handleDeleteTag(tag.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
