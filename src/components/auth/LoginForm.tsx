
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock user data
  const mockUsers = {
    'admin@hospital.com': { 
      id: 1, 
      name: 'Hospital Administrator', 
      email: 'admin@hospital.com', 
      role: 'admin' 
    },
    'doctor@hospital.com': { 
      id: 2, 
      name: 'Dr. Smith', 
      email: 'doctor@hospital.com', 
      role: 'doctor' 
    },
    'patient@hospital.com': { 
      id: 3, 
      name: 'John Doe', 
      email: 'patient@hospital.com', 
      role: 'patient' 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[email];
      
      if (user && password === 'password') {
        console.log('Login successful for:', user);
        onLogin(user);
        toast.success(`Welcome back, ${user.name}!`);
      } else {
        toast.error('Invalid email or password');
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      admin: { email: 'admin@hospital.com', password: 'password' },
      doctor: { email: 'doctor@hospital.com', password: 'password' },
      patient: { email: 'patient@hospital.com', password: 'password' }
    };

    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    
    // Auto-submit after setting credentials
    setTimeout(() => {
      const user = mockUsers[creds.email];
      onLogin(user);
      toast.success(`Demo login as ${role}`);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">HMS</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Hospital Management</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or try demo accounts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleDemoLogin('admin')}
              className="text-sm"
            >
              Demo Admin Login
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleDemoLogin('doctor')}
              className="text-sm"
            >
              Demo Doctor Login
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleDemoLogin('patient')}
              className="text-sm"
            >
              Demo Patient Login
            </Button>
          </div>

          <div className="text-xs text-center text-gray-600 mt-4">
            <p>Demo credentials:</p>
            <p>Email: admin@hospital.com | doctor@hospital.com | patient@hospital.com</p>
            <p>Password: password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
