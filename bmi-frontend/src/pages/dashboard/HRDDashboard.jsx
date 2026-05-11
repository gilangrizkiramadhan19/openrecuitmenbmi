import { useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  Menu,
  Plus,
  MoreVertical,
  Search,
  Filter,
  Bell,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  X,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';
import Button from '../../components/Button';

export default function HRDDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { icon: TrendingUp, label: 'Dashboard', href: '/dashboard/hrd' },
    { icon: Users, label: 'Candidates', href: '/candidates' },
    { icon: Briefcase, label: 'Job Posts', href: '/jobs' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
  ];

  const stats = [
    {
      title: 'Total Candidates',
      value: '486',
      icon: Users,
      color: 'blue',
      trend: 24,
    },
    {
      title: 'Active Job Posts',
      value: '12',
      icon: Briefcase,
      color: 'green',
      trend: -3,
    },
    {
      title: 'This Month Hired',
      value: '8',
      icon: CheckCircle,
      color: 'purple',
      trend: 2,
    },
  ];

  const candidates = [
    {
      id: 1,
      name: 'Ahmad Ridho',
      email: 'ahmad.ridho@email.com',
      phone: '+62 812 3456 7890',
      position: 'Senior Frontend Developer',
      status: 'Interview Scheduled',
      rating: 4.5,
      appliedDate: '2024-05-01',
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@email.com',
      phone: '+62 812 9876 5432',
      position: 'Product Designer',
      status: 'Under Review',
      rating: 4.2,
      appliedDate: '2024-04-28',
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '+62 812 5555 6666',
      position: 'Data Scientist',
      status: 'Offer Extended',
      rating: 4.8,
      appliedDate: '2024-04-25',
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      email: 'dewi.lestari@email.com',
      phone: '+62 812 7777 8888',
      position: 'HR Manager',
      status: 'Under Review',
      rating: 4.0,
      appliedDate: '2024-04-20',
    },
  ];

  const openPositions = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Technology',
      applicants: 45,
      posted: '2 weeks ago',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      applicants: 32,
      posted: '1 week ago',
      status: 'Active',
    },
    {
      id: 3,
      title: 'HR Manager',
      department: 'Human Resources',
      applicants: 28,
      posted: '3 days ago',
      status: 'Active',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Offer Extended':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-bmi-soft min-h-screen flex flex-col">
      <Navbar userRole="hrd" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          items={sidebarItems}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole="hrd"
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Top Bar */}
          <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
            <div className="flex items-center justify-between p-4 md:pl-68">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden p-2 hover:bg-bmi-soft rounded-lg"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-2xl font-bold text-bmi-navy hidden sm:block">
                  Recruitment Hub
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="relative p-2 hover:bg-bmi-soft rounded-lg">
                  <Bell size={24} className="text-slate-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 md:p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  trend={stat.trend}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Candidates Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-bmi-navy">
                      Recent Candidates
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        alert('View all candidates page would load here')
                      }
                    >
                      View All
                    </Button>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex gap-3 mb-6">
                    <div className="flex-1 relative">
                      <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Search candidates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bmi-blue"
                      />
                    </div>
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-bmi-soft transition">
                      <Filter size={18} className="text-slate-600" />
                    </button>
                  </div>

                  {/* Candidates Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">
                            Candidate
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">
                            Position
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCandidates.map((candidate) => (
                          <tr
                            key={candidate.id}
                            className="border-b border-slate-100 hover:bg-bmi-soft transition"
                          >
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-semibold text-bmi-navy">
                                  {candidate.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {candidate.email}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-slate-700">
                                {candidate.position}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  candidate.status
                                )}`}
                              >
                                {candidate.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedCandidate(candidate);
                                    setShowCandidateModal(true);
                                  }}
                                  className="p-1 hover:bg-slate-200 rounded transition"
                                  title="View details"
                                >
                                  <Eye size={16} className="text-slate-600" />
                                </button>
                                <button
                                  className="p-1 hover:bg-slate-200 rounded transition"
                                  title="Send message"
                                >
                                  <MoreVertical
                                    size={16}
                                    className="text-slate-600"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Open Positions */}
              <div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-bmi-navy">
                      Open Positions
                    </h2>
                    <button
                      onClick={() => setShowJobModal(true)}
                      className="p-2 bg-bmi-navy text-white rounded-lg hover:bg-bmi-blue transition"
                      title="Post new job"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {openPositions.map((job) => (
                      <div
                        key={job.id}
                        className="border border-slate-100 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-bmi-navy text-sm">
                              {job.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1">
                              {job.department}
                            </p>
                          </div>
                          <button className="p-1 hover:bg-bmi-soft rounded">
                            <MoreVertical
                              size={16}
                              className="text-slate-400"
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600">
                            {job.applicants} applicants
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">
                            {job.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-bmi-navy mb-6">
                Quick Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Applications This Month',
                    value: '156',
                    icon: Mail,
                  },
                  {
                    label: 'Interviews Scheduled',
                    value: '24',
                    icon: Clock,
                  },
                  {
                    label: 'Offers Extended',
                    value: '8',
                    icon: CheckCircle,
                  },
                  { label: 'Avg. Time to Hire', value: '21 days', icon: TrendingUp },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-100 rounded-lg p-4 text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-bmi-soft rounded-lg flex items-center justify-center">
                        <item.icon size={24} className="text-bmi-navy" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-bmi-navy mb-1">
                      {item.value}
                    </p>
                    <p className="text-sm text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Candidate Details Modal */}
      {showCandidateModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-bmi-navy">
                Candidate Details
              </h2>
              <button
                onClick={() => {
                  setShowCandidateModal(false);
                  setSelectedCandidate(null);
                }}
                className="p-1 hover:bg-bmi-soft rounded"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile */}
              <div className="text-center">
                <div className="w-16 h-16 bg-bmi-navy rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  {selectedCandidate.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-bmi-navy">
                  {selectedCandidate.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {selectedCandidate.position}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-bmi-blue flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Email</p>
                    <p className="text-sm font-medium text-bmi-navy">
                      {selectedCandidate.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-bmi-blue flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Phone</p>
                    <p className="text-sm font-medium text-bmi-navy">
                      {selectedCandidate.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-bmi-blue flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Applied Date</p>
                    <p className="text-sm font-medium text-bmi-navy">
                      {new Date(selectedCandidate.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-bmi-soft p-4 rounded-lg">
                <p className="text-xs text-slate-600 mb-2">Current Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    selectedCandidate.status
                  )}`}
                >
                  {selectedCandidate.status}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  Schedule Interview
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 max-w-md w-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-bmi-navy">Post New Job</h2>
              <button
                onClick={() => setShowJobModal(false)}
                className="p-1 hover:bg-bmi-soft rounded"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Developer"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bmi-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department
                </label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bmi-blue">
                  <option>Select Department</option>
                  <option>Technology</option>
                  <option>Product</option>
                  <option>Human Resources</option>
                  <option>Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description
                </label>
                <textarea
                  placeholder="Enter job description..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bmi-blue resize-none"
                  rows="4"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setShowJobModal(false)}
                >
                  Cancel
                </Button>
                <Button size="lg" className="flex-1">
                  Post Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
