import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Upload, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Mail,
  MailCheck,
  GraduationCap
} from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      department: "Computer Science",
      class: "2025",
      verificationStatus: "verified",
      cgpa: 8.9,
      emailVerified: true,
      email: "aarav.sharma@university.edu"
    },
    {
      id: 2,
      name: "Priya Patel",
      department: "Electronics",
      class: "2024",
      verificationStatus: "pending",
      cgpa: 9.2,
      emailVerified: true,
      email: "priya.patel@university.edu"
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      department: "Mechanical",
      class: "2025",
      verificationStatus: "verified",
      cgpa: 7.8,
      emailVerified: false,
      email: "rajesh.kumar@university.edu"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      department: "Information Technology",
      class: "2024",
      verificationStatus: "rejected",
      cgpa: 8.5,
      emailVerified: true,
      email: "sneha.reddy@university.edu"
    },
    {
      id: 5,
      name: "Vikram Singh",
      department: "Civil Engineering",
      class: "2025",
      verificationStatus: "verified",
      cgpa: 8.1,
      emailVerified: true,
      email: "vikram.singh@university.edu"
    },
    {
      id: 6,
      name: "Kavya Menon",
      department: "Computer Science",
      class: "2024",
      verificationStatus: "pending",
      cgpa: 9.1,
      emailVerified: false,
      email: "kavya.menon@university.edu"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [newStudent, setNewStudent] = useState({
    name: "",
    department: "",
    class: "",
    cgpa: "",
    email: ""
  });

  const departments = ["Computer Science", "Electronics", "Mechanical", "Information Technology", "Civil Engineering", "Electrical Engineering"];

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Filter },
      rejected: { bg: "bg-red-100", text: "text-red-800", icon: XCircle }
    };
    
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <IconComponent size={14} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCGPAColor = (cgpa) => {
    if (cgpa >= 9) return "text-green-600 font-semibold";
    if (cgpa >= 8) return "text-blue-600 font-semibold";
    if (cgpa >= 7) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || student.department === filterDepartment;
    const matchesStatus = !filterStatus || student.verificationStatus === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddStudent = (e) => {
    e.preventDefault();
    const student = {
      id: students.length + 1,
      ...newStudent,
      cgpa: parseFloat(newStudent.cgpa),
      verificationStatus: "pending",
      emailVerified: false
    };
    setStudents([...students, student]);
    setNewStudent({ name: "", department: "", class: "", cgpa: "", email: "" });
    setShowAddForm(false);
  };

  const stats = {
    total: students.length,
    verified: students.filter(s => s.verificationStatus === 'verified').length,
    pending: students.filter(s => s.verificationStatus === 'pending').length,
    avgCgpa: (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2)
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-primary)' }}>
              <GraduationCap className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-warm)' }}>
                Students Management
              </h1>
              <p style={{ color: 'var(--color-muted)' }}>
                Manage student registrations for university placement portal
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Total Students</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{stats.total}</p>
                </div>
                <Users className="text-gray-400" size={24} />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Verified</p>
                  <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
                </div>
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Filter className="text-yellow-400" size={24} />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Avg CGPA</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{stats.avgCgpa}</p>
                </div>
                <GraduationCap className="text-gray-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Department Filter */}
              <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowBulkUpload(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                <Upload size={20} />
                Bulk Upload
              </button>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-colors"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Plus size={20} />
                Add Student
              </button>
            </div>
          </div>
        </div>

                {/* Students Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#a2c6eb', opacity: 1 }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Student Info
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Class
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    CGPA
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Email Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                             style={{ backgroundColor: 'var(--color-primary)' }}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold" style={{ color: 'var(--color-primary)' }}>{student.name}</p>
                          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ backgroundColor: 'var(--color-secondary)', opacity: 1, color: '#3e78b2' }}>
                        {student.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{student.class}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${getCGPAColor(student.cgpa)}`}>
                        {student.cgpa}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(student.verificationStatus)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {student.emailVerified ? (
                          <MailCheck className="text-green-500" size={18} />
                        ) : (
                          <Mail className="text-gray-400" size={18} />
                        )}
                        <span className={`text-sm font-medium ${student.emailVerified ? 'text-green-600' : 'text-orange-600'}`}>
                          {student.emailVerified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 transition-colors" title="View Details">
                          <Eye size={16} style={{ color: 'var(--color-primary)' }} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-blue-50 transition-colors" title="Edit Student">
                          <Edit3 size={16} style={{ color: 'var(--color-primary)' }} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete Student">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Student Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>
                Add New Student
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black-700 mb-2">Department</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStudent.department}
                    onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black-700 mb-2">Class</label>
                  <input
                    type="text"
                    placeholder="e.g., 2024"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black-700 mb-2">CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStudent.cgpa}
                    onChange={(e) => setNewStudent({ ...newStudent, cgpa: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  className="flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Upload Modal */}
        {showBulkUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-lg mx-4">
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>
                Bulk Upload Students
              </h3>
              
              <div className="space-y-6">
                {/* Upload Zone */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Upload CSV or Excel File
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Drag and drop your file here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    id="bulk-upload"
                  />
                  <label
                    htmlFor="bulk-upload"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium cursor-pointer transition-colors"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Choose File
                  </label>
                </div>

                {/* Template Download */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Download Template
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Use our template to ensure proper formatting
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download size={16} />
                    Download CSV Template
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBulkUpload(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="mt-4 text-sm" style={{ color: 'var(--color-muted)' }}>
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>
    </div>
  );
};

export default Students;