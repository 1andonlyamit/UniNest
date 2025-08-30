import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';
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
  Eye,
  Filter,
  Search,
  ChevronDown,
  Target,
  Briefcase,
  MapPin,
  Star,
  Activity,
  AlertCircle,
  X,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [dateRange, setDateRange] = useState('6months');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced mock data
  const stats = {
    totalStudents: 1250,
    placedStudents: 956,
    placementRate: 76.5,
    averageCTC: 8.5,
    highestCTC: 45,
    activeCompanies: 185,
    ongoingDrives: 12,
    pendingApplications: 234
  };

  const departmentData = [
    { dept: 'Computer Science', placed: 180, total: 220, avgCTC: 12.5, placementRate: 81.8, color: '#3B82F6' },
    { dept: 'Electronics', placed: 145, total: 180, avgCTC: 9.2, placementRate: 80.6, color: '#EF4444' },
    { dept: 'Mechanical', placed: 120, total: 170, avgCTC: 7.8, placementRate: 70.6, color: '#10B981' },
    { dept: 'Civil', placed: 95, total: 140, avgCTC: 6.5, placementRate: 67.9, color: '#F59E0B' },
    { dept: 'Information Tech', placed: 160, total: 200, avgCTC: 11.8, placementRate: 80.0, color: '#8B5CF6' },
    { dept: 'MBA', placed: 85, total: 120, avgCTC: 15.2, placementRate: 70.8, color: '#EC4899' }
  ];

  const monthlyTrends = [
    { month: 'Jan', placements: 45, applications: 120, offers: 67 },
    { month: 'Feb', placements: 52, applications: 135, offers: 78 },
    { month: 'Mar', placements: 78, applications: 180, offers: 95 },
    { month: 'Apr', placements: 95, applications: 210, offers: 115 },
    { month: 'May', placements: 120, applications: 195, offers: 140 },
    { month: 'Jun', placements: 85, applications: 165, offers: 102 },
    { month: 'Jul', placements: 92, applications: 175, offers: 108 },
    { month: 'Aug', placements: 110, applications: 200, offers: 125 }
  ];

  const salaryDistribution = [
    { range: '3-5L', count: 185, percentage: 19.4 },
    { range: '5-8L', count: 245, percentage: 25.6 },
    { range: '8-12L', count: 220, percentage: 23.0 },
    { range: '12-20L', count: 165, percentage: 17.3 },
    { range: '20L+', count: 141, percentage: 14.7 }
  ];

  const companyTypes = [
    { name: 'Product', value: 35, count: 142 },
    { name: 'Service', value: 28, count: 113 },
    { name: 'Consulting', value: 20, count: 81 },
    { name: 'Startup', value: 12, count: 48 },
    { name: 'Government', value: 5, count: 20 }
  ];

  const locationData = [
    { city: 'Bangalore', placements: 215, avgCTC: 12.5 },
    { city: 'Pune', placements: 180, avgCTC: 10.8 },
    { city: 'Hyderabad', placements: 145, avgCTC: 11.2 },
    { city: 'Chennai', placements: 125, avgCTC: 9.8 },
    { city: 'Mumbai', placements: 110, avgCTC: 13.5 },
    { city: 'Delhi/NCR', placements: 98, avgCTC: 11.8 },
    { city: 'Others', placements: 83, avgCTC: 8.2 }
  ];

  const recentDrives = [
    { 
      company: 'TechCorp', 
      date: '2025-08-25', 
      roles: 'Software Developer', 
      attended: 45, 
      selected: 12, 
      ctc: '8-15L', 
      status: 'completed',
      logo: '💻'
    },
    { 
      company: 'InnoSoft', 
      date: '2025-08-22', 
      roles: 'Full Stack Developer', 
      attended: 38, 
      selected: 8, 
      ctc: '6-12L', 
      status: 'completed',
      logo: '🚀'
    },
    { 
      company: 'DataFlow Inc', 
      date: '2025-08-20', 
      roles: 'Data Analyst', 
      attended: 32, 
      selected: 6, 
      ctc: '5-9L', 
      status: 'completed',
      logo: '📊'
    }
  ];

  const upcomingDrives = [
    { 
      company: 'Google', 
      date: '2025-09-05', 
      roles: 'SDE-1, SDE-2', 
      status: 'confirmed', 
      expectedCTC: '25-45L',
      eligibility: 'CS, IT',
      logo: '🔍'
    },
    { 
      company: 'Microsoft', 
      date: '2025-09-08', 
      roles: 'Software Engineer', 
      status: 'pending', 
      expectedCTC: '20-35L',
      eligibility: 'CS, IT, ECE',
      logo: '🏢'
    },
    { 
      company: 'Amazon', 
      date: '2025-09-12', 
      roles: 'SDE, DevOps Engineer', 
      status: 'confirmed', 
      expectedCTC: '18-30L',
      eligibility: 'All',
      logo: '📦'
    }
  ];

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  const filteredDepartmentData = useMemo(() => {
    if (selectedDepartment === 'all') return departmentData;
    return departmentData.filter(dept => dept.dept === selectedDepartment);
  }, [selectedDepartment]);

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-4 bg-${color}-50 rounded-xl`}>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm text-green-600 font-medium">+{trend}% from last year</span>
        </div>
      )}
    </div>
  );

  const FilterBar = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-700">Filters:</span>
        </div>
        
        <select 
          value={selectedDepartment} 
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          {departmentData.map(dept => (
            <option key={dept.dept} value={dept.dept}>{dept.dept}</option>
          ))}
        </select>

        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="2024-25">2024-25</option>
          <option value="2023-24">2023-24</option>
          <option value="2022-23">2022-23</option>
        </select>

        <select 
          value={dateRange} 
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies, students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>
    </div>
  );

  const DepartmentChart = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Department Performance</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">Placement Rate</button>
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">Average CTC</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredDepartmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dept" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              name === 'placementRate' ? `${value}%` : value,
              name === 'placementRate' ? 'Placement Rate' : name === 'placed' ? 'Students Placed' : 'Total Students'
            ]}
          />
          <Legend />
          <Bar dataKey="placed" fill="#3B82F6" name="Students Placed" radius={[4, 4, 0, 0]} />
          <Bar dataKey="total" fill="#E5E7EB" name="Total Students" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const PlacementTrends = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Placement Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="placements" 
            stackId="1" 
            stroke="#3B82F6" 
            fill="#3B82F6" 
            fillOpacity={0.6}
            name="Placements"
          />
          <Area 
            type="monotone" 
            dataKey="applications" 
            stackId="2" 
            stroke="#EF4444" 
            fill="#EF4444" 
            fillOpacity={0.4}
            name="Applications"
          />
          <Area 
            type="monotone" 
            dataKey="offers" 
            stackId="3" 
            stroke="#10B981" 
            fill="#10B981" 
            fillOpacity={0.5}
            name="Offers"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const SalaryDistribution = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Salary Distribution</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={salaryDistribution}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              label={({range, percentage}) => `${range}: ${percentage}%`}
            >
              {salaryDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-3">
          {salaryDistribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{backgroundColor: COLORS[index % COLORS.length]}}
                ></div>
                <span className="font-medium">{item.range}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">{item.count}</span>
                <span className="text-gray-500 ml-2">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CompanyTypes = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Company Types</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={companyTypes}>
          <RadialBar dataKey="value" cornerRadius={4} fill="#3B82F6" />
          <Tooltip formatter={(value, name) => [`${value}%`, 'Percentage']} />
          <Legend />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );

  const LocationMap = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Placement by Location</h3>
      <div className="space-y-4">
        {locationData.map((location, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">{location.city}</p>
                <p className="text-sm text-gray-600">{location.placements} placements</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">₹{location.avgCTC}L</p>
              <p className="text-xs text-gray-500">Avg CTC</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RecentDrives = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Placement Drives</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>
      <div className="space-y-4">
        {recentDrives.map((drive, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{drive.logo}</div>
              <div>
                <p className="font-bold text-gray-900">{drive.company}</p>
                <p className="text-sm text-gray-600">{drive.roles}</p>
                <p className="text-xs text-gray-500">{drive.date} • CTC: {drive.ctc}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">{drive.selected}</p>
              <p className="text-sm text-gray-500">Selected</p>
              <p className="text-xs text-gray-400">{drive.attended} attended</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const UpcomingDrives = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Upcoming Drives</h3>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center transition-all">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Drive
        </button>
      </div>
      <div className="space-y-4">
        {upcomingDrives.map((drive, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{drive.logo}</div>
              <div>
                <p className="font-bold text-gray-900">{drive.company}</p>
                <p className="text-sm text-gray-600">{drive.roles}</p>
                <p className="text-xs text-gray-500">Expected CTC: {drive.expectedCTC}</p>
                <p className="text-xs text-blue-600">Eligible: {drive.eligibility}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{drive.date}</p>
              <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
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

  const QuickActions = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 rounded-xl transition-all duration-300 hover:shadow-md">
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add Drive</span>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 rounded-xl transition-all duration-300 hover:shadow-md">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Approve</span>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-purple-700 rounded-xl transition-all duration-300 hover:shadow-md">
          <Download className="h-5 w-5" />
          <span className="font-medium">Reports</span>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 rounded-xl transition-all duration-300 hover:shadow-md">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );

  const AlertsPanel = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Alerts & Notifications</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Low placement rate in Civil Engineering</p>
            <p className="text-xs text-red-600">Only 67.9% compared to 75% target</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <Clock className="h-5 w-5 text-yellow-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-800">Pending approvals</p>
            <p className="text-xs text-yellow-600">234 student applications await review</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">Target achieved</p>
            <p className="text-xs text-green-600">CS department exceeded 80% placement rate</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Placement Management Dashboard</h1>
          <p className="text-lg text-gray-600">Academic Year {selectedYear} • Real-time Analytics</p>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            icon={Users}
            trend="5"
            color="blue"
          />
          <StatCard
            title="Students Placed"
            value={stats.placedStudents.toLocaleString()}
            icon={GraduationCap}
            trend="12"
            color="green"
          />
          <StatCard
            title="Placement Rate"
            value={`${stats.placementRate}%`}
            icon={Target}
            trend="8"
            color="purple"
          />
          <StatCard
            title="Average CTC"
            value={`₹${stats.averageCTC}L`}
            subtitle="Per annum"
            icon={DollarSign}
            trend="15"
            color="yellow"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Highest CTC"
            value={`₹${stats.highestCTC}L`}
            subtitle="This year"
            icon={Award}
            trend="25"
            color="red"
          />
          <StatCard
            title="Active Companies"
            value={stats.activeCompanies}
            icon={Building}
            color="indigo"
          />
          <StatCard
            title="Ongoing Drives"
            value={stats.ongoingDrives}
            icon={Activity}
            color="pink"
          />
          <StatCard
            title="Pending Applications"
            value={stats.pendingApplications}
            icon={Clock}
            color="gray"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            <DepartmentChart />
            <PlacementTrends />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SalaryDistribution />
              <CompanyTypes />
            </div>
            <LocationMap />
          </div>

          {/* Right Column - Lists and Actions */}
          <div className="space-y-8">
            <AlertsPanel />
            <RecentDrives />
            <UpcomingDrives />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;