import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function JobCard({ job, onApply }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-bmi-navy group-hover:text-bmi-blue transition">
              {job.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{job.department}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            job.type === 'Full-time'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {job.type}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-bmi-blue flex-shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-bmi-blue flex-shrink-0" />
          <span>{job.posted}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 mb-6 line-clamp-2">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {job.applicants} applicants
        </span>
        <button
          onClick={() => onApply(job.id)}
          className="flex items-center gap-2 bg-bmi-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-bmi-blue transition group/btn"
        >
          Apply Now
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
}
