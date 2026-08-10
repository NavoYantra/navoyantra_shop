import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Check, X, Star } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogReviews, updateBlogReviewStatus } from '../../lib/api';

export const AdminBlogReviews: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: rawReviews = [], isLoading } = useQuery({ queryKey: ['blog_reviews'], queryFn: getBlogReviews });
  const [selectedBlog, setSelectedBlog] = React.useState<string>('All');
  
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'approved' | 'declined' }) => updateBlogReviewStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog_reviews'] });
    }
  });

  const reviews = rawReviews.map((r: any) => ({
    id: r.id,
    author: r.author_name,
    blog: r.blogs?.title || 'Unknown Blog',
    rating: r.rating,
    comment: r.comment,
    date: r.created_at,
    status: r.status
  }));

  const filteredReviews = selectedBlog === 'All' 
    ? reviews 
    : reviews.filter((r: any) => r.blog === selectedBlog);

  const blogNames = Array.from(new Set(reviews.map((r: any) => String(r.blog)))) as string[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Blog Reviews</h1>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-slate-700">Filter by Blog:</label>
          <select 
            className="flex h-10 w-64 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600"
            value={selectedBlog}
            onChange={(e) => setSelectedBlog(e.target.value)}
          >
            <option value="All">All Blogs</option>
            {blogNames.map((name: string) => (
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
                <TableHead>Blog Post</TableHead>
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
                    No reviews found for this blog.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReviews.map((review: any) => (
                  <TableRow key={review.id}>
                  <TableCell className="font-medium text-slate-900">{review.author}</TableCell>
                  <TableCell className="text-blue-600 hover:underline cursor-pointer">{review.blog}</TableCell>
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
