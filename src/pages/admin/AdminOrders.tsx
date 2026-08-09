import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getOrders, updateOrderStatus, getOrderById, updateOrderTracking } from '../../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Eye, Printer, Truck, CheckCircle2, Clock, XCircle, Search, Edit2, Save, X, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';

export const AdminOrders: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');
  const { data: orders = [], isLoading } = useQuery({ queryKey: ['orders'], queryFn: getOrders });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isEditingTracking, setIsEditingTracking] = useState(false);
  const [editTrackingId, setEditTrackingId] = useState('');

  const downloadSVG = (containerId: string, filename: string) => {
    const container = document.getElementById(containerId);
    const svg = container?.tagName === 'svg' ? container : container?.querySelector('svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fetch full order details when an order is selected
  const { data: fetchedOrderDetails } = useQuery({
    queryKey: ['order', selectedOrder?.id],
    queryFn: () => getOrderById(selectedOrder.id),
    enabled: !!selectedOrder
  });
  
  const orderDetails = fetchedOrderDetails;

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (selectedOrder) {
        queryClient.invalidateQueries({ queryKey: ['order', selectedOrder.id] });
      }
    }
  });

  const updateTrackingMutation = useMutation({
    mutationFn: ({ id, tracking_id }: { id: string, tracking_id: string }) => updateOrderTracking(id, tracking_id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setSelectedOrder(data);
      setIsEditingTracking(false);
    }
  });

  const filteredOrders = orders.filter((o: any) => {
    const matchesSearch = o.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? o.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

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

  const handlePrintSummary = () => {
    const printContent = document.getElementById('summary-content');
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Order Summary - ${orderDetails?.tracking_id}</title>
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #000; font-size: 14px; }
              .summary-box { max-width: 800px; margin: auto; padding: 20px; }
              .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
              .order-details { margin-bottom: 30px; display: flex; justify-content: space-between; font-size: 16px; }
              .customer-info { margin-bottom: 30px; padding: 15px; border: 1px solid #ccc; background: #f9f9f9; }
              .customer-info h3 { margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; font-size: 16px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
              table, th, td { border: 1px solid #000; }
              th, td { padding: 10px; text-align: left; }
              th { background: #f0f0f0; font-weight: bold; }
              .text-center { text-align: center; }
              @media print { .summary-box { padding: 0; } body { padding: 0; } }
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Orders {statusFilter ? `- ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}` : 'Management'}
        </h1>
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
                    {isEditingTracking ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="text"
                          value={editTrackingId}
                          onChange={(e) => setEditTrackingId(e.target.value)}
                          className="border border-slate-300 rounded px-2 py-1 text-sm font-mono focus:outline-none focus:border-blue-500"
                        />
                        <Button size="sm" variant="ghost" onClick={() => {
                          updateTrackingMutation.mutate({ id: selectedOrder.id, tracking_id: editTrackingId });
                        }} disabled={updateTrackingMutation.isPending}>
                          <Save className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsEditingTracking(false)}>
                          <X className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-slate-500 font-mono">{selectedOrder.tracking_id}</p>
                        <button onClick={() => {
                          setEditTrackingId(selectedOrder.tracking_id);
                          setIsEditingTracking(true);
                        }} className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={handlePrintSummary}>
                    <Printer className="w-4 h-4 mr-2" /> Print Summary
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
                          if (status === 'shipped') {
                            const trackingId = window.prompt("Please enter the transport tracking ID for shipping:");
                            if (!trackingId) {
                              alert("Tracking ID is required to mark as shipped.");
                              return;
                            }
                            if (window.confirm(`Are you sure you want to update the status to '${status}'?`)) {
                              setSelectedOrder({...selectedOrder, status, tracking_id: trackingId});
                              updateTrackingMutation.mutate({ id: selectedOrder.id, tracking_id: trackingId });
                              updateStatusMutation.mutate({ id: selectedOrder.id, status });
                            }
                          } else {
                            if (window.confirm(`Are you sure you want to update the status to '${status}'?`)) {
                              setSelectedOrder({...selectedOrder, status});
                              updateStatusMutation.mutate({ id: selectedOrder.id, status });
                            }
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
                <div id="summary-content" style={{ display: 'none' }}>
                  <div className="summary-box">
                    <div className="header">
                      <h1>Order Summary / Packing Slip</h1>
                    </div>

                    <div className="order-details">
                      <div><strong>Order No:</strong> {selectedOrder.tracking_id}</div>
                      <div><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}</div>
                    </div>

                    <div className="customer-info">
                      <h3>Customer Details</h3>
                      <strong>Name:</strong> {selectedOrder.customer_name}<br/>
                      <strong>Address:</strong> {selectedOrder.shipping_address}<br/>
                      <strong>Phone:</strong> {selectedOrder.customer_phone || 'N/A'}<br/>
                      <strong>Email:</strong> {selectedOrder.customer_email}
                    </div>

                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: '50px', textAlign: 'center' }}>S.No</th>
                          <th>Product Name</th>
                          <th style={{ width: '100px', textAlign: 'center' }}>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails?.order_items ? orderDetails.order_items.map((item: any, index: number) => (
                          <tr key={item.id || index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{item.products?.name || 'Unknown Product'}</td>
                            <td className="text-center"><strong>{item.quantity}</strong></td>
                          </tr>
                        )) : null}
                      </tbody>
                    </table>
                    
                    <div style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
                      Generated by NavoYantra Shop Admin System
                    </div>
                  </div>
                </div>

                {/* Visible tracking info in sidebar */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Tracking Labels</h4>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="flex flex-col items-center space-y-2 w-full">
                      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                         <QRCodeSVG id="qr-svg" value={`https://navoyantra.shop/track/${selectedOrder.tracking_id}`} size={120} />
                      </div>
                      <Button variant="outline" size="sm" onClick={() => downloadSVG('qr-svg', `QR_${selectedOrder.tracking_id}.svg`)}>
                        <Download className="w-4 h-4 mr-2" /> Download QR
                      </Button>
                    </div>
                    <div className="flex flex-col items-center space-y-2 w-full">
                      <div id="barcode-container" className="text-center w-full overflow-hidden flex justify-center bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                         <Barcode value={selectedOrder.tracking_id} width={1.5} height={50} fontSize={14} />
                      </div>
                      <Button variant="outline" size="sm" onClick={() => downloadSVG('barcode-container', `Barcode_${selectedOrder.tracking_id}.svg`)}>
                        <Download className="w-4 h-4 mr-2" /> Download Barcode
                      </Button>
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
