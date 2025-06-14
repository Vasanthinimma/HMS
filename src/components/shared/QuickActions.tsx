import { Plus, Calendar, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const QuickActions = ({ userRole, onTabChange }) => {
  const handleQuickAction = (action) => {
    console.log('Quick action clicked:', action);
    
    switch (action) {
      case 'Add Doctor':
        if (onTabChange) {
          onTabChange('doctors');
          toast.success('Navigating to Doctor Management...');
        }
        break;
      case 'Add Department':
        if (onTabChange) {
          onTabChange('departments');
          toast.success('Navigating to Department Management...');
        }
        break;
      case 'Generate Report':
        if (onTabChange) {
          onTabChange('reports');
          toast.success('Opening Report Generation...');
        }
        break;
      case 'View Schedule':
        if (onTabChange) {
          onTabChange('appointments');
          toast.success('Opening schedule view...');
        }
        break;
      case 'Next Patient':
        toast.success('Loading next patient...');
        // In a real app, this would load next patient
        break;
      case 'Add Record':
        toast.success('Opening medical record form...');
        // In a real app, this would open record form
        break;
      case 'Patient List':
        toast.success('Loading patient list...');
        // In a real app, this would show patient list
        break;
      case 'Book Appointment':
        toast.success('Opening appointment booking...');
        // In a real app, this would open appointment booking
        break;
      case 'View Reports':
        toast.success('Loading your reports...');
        // In a real app, this would show patient reports
        break;
      case 'Find Doctor':
        toast.success('Opening doctor search...');
        // In a real app, this would open doctor search
        break;
      default:
        toast.info('Feature coming soon!');
    }
  };

  const getQuickActions = () => {
    switch (userRole) {
      case 'admin':
        return [
          { icon: Users, label: 'Add Doctor', color: 'bg-blue-500' },
          { icon: Plus, label: 'Add Department', color: 'bg-green-500' },
          { icon: FileText, label: 'Generate Report', color: 'bg-purple-500' },
          { icon: Calendar, label: 'View Schedule', color: 'bg-orange-500' }
        ];
      case 'doctor':
        return [
          { icon: Calendar, label: 'Next Patient', color: 'bg-blue-500' },
          { icon: FileText, label: 'Add Record', color: 'bg-green-500' },
          { icon: Users, label: 'Patient List', color: 'bg-purple-500' }
        ];
      case 'patient':
        return [
          { icon: Calendar, label: 'Book Appointment', color: 'bg-blue-500' },
          { icon: FileText, label: 'View Reports', color: 'bg-green-500' },
          { icon: Users, label: 'Find Doctor', color: 'bg-purple-500' }
        ];
      default:
        return [];
    }
  };

  const actions = getQuickActions();

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow"
              onClick={() => handleQuickAction(action.label)}
            >
              <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
