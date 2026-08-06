import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { UserPlus, Shield, Mail, Trash2 } from 'lucide-react';

const DUMMY_USERS = [
  { id: 1, name: 'Rohit Rathore', email: 'rohit@navoyantra.com', role: 'Super Admin' },
  { id: 2, name: 'Amit Kumar', email: 'amit@navoyantra.com', role: 'Product Manager' },
  { id: 3, name: 'Neha Sharma', email: 'neha@navoyantra.com', role: 'Blog Manager' },
];

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('general');
  const [users, setUsers] = React.useState(DUMMY_USERS);
  const [newUserName, setNewUserName] = React.useState('');
  const [newUserEmail, setNewUserEmail] = React.useState('');
  const [newUserRole, setNewUserRole] = React.useState('Product Manager');

  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      setUsers([...users, { id: Date.now(), name: newUserName, email: newUserEmail, role: newUserRole }]);
      setNewUserName('');
      setNewUserEmail('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
        <Button>Save Settings</Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 bg-slate-100 p-1 rounded-xl inline-flex overflow-x-auto w-full md:w-auto">
          <TabsTrigger value="general" activeValue={activeTab} onSelectTab={setActiveTab}>General</TabsTrigger>
          <TabsTrigger value="store" activeValue={activeTab} onSelectTab={setActiveTab}>Store</TabsTrigger>
          <TabsTrigger value="payments" activeValue={activeTab} onSelectTab={setActiveTab}>Payments</TabsTrigger>
          <TabsTrigger value="users" activeValue={activeTab} onSelectTab={setActiveTab}>Team / Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general" activeValue={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Title</label>
                <Input defaultValue="NavoYantra Shop" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tagline</label>
                <Input defaultValue="Premium STEM Kits for Kids & Professionals" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Email</label>
                <Input type="email" defaultValue="admin@navoyantra.com" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store" activeValue={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency</label>
                <select className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Address</label>
                <textarea className="flex min-h-[100px] w-full rounded-lg border border-slate-300 p-3 text-sm" defaultValue="1/10726-A KH No. 1622/62, Gali No. 2, Subhash Park, Naveen Shahdara, Delhi - 110032" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" activeValue={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-900">Razorpay</h4>
                  <p className="text-sm text-slate-500">Accept UPI, Cards, Netbanking in India</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-900">Cash on Delivery</h4>
                  <p className="text-sm text-slate-500">Allow customers to pay upon delivery</p>
                </div>
                <Button variant="secondary">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" activeValue={activeTab}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      placeholder="e.g. Rahul Singh" 
                      value={newUserName} 
                      onChange={(e) => setNewUserName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="rahul@example.com" 
                      value={newUserEmail} 
                      onChange={(e) => setNewUserEmail(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assign Role</label>
                    <select 
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Blog Manager">Blog Manager</option>
                      <option value="Lab Setup Manager">Lab Setup Manager</option>
                      <option value="Customer Support">Customer Support</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleAddUser}>
                  <UserPlus className="h-4 w-4 mr-2" /> Invite User
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{user.name}</h4>
                          <div className="flex items-center text-sm text-slate-500 space-x-3">
                            <span className="flex items-center"><Mail className="w-3 h-3 mr-1" /> {user.email}</span>
                            <span className="flex items-center"><Shield className="w-3 h-3 mr-1" /> {user.role}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500" onClick={() => setUsers(users.filter(u => u.id !== user.id))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
