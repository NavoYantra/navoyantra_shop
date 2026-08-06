import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Plus, Pencil, Trash2, Search, Link as LinkIcon } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBrands, createBrand, deleteBrand } from '../../lib/api';

export const AdminBrands: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  // Fetch Brands
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setName('');
      setSlug('');
      setWebsite('');
      setDescription('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    }
  });

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;
    
    createMutation.mutate({
      name,
      slug,
      website,
      description
    });
  };

  const handleDeleteBrand = (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Brands</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New Brand Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Brand</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBrand} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    required
                    value={name} 
                    onChange={handleNameChange} 
                    placeholder="e.g. NavoYantra" 
                  />
                  <p className="text-xs text-slate-500">The brand name as it appears on the site.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input 
                    required
                    value={slug} 
                    onChange={e => setSlug(e.target.value)} 
                    placeholder="navoyantra" 
                  />
                  <p className="text-xs text-slate-500">The "slug" is the URL-friendly version of the name.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Website URL</label>
                  <Input 
                    type="url"
                    value={website} 
                    onChange={e => setWebsite(e.target.value)} 
                    placeholder="https://example.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    className="flex min-h-[100px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    placeholder="Brief description of this brand..." 
                  />
                </div>

                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  <Plus className="h-4 w-4 mr-2" /> 
                  {createMutation.isPending ? 'Adding...' : 'Add New Brand'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Brands List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                placeholder="Search brands..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <span className="text-sm text-slate-500">{filteredBrands.length} items</span>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Logo</TableHead>
                    <TableHead>Brand Name</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                        Loading brands...
                      </TableCell>
                    </TableRow>
                  ) : filteredBrands.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                        No brands found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBrands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                            {brand.name.charAt(0)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-900">{brand.name}</div>
                          <div className="text-sm text-slate-500">{brand.slug}</div>
                        </TableCell>
                        <TableCell>
                          {brand.website ? (
                            <a href={brand.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center text-sm">
                              <LinkIcon className="w-3 h-3 mr-1" />
                              {brand.website.replace('https://', '')}
                            </a>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{brand.count}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" onClick={() => handleDeleteBrand(brand.id)}>
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
