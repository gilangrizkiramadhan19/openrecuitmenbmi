import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatCard Component - Display key metrics and statistics
 * Used in dashboards to show important KPIs
 */
export default function StatCard({
  title,
  value,
  icon: Icon,
  trend = null,
  trendDirection = 'up',
  color = 'primary',
  description = null,
  onClick = null,
  isLoading = false,
}) {
  const colorClasses = {
    primary: 'bg-primary bg-opacity-10 text-primary',
    navy: 'bg-navy bg-opacity-10 text-navy',
    cyan: 'bg-cyan bg-opacity-10 text-cyan',
    success: 'bg-success bg-opacity-10 text-success',
    warning: 'bg-warning bg-opacity-10 text-warning',
    error: 'bg-error bg-opacity-10 text-error',
  };

  const trendColor = trendDirection === 'up' ? 'text-success' : 'text-error';

  return (
    <div
      className={clsx(
        'card p-6 group',
        onClick && 'cursor-pointer',
        'hover:shadow-lg transition-all duration-300',
        onClick && 'hover:-translate-y-1'
      )}
      onClick={onClick}
    >
      {/* Header with Icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-500 mb-1">
            {title}
          </p>
          {isLoading ? (
            <div className="skeleton h-8 w-20 rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-neutral-900">
              {value}
            </p>
          )}
        </div>

        {Icon && (
          <div className={clsx(colorClasses[color], 'p-3 rounded-lg')}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>

      {/* Trend & Description */}
      {(trend !== null || description) && (
        <div className="flex items-center gap-3">
          {trend !== null && (
            <div className="flex items-center gap-1">
              {trendDirection === 'up' ? (
                <TrendingUp className={clsx(trendColor, 'h-4 w-4')} />
              ) : (
                <TrendingDown className={clsx(trendColor, 'h-4 w-4')} />
              )}
              <span className={clsx('text-xs font-semibold', trendColor)}>
                {trendDirection === 'up' ? '+' : '-'}{Math.abs(trend)}%
              </span>
              <span className="text-xs text-neutral-500">
                from last month
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-neutral-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}
