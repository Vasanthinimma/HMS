import { Button } from '@/components/ui/button';

const Sidebar = ({ user, onLogout, activeTab, onTabChange }) => {
  const getMenuItems = () => {
    switch (user.role) {
      case 'admin':
        return [
          { icon: '👨‍⚕️', label: 'Doctors', value: 'doctors' },
          { icon: '🏥', label: 'Departments', value: 'departments' }
        ];
      case 'doctor':
        return [
          { icon: '📅', label: 'Appointments', value: 'appointments' },
          { icon: '📋', label: 'Medical Records', value: 'records' }
        ];
      case 'patient':
        return [
          { icon: '📅', label: 'Book Appointment', value: 'book' },
          { icon: '📋', label: 'Reports', value: 'reports' },
          { icon: '👤', label: 'Profile', value: 'profile' }
        ];
      default:
        return [];
    }
  };

  const handleMenuClick = (value) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">HMS</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Hospital MS</h2>
            <p className="text-sm text-gray-600 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {getMenuItems().map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleMenuClick(item.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  activeTab === item.value 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLogout}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
