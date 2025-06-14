
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AppointmentBooking = () => {
  const [appointmentData, setAppointmentData] = useState({
    department: '',
    doctor: '',
    date: '',
    time: '',
    complaint: ''
  });

  const departments = [
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'orthopedics', name: 'Orthopedics' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'general', name: 'General Medicine' }
  ];

  const doctors = {
    cardiology: [
      { id: 'dr-johnson', name: 'Dr. Sarah Johnson' },
      { id: 'dr-brown', name: 'Dr. Michael Brown' }
    ],
    neurology: [
      { id: 'dr-wilson', name: 'Dr. Emily Wilson' },
      { id: 'dr-davis', name: 'Dr. James Davis' }
    ],
    orthopedics: [
      { id: 'dr-miller', name: 'Dr. Robert Miller' },
      { id: 'dr-garcia', name: 'Dr. Maria Garcia' }
    ],
    pediatrics: [
      { id: 'dr-martinez', name: 'Dr. Lisa Martinez' },
      { id: 'dr-anderson', name: 'Dr. David Anderson' }
    ],
    general: [
      { id: 'dr-smith', name: 'Dr. Michael Smith' },
      { id: 'dr-jones', name: 'Dr. Jennifer Jones' }
    ]
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!appointmentData.department || !appointmentData.doctor || !appointmentData.date || !appointmentData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    console.log('Booking appointment:', appointmentData);
    toast.success('Appointment booked successfully! You will receive a confirmation email.');
    
    // Reset form
    setAppointmentData({
      department: '',
      doctor: '',
      date: '',
      time: '',
      complaint: ''
    });
  };

  const availableDoctors = appointmentData.department ? doctors[appointmentData.department] || [] : [];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book New Appointment</CardTitle>
        <CardDescription>Schedule an appointment with one of our doctors</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select 
                value={appointmentData.department}
                onValueChange={(value) => setAppointmentData({ 
                  ...appointmentData, 
                  department: value, 
                  doctor: '' // Reset doctor when department changes
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor *</Label>
              <Select 
                value={appointmentData.doctor}
                onValueChange={(value) => setAppointmentData({ ...appointmentData, doctor: value })}
                disabled={!appointmentData.department}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {availableDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date *</Label>
              <input
                id="date"
                type="date"
                min={today}
                value={appointmentData.date}
                onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time *</Label>
              <Select 
                value={appointmentData.time}
                onValueChange={(value) => setAppointmentData({ ...appointmentData, time: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaint">Reason for Visit</Label>
            <Textarea
              id="complaint"
              placeholder="Please describe your symptoms or reason for the appointment"
              value={appointmentData.complaint}
              onChange={(e) => setAppointmentData({ ...appointmentData, complaint: e.target.value })}
              rows={4}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Appointment Guidelines:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Please arrive 15 minutes before your scheduled time</li>
              <li>• Bring a valid ID and insurance card</li>
              <li>• You will receive a confirmation email within 24 hours</li>
              <li>• Cancellations must be made at least 24 hours in advance</li>
            </ul>
          </div>

          <Button type="submit" className="w-full">
            Book Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;
