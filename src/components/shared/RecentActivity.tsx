
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RecentActivity = ({ userRole }) => {
  const getActivities = () => {
    switch (userRole) {
      case 'admin':
        return [
          { id: 1, type: 'user_added', message: 'New doctor Dr. Sarah Johnson added', time: '5 min ago', status: 'success' },
          { id: 2, type: 'appointment', message: 'Appointment scheduled for Room 302', time: '12 min ago', status: 'info' },
          { id: 3, type: 'system', message: 'System backup completed successfully', time: '1 hour ago', status: 'success' },
          { id: 4, type: 'alert', message: 'Server maintenance scheduled for tonight', time: '2 hours ago', status: 'warning' }
        ];
      case 'doctor':
        return [
          { id: 1, type: 'appointment', message: 'Appointment completed with John Doe', time: '10 min ago', status: 'success' },
          { id: 2, type: 'record', message: 'Medical record updated for Patient #1247', time: '25 min ago', status: 'info' },
          { id: 3, type: 'appointment', message: 'Next appointment: Alice Johnson at 2:30 PM', time: '1 hour ago', status: 'warning' }
        ];
      case 'patient':
        return [
          { id: 1, type: 'appointment', message: 'Appointment confirmed with Dr. Smith', time: '2 hours ago', status: 'success' },
          { id: 2, type: 'report', message: 'Lab results are now available', time: '1 day ago', status: 'info' },
          { id: 3, type: 'prescription', message: 'New prescription added by Dr. Johnson', time: '2 days ago', status: 'info' }
        ];
      default:
        return [];
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const activities = getActivities();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            {getStatusIcon(activity.status)}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
