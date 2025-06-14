
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', description: 'Heart and cardiovascular system care', doctorCount: 4, status: 'active' },
    { id: 2, name: 'Neurology', description: 'Brain and nervous system disorders', doctorCount: 3, status: 'active' },
    { id: 3, name: 'Orthopedics', description: 'Bone, joint, and muscle treatment', doctorCount: 5, status: 'active' },
    { id: 4, name: 'Pediatrics', description: 'Child healthcare and development', doctorCount: 6, status: 'active' },
    { id: 5, name: 'Emergency', description: 'Emergency and trauma care', doctorCount: 8, status: 'active' },
    { id: 6, name: 'Dermatology', description: 'Skin and hair related treatments', doctorCount: 2, status: 'inactive' }
  ]);

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: ''
  });

  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddDepartment = (e) => {
    e.preventDefault();
    
    const department = {
      id: Date.now(),
      ...newDepartment,
      doctorCount: 0,
      status: 'active'
    };

    setDepartments([...departments, department]);
    setNewDepartment({ name: '', description: '' });
    setShowAddForm(false);
    toast.success('Department added successfully!');
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment({ ...department });
    setShowAddForm(false);
  };

  const handleUpdateDepartment = (e) => {
    e.preventDefault();
    
    setDepartments(departments.map(dept => 
      dept.id === editingDepartment.id 
        ? editingDepartment
        : dept
    ));
    
    setEditingDepartment(null);
    toast.success('Department updated successfully!');
  };

  const toggleDepartmentStatus = (id) => {
    setDepartments(departments.map(dept => 
      dept.id === id 
        ? { ...dept, status: dept.status === 'active' ? 'inactive' : 'active' }
        : dept
    ));
    toast.success('Department status updated!');
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast.success('Department deleted successfully!');
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
          <h2 className="text-2xl font-bold">Department Management</h2>
          <p className="text-gray-600">Manage hospital departments and their information</p>
        </div>
        <div className="space-x-2">
          {editingDepartment && (
            <Button variant="outline" onClick={() => setEditingDepartment(null)}>
              Cancel Edit
            </Button>
          )}
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add Department'}
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Department</CardTitle>
            <CardDescription>Create a new department in the hospital</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dept-name">Department Name</Label>
                <Input
                  id="dept-name"
                  placeholder="Enter department name"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-description">Description</Label>
                <Textarea
                  id="dept-description"
                  placeholder="Enter department description"
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Department
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {editingDepartment && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Department</CardTitle>
            <CardDescription>Update department information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateDepartment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-dept-name">Department Name</Label>
                <Input
                  id="edit-dept-name"
                  placeholder="Enter department name"
                  value={editingDepartment.name}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-dept-description">Description</Label>
                <Textarea
                  id="edit-dept-description"
                  placeholder="Enter department description"
                  value={editingDepartment.description}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">
                  Update Department
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setEditingDepartment(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{department.name}</CardTitle>
                <Badge className={getStatusBadge(department.status)}>
                  {department.status}
                </Badge>
              </div>
              <CardDescription>{department.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Doctors:</span>
                  <span className="font-semibold">{department.doctorCount}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditDepartment(department)}>
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant={department.status === 'active' ? 'destructive' : 'default'}
                    className="flex-1"
                    onClick={() => toggleDepartmentStatus(department.id)}
                  >
                    {department.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
                
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => deleteDepartment(department.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManagement;
