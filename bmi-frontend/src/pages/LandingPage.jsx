import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import Button from '../components/Button';

export default function LandingPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Technology',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'We are looking for an experienced Frontend Developer to join our growing team. Must have 5+ years experience with React and modern web technologies.',
      applicants: 45,
    },
    {
      id: 2,
      title: 'HR Manager',
      department: 'Human Resources',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '5 days ago',
      description: 'Lead our HR department with strategic initiatives. Experience in talent management and organizational development required.',
      applicants: 28,
    },
    {
      id: 3,
      title: 'Business Analyst',
      department: 'Operations',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Analyze business processes and drive improvements. Strong analytical and communication skills required.',
      applicants: 32,
    },
    {
      id: 4,
      title: 'Product Designer',
      department: 'Design',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Create beautiful and intuitive user interfaces. Portfolio showcasing UI/UX work required.',
      applicants: 38,
    },
    {
      id: 5,
      title: 'Data Scientist',
      department: 'Technology',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Build machine learning models to drive business insights. Python and SQL expertise required.',
      applicants: 25,
    },
    {
      id: 6,
      title: 'Finance Analyst',
      department: 'Finance',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      posted: '4 days ago',
      description: 'Support financial planning and analysis. Experience with financial modeling and Excel required.',
      applicants: 19,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I apply for a position?',
      answer: 'Click the "Apply Now" button on any job listing, create or login to your account, and complete the application form. You can track your application status in your dashboard.',
    },
    {
      id: 2,
      question: 'What is the typical hiring timeline?',
      answer: 'Our typical hiring process takes 2-4 weeks from application to offer. This includes initial screening, interviews, and final assessment rounds.',
    },
    {
      id: 3,
      question: 'Can I apply for multiple positions?',
      answer: 'Yes, you can apply for multiple positions. We encourage you to apply for roles that match your skills and experience.',
    },
    {
      id: 4,
      question: 'Do you offer internships?',
      answer: 'Yes, we offer internship programs throughout the year. Please check our careers page for current internship opportunities.',
    },
    {
      id: 5,
      question: 'What benefits do employees get?',
      answer: 'We offer competitive salaries, health insurance, professional development, flexible work arrangements, and a collaborative work environment.',
    },
  ];

  const handleApply = (jobId) => {
    // Navigate to register/login page
    window.location.href = '/register';
  };

  return (
    <div className="bg-bmi-soft min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-bmi-navy mb-6 leading-tight">
                Find Your Perfect Opportunity at{' '}
                <span className="text-bmi-blue">BMI</span>
              </h1>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Join PT Bumi Menara Internusa and be part of a dynamic team building innovative solutions for the enterprise market. Explore career opportunities that match your ambitions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg">
                    Start Applying Now
                    <ChevronDown size={20} className="rotate-90" />
                  </Button>
                </Link>
                <button className="border-2 border-bmi-navy text-bmi-navy px-6 py-3 rounded-lg font-medium hover:bg-bmi-soft transition">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-bmi-navy">120+</p>
                  <p className="text-sm text-slate-600 mt-1">Active Jobs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-bmi-navy">5K+</p>
                  <p className="text-sm text-slate-600 mt-1">Applicants</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-bmi-navy">100%</p>
                  <p className="text-sm text-slate-600 mt-1">Transparent</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-bmi-blue/10 to-bmi-navy/10 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-bmi-navy rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase size={48} className="text-white" />
                  </div>
                  <p className="text-bmi-navy font-semibold">Enterprise Careers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-bmi-navy mb-4">
              Featured Opportunities
            </h2>
            <p className="text-slate-700 text-lg">
              Discover roles across all departments that align with your career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>

          <div className="text-center">
            <button className="text-bmi-navy font-semibold hover:text-bmi-blue transition flex items-center gap-2 mx-auto">
              View All Jobs
              <ChevronDown size={20} className="rotate-90" />
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-bmi-navy mb-4">
              Our Recruitment Process
            </h2>
            <p className="text-slate-700 text-lg">
              Clear and transparent steps to help you understand our hiring journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: '1',
                title: 'Apply',
                description: 'Submit your application and resume',
              },
              {
                number: '2',
                title: 'Screen',
                description: 'We review your qualifications',
              },
              {
                number: '3',
                title: 'Interview',
                description: 'Meet with our team members',
              },
              {
                number: '4',
                title: 'Offer',
                description: 'Receive and negotiate your offer',
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white border-2 border-bmi-navy rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-bmi-navy text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-bmi-navy mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-6 h-0.5 bg-bmi-blue transform translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-bmi-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-700 text-lg">
              Find answers to common questions about our recruitment process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <button
                key={faq.id}
                onClick={() =>
                  setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                }
                className="w-full bg-white border border-slate-100 rounded-xl p-6 text-left hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-bmi-navy text-lg">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`text-bmi-blue transition ${
                      expandedFaq === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {expandedFaq === faq.id && (
                  <p className="text-slate-700 mt-4 text-base">{faq.answer}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bmi-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Apply now and take the next step in your career with BMI.
          </p>
          <Link to="/register">
            <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
              Apply Now
              <ChevronDown size={20} className="rotate-90" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
