import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building, 
  Calendar, 
  Award, 
  Plus, 
  Download, 
  CheckCircle, 
  Clock,
  DollarSign,
  GraduationCap,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalStudents: 1250,
    placedStudents: 956,
    placementRate: 76.5,
    averageCTC: 8.5,
    highestCTC: 45
  };

  const departmentData = [
    { dept: 'Computer Science', placed: 180, total: 220, avgCTC: 12.5 },
    { dept: 'Electronics', placed: 145, total: 180, avgCTC: 9.2 },
    { dept: 'Mechanical', placed: 120, total: 170, avgCTC: 7.8 },
    { dept: 'Civil', placed: 95, total: 140, avgCTC: 6.5 },
    { dept: 'Information Tech', placed: 160, total: 200, avgCTC: 11.8 }
  ];

  const recentDrives = [
    { company: 'TechCorp', date: '2025-08-25', roles: 'Software Developer', attended: 45, selected: 12 },
    { company: 'InnoSoft', date: '2025-08-22', roles: 'Full Stack Developer', attended: 38, selected: 8 },
    { company: 'DataFlow Inc', date: '2025-08-20', roles: 'Data Analyst', attended: 32, selected: 6 }
  ];

  const upcomingDrives = [
    { company: 'Google', date: '2025-09-05', roles: 'SDE-1, SDE-2', status: 'confirmed' },
    { company: 'Microsoft', date: '2025-09-08', roles: 'Software Engineer', status: 'pending' },
    { company: 'Amazon', date: '2025-09-12', roles: 'SDE, DevOps Engineer', status: 'confirmed' }
  ];

  const topStudents = [
    { name: 'Arjun Patel', dept: 'CS', ctc: 45, company: 'Google' },
    { name: 'Priya Sharma', dept: 'IT', ctc: 38, company: 'Microsoft' },
    { name: 'Rahul Kumar', dept: 'CS', ctc: 35, company: 'Amazon' },
    { name: 'Sneha Singh', dept: 'ECE', ctc: 32, company: 'Apple' },
    { name: 'Vikram Joshi', dept: 'CS', ctc: 28, company: 'Netflix' }
  ];

  const topCompanies = [
    { name: 'TechCorp', hires: 45, logo: '🏢' },
    { name: 'InnoSoft', hires: 38, logo: '💻' },
    { name: 'DataFlow', hires: 32, logo: '📊' },
    { name: 'CloudTech', hires: 28, logo: '☁️' }
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <div className="bg-white rounded-lg p-6 shadow-soft border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600">+{trend}% from last year</span>
        </div>
      )}
    </div>
  );

  const DepartmentChart = () => (
    <div className="bg-white rounded-lg p-6 shadow-soft border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Placements</h3>
      <div className="space-y-4">
        {departmentData.map((dept, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{dept.dept}</span>
                <span className="text-sm text-gray-500">{dept.placed}/{dept.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(dept.placed / dept.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <span className="text-sm font-semibold text-gray-900">₹{dept.avgCTC}L</span>
              <p className="text-xs text-gray-500">Avg CTC</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RecentDrives = () => (
    <div className="bg-white rounded-lg p-6 shadow-soft border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Placement Drives</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>
      <div className="space-y-4">
        {recentDrives.map((drive, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{drive.company}</p>
                <p className="text-sm text-gray-600">{drive.roles}</p>
                <p className="text-xs text-gray-500">{drive.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{drive.selected} Selected</p>
              <p className="text-xs text-gray-500">{drive.attended} Attended</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const UpcomingDrives = () => (
    <div className="bg-white rounded-lg p-6 shadow-soft border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Drives</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Drive
        </button>
      </div>
      <div className="space-y-3">
        {upcomingDrives.map((drive, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{drive.company}</p>
                <p className="text-sm text-gray-600">{drive.roles}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-900">{drive.date}</p>
              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                drive.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {drive.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TopPerformers = () => (
    <div className="bg-white rounded-lg p-6 shadow-soft border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers by CTC</h3>
      <div className="space-y-3">
        {topStudents.map((student, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-600">{student.dept} • {student.company}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">₹{student.ctc}L</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TopCompanies = () => (
    <div className="bg-white rounded-lg p-6 shadow-soft border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Recruiting Companies</h3>
      <div className="grid grid-cols-2 gap-3">
        {topCompanies.map((company, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">{company.logo}</span>
            <div>
              <p className="font-medium text-gray-900 text-sm">{company.name}</p>
              <p className="text-xs text-gray-600">{company.hires} hires</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="bg-white rounded-lg p-6 shadow-soft border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">Add Drive</span>
        </button>
        <button className="flex items-center space-x-2 p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Approve</span>
        </button>
        <button className="flex items-center space-x-2 p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
          <Download className="h-4 w-4" />
          <span className="text-sm font-medium">Download</span>
        </button>
        <button className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors">
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">View Reports</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-soft border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Placement Management Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Academic Year 2024-25</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            icon={Users}
            trend="5"
          />
          <StatCard
            title="Students Placed"
            value={stats.placedStudents.toLocaleString()}
            icon={GraduationCap}
            trend="12"
          />
          <StatCard
            title="Placement Rate"
            value={`${stats.placementRate}%`}
            icon={TrendingUp}
            trend="8"
          />
          <StatCard
            title="Average CTC"
            value={`₹${stats.averageCTC}L`}
            subtitle="Per annum"
            icon={DollarSign}
            trend="15"
          />
          <StatCard
            title="Highest CTC"
            value={`₹${stats.highestCTC}L`}
            subtitle="This year"
            icon={Award}
            trend="25"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <DepartmentChart />
            <RecentDrives />
            <UpcomingDrives />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <TopPerformers />
            <TopCompanies />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;