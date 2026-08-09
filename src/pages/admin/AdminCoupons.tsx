import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Plus, Tag, Trash2, Edit2, Percent, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCoupons, createCoupon, deleteCoupon } from '../../lib/api';

type DiscountType = 'percentage' | 'fixed' | 'other';

export const AdminCoupons: React.FC = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Fetch Coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: getCoupons
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsFormOpen(false);
      setCode('');
      setType('percentage');
      setValue(0);
      setDescription('');
      setExpiryDate('');
      setUsageLimitPerUser('');
    },
    onError: (error: any) => {
      alert(`Failed to create coupon: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    }
  });

  // Form State
  const [code, setCode] = useState('');
  const [type, setType] = useState<DiscountType>('percentage');
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [usageLimitPerUser, setUsageLimitPerUser] = useState<number | ''>('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    const payload: any = {
      code: code.toUpperCase(),
      type,
      value,
    };
    
    if (expiryDate) payload.expiry_date = expiryDate;
    if (usageLimitPerUser !== '') payload.usage_limit_per_user = usageLimitPerUser;

    createMutation.mutate(payload);
  };

  const handleDeleteCoupon = (id: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Coupons & Offers</h1>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          <Plus className="h-4 w-4 mr-2" /> Add New Coupon
        </Button>
      </div>

      {isFormOpen && (
        <Card className="border-blue-100 bg-blue-50/50">
          <CardHeader>
            <CardTitle>Create New Coupon / Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Coupon Code (e.g. SUMMER20)</label>
                  <Input 
                    required
                    value={code} 
                    onChange={e => setCode(e.target.value.toUpperCase())} 
                    placeholder="SUMMER20" 
                    className="uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Type</label>
                  <select 
                    value={type} 
                    onChange={e => setType(e.target.value as DiscountType)}
                    className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="percentage">Percentage Off (%)</option>
                    <option value="fixed">Direct Money Off (Fixed Amount)</option>
                    <option value="other">Other Offer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Value / Amount</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {type === 'percentage' && <Percent size={16} />}
                      {type === 'fixed' && <span className="font-bold pl-2">₹</span>}
                      {type === 'other' && <Tag size={16} />}
                    </div>
                    <Input 
                      type="number" 
                      min="0"
                      value={value} 
                      onChange={e => setValue(Number(e.target.value))} 
                      className="pl-9"
                      disabled={type === 'other'}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date (Optional)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <Input 
                      type="date" 
                      value={expiryDate} 
                      onChange={e => setExpiryDate(e.target.value)} 
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Usage Limit Per User</label>
                  <Input 
                    type="number"
                    min="1"
                    value={usageLimitPerUser} 
                    onChange={e => setUsageLimitPerUser(e.target.value === '' ? '' : Number(e.target.value))} 
                    placeholder="Leave blank for unlimited" 
                  />
                  <p className="text-xs text-slate-500">How many times a single customer can use this coupon.</p>
                </div>
                {type === 'other' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Offer Description (e.g. Free Shipping)</label>
                    <Input 
                      required
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      placeholder="Enter offer details..." 
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Coupon'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value / Detail</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    Loading coupons...
                  </TableCell>
                </TableRow>
              ) : coupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No coupons found.
                  </TableCell>
                </TableRow>
              ) : (
                coupons.map((coupon: any) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-bold bg-slate-100 text-slate-800 border border-slate-200 uppercase tracking-widest">
                        {coupon.code}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-slate-600">{coupon.type}</span>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">
                        {coupon.type === 'percentage' && `${coupon.value}% OFF`}
                        {coupon.type === 'fixed' && `₹${coupon.value} OFF`}
                        {coupon.type === 'other' && <span className="text-blue-600 font-semibold">{coupon.description}</span>}
                      </div>
                      {coupon.usage_limit_per_user && (
                        <div className="text-xs text-slate-500 mt-1">Limit: {coupon.usage_limit_per_user}/user</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {coupon.expiry_date ? new Date(coupon.expiry_date).toLocaleDateString() : (
                        <span className="text-slate-400 italic">No Expiry</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        coupon.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                      )}>
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500">{coupon.usage_count}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" onClick={() => handleDeleteCoupon(coupon.id)}>
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
  );
};
