import React, { useState } from "react";
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  Calendar, 
  Award, 
  TrendingUp, 
  Briefcase,
  GraduationCap,
  Star,
  Edit3,
  Camera,
  Download,
  Share2,
  ExternalLink,
  Target,
  BookOpen,
  Trophy,
  ChevronRight,
  BarChart3
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const universityData = {
    name: "State University of Technology",
    logo: null, // In real implementation, this would be an image URL
    tagline: "Excellence in Engineering & Technology Education",
    email: "admin@sut.edu",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, Education City, EC 12345",
    website: "www.sut.edu",
    established: "1965",
    accreditation: "ABET Accredited",
    ranking: "#42 in Engineering",
    description: "State University of Technology is a premier institution dedicated to advancing engineering and technology education. With over 50 years of excellence, we've graduated thousands of successful engineers who are making a difference in the world.",
    vision: "To be a globally recognized leader in technology education and innovation.",
    mission: "Empowering students with cutting-edge knowledge and practical skills to solve tomorrow's challenges."
  };

  const stats = [
    { label: "Total Students", value: "15,247", icon: Users, color: "text-blue-600" },
    { label: "Placement Rate", value: "94.5%", icon: TrendingUp, color: "text-green-600" },
    { label: "Companies Partnered", value: "350+", icon: Briefcase, color: "text-purple-600" },
    { label: "Average Package", value: "$75K", icon: Target, color: "text-accent" }
  ];

  const departments = [
    { name: "Computer Science", students: 3420, placements: 97 },
    { name: "Electrical Engineering", students: 2890, placements: 92 },
    { name: "Mechanical Engineering", students: 2650, placements: 89 },
    { name: "Civil Engineering", students: 2180, placements: 86 },
    { name: "Information Technology", students: 1950, placements: 95 },
    { name: "Electronics & Communication", students: 2157, placements: 91 }
  ];

  const achievements = [
    { title: "Best Engineering College Award", year: "2023", organization: "Education Excellence Board" },
    { title: "Innovation in Technology Education", year: "2022", organization: "Tech Education Council" },
    { title: "Outstanding Placement Record", year: "2023", organization: "Career Development Association" },
    { title: "Research Excellence Award", year: "2022", organization: "National Research Foundation" }
  ];

  const recentPlacements = [
    { company: "Google", students: 45, package: "$120K" },
    { company: "Microsoft", students: 38, package: "$115K" },
    { company: "Amazon", students: 52, package: "$110K" },
    { company: "Apple", students: 28, package: "$125K" },
    { company: "Meta", students: 31, package: "$118K" }
  ];

  const StatCard = ({ stat }) => (
    <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <stat.icon className={`${stat.color} bg-gray-50 p-2 rounded-lg`} size={40} />
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800 font-warm">{stat.value}</div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-muted font-warm">{stat.label}</h3>
    </div>
  );

  const DepartmentCard = ({ dept }) => (
    <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-soft transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800 font-warm">{dept.name}</h4>
        <span className="text-sm text-primary font-medium font-warm">{dept.placements}%</span>
      </div>
      <div className="flex items-center justify-between text-sm text-muted font-warm">
        <span>{dept.students.toLocaleString()} Students</span>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${dept.placements >= 95 ? 'bg-green-500' : dept.placements >= 90 ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
          <span>Placement Rate</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary h-32"></div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
              {/* University Logo */}
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 border-white">
                  <Building className="text-primary" size={48} />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              
              {/* University Info */}
              <div className="flex-1 pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-h1 font-bold text-gray-800 font-warm">{universityData.name}</h1>
                    <p className="text-lg text-muted font-warm mb-2">{universityData.tagline}</p>
                    <div className="flex items-center gap-4 text-sm text-muted font-warm">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        Est. {universityData.established}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award size={16} />
                        {universityData.accreditation}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={16} />
                        {universityData.ranking}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-warm">
                      <Share2 size={16} />
                      Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-warm">
                      <Download size={16} />
                      Export
                    </button>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-warm"
                    >
                      <Edit3 size={16} />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* University Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-h3 font-bold text-gray-800 font-warm mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-warm">Email</p>
                    <p className="font-medium text-gray-800 font-warm">{universityData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-warm">Phone</p>
                    <p className="font-medium text-gray-800 font-warm">{universityData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-warm">Address</p>
                    <p className="font-medium text-gray-800 font-warm">{universityData.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Globe className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-warm">Website</p>
                    <a href={`https://${universityData.website}`} className="font-medium text-primary hover:text-primary/80 font-warm flex items-center gap-1">
                      {universityData.website}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* About University */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-h3 font-bold text-gray-800 font-warm mb-4">About University</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 font-warm mb-2">Description</h3>
                  <p className="text-gray-600 font-warm leading-relaxed">{universityData.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 font-warm mb-2">Vision</h3>
                  <p className="text-gray-600 font-warm leading-relaxed">{universityData.vision}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 font-warm mb-2">Mission</h3>
                  <p className="text-gray-600 font-warm leading-relaxed">{universityData.mission}</p>
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h3 font-bold text-gray-800 font-warm">Departments</h2>
                <button className="text-primary hover:text-primary/80 font-warm text-sm font-medium flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept, index) => (
                  <DepartmentCard key={index} dept={dept} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-bold text-gray-800 font-warm mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left font-warm">
                  <Users className="text-primary" size={20} />
                  <span>Manage Students</span>
                  <ChevronRight className="ml-auto text-muted" size={16} />
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left font-warm">
                  <Briefcase className="text-primary" size={20} />
                  <span>View Placements</span>
                  <ChevronRight className="ml-auto text-muted" size={16} />
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left font-warm">
                  <BarChart3 className="text-primary" size={20} />
                  <span>Analytics</span>
                  <ChevronRight className="ml-auto text-muted" size={16} />
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left font-warm">
                  <BookOpen className="text-primary" size={20} />
                  <span>Course Management</span>
                  <ChevronRight className="ml-auto text-muted" size={16} />
                </button>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-bold text-gray-800 font-warm mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-accent/20 p-2 rounded-lg flex-shrink-0">
                      <Trophy className="text-accent" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm font-warm">{achievement.title}</h4>
                      <p className="text-xs text-muted font-warm">{achievement.organization} • {achievement.year}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-primary hover:text-primary/80 font-warm text-sm font-medium flex items-center justify-center gap-1">
                View All Achievements <ChevronRight size={16} />
              </button>
            </div>

            {/* Top Recruiters */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-bold text-gray-800 font-warm mb-4">Top Recruiters (2024)</h3>
              <div className="space-y-3">
                {recentPlacements.map((placement, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800 font-warm">{placement.company}</p>
                      <p className="text-xs text-muted font-warm">{placement.students} students placed</p>
                    </div>
                    <span className="text-sm font-semibold text-primary font-warm">{placement.package}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* All Achievements */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-h3 font-bold text-gray-800 font-warm mb-4">Awards & Recognition</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <Trophy className="text-accent" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 font-warm">{achievement.title}</h4>
                    <p className="text-sm text-muted font-warm">{achievement.organization}</p>
                  </div>
                  <span className="text-sm font-medium text-primary font-warm">{achievement.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Statistics */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-h3 font-bold text-gray-800 font-warm mb-4">Placement Overview</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 font-warm">94.5%</div>
                  <div className="text-sm text-green-700 font-warm">Overall Placement</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 font-warm">$75K</div>
                  <div className="text-sm text-blue-700 font-warm">Average Package</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 font-warm">$150K</div>
                  <div className="text-sm text-purple-700 font-warm">Highest Package</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 font-warm">350+</div>
                  <div className="text-sm text-orange-700 font-warm">Partner Companies</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary font-warm mb-2">Placement Highlights</h4>
                <ul className="text-sm text-gray-600 space-y-1 font-warm">
                  <li>• 15% increase in placements from last year</li>
                  <li>• 25+ new companies recruited this year</li>
                  <li>• 100% placement in Computer Science</li>
                  <li>• Record high average salary package</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* University Performance Metrics */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-h3 font-bold text-gray-800 font-warm mb-6">University Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <GraduationCap className="mx-auto text-blue-600 mb-3" size={32} />
              <div className="text-2xl font-bold text-blue-600 font-warm">98.2%</div>
              <div className="text-sm text-blue-700 font-warm">Graduation Rate</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <Star className="mx-auto text-green-600 mb-3" size={32} />
              <div className="text-2xl font-bold text-green-600 font-warm">4.6/5</div>
              <div className="text-sm text-green-700 font-warm">Student Satisfaction</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Award className="mx-auto text-purple-600 mb-3" size={32} />
              <div className="text-2xl font-bold text-purple-600 font-warm">152</div>
              <div className="text-sm text-purple-700 font-warm">Faculty Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;