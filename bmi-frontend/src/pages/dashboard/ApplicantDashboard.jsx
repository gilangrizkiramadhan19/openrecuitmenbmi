import { useState } from 'react';
import {
  FileText,
  Calendar,
  Bell,
  Menu,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';
import Button from '../../components/Button';

export default function ApplicantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { icon: TrendingUp, label: 'Dashboard', href: '/dashboard/applicant' },
    { icon: FileText, label: 'My Applications', href: '/applications' },
    { icon: Calendar, label: 'Interview Schedule', href: '/interviews' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
  ];

  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'PT BMI',
      appliedDate: '2024-05-01',
      status: 'Interview Scheduled',
      statusColor: 'bg-blue-100 text-blue-700',
      stage: 'Interview',
      progress: 75,
    },
    {
      id: 2,
      jobTitle: 'Product Designer',
      company: 'PT BMI',
      appliedDate: '2024-04-28',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-700',
      stage: 'Screening',
      progress: 50,
    },
    {
      id: 3,
      jobTitle: 'Data Scientist',
      company: 'PT BMI',
      appliedDate: '2024-04-25',
      status: 'Offer Extended',
      statusColor: 'bg-green-100 text-green-700',
      stage: 'Offer',
      progress: 100,
    },
    {
      id: 4,
      jobTitle: 'Business Analyst',
      company: 'PT BMI',
      appliedDate: '2024-04-20',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-700',
      stage: 'Rejected',
      progress: 0,
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      date: '2024-05-15',
      time: '10:00 AM',
      type: 'Video Call',
      interviewer: 'John Smith',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      date: '2024-05-18',
      time: '2:00 PM',
      type: 'In-person',
      interviewer: 'Sarah Johnson',
    },
  ];

  const stats = [
    {
      title: 'Active Applications',
      value: '12',
      icon: FileText,
      color: 'blue',
      trend: 5,
    },
    {
      title: 'Interview Scheduled',
      value: '2',
      icon: Calendar,
      color: 'green',
      trend: 2,
    },
    {
      title: 'Profile Views',
      value: '48',
      icon: TrendingUp,
      color: 'purple',
      trend: 12,
    },
  ];

  const getProgressColor = (status) => {
    if (status === 'Offer Extended') return 'bg-green-500';
    if (status === 'Interview Scheduled') return 'bg-blue-500';
    if (status === 'Under Review') return 'bg-yellow-500';
    return 'bg-slate-300';
  };

  return (
    <div className="bg-bmi-soft min-h-screen flex flex-col">
      <Navbar userRole="applicant" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          items={sidebarItems}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole="applicant"
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
                  My Dashboard
                </h1>
              </div>
              <button className="relative p-2 hover:bg-bmi-soft rounded-lg">
                <Bell size={24} className="text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
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

            {/* Applications Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Application Progress */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-bmi-navy">
                      Your Applications
                    </h2>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="border border-slate-100 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-bmi-navy">
                              {app.jobTitle}
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">
                              Applied on {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${app.statusColor}`}
                          >
                            {app.status}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(app.status)} transition-all`}
                              style={{ width: `${app.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-600 w-8">
                            {app.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Interviews */}
              <div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 h-full">
                  <h2 className="text-xl font-bold text-bmi-navy mb-6">
                    Upcoming Interviews
                  </h2>

                  <div className="space-y-4">
                    {upcomingInterviews.map((interview) => (
                      <div
                        key={interview.id}
                        className="border-l-4 border-bmi-blue bg-blue-50 rounded-lg p-4"
                      >
                        <p className="font-semibold text-bmi-navy text-sm mb-2">
                          {interview.jobTitle}
                        </p>
                        <div className="space-y-1 text-xs text-slate-600">
                          <p className="flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(interview.date).toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock size={14} />
                            {interview.time}
                          </p>
                          <p>{interview.type}</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          Join Call
                        </Button>
                      </div>
                    ))}

                    {upcomingInterviews.length === 0 && (
                      <div className="text-center py-8 text-slate-600">
                        <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No interviews scheduled</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Application Steps */}
            <div className="mt-8 bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-bmi-navy mb-6">
                How Our Process Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Submit Application',
                    desc: 'Complete your application form',
                  },
                  {
                    step: '2',
                    title: 'Initial Review',
                    desc: 'We review your qualifications',
                  },
                  {
                    step: '3',
                    title: 'Interview',
                    desc: 'Meet with our hiring team',
                  },
                  {
                    step: '4',
                    title: 'Offer',
                    desc: 'Receive your job offer',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-bmi-navy text-white rounded-full flex items-center justify-center font-bold mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-center mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 text-center">
                        {item.desc}
                      </p>
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-6 left-[60%] w-[40%] h-0.5 bg-bmi-blue" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
