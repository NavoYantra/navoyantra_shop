import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, getReviews, updateReviewStatus } from '../../lib/api';
import { Package, ShoppingCart, Users, Check, X, Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminDashboardHome: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: rawProducts = [] } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const { data: reviews = [] } = useQuery({ queryKey: ['reviews'], queryFn: getReviews });
  
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'approved' | 'declined' }) => updateReviewStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  // Transform data to get stockCount and category easily
  const products = rawProducts.map((p: any) => ({
    stockCount: p.stock || 0,
    category: p.categories?.name || 'Uncategorized'
  }));

  const pendingReviews = reviews.filter((r: any) => r.status === 'pending');

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-medium text-slate-500">Total Products</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-2">
            <ShoppingCart className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-medium text-slate-500">Low Stock</h3>
          </div>
          <p className="text-3xl font-bold text-amber-500">{products.filter(p => p.stockCount < 10).length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-medium text-slate-500">Active Categories</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{new Set(products.map(p => p.category)).size}</p>
        </div>
      </div>

      {/* Pending Reviews Widget */}
      <div className="mt-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <CardTitle>Pending Reviews ({pendingReviews.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pendingReviews.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No pending reviews. Great job!
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                {pendingReviews.map((review: any) => (
                  <div key={review.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between group">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-slate-900">{review.author_name}</span>
                        <span className="text-slate-400 text-sm">on</span>
                        <span className="text-blue-600 text-sm font-medium">{review.products?.name || 'Unknown Product'}</span>
                      </div>
                      <div className="flex items-center text-amber-500 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 text-sm italic">"{review.comment}"</p>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => updateStatusMutation.mutate({ id: review.id, status: 'approved' })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <Check className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() => updateStatusMutation.mutate({ id: review.id, status: 'declined' })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <X className="w-4 h-4 mr-1" /> Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
