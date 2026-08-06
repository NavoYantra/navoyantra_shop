import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UploadCloud, Folder, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../lib/api';
export const AdminMediaLibrary: React.FC = () => {
  const { data: rawProducts = [] } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  
  // Extract all unique images from products for our mock media library
  const allImages = React.useMemo(() => Array.from(new Set(rawProducts.flatMap((p: any) => p.images || []))).filter(img => img), [rawProducts]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Media Library</h1>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Files
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="w-64 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="font-medium text-sm text-slate-900 mb-2">Folders</div>
              <button className="flex items-center space-x-2 text-sm text-blue-600 font-medium w-full p-2 bg-blue-50 rounded-lg">
                <Folder className="w-4 h-4" /> <span>All Media</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 w-full p-2 hover:bg-slate-50 rounded-lg">
                <Folder className="w-4 h-4" /> <span>Products</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 w-full p-2 hover:bg-slate-50 rounded-lg">
                <Folder className="w-4 h-4" /> <span>Blog Posts</span>
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input placeholder="Search media..." className="pl-8" />
            </div>
            <div className="text-sm text-slate-500">
              {allImages.length} items
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allImages.map((img, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer hover:border-blue-500 transition-colors">
                <div className="aspect-square relative bg-slate-100 flex items-center justify-center">
                  <img src={img} alt={`Media ${i}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm">Select</Button>
                  </div>
                </div>
                <div className="p-2 border-t border-slate-100">
                  <div className="text-xs font-medium text-slate-900 truncate">image_{i + 1}.jpg</div>
                  <div className="text-[10px] text-slate-500">800x800 • 124 KB</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
