import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Building, 
  Users, 
  FileText, 
  Calendar, 
  Award, 
  Plus, 
  Download, 
  CheckCircle, 
  Clock,
  Filter,
  Search,
  Eye,
  Star,
  TrendingUp,
  Target,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Code,
  Brain,
  Zap,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Settings,
  Send,
  BookOpen,
  Globe,
  Cpu,
  BarChart3,
  Activity,
  UserCheck,
  X,
  Edit
} from 'lucide-react';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDrive, setSelectedDrive] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('atsScore');

  // Mock company data
  const companyStats = {
    activeDrives: 5,
    totalApplications: 847,
    scheduledInterviews: 156,
    selectedCandidates: 89,
    avgATSScore: 78.5,
    responseRate: 92.3,
    hiredThisYear: 234,
    pendingOffers: 23
  };

  const driveData = [
    { 
      id: 1,
      title: 'Software Development Engineer - I',
      location: 'Bangalore',
      type: 'Full-time',
      applications: 245,
      shortlisted: 45,
      interviewed: 28,
      selected: 12,
      status: 'active',
      deadline: '2025-09-15',
      ctc: '12-18 LPA',
      experience: '0-2 years',
      skills: ['React', 'Node.js', 'Python', 'SQL']
    },
    { 
      id: 2,
      title: 'Data Scientist',
      location: 'Hyderabad',
      type: 'Full-time',
      applications: 189,
      shortlisted: 32,
      interviewed: 18,
      selected: 8,
      status: 'active',
      deadline: '2025-09-20',
      ctc: '15-22 LPA',
      experience: '1-3 years',
      skills: ['Python', 'ML', 'SQL', 'Statistics']
    },
    { 
      id: 3,
      title: 'Frontend Developer',
      location: 'Pune',
      type: 'Full-time',
      applications: 156,
      shortlisted: 38,
      interviewed: 25,
      selected: 15,
      status: 'completed',
      deadline: '2025-08-30',
      ctc: '8-15 LPA',
      experience: '0-2 years',
      skills: ['React', 'JavaScript', 'CSS', 'HTML']
    }
  ];

  const applications = [
    {
      id: 1,
      name: 'Arjun Patel',
      email: 'arjun.patel@email.com',
      university: 'IIT Bombay',
      degree: 'B.Tech Computer Science',
      cgpa: 8.7,
      graduationYear: 2025,
      driveId: 1,
      atsScore: 94,
      skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
      experience: '2 internships',
      location: 'Mumbai',
      resumeUrl: '#',
      appliedDate: '2025-08-20',
      status: 'shortlisted',
      aiSummary: 'Strong technical background with excellent problem-solving skills. Has relevant internship experience at top startups. Shows leadership potential through college projects.',
      strengths: ['Technical Skills', 'Problem Solving', 'Communication'],
      concerns: ['Limited work experience'],
      matchPercentage: 91,
      technicalScore: 88,
      communicationScore: 92,
      culturalFit: 85
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      university: 'BITS Pilani',
      degree: 'B.Tech Information Technology',
      cgpa: 9.2,
      graduationYear: 2025,
      driveId: 1,
      atsScore: 89,
      skills: ['JavaScript', 'React', 'Python', 'Django', 'PostgreSQL'],
      experience: '3 internships',
      location: 'Delhi',
      resumeUrl: '#',
      appliedDate: '2025-08-22',
      status: 'applied',
      aiSummary: 'Exceptional academic performance with diverse project portfolio. Strong foundation in full-stack development. Active contributor to open-source projects.',
      strengths: ['Academic Excellence', 'Full-stack Development', 'Open Source'],
      concerns: ['May be overqualified for entry-level position'],
      matchPercentage: 87,
      technicalScore: 92,
      communicationScore: 86,
      culturalFit: 88
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      university: 'NIT Warangal',
      degree: 'B.Tech Computer Science',
      cgpa: 8.3,
      graduationYear: 2025,
      driveId: 2,
      atsScore: 76,
      skills: ['Python', 'Machine Learning', 'SQL', 'Pandas', 'Scikit-learn'],
      experience: '1 internship',
      location: 'Hyderabad',
      resumeUrl: '#',
      appliedDate: '2025-08-25',
      status: 'interviewed',
      aiSummary: 'Solid foundation in data science with hands-on ML project experience. Shows analytical thinking and attention to detail. Good cultural fit based on assessment.',
      strengths: ['Analytical Skills', 'ML Knowledge', 'Attention to Detail'],
      concerns: ['Limited industry exposure'],
      matchPercentage: 82,
      technicalScore: 85,
      communicationScore: 78,
      culturalFit: 90
    }
  ];

  const atsScoreDistribution = [
    { range: '90-100', count: 45, color: '#10B981' },
    { range: '80-89', count: 123, color: '#3B82F6' },
    { range: '70-79', count: 189, color: '#F59E0B' },
    { range: '60-69', count: 156, color: '#EF4444' },
    { range: '<60', count: 87, color: '#6B7280' }
  ];

  const skillsInDemand = [
    { skill: 'React', demand: 95, applications: 234 },
    { skill: 'Python', demand: 88, applications: 198 },
    { skill: 'Node.js', demand: 82, applications: 167 },
    { skill: 'SQL', demand: 79, applications: 145 },
    { skill: 'AWS', demand: 76, applications: 123 },
    { skill: 'Machine Learning', demand: 71, applications: 98 }
  ];

  const universityStats = [
    { university: 'IIT Bombay', applications: 67, avgATS: 87.3, selected: 23 },
    { university: 'BITS Pilani', applications: 54, avgATS: 84.6, selected: 18 },
    { university: 'NIT Warangal', applications: 43, avgATS: 81.2, selected: 15 },
    { university: 'IIIT Hyderabad', applications: 38, avgATS: 86.1, selected: 14 },
    { university: 'VIT Vellore', applications: 32, avgATS: 78.9, selected: 11 }
  ];

  const applicationTrends = [
    { month: 'Mar', applications: 67, interviews: 23, selections: 12 },
    { month: 'Apr', applications: 89, interviews: 31, selections: 18 },
    { month: 'May', applications: 123, interviews: 42, selections: 25 },
    { month: 'Jun', applications: 98, interviews: 35, selections: 21 },
    { month: 'Jul', applications: 145, interviews: 52, selections: 31 },
    { month: 'Aug', applications: 189, interviews: 67, selections: 38 }
  ];

  const filteredApplications = useMemo(() => {
    let filtered = applications;
    
    if (selectedDrive !== 'all') {
      filtered = filtered.filter(app => app.driveId === parseInt(selectedDrive));
    }
    
    if (applicationFilter !== 'all') {
      filtered = filtered.filter(app => app.status === applicationFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered.sort((a, b) => {
      if (sortBy === 'atsScore') return b.atsScore - a.atsScore;
      if (sortBy === 'cgpa') return b.cgpa - a.cgpa;
      if (sortBy === 'appliedDate') return new Date(b.appliedDate) - new Date(a.appliedDate);
      return 0;
    });
  }, [selectedDrive, applicationFilter, searchTerm, sortBy]);

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
          <span className="text-sm text-green-600 font-medium">+{trend}% from last month</span>
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
          value={selectedDrive} 
          onChange={(e) => setSelectedDrive(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Drives</option>
          {driveData.map(drive => (
            <option key={drive.id} value={drive.id}>{drive.title}</option>
          ))}
        </select>

        <select 
          value={applicationFilter} 
          onChange={(e) => setApplicationFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Applications</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interviewed">Interviewed</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="atsScore">ATS Score</option>
          <option value="cgpa">CGPA</option>
          <option value="appliedDate">Application Date</option>
        </select>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search candidates, skills, universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-all">
          <Plus className="h-4 w-4 mr-2" />
          New Drive
        </button>
      </div>
    </div>
  );

  const ATSScoreCard = ({ application }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {application.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{application.name}</h3>
            <p className="text-sm text-gray-600">{application.university} • {application.degree}</p>
            <p className="text-xs text-gray-500">CGPA: {application.cgpa} • {application.graduationYear}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${
            application.atsScore >= 90 ? 'text-green-600' :
            application.atsScore >= 80 ? 'text-blue-600' :
            application.atsScore >= 70 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {application.atsScore}
          </div>
          <p className="text-sm text-gray-500">ATS Score</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Technical Skills</span>
          <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${application.technicalScore}%` }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-900">{application.technicalScore}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Communication</span>
          <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${application.communicationScore}%` }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-900">{application.communicationScore}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Cultural Fit</span>
          <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full" 
              style={{ width: `${application.culturalFit}%` }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-900">{application.culturalFit}</span>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-semibold text-gray-900">AI Summary</span>
        </div>
        <p className="text-sm text-gray-700">{application.aiSummary}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {application.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
            {skill}
          </span>
        ))}
        {application.skills.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
            +{application.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          application.status === 'selected' ? 'bg-green-100 text-green-800' :
          application.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
          application.status === 'interviewed' ? 'bg-purple-100 text-purple-800' :
          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {application.status}
        </span>
        <div className="flex space-x-2">
          <button className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors">
            <ThumbsUp className="h-4 w-4" />
          </button>
          <button className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
            <ThumbsDown className="h-4 w-4" />
          </button>
          <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ActiveDrives = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Active Placement Drives</h3>
        <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center transition-all">
          <Plus className="h-4 w-4 mr-2" />
          Create Drive
        </button>
      </div>
      <div className="space-y-4">
        {driveData.map((drive, index) => (
          <div key={index} className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{drive.title}</h4>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{drive.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{drive.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {drive.deadline}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                drive.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {drive.status}
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{drive.applications}</div>
                <div className="text-xs text-gray-500">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{drive.shortlisted}</div>
                <div className="text-xs text-gray-500">Shortlisted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{drive.interviewed}</div>
                <div className="text-xs text-gray-500">Interviewed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{drive.selected}</div>
                <div className="text-xs text-gray-500">Selected</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">CTC: </span>
                <span className="text-sm font-bold text-green-600">{drive.ctc}</span>
                <span className="text-sm text-gray-500 ml-2">• {drive.experience}</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm rounded-lg transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 text-sm rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ATSScoreDistribution = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">ATS Score Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={atsScoreDistribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill={(entry) => entry.color} radius={[4, 4, 0, 0]}>
            {atsScoreDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {atsScoreDistribution.map((item, index) => (
          <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-sm font-bold text-gray-900">{item.count}</div>
            <div className="text-xs text-gray-500">{item.range}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const SkillsAnalysis = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Skills in Demand</h3>
      <div className="space-y-4">
        {skillsInDemand.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                <span className="text-sm text-gray-500">{skill.applications} applications</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" 
                  style={{ width: `${skill.demand}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <span className="text-sm font-bold text-gray-900">{skill.demand}%</span>
              <p className="text-xs text-gray-500">Demand</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const UniversityStats = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">University Performance</h3>
      <div className="space-y-4">
        {universityStats.map((uni, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{uni.university}</p>
                <p className="text-sm text-gray-600">{uni.applications} applications</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">{uni.selected} selected</p>
              <p className="text-sm text-gray-500">Avg ATS: {uni.avgATS}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ApplicationTrends = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Application Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={applicationTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="selections" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            name="Selections"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const QuickActions = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 rounded-xl transition-all duration-300 hover:shadow-md">
          <Plus className="h-5 w-5" />
          <span className="font-medium">New Drive</span>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 rounded-xl transition-all duration-300 hover:shadow-md">
          <UserCheck className="h-5 w-5" />
          <span className="font-medium">Bulk Actions</span>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-purple-700 rounded-xl transition-all duration-300 hover:shadow-md">
          <Download className="h-5 w-5" />
          <span className="font-medium">Export Data</span>
        </button>
        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 rounded-xl transition-all duration-300 hover:shadow-md">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );

  const AIInsights = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-6 w-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-800">High-Quality Pool</span>
          </div>
          <p className="text-sm text-gray-700">45% of applications have ATS scores above 80. Consider increasing your hiring targets.</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">Skill Gap Alert</span>
          </div>
          <p className="text-sm text-gray-700">Low applications for ML positions. Consider expanding eligibility criteria or partnering with AI-focused programs.</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Recruitment Optimization</span>
          </div>
          <p className="text-sm text-gray-700">IIT and BITS candidates show 23% higher performance. Focus recruitment efforts on these institutions.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Recruitment Dashboard</h1>
          <p className="text-lg text-gray-600">AI-Powered Talent Acquisition • Real-time Analytics</p>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Drives"
            value={companyStats.activeDrives}
            icon={Briefcase}
            trend="15"
            color="blue"
          />
          <StatCard
            title="Total Applications"
            value={companyStats.totalApplications.toLocaleString()}
            icon={FileText}
            trend="23"
            color="green"
          />
          <StatCard
            title="Scheduled Interviews"
            value={companyStats.scheduledInterviews}
            icon={Calendar}
            trend="8"
            color="purple"
          />
          <StatCard
            title="Selected Candidates"
            value={companyStats.selectedCandidates}
            icon={UserCheck}
            trend="18"
            color="yellow"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Avg ATS Score"
            value={`${companyStats.avgATSScore}`}
            subtitle="Out of 100"
            icon={Brain}
            trend="12"
            color="indigo"
          />
          <StatCard
            title="Response Rate"
            value={`${companyStats.responseRate}%`}
            icon={TrendingUp}
            trend="5"
            color="pink"
          />
          <StatCard
            title="Hired This Year"
            value={companyStats.hiredThisYear}
            icon={Award}
            color="red"
          />
          <StatCard
            title="Pending Offers"
            value={companyStats.pendingOffers}
            icon={Clock}
            color="gray"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-8">
            <ActiveDrives />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ATSScoreDistribution />
              <ApplicationTrends />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SkillsAnalysis />
              <UniversityStats />
            </div>
          </div>

          {/* Right Column - Actions and Insights */}
          <div className="space-y-8">
            <AIInsights />
            <QuickActions />
          </div>
        </div>

        {/* Applications Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Applications with AI Analysis</h2>
            <div className="text-sm text-gray-500">
              Showing {filteredApplications.length} of {applications.length} applications
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApplications.map((application) => (
              <ATSScoreCard key={application.id} application={application} />
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all">
            Load More Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;