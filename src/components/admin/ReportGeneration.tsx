
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Download, Calendar, Users, Activity, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const ReportGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Sample data for charts
  const monthlyAppointments = [
    { month: 'Jan', appointments: 120, completed: 110 },
    { month: 'Feb', appointments: 145, completed: 130 },
    { month: 'Mar', appointments: 165, completed: 155 },
    { month: 'Apr', appointments: 190, completed: 175 },
    { month: 'May', appointments: 210, completed: 195 },
    { month: 'Jun', appointments: 185, completed: 170 }
  ];

  const departmentData = [
    { name: 'Cardiology', value: 35, color: '#8884d8' },
    { name: 'Neurology', value: 25, color: '#82ca9d' },
    { name: 'Pediatrics', value: 20, color: '#ffc658' },
    { name: 'Orthopedics', value: 15, color: '#ff7300' },
    { name: 'Others', value: 5, color: '#0088fe' }
  ];

  const patientFlow = [
    { time: '8AM', patients: 5 },
    { time: '10AM', patients: 15 },
    { time: '12PM', patients: 25 },
    { time: '2PM', patients: 30 },
    { time: '4PM', patients: 20 },
    { time: '6PM', patients: 10 }
  ];

  const chartConfig = {
    appointments: {
      label: "Appointments",
      color: "#8884d8",
    },
    completed: {
      label: "Completed",
      color: "#82ca9d",
    },
    patients: {
      label: "Patients",
      color: "#8884d8",
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    toast.info('Generating comprehensive hospital report...');
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      toast.success('Hospital report generated successfully!');
    }, 2000);
  };

  const handleDownloadReport = () => {
    toast.success('Report downloaded successfully!');
    // In a real app, this would generate and download a PDF/Excel file
  };

  if (!reportGenerated) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Generate Hospital Report
            </CardTitle>
            <CardDescription>
              Generate a comprehensive report with hospital statistics, patient flow, and departmental performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Hospital Performance Report
              </CardTitle>
              <CardDescription>
                Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </CardDescription>
            </div>
            <Button onClick={handleDownloadReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Appointments</p>
                <p className="text-2xl font-bold">915</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$84.2k</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+15% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Appointments Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Appointments</CardTitle>
            <CardDescription>Appointment bookings and completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={monthlyAppointments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="appointments" fill="var(--color-appointments)" />
                <Bar dataKey="completed" fill="var(--color-completed)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Patient distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily Patient Flow */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Patient Flow</CardTitle>
            <CardDescription>Average patient count throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={patientFlow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="patients" stroke="var(--color-patients)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Top performing departments this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: 'Cardiology', performance: 95, trend: 'up' },
                { dept: 'Neurology', performance: 92, trend: 'up' },
                { dept: 'Pediatrics', performance: 88, trend: 'stable' },
                { dept: 'Orthopedics', performance: 85, trend: 'down' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.dept}</p>
                    <p className="text-sm text-gray-600">Performance Score</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'}>
                      {item.performance}%
                    </Badge>
                    <TrendingUp className={`w-4 h-4 ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => setReportGenerated(false)} variant="outline">
          Generate New Report
        </Button>
        <Button onClick={handleDownloadReport}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default ReportGeneration;
