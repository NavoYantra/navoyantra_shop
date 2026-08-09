import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, updateOrderStatus, getOrderById } from '../../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Eye, Printer, Truck, CheckCircle2, Clock, XCircle, Search } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';

export const AdminOrders: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: orders = [], isLoading } = useQuery({ queryKey: ['orders'], queryFn: getOrders });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const mockOrder = {
    id: 'mock-1',
    tracking_id: 'NY-TRACK-12345678',
    customer_name: 'Rohit Rathore (Mock)',
    customer_email: 'rohit@example.com',
    customer_phone: '+91 9876543210',
    shipping_address: '123 Fake Street, Tech Park, New Delhi, India 110001',
    created_at: new Date().toISOString(),
    status: 'processing',
    total_amount: 1499.00
  };

  const mockOrderDetails = {
    ...mockOrder,
    order_items: [
      { id: 'item-1', quantity: 2, price_at_time: 499.50, products: { name: 'Smart Fitness Band' } },
      { id: 'item-2', quantity: 1, price_at_time: 500.00, products: { name: 'Wireless Earbuds' } }
    ]
  };

  // Fetch full order details when an order is selected
  const { data: fetchedOrderDetails } = useQuery({
    queryKey: ['order', selectedOrder?.id],
    queryFn: () => getOrderById(selectedOrder.id),
    enabled: !!selectedOrder && selectedOrder.id !== 'mock-1'
  });
  
  const orderDetails = selectedOrder?.id === 'mock-1' ? mockOrderDetails : fetchedOrderDetails;

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (selectedOrder) {
        queryClient.invalidateQueries({ queryKey: ['order', selectedOrder.id] });
      }
    }
  });

  const displayOrders = [mockOrder, ...orders];

  const filteredOrders = displayOrders.filter((o: any) => 
    o.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <Badge variant="secondary" className="bg-amber-100 text-amber-800"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'processing': return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" /> Processing</Badge>;
      case 'shipped': return <Badge variant="secondary" className="bg-purple-100 text-purple-800"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
      case 'delivered': return <Badge variant="secondary" className="bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Delivered</Badge>;
      case 'cancelled': return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const handlePrintInvoice = () => {
    const printContent = document.getElementById('invoice-content');
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Invoice - ${orderDetails?.tracking_id}</title>
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #333; }
              .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); }
              .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 2px solid #f5f5f5; padding-bottom: 20px;}
              .company-info { font-size: 14px; color: #666; }
              .invoice-details { text-align: right; }
              .tracking-codes { display: flex; gap: 20px; align-items: center; margin-top: 20px; padding: 20px; background: #f9fafb; border-radius: 8px;}
              table { width: 100%; line-height: inherit; text-align: left; border-collapse: collapse; margin-bottom: 30px; }
              table th { background: #f8fafc; padding: 12px; border-bottom: 2px solid #e2e8f0; }
              table td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
              .total-row td { border-top: 2px solid #333; font-weight: bold; font-size: 18px; }
              .footer { margin-top: 50px; text-align: center; color: #666; font-size: 14px; }
              @media print { .invoice-box { box-shadow: none; border: none; } }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      windowPrint.document.close();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orders Management</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search Order or Name..." 
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
                  ) : filteredOrders.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8">No orders found.</TableCell></TableRow>
                  ) : (
                    filteredOrders.map((order: any) => (
                      <TableRow key={order.id} className={selectedOrder?.id === order.id ? 'bg-slate-50' : ''}>
                        <TableCell className="font-mono text-sm font-medium">{order.tracking_id}</TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-900">{order.customer_name}</div>
                          <div className="text-xs text-slate-500">{order.customer_email}</div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right font-semibold">₹{order.total_amount}</TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-blue-600"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Order Details & Invoice */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <Card className="sticky top-24">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order Details</CardTitle>
                    <p className="text-sm text-slate-500 font-mono mt-1">{selectedOrder.tracking_id}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handlePrintInvoice}>
                    <Printer className="w-4 h-4 mr-2" /> Print Bill
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-6">
                
                {/* Status Update */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Update Status</h4>
                  <div className="flex gap-2 flex-wrap">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      <Button
                        key={status}
                        variant={selectedOrder.status === status ? 'default' : 'outline'}
                        size="sm"
                        className="capitalize"
                        onClick={() => {
                          setSelectedOrder({...selectedOrder, status});
                          if (selectedOrder.id !== 'mock-1') {
                            updateStatusMutation.mutate({ id: selectedOrder.id, status });
                          }
                        }}
                        disabled={updateStatusMutation.isPending && selectedOrder.id !== 'mock-1'}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Hidden Invoice Content for Printing */}
                <div id="invoice-content" style={{ display: 'none' }}>
                  <div className="invoice-box">
                    <div className="header">
                      <div>
                        <h1 style={{ margin: 0, color: '#2563eb' }}>NavoYantra Shop</h1>
                        <div className="company-info">
                          <p>123 Tech Park, New Delhi, India<br/>support@navoyantra.com<br/>+91 9876543210</p>
                        </div>
                      </div>
                      <div className="invoice-details">
                        <h2 style={{ margin: 0, color: '#333' }}>INVOICE</h2>
                        <p>Order ID: <strong>${selectedOrder.tracking_id}</strong><br/>
                        Date: ${new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Bill To:</h3>
                      <p>
                        <strong>${selectedOrder.customer_name}</strong><br/>
                        ${selectedOrder.shipping_address}<br/>
                        ${selectedOrder.customer_phone || ''}<br/>
                        ${selectedOrder.customer_email}
                      </p>
                    </div>

                    <table>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th style={{ textAlign: 'center' }}>Qty</th>
                          <th style={{ textAlign: 'right' }}>Price</th>
                          <th style={{ textAlign: 'right' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${orderDetails?.order_items ? orderDetails.order_items.map((item: any) => `
                          <tr>
                            <td>${item.products?.name || 'Unknown Product'}</td>
                            <td style="text-align: center;">${item.quantity}</td>
                            <td style="text-align: right;">₹${item.price_at_time}</td>
                            <td style="text-align: right;">₹${item.price_at_time * item.quantity}</td>
                          </tr>
                        `).join('') : ''}
                        <tr className="total-row">
                          <td colSpan="3" style={{ textAlign: 'right' }}>Grand Total:</td>
                          <td style={{ textAlign: 'right' }}>₹${selectedOrder.total_amount}</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="footer">
                      <p>Thank you for shopping with NavoYantra!</p>
                      <p>This is a computer generated invoice and requires no signature.</p>
                    </div>
                  </div>
                </div>

                {/* Visible tracking info in sidebar */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Tracking Labels</h4>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                       <QRCodeSVG value={`https://navoyantra.shop/track/${selectedOrder.tracking_id}`} size={120} />
                    </div>
                    <div className="text-center w-full overflow-hidden flex justify-center">
                       <Barcode value={selectedOrder.tracking_id} width={1.5} height={50} fontSize={14} />
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center py-12 text-slate-500 bg-slate-50/50 border-dashed border-2">
              <Truck className="w-12 h-12 text-slate-300 mb-4" />
              <p>Select an order to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
