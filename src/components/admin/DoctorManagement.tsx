import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Smith', email: 'doctor@hospital.com', specialization: 'Cardiology', experience: 10, status: 'active', contactNumber: '+1234567890' },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com', specialization: 'Cardiology', experience: 8, status: 'active', contactNumber: '+1234567891' },
    { id: 3, name: 'Dr. Michael Smith', email: 'michael.smith@hospital.com', specialization: 'General Medicine', experience: 12, status: 'active', contactNumber: '+1234567892' },
    { id: 4, name: 'Dr. Emily Davis', email: 'emily.davis@hospital.com', specialization: 'Pediatrics', experience: 6, status: 'active', contactNumber: '+1234567893' },
    { id: 5, name: 'Dr. Robert Wilson', email: 'robert.wilson@hospital.com', specialization: 'Orthopedics', experience: 15, status: 'inactive', contactNumber: '+1234567894' }
  ]);

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    specialization: '',
    experience: '',
    contactNumber: ''
  });

  const [editingDoctor, setEditingDoctor] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddDoctor = (e) => {
    e.preventDefault();
    
    const doctor = {
      id: Date.now(),
      ...newDoctor,
      experience: parseInt(newDoctor.experience),
      status: 'active'
    };

    setDoctors([...doctors, doctor]);
    setNewDoctor({ name: '', email: '', specialization: '', experience: '', contactNumber: '' });
    setShowAddForm(false);
    toast.success('Doctor added successfully!');
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor({
      ...doctor,
      experience: doctor.experience.toString()
    });
    setShowAddForm(false);
  };

  const handleUpdateDoctor = (e) => {
    e.preventDefault();
    
    setDoctors(doctors.map(doctor => 
      doctor.id === editingDoctor.id 
        ? { ...editingDoctor, experience: parseInt(editingDoctor.experience) }
        : doctor
    ));
    
    setEditingDoctor(null);
    toast.success('Doctor updated successfully!');
  };

  const toggleDoctorStatus = (id) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === id 
        ? { ...doctor, status: doctor.status === 'active' ? 'inactive' : 'active' }
        : doctor
    ));
    toast.success('Doctor status updated!');
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Doctor Management</h2>
          <p className="text-gray-600">Manage hospital doctors and their information</p>
        </div>
        <div className="space-x-2">
          {editingDoctor && (
            <Button variant="outline" onClick={() => setEditingDoctor(null)}>
              Cancel Edit
            </Button>
          )}
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add Doctor'}
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Doctor</CardTitle>
            <CardDescription>Enter doctor information to register them in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-name">Full Name</Label>
                  <Input
                    id="doctor-name"
                    placeholder="Enter doctor's full name"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">Email</Label>
                  <Input
                    id="doctor-email"
                    type="email"
                    placeholder="Enter email address"
                    value={newDoctor.email}
                    onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-specialization">Specialization</Label>
                  <Select onValueChange={(value) => setNewDoctor({ ...newDoctor, specialization: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="general">General Medicine</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-experience">Experience (Years)</Label>
                  <Input
                    id="doctor-experience"
                    type="number"
                    placeholder="Years of experience"
                    value={newDoctor.experience}
                    onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="doctor-contact">Contact Number</Label>
                  <Input
                    id="doctor-contact"
                    placeholder="Enter contact number"
                    value={newDoctor.contactNumber}
                    onChange={(e) => setNewDoctor({ ...newDoctor, contactNumber: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Add Doctor
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {editingDoctor && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Doctor</CardTitle>
            <CardDescription>Update doctor information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateDoctor} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-doctor-name">Full Name</Label>
                  <Input
                    id="edit-doctor-name"
                    placeholder="Enter doctor's full name"
                    value={editingDoctor.name}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-doctor-email">Email</Label>
                  <Input
                    id="edit-doctor-email"
                    type="email"
                    placeholder="Enter email address"
                    value={editingDoctor.email}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-doctor-specialization">Specialization</Label>
                  <Select value={editingDoctor.specialization} onValueChange={(value) => setEditingDoctor({ ...editingDoctor, specialization: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-doctor-experience">Experience (Years)</Label>
                  <Input
                    id="edit-doctor-experience"
                    type="number"
                    placeholder="Years of experience"
                    value={editingDoctor.experience}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, experience: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-doctor-contact">Contact Number</Label>
                  <Input
                    id="edit-doctor-contact"
                    placeholder="Enter contact number"
                    value={editingDoctor.contactNumber}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, contactNumber: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">
                  Update Doctor
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setEditingDoctor(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Doctors List</CardTitle>
          <CardDescription>All registered doctors in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <Badge className={getStatusBadge(doctor.status)}>
                      {doctor.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{doctor.email}</p>
                  <p className="text-sm text-blue-600">{doctor.specialization} • {doctor.experience} years experience</p>
                  <p className="text-sm text-gray-500">{doctor.contactNumber}</p>
                </div>
                <div className="ml-4 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditDoctor(doctor)}>
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant={doctor.status === 'active' ? 'destructive' : 'default'}
                    onClick={() => toggleDoctorStatus(doctor.id)}
                  >
                    {doctor.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorManagement;
