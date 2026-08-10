import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Star, Check, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTutorialReviews, updateTutorialReviewStatus } from '../../lib/api';

export const AdminTutorialReviews: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: rawReviews = [], isLoading } = useQuery({ queryKey: ['tutorial_reviews'], queryFn: getTutorialReviews });
  const [selectedTutorial, setSelectedTutorial] = React.useState<string>('All');
  
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'approved' | 'declined' }) => updateTutorialReviewStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutorial_reviews'] });
    }
  });

  const reviews = rawReviews.map((r: any) => ({
    id: r.id,
    author: r.author_name,
    tutorial: r.tutorials?.title || 'Unknown Tutorial',
    rating: r.rating,
    comment: r.comment,
    date: r.created_at,
    status: r.status
  }));

  const filteredReviews = selectedTutorial === 'All' 
    ? reviews 
    : reviews.filter((r: any) => r.tutorial === selectedTutorial);

  const tutorialNames = Array.from(new Set(reviews.map((r: any) => String(r.tutorial)))) as string[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tutorial Reviews</h1>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-slate-700">Filter by Tutorial:</label>
          <select 
            className="flex h-10 w-64 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600"
            value={selectedTutorial}
            onChange={(e) => setSelectedTutorial(e.target.value)}
          >
            <option value="All">All Tutorials</option>
            {tutorialNames.map((name: string) => (
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
                <TableHead>Tutorial</TableHead>
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
                    No reviews found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReviews.map((review: any) => (
                  <TableRow key={review.id}>
                  <TableCell className="font-medium text-slate-900">{review.author}</TableCell>
                  <TableCell className="text-blue-600 hover:underline cursor-pointer">{review.tutorial}</TableCell>
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
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => updateStatusMutation.mutate({ id: review.id, status: 'approved' })}
                          disabled={updateStatusMutation.isPending}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => updateStatusMutation.mutate({ id: review.id, status: 'declined' })}
                          disabled={updateStatusMutation.isPending}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Decline"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
