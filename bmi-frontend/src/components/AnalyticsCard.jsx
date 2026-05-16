import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * AnalyticsCard Component - Display analytics metrics with trend
 */
export default function AnalyticsCard({
  title,
  value,
  trend = null,
  trendDirection = 'up',
  unit = '',
  icon: Icon,
  color = 'primary',
}) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
  };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-neutral-900">{value}</p>
            {unit && <span className="text-sm text-neutral-500">{unit}</span>}
          </div>
        </div>
        
        {Icon && (
          <div className={clsx('p-3 rounded-lg', colorMap[color])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>

      {trend !== null && (
        <div className="flex items-center gap-2 text-sm">
          {trendDirection === 'up' ? (
            <TrendingUp className={clsx('h-4 w-4', trend >= 0 ? 'text-success' : 'text-error')} />
          ) : (
            <TrendingDown className={clsx('h-4 w-4', trend < 0 ? 'text-success' : 'text-error')} />
          )}
          <span className={clsx('font-semibold', trend >= 0 ? 'text-success' : 'text-error')}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-neutral-600">dari bulan lalu</span>
        </div>
      )}
    </div>
  );
}
