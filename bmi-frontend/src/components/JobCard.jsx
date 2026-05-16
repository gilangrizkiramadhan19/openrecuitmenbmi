import { clsx } from 'clsx';
import { MapPin, Clock, Briefcase, ArrowRight, Heart } from 'lucide-react';

/**
 * JobCard Component - Display job listing with modern design
 * Features hover effects, bookmark functionality, and modern styling
 */
export default function JobCard({
  job,
  onApply,
  onBookmark,
  isBookmarked = false,
  showCategory = true,
}) {
  return (
    <div className={clsx(
      'card p-6 group transition-all duration-300',
      'hover:shadow-elevated hover:-translate-y-2',
      'flex flex-col'
    )}>
      {/* Header with title and badge */}
      <div className="flex items-start justify-between mb-4 pb-4 border-b border-neutral-100">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary transition line-clamp-1">
            {job.title}
          </h3>
          <p className="text-sm text-neutral-500 mt-1">
            {job.department || job.company}
          </p>
        </div>

        {/* Type Badge */}
        <span className={clsx(
          'ml-2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap',
          job.type === 'Full-time'
            ? 'bg-success bg-opacity-10 text-success'
            : job.type === 'Part-time'
            ? 'bg-warning bg-opacity-10 text-warning'
            : 'bg-info bg-opacity-10 text-info'
        )}>
          {job.type}
        </span>
      </div>

      {/* Job details grid */}
      <div className="space-y-3 mb-4 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="line-clamp-1">{job.location}</span>
        </div>

        {job.salary && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
            <span>{job.salary}</span>
          </div>
        )}

        {job.posted && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
            <span>{job.posted}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {job.description && (
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {job.description}
        </p>
      )}

      {/* Category tags */}
      {showCategory && job.category && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Array.isArray(job.category) ? (
            job.category.map((cat) => (
              <span
                key={cat}
                className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded"
              >
                {cat}
              </span>
            ))
          ) : (
            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
              {job.category}
            </span>
          )}
        </div>
      )}

      {/* Footer with applicant count and action buttons */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          {job.applicants ? `${job.applicants} applicants` : 'Be first to apply'}
        </span>

        <div className="flex items-center gap-2">
          {onBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(job.id);
              }}
              className={clsx(
                'p-2 rounded-lg transition-all',
                isBookmarked
                  ? 'bg-primary bg-opacity-10 text-primary'
                  : 'hover:bg-neutral-100 text-neutral-600'
              )}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark job'}
            >
              <Heart className={clsx('h-5 w-5', isBookmarked && 'fill-current')} />
            </button>
          )}

          <button
            onClick={() => onApply?.(job.id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold',
              'bg-primary text-white hover:bg-primary-600 active:scale-95',
              'transition-all duration-200 shadow-base hover:shadow-md group-hover/btn'
            )}
          >
            Apply
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}
