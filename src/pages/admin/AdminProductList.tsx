import React, { useState } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState
} from '@tanstack/react-table';
import { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct as apiDeleteProduct } from '../../lib/api';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminProductList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: rawProducts = [] } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  
  const deleteMutation = useMutation({
    mutationFn: apiDeleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  // Map supabase products to frontend product model
  const products: Product[] = React.useMemo(() => {
    return rawProducts.map((p: any) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      tagline: p.short_description || '',
      description: p.description || '',
      price: p.sale_price || p.price,
      originalPrice: p.price,
      rating: 5,
      reviewCount: 0,
      badges: [],
      category: p.categories?.name || 'Uncategorized',
      ageGroup: '8-10',
      ageText: 'Yrs',
      skillLevel: 'Beginner',
      techStack: p.tags?.map((t: any) => t.name) || [],
      images: p.images || [],
      specs: {},
      whatsInside: [],
      sampleProjects: [],
      inStock: p.stock > 0,
      stockCount: p.stock || 0,
      discountPercent: 0
    }));
  }, [rawProducts]);

  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Product',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-slate-100 overflow-hidden border border-slate-200">
            <img src={row.original.images[0]} alt={row.original.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-medium text-slate-900">{row.original.name}</div>
            <div className="text-xs text-slate-500">SKU: {row.original.sku || row.original.id.substring(0, 8)}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <div>₹{row.original.price.toLocaleString()}</div>,
    },
    {
      accessorKey: 'stockCount',
      header: 'Stock',
      cell: ({ row }) => {
        const count = row.original.stockCount;
        return (
          <Badge variant={count > 10 ? 'success' : count > 0 ? 'secondary' : 'destructive'}>
            {count} in stock
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/products/${row.original.id}/edit`)}>
              <Pencil className="w-4 h-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => {
              if(window.confirm('Are you sure you want to delete this product?')) {
                deleteMutation.mutate(row.original.id);
              }
            }}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Products</h2>
        <Button onClick={() => navigate('/admin/products/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Filter products..."
                value={globalFilter ?? ''}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing {table.getRowModel().rows.length} of {products.length} products
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
