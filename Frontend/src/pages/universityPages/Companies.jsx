import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Mail, Building, MapPin, Globe, Phone, User, AtSign, CheckCircle, XCircle, Plus, X } from 'lucide-react';
import { fetchCompanies, inviteCompany } from '../../api/companyApi';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: '', companyName: '' });
  const [inviting, setInviting] = useState(false);
  const itemsPerPage = 10;

  // Replace with actual university_id from your app context/props
  const id = 1; // You should get this from props, context, or auth

   // Mock fetch for now
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCompanies([
        { id: 1, name: "Dummy Corp", sector: "Tech", website: "dummy.com", email: "contact@dummy.com", phone: "1234567890", contactPersonName: "John Doe", contactPersonEmail: "john@dummy.com", status: "Active" }
      ]);
      setLoading(false);
    }, 500); // simulate API delay
  }, []);

  const uniqueSectors = useMemo(() => [...new Set(companies.map(c => c.sector))], [companies]);

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.contactPersonName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = !sectorFilter || company.sector === sectorFilter;
      const matchesStatus = !statusFilter || company.status === statusFilter;

      return matchesSearch && matchesSector && matchesStatus;
    });
  }, [companies, searchTerm, sectorFilter, statusFilter]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  const handleInviteSubmit = async () => {
    if (inviteForm.email && inviteForm.companyName) {
      try {
        setInviting(true);

        const payload = {
          universityId: id,
          companyName: inviteForm.companyName,
          companyEmail: inviteForm.email,
        };

        await inviteCompany(payload);

        alert('Invitation sent successfully!');

        setShowInviteModal(false);
        setInviteForm({ email: '', companyName: '' });

        // Instead of fetchCompanies, just add a mock entry locally
        setCompanies(prev => [
          ...prev,
          {
            id: prev.length + 1,
            name: inviteForm.companyName,
            sector: "Unknown",
            website: "",
            email: inviteForm.email,
            phone: "",
            contactPersonName: "",
            contactPersonEmail: "",
            status: "Pending",
          },
        ]);
      } catch (error) {
        alert('Failed to send invitation. Please try again.');
        console.error('Error sending invitation:', error);
      } finally {
        setInviting(false);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Inactive':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Pending':
        return <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading companies...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-h2 font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-warm)' }}>
            Companies Management
          </h2>
          <p className="text-body" style={{ color: 'var(--color-muted)' }}>
            Manage and track company partnerships
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90 hover:scale-105"
          style={{ backgroundColor: 'var(--color-accent)', boxShadow: 'var(--shadow-md)' }}
        >
          <Plus className="w-5 h-5" />
          Invite Company
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                   style={{ color: 'var(--color-muted)' }} />
            <input
              type="text"
              placeholder="Search companies or contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
              style={{ 
                backgroundColor: 'var(--color-background)',
                focusRingColor: 'var(--color-secondary)'
              }}
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
            style={{ backgroundColor: 'var(--color-background)' }}
          >
            <option value="">All Sectors</option>
            {uniqueSectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
            style={{ backgroundColor: 'var(--color-background)' }}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      {filteredCompanies.length === 0 && !loading ? (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No companies found</p>
          <p className="text-gray-400">
            {companies.length === 0 
              ? "Start by inviting your first company partner" 
              : "Try adjusting your search or filter criteria"
            }
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead style={{ backgroundColor: 'var(--color-primary)' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Company Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Sector
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Contact Person
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">
                    <div className="flex items-center gap-2">
                      <AtSign className="w-4 h-4" />
                      Contact Email
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'var(--color-background)' }}>
                {paginatedCompanies.map((company, index) => (
                  <tr 
                    key={company.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium" style={{ color: 'var(--color-primary)' }}>
                        {company.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: 'var(--color-secondary)', 
                              color: 'var(--color-primary)' 
                            }}>
                        {company.sector || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {company.website ? (
                        <a 
                          href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm hover:underline transition-colors duration-150"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {company.website}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {company.email ? (
                        <a 
                          href={`mailto:${company.email}`}
                          className="text-sm hover:underline transition-colors duration-150"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {company.email}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-muted)' }}>
                      {company.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                        {company.contactPersonName || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {company.contactPersonEmail ? (
                        <a 
                          href={`mailto:${company.contactPersonEmail}`}
                          className="text-sm hover:underline transition-colors duration-150"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {company.contactPersonEmail}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(company.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(company.status)}`}>
                          {company.status || 'Unknown'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm" style={{ color: 'var(--color-muted)' }}>
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCompanies.length)} of {filteredCompanies.length} companies
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => <></>}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-150"
                  style={{ backgroundColor: 'var(--color-background)' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => <></>}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                        currentPage === page 
                          ? 'text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: currentPage === page ? 'var(--color-primary)' : 'var(--color-background)',
                        color: currentPage === page ? 'white' : 'var(--color-muted)'
                      }}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => <></>}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-150"
                  style={{ backgroundColor: 'var(--color-background)' }}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-2xl p-8" 
               style={{ backgroundColor: 'var(--color-background)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-h3 font-bold" 
                  style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-warm)' }}>
                Invite Company
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                disabled={inviting}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 disabled:opacity-50"
              >
                <X className="w-5 h-5" style={{ color: 'var(--color-muted)' }} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" 
                       style={{ color: 'var(--color-primary)' }}>
                  Company Name
                </label>
                <input
                  type="text"
                  value={inviteForm.companyName}
                  onChange={(e) => setInviteForm({ ...inviteForm, companyName: e.target.value })}
                  disabled={inviting}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--color-background)' }}
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" 
                       style={{ color: 'var(--color-primary)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  disabled={inviting}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--color-background)' }}
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  disabled={inviting}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInviteSubmit}
                  disabled={inviting || !inviteForm.email || !inviteForm.companyName}
                  className="flex-1 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  {inviting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Invite'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;