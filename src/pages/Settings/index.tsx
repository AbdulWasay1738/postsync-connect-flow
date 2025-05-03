
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Instagram, Facebook, Linkedin, Twitter, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import Container from '@/components/ui/Container';

interface ProfileFormData {
  name: string;
  email: string;
  company: string;
  role: string;
}

// Connected accounts mock data
const connectedAccounts = [
  {
    id: 'instagram',
    name: 'Instagram',
    connected: true,
    username: 'yourbrand',
    icon: <Instagram className="h-5 w-5" />,
    color: '#E1306C',
    lastSync: '2 hours ago'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    connected: true,
    username: 'YourBrand',
    icon: <Facebook className="h-5 w-5" />,
    color: '#4267B2',
    lastSync: '2 hours ago'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    connected: false,
    username: null,
    icon: <Linkedin className="h-5 w-5" />,
    color: '#0077B5',
    lastSync: null
  },
  {
    id: 'twitter',
    name: 'Twitter',
    connected: true,
    username: 'yourbrand',
    icon: <Twitter className="h-5 w-5" />,
    color: '#1DA1F2',
    lastSync: '3 hours ago'
  }
];

// Team members mock data
const teamMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Admin',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=1A73E8&color=fff'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'Editor',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=FF6B6B&color=fff'
  }
];

const Settings = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: '',
      role: '',
    }
  });
  
  const onSubmitProfile = (data: ProfileFormData) => {
    setIsSaving(true);
    // 🔌 BACKEND_HOOK: saveSettings('profile', data)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 1000);
  };
  
  const handleDisconnectAccount = (accountId: string) => {
    // 🔌 BACKEND_HOOK: disconnectAccount(accountId)
    console.log(`Disconnecting account: ${accountId}`);
  };
  
  const handleConnectAccount = (accountId: string) => {
    // 🔌 BACKEND_HOOK: connectAccount(accountId)
    console.log(`Connecting account: ${accountId}`);
  };
  
  const handleRemoveTeamMember = (memberId: string) => {
    // 🔌 BACKEND_HOOK: removeTeamMember(memberId)
    console.log(`Removing team member: ${memberId}`);
  };
  
  const handleInviteTeamMember = (email: string, role: string) => {
    // 🔌 BACKEND_HOOK: inviteTeamMember(email, role)
    console.log(`Inviting team member: ${email} as ${role}`);
  };
  
  return (
    <div className="min-h-screen pb-12">
      <Container>
        <div className="py-8">
          <h1 className="text-2xl md:text-3xl font-bold font-inter mb-2">
            Account Settings
          </h1>
          <p className="text-postsync-muted">
            Manage your profile, connected accounts, and preferences
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and company information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    
                    {/* Form fields */}
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            type="email"
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                              }
                            })}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input id="company" {...register('company')} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="role">Your Role</Label>
                          <Input id="role" {...register('role')} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving} className="bg-postsync-primary hover:bg-blue-700">
                      {isSaving ? 'Saving...' : savedSuccess ? 'Saved!' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Connected Accounts Tab */}
          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <CardTitle>Connected Social Accounts</CardTitle>
                <CardDescription>
                  Manage your connected social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {connectedAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                          style={{ backgroundColor: `${account.color}20` }}
                        >
                          <div style={{ color: account.color }}>
                            {account.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{account.name}</h4>
                          {account.connected ? (
                            <div className="flex items-center text-sm">
                              <span className="text-postsync-muted">
                                Connected as <span className="font-medium">@{account.username}</span>
                              </span>
                              <div className="ml-2 flex items-center text-xs text-green-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1"></span>
                                <span>Synced {account.lastSync}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-postsync-muted">Not connected</span>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant={account.connected ? "outline" : "default"}
                        size="sm"
                        onClick={() => account.connected 
                          ? handleDisconnectAccount(account.id)
                          : handleConnectAccount(account.id)
                        }
                      >
                        {account.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Post Published</h4>
                          <p className="text-sm text-postsync-muted">
                            Receive notifications when your scheduled posts are published
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Post Engagement Updates</h4>
                          <p className="text-sm text-postsync-muted">
                            Get notified about significant engagement on your content
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Team Activity</h4>
                          <p className="text-sm text-postsync-muted">
                            Notifications about team member actions
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Marketing Updates</h4>
                          <p className="text-sm text-postsync-muted">
                            News, tips, and product updates from Postsync
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Schedule Reminders</h4>
                          <p className="text-sm text-postsync-muted">
                            Get reminded before your posts are scheduled to go live
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Performance Alerts</h4>
                          <p className="text-sm text-postsync-muted">
                            Notifications for posts performing above average
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-postsync-primary hover:bg-blue-700">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription plan and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Current Plan</h3>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-lg">Pro Plan</h4>
                          <p className="text-postsync-muted">$29/month, billed monthly</p>
                        </div>
                        <Button variant="outline">Change Plan</Button>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-postsync-muted">Your subscription renews on May 15, 2023</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-4 w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <span className="font-bold">VISA</span>
                          </div>
                          <div>
                            <p>•••• •••• •••• 4242</p>
                            <p className="text-sm text-postsync-muted">Expires 06/2025</p>
                          </div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Billing History</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-postsync-muted uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-postsync-muted uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-postsync-muted uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-postsync-muted uppercase tracking-wider">
                              Invoice
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 text-sm">Apr 15, 2023</td>
                            <td className="px-6 py-4 text-sm">$29.00</td>
                            <td className="px-6 py-4 text-sm">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-postsync-primary">
                              Download
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm">Mar 15, 2023</td>
                            <td className="px-6 py-4 text-sm">$29.00</td>
                            <td className="px-6 py-4 text-sm">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-postsync-primary">
                              Download
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm">Feb 15, 2023</td>
                            <td className="px-6 py-4 text-sm">$29.00</td>
                            <td className="px-6 py-4 text-sm">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-postsync-primary">
                              Download
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Members Tab */}
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Invite and manage team members to collaborate on your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Current Team Members */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Current Team Members</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-postsync-muted uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-postsync-muted uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-postsync-muted uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-postsync-muted uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {teamMembers.map((member) => (
                            <tr key={member.id}>
                              <td className="px-6 py-4 text-sm">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-3">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  {member.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm">{member.email}</td>
                              <td className="px-6 py-4 text-sm">{member.role}</td>
                              <td className="px-6 py-4 text-sm">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500"
                                  onClick={() => handleRemoveTeamMember(member.id)}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Invite New Team Member */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Invite New Member</h3>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <Label htmlFor="invite-email">Email Address</Label>
                        <Input id="invite-email" type="email" placeholder="team@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="invite-role">Role</Label>
                        <select 
                          id="invite-role"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-postsync-primary focus:ring-postsync-primary sm:text-sm"
                        >
                          <option>Editor</option>
                          <option>Viewer</option>
                          <option>Admin</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <Button className="bg-postsync-primary hover:bg-blue-700">
                          Send Invitation
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Pending Invitations */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Pending Invitations</h3>
                    <div className="border rounded-md p-4 text-center text-postsync-muted">
                      No pending invitations
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default Settings;
