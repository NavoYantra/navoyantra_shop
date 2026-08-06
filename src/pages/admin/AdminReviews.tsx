import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Check, X, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../lib/api';

export const AdminReviews: React.FC = () => {
  const { data: rawProducts = [] } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const [selectedProduct, setSelectedProduct] = React.useState<string>('All');
  
  // Create static mock reviews based on products so they don't regenerate on every render
  const reviews = React.useMemo(() => {
    return rawProducts.slice(0, 10).map((p: any) => ({
      id: `rev_${Math.random().toString(36).substr(2, 9)}`,
      author: 'John Doe',
      product: p.name,
      rating: 5,
      comment: 'Excellent product! The quality is top notch and it was exactly as described.',
      date: '2023-10-15',
      status: 'Pending'
    }));
  }, [rawProducts]);

  const filteredReviews = selectedProduct === 'All' 
    ? reviews 
    : reviews.filter(r => r.product === selectedProduct);

  const productNames = Array.from(new Set(reviews.map(r => r.product)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reviews</h1>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-slate-700">Filter by Product:</label>
          <select 
            className="flex h-10 w-64 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="All">All Products</option>
            {productNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-1/3">Comment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No reviews found for this product.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReviews.map(review => (
                  <TableRow key={review.id}>
                  <TableCell className="font-medium text-slate-900">{review.author}</TableCell>
                  <TableCell className="text-blue-600 hover:underline cursor-pointer">{review.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 italic">"{review.comment}"</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <X className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
