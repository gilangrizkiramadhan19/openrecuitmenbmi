import { clsx } from 'clsx';
import { CheckCircle, Gift, DollarSign, Clock, Users, Briefcase } from 'lucide-react';

/**
 * JobBenefits Component - Display job benefits in an attractive grid
 */
export default function JobBenefits({ benefits = [] }) {
  const benefitIcons = {
    salary: DollarSign,
    health: Gift,
    schedule: Clock,
    team: Users,
    growth: Briefcase,
    default: CheckCircle,
  };

  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-neutral-900">Benefit & Fasilitas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((benefit, index) => {
          const Icon = benefitIcons[benefit.type] || benefitIcons.default;
          
          return (
            <div
              key={index}
              className="card p-4 flex items-start gap-4 group hover:shadow-lg transition-all"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-900 text-sm line-clamp-1">
                  {benefit.title}
                </p>
                {benefit.description && (
                  <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                    {benefit.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
