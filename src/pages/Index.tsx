
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import DoctorDashboard from '../components/dashboards/DoctorDashboard';
import PatientDashboard from '../components/dashboards/PatientDashboard';

const Index = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking for existing session
    const storedUser = localStorage.getItem('hms_user');
    console.log('Stored user from localStorage:', storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user from localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('hms_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    console.log('Login data received in handleLogin:', userData);
    console.log('User role from login:', userData.role);
    
    // Ensure the userData is properly formatted
    const userToStore = {
      ...userData,
      role: userData.role // Explicitly ensure role is set
    };
    
    console.log('Setting user state with:', userToStore);
    setUser(userToStore);
    localStorage.setItem('hms_user', JSON.stringify(userToStore));
  };

  const handleLogout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('hms_user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Render dashboard based on user role
  const renderDashboard = () => {
    console.log('Current user object:', user);
    console.log('Rendering dashboard for user role:', user.role);
    console.log('User role type:', typeof user.role);
    
    switch (user.role) {
      case 'admin':
        console.log('Rendering AdminDashboard');
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'doctor':
        console.log('Rendering DoctorDashboard');
        return <DoctorDashboard user={user} onLogout={handleLogout} />;
      case 'patient':
        console.log('Rendering PatientDashboard');
        return <PatientDashboard user={user} onLogout={handleLogout} />;
      default:
        console.log('Invalid user role detected:', user.role);
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-bold text-red-600">Invalid user role: {user.role}</h2>
              <button 
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Index;
