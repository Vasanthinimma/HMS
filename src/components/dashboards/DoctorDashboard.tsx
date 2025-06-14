
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UpdateRecordModal from '../doctor/UpdateRecordModal';

const DoctorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');

  const todaysAppointments = [
    { id: 1, patient: 'Alice Johnson', time: '09:00 AM', type: 'Consultation', status: 'confirmed' },
    { id: 2, patient: 'Bob Wilson', time: '10:30 AM', type: 'Follow-up', status: 'pending' },
    { id: 3, patient: 'Carol Brown', time: '02:00 PM', type: 'Check-up', status: 'completed' },
    { id: 4, patient: 'David Lee', time: '03:30 PM', type: 'Consultation', status: 'confirmed' }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return variants[status] || variants.pending;
  };

  const handleUpdateRecord = (patientName) => {
    setSelectedPatient(patientName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient('');
  };

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
            <p className="text-gray-600">View appointments and manage medical records</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-gray-600">{appointment.type} • {appointment.time}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusBadge(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <Button 
                            size="sm" 
                            onClick={() => handleUpdateRecord(appointment.patient)}
                          >
                            Update Record
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Records</CardTitle>
                  <CardDescription>Update and manage patient medical records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-gray-600">Last visit: {appointment.time}</p>
                        </div>
                        <Button 
                          onClick={() => handleUpdateRecord(appointment.patient)}
                        >
                          Update Record
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <UpdateRecordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        patientName={selectedPatient}
      />
    </div>
  );
};

export default DoctorDashboard;
