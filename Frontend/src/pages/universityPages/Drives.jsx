import React, { useState, useEffect } from "react";
import { 
  Building, 
  Calendar, 
  Users, 
  MapPin, 
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Check,
  X,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown,
  Briefcase,
  Target,
  DollarSign,
  GraduationCap
} from "lucide-react";

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock API call
  useEffect(() => {
    const fetchDrives = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockDrives = [
        {
          id: 1,
          companyName: "Google LLC",
          companyLogo: null,
          driveDate: "2024-09-15",
          currentStatus: "scheduled",
          eligibilityDepartments: ["Computer Science", "Information Technology"],
          vacancies: 25,
          approved: true,
          jobRole: "Software Engineer",
          package: "10LPA",
          location: "Mountain View, CA",
          description: "Join Google's engineering team to build products that impact billions of users worldwide.",
          requirements: "Bachelor's degree in CS/IT, Strong programming skills in Python/Java",
          contactPerson: "Sarah Johnson",
          contactEmail: "sarah.j@google.com",
          contactPhone: "+1-650-555-0123",
          applicationDeadline: "2024-09-10",
          registeredStudents: 145,
          shortlistedStudents: 32,
          placedStudents: 0
        },
        {
          id: 2,
          companyName: "Microsoft Corporation",
          companyLogo: null,
          driveDate: "2024-09-12",
          currentStatus: "completed",
          eligibilityDepartments: ["Computer Science", "Electronics", "Information Technology"],
          vacancies: 15,
          approved: true,
          jobRole: "Cloud Solutions Architect",
          package: "12LPA",
          location: "Seattle, WA",
          description: "Design and implement cloud solutions for enterprise clients using Azure platform.",
          requirements: "Bachelor's degree, Cloud platform experience, Azure certifications preferred",
          contactPerson: "Mike Chen",
          contactEmail: "mike.chen@microsoft.com",
          contactPhone: "+1-425-555-0145",
          applicationDeadline: "2024-09-07",
          registeredStudents: 89,
          shortlistedStudents: 28,
          placedStudents: 12
        },
        {
          id: 3,
          companyName: "Amazon Web Services",
          companyLogo: null,
          driveDate: "2024-09-20",
          currentStatus: "pending_approval",
          eligibilityDepartments: ["Computer Science", "Electrical Engineering"],
          vacancies: 30,
          approved: false,
          jobRole: "DevOps Engineer",
          package: "11LPA",
          location: "Austin, TX",
          description: "Build and maintain scalable infrastructure for AWS services.",
          requirements: "Strong background in system administration, Docker, Kubernetes experience",
          contactPerson: "Jessica Liu",
          contactEmail: "j.liu@amazon.com",
          contactPhone: "+1-512-555-0189",
          applicationDeadline: "2024-09-18",
          registeredStudents: 0,
          shortlistedStudents: 0,
          placedStudents: 0
        },
        {
          id: 4,
          companyName: "Meta Platforms",
          companyLogo: null,
          driveDate: "2024-09-25",
          currentStatus: "registration_open",
          eligibilityDepartments: ["Computer Science", "Information Technology", "Electronics"],
          vacancies: 20,
          approved: true,
          jobRole: "Frontend Developer",
          package: "13LPA",
          location: "Menlo Park, CA",
          description: "Build next-generation user interfaces for Meta's family of applications.",
          requirements: "Proficiency in React, JavaScript, modern web technologies",
          contactPerson: "David Park",
          contactEmail: "d.park@meta.com",
          contactPhone: "+1-650-555-0234",
          applicationDeadline: "2024-09-22",
          registeredStudents: 67,
          shortlistedStudents: 0,
          placedStudents: 0
        },
        {
          id: 5,
          companyName: "Apple Inc.",
          companyLogo: null,
          driveDate: "2024-10-05",
          currentStatus: "cancelled",
          eligibilityDepartments: ["Computer Science", "Electrical Engineering"],
          vacancies: 12,
          approved: true,
          jobRole: "iOS Developer",
          package: "14LPA",
          location: "Cupertino, CA",
          description: "Develop innovative iOS applications for millions of users worldwide.",
          requirements: "Strong Swift programming skills, iOS development experience",
          contactPerson: "Emma Wilson",
          contactEmail: "e.wilson@apple.com",
          contactPhone: "+1-408-555-0167",
          applicationDeadline: "2024-10-01",
          registeredStudents: 23,
          shortlistedStudents: 0,
          placedStudents: 0
        },
        {
          id: 6,
          companyName: "Tesla Inc.",
          companyLogo: null,
          driveDate: "2024-09-30",
          currentStatus: "scheduled",
          eligibilityDepartments: ["Electrical Engineering", "Mechanical Engineering"],
          vacancies: 18,
          approved: false,
          jobRole: "Embedded Systems Engineer",
          package: "15LPA",
          location: "Palo Alto, CA",
          description: "Design embedded systems for Tesla's autonomous driving technology.",
          requirements: "Embedded C/C++, RTOS experience, automotive background preferred",
          contactPerson: "Alex Rodriguez",
          contactEmail: "a.rodriguez@tesla.com",
          contactPhone: "+1-650-555-0198",
          applicationDeadline: "2024-09-28",
          registeredStudents: 0,
          shortlistedStudents: 0,
          placedStudents: 0
        }
      ];
      
      setDrives(mockDrives);
      setLoading(false);
    };

    fetchDrives();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-50';
      case 'registration_open': return 'text-green-600 bg-green-50';
      case 'completed': return 'text-gray-600 bg-gray-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'pending_approval': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <Clock size={16} />;
      case 'registration_open': return <CheckCircle size={16} />;
      case 'completed': return <Check size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      case 'pending_approval': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleApprove = async (driveId) => {
    // Simulate API call
    setDrives(prev => 
      prev.map(drive => 
        drive.id === driveId 
          ? { ...drive, approved: true, currentStatus: 'registration_open' }
          : drive
      )
    );
  };

  const handleReject = async (driveId) => {
    // Simulate API call
    setDrives(prev => 
      prev.map(drive => 
        drive.id === driveId 
          ? { ...drive, approved: false, currentStatus: 'cancelled' }
          : drive
      )
    );
  };

  const filteredDrives = drives.filter(drive => {
    const matchesSearch = drive.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.jobRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || drive.currentStatus === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || 
                             drive.eligibilityDepartments.some(dept => 
                               dept.toLowerCase().includes(departmentFilter.toLowerCase()));
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const stats = {
    total: drives.length,
    pending: drives.filter(d => d.currentStatus === 'pending_approval').length,
    active: drives.filter(d => ['scheduled', 'registration_open'].includes(d.currentStatus)).length,
    completed: drives.filter(d => d.currentStatus === 'completed').length
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted font-warm">Loading drives...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1 font-bold text-gray-800 font-warm">Drives Management</h1>
            <p className="text-muted font-warm">Manage placement drives and company partnerships</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border bg-primary text-white border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-warm">
              <Download size={18} />
              Export
            </button>
            {/* <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-warm">
              <Plus size={18} />
              Add Drive
            </button> */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted font-warm">Total Drives</p>
                <p className="text-2xl font-bold text-gray-800 font-warm">{stats.total}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Briefcase className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted font-warm">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600 font-warm">{stats.pending}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <AlertCircle className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted font-warm">Active Drives</p>
                <p className="text-2xl font-bold text-green-600 font-warm">{stats.active}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted font-warm">Completed</p>
                <p className="text-2xl font-bold text-gray-600 font-warm">{stats.completed}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Check className="text-gray-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                <input
                  type="text"
                  placeholder="Search by company or job role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-warm"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-warm bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="registration_open">Registration Open</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-warm bg-white"
              >
                <option value="all">All Departments</option>
                <option value="computer science">Computer Science</option>
                <option value="information technology">Information Technology</option>
                <option value="electrical engineering">Electrical Engineering</option>
                <option value="mechanical engineering">Mechanical Engineering</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
          </div>
        </div>

        {/* Drives Table */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-800 font-warm">Company</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-800 font-warm">Drive Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-800 font-warm">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-800 font-warm">Departments</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-800 font-warm">Vacancies</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-800 font-warm">Package</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-800 font-warm">Approved</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-800 font-warm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDrives.map((drive) => (
                  <tr key={drive.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building className="text-primary" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 font-warm">{drive.companyName}</p>
                          <p className="text-sm text-muted font-warm">{drive.jobRole}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-muted" />
                        <span className="text-gray-800 font-warm">{formatDate(drive.driveDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(drive.currentStatus)}`}>
                        {getStatusIcon(drive.currentStatus)}
                        {formatStatus(drive.currentStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {drive.eligibilityDepartments.slice(0, 2).map((dept, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded font-warm">
                            {dept}
                          </span>
                        ))}
                        {drive.eligibilityDepartments.length > 2 && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded font-warm">
                            +{drive.eligibilityDepartments.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-muted" />
                        <span className="text-gray-800 font-warm">{drive.vacancies}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600 font-warm">{drive.package}</span>
                    </td>
                    <td className="px-6 py-4">
                      {drive.approved ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-sm font-warm">
                          <CheckCircle size={14} />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-full text-sm font-warm">
                          <XCircle size={14} />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedDrive(drive);
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        {!drive.approved && drive.currentStatus === 'pending_approval' && (
                          <>
                            <button
                              onClick={() => handleApprove(drive.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleReject(drive.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drive Details Modal */}
        {showModal && selectedDrive && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-h2 font-bold text-gray-800 font-warm">Drive Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Company Info */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building className="text-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 font-warm">{selectedDrive.companyName}</h3>
                    <p className="text-lg text-primary font-warm">{selectedDrive.jobRole}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {selectedDrive.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} />
                        {selectedDrive.package}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${getStatusColor(selectedDrive.currentStatus)}`}>
                      {getStatusIcon(selectedDrive.currentStatus)}
                      {formatStatus(selectedDrive.currentStatus)}
                    </span>
                  </div>
                </div>

                {/* Drive Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 font-warm">{selectedDrive.vacancies}</div>
                    <div className="text-sm text-blue-700 font-warm">Vacancies</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 font-warm">{selectedDrive.registeredStudents}</div>
                    <div className="text-sm text-green-700 font-warm">Registered</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 font-warm">{selectedDrive.shortlistedStudents}</div>
                    <div className="text-sm text-yellow-700 font-warm">Shortlisted</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 font-warm">{selectedDrive.placedStudents}</div>
                    <div className="text-sm text-purple-700 font-warm">Placed</div>
                  </div>
                </div>

                {/* Drive Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 font-warm mb-2">Drive Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-muted" />
                        <span className="text-muted font-warm">Drive Date:</span>
                        <span className="font-warm">{formatDate(selectedDrive.driveDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted" />
                        <span className="text-muted font-warm">Application Deadline:</span>
                        <span className="font-warm">{formatDate(selectedDrive.applicationDeadline)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-muted" />
                        <span className="text-muted font-warm">Eligible Departments:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedDrive.eligibilityDepartments.map((dept, index) => (
                            <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-warm">
                              {dept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 font-warm mb-2">Contact Person</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-muted" />
                        <span className="font-warm">{selectedDrive.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-muted" />
                        <a href={`mailto:${selectedDrive.contactEmail}`} className="text-primary hover:text-primary/80 font-warm">
                          {selectedDrive.contactEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-muted" />
                        <span className="font-warm">{selectedDrive.contactPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <h4 className="font-semibold text-gray-800 font-warm mb-2">Job Description</h4>
                  <p className="text-gray-600 font-warm leading-relaxed">{selectedDrive.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-gray-800 font-warm mb-2">Requirements</h4>
                  <p className="text-gray-600 font-warm leading-relaxed">{selectedDrive.requirements}</p>
                </div>

                {/* Action Buttons */}
                {!selectedDrive.approved && selectedDrive.currentStatus === 'pending_approval' && (
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        handleApprove(selectedDrive.id);
                        setShowModal(false);
                      }}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-warm font-medium"
                    >
                      Approve Drive
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedDrive.id);
                        setShowModal(false);
                      }}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-warm font-medium"
                    >
                      Reject Drive
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drives;