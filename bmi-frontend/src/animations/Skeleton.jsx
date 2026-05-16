/**
 * Skeleton loading components with shimmer effect.
 */

export function SkeletonLine({ className = '' }) {
  return (
    <div
      className={`bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:400%_100%] animate-shimmer rounded-md ${className}`}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 space-y-3 ${className}`}>
      <SkeletonLine className="h-5 w-2/3" />
      <SkeletonLine className="h-4 w-1/2" />
      <SkeletonLine className="h-4 w-3/4" />
      <div className="flex gap-2 pt-2">
        <SkeletonLine className="h-6 w-16 rounded-full" />
        <SkeletonLine className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonStatCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <SkeletonLine className="h-10 w-10 rounded-lg" />
      </div>
      <SkeletonLine className="h-3 w-1/2 mb-2" />
      <SkeletonLine className="h-8 w-16" />
    </div>
  );
}

export function SkeletonJobCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 border-l-4 border-l-slate-200 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <SkeletonLine className="h-6 w-3/5" />
          <SkeletonLine className="h-4 w-2/5" />
          <div className="flex gap-4">
            <SkeletonLine className="h-4 w-24" />
            <SkeletonLine className="h-4 w-20" />
          </div>
          <SkeletonLine className="h-4 w-full" />
          <div className="flex gap-2">
            <SkeletonLine className="h-6 w-24 rounded-full" />
            <SkeletonLine className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <SkeletonLine className="h-8 w-28 rounded-lg shrink-0" />
      </div>
    </div>
  );
}
