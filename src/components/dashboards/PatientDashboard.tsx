
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import AppointmentBooking from '../patient/AppointmentBooking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye, Calendar, Filter } from 'lucide-react';
import { toast } from 'sonner';

const PatientDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('book');
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const recentReports = [
    { 
      id: 1, 
      type: 'Blood Test', 
      testName: 'Complete Blood Count (CBC)',
      date: 'Dec 10, 2024', 
      status: 'completed', 
      result: 'Normal',
      doctor: 'Dr. Smith',
      notes: 'All values within normal range. Continue regular monitoring.',
      downloadUrl: '#'
    },
    { 
      id: 2, 
      type: 'X-Ray', 
      testName: 'Chest X-Ray',
      date: 'Dec 8, 2024', 
      status: 'pending', 
      result: 'Pending Review',
      doctor: 'Dr. Johnson',
      notes: 'Images captured successfully. Awaiting radiologist review.',
      downloadUrl: '#'
    },
    { 
      id: 3, 
      type: 'ECG', 
      testName: 'Electrocardiogram',
      date: 'Dec 5, 2024', 
      status: 'completed', 
      result: 'Normal',
      doctor: 'Dr. Smith',
      notes: 'Heart rhythm normal. No abnormalities detected.',
      downloadUrl: '#'
    },
    { 
      id: 4, 
      type: 'MRI', 
      testName: 'Brain MRI',
      date: 'Dec 1, 2024', 
      status: 'completed', 
      result: 'Normal',
      doctor: 'Dr. Wilson',
      notes: 'No structural abnormalities identified. Follow-up in 6 months.',
      downloadUrl: '#'
    },
    { 
      id: 5, 
      type: 'Blood Test', 
      testName: 'Lipid Panel',
      date: 'Nov 28, 2024', 
      status: 'completed', 
      result: 'Abnormal',
      doctor: 'Dr. Smith',
      notes: 'Cholesterol levels elevated. Dietary modifications recommended.',
      downloadUrl: '#'
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return variants[status] || variants.pending;
  };

  const getResultBadge = (result) => {
    const variants = {
      Normal: 'bg-green-100 text-green-800',
      Abnormal: 'bg-red-100 text-red-800',
      'Pending Review': 'bg-yellow-100 text-yellow-800'
    };
    return variants[result] || 'bg-gray-100 text-gray-800';
  };

  const handleProfileUpdate = () => {
    toast.success('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleDownloadReport = (reportId, testName) => {
    toast.success(`Downloading ${testName} report...`);
    // In a real app, this would trigger the actual download
  };

  const handleViewReport = (reportId, testName) => {
    toast.info(`Opening detailed view for ${testName}...`);
    // In a real app, this would open a detailed modal or new page
  };

  const filteredReports = recentReports.filter(report => {
    const matchesSearch = report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const uniqueTypes = [...new Set(recentReports.map(report => report.type))];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
            <p className="text-gray-600">Manage your appointments, reports, and profile</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
              <TabsTrigger value="book">Book Appointment</TabsTrigger>
              <TabsTrigger value="reports">Medical Reports</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="book">
              <AppointmentBooking />
            </TabsContent>

            <TabsContent value="reports">
              <div className="space-y-6">
                {/* Reports Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                          <p className="text-2xl font-bold">{recentReports.length}</p>
                        </div>
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Completed</p>
                          <p className="text-2xl font-bold">{recentReports.filter(r => r.status === 'completed').length}</p>
                        </div>
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Pending</p>
                          <p className="text-2xl font-bold">{recentReports.filter(r => r.status === 'pending').length}</p>
                        </div>
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Filter className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search and Filter Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Reports</CardTitle>
                    <CardDescription>View and manage your medical test results and reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search reports, tests, or doctors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Filter by Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {uniqueTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Reports Table */}
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Test Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports.length > 0 ? (
                            filteredReports.map((report) => (
                              <TableRow key={report.id}>
                                <TableCell className="font-medium">{report.testName}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{report.type}</Badge>
                                </TableCell>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>{report.doctor}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusBadge(report.status)}>
                                    {report.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getResultBadge(report.result)}>
                                    {report.result}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleViewReport(report.id, report.testName)}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
                                    {report.status === 'completed' && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDownloadReport(report.id, report.testName)}
                                      >
                                        <Download className="w-4 h-4 mr-1" />
                                        Download
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No reports found matching your filters.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Management</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="emergency">Emergency Contact</Label>
                      <Input
                        id="emergency"
                        value={profileData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
