import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Check, X, Star } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReviews, updateReviewStatus } from '../../lib/api';

export const AdminReviews: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: rawReviews = [], isLoading } = useQuery({ queryKey: ['reviews'], queryFn: getReviews });
  const [selectedProduct, setSelectedProduct] = React.useState<string>('All');
  
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'approved' | 'declined' }) => updateReviewStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  const reviews = rawReviews.map((r: any) => ({
    id: r.id,
    author: r.user_name || r.author_name || 'Anonymous',
    product: r.products?.name || 'Unknown Product',
    rating: r.rating,
    comment: r.comment,
    date: r.created_at,
    status: r.status
  }));

  const filteredReviews = selectedProduct === 'All' 
    ? reviews 
    : reviews.filter((r: any) => r.product === selectedProduct);

  const productNames = Array.from(new Set(reviews.map((r: any) => String(r.product)))) as string[];

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
            {productNames.map((name: string) => (
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Loading reviews...
                  </TableCell>
                </TableRow>
              ) : filteredReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No reviews found for this product.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReviews.map((review: any) => (
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
                    <Badge variant={review.status === 'approved' ? 'default' : review.status === 'declined' ? 'destructive' : 'secondary'} className="capitalize">
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {review.status === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          onClick={() => updateStatusMutation.mutate({ id: review.id, status: 'approved' })}
                          disabled={updateStatusMutation.isPending}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => updateStatusMutation.mutate({ id: review.id, status: 'declined' })}
                          disabled={updateStatusMutation.isPending}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
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
