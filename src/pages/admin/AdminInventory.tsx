import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Package, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';

export const AdminInventory: React.FC = () => {
  const { data: rawProducts = [] } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  
  const products = React.useMemo(() => rawProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.sale_price || p.price,
    stockCount: p.stock || 0
  })), [rawProducts]);
  const totalStock = products.reduce((acc, curr) => acc + curr.stockCount, 0);
  const lowStock = products.filter(p => p.stockCount > 0 && p.stockCount <= 10).length;
  const outOfStock = products.filter(p => p.stockCount === 0).length;
  const inventoryValue = products.reduce((acc, curr) => acc + (curr.price * curr.stockCount), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inventory Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-medium text-slate-500">Total Stock Items</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalStock.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-medium text-slate-500">Low Stock Alert</h3>
            </div>
            <p className="text-3xl font-bold text-amber-500">{lowStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-medium text-slate-500">Out Of Stock</h3>
            </div>
            <p className="text-3xl font-bold text-red-500">{outOfStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-medium text-slate-500">Inventory Value</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-600">₹{inventoryValue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Stock Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Reserved</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-slate-500">{product.id.substring(0, 8)}</TableCell>
                  <TableCell>Delhi-WH-01</TableCell>
                  <TableCell>{product.stockCount}</TableCell>
                  <TableCell>{Math.floor(product.stockCount * 0.1)}</TableCell>
                  <TableCell>
                    <Badge variant={product.stockCount > 10 ? 'success' : product.stockCount > 0 ? 'secondary' : 'destructive'}>
                      {product.stockCount > 10 ? 'In Stock' : product.stockCount > 0 ? 'Low Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
