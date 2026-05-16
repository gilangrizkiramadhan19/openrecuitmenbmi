import { clsx } from 'clsx';
import { CheckCircle, Clock, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

/**
 * ApplicationTracker Component - Display application status timeline
 * Shows the current status and all stages of an application
 */
export default function ApplicationTracker({ 
  status = 'reviewing',
  appliedDate,
  reviewedDate,
  interviewDate,
  resultDate,
  jobTitle,
  companyName,
}) {
  const stages = [
    { key: 'applied', label: 'Applied', completed: ['applied', 'reviewing', 'interview', 'accepted', 'rejected'] },
    { key: 'reviewing', label: 'Reviewing', completed: ['reviewing', 'interview', 'accepted', 'rejected'] },
    { key: 'interview', label: 'Interview', completed: ['interview', 'accepted', 'rejected'] },
    { key: 'result', label: 'Result', completed: ['accepted', 'rejected'] },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === status);

  const getStageIcon = (stageKey) => {
    if (stageKey === status && status === 'rejected') {
      return <XCircle className="h-6 w-6 text-error" />;
    }
    if (stageKey === status && status === 'accepted') {
      return <CheckCircle className="h-6 w-6 text-success" />;
    }
    if (stages.find(s => s.key === stageKey)?.completed.includes(status)) {
      return <CheckCircle className="h-6 w-6 text-success" />;
    }
    if (stageKey === status) {
      return <Clock className="h-6 w-6 text-warning animate-spin" />;
    }
    return <AlertCircle className="h-6 w-6 text-neutral-300" />;
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-1">{jobTitle}</h3>
        <p className="text-sm text-neutral-600">{companyName}</p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isCompleted = stages.find(s => s.key === stage.key)?.completed.includes(status);
          const isCurrent = stage.key === status;
          
          return (
            <div key={stage.key}>
              <div className="flex items-center gap-4">
                <div className={clsx(
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                  isCurrent && status === 'rejected' ? 'bg-error/10' : 'bg-neutral-100',
                  isCurrent && status === 'accepted' ? 'bg-success/10' : '',
                  isCurrent && status === 'reviewing' ? 'bg-warning/10' : '',
                  isCurrent && status === 'interview' ? 'bg-info/10' : '',
                )}>
                  {getStageIcon(stage.key)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-900">{stage.label}</p>
                  <p className="text-sm text-neutral-500">
                    {isCurrent && 'Sedang dalam tahap ini'}
                    {isCompleted && !isCurrent && 'Sudah diselesaikan'}
                    {!isCompleted && !isCurrent && 'Belum dimulai'}
                  </p>
                </div>
              </div>
              
              {index < stages.length - 1 && (
                <div className="ml-5 mt-4 mb-4 h-8 border-l-2 border-neutral-200"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Status Badge */}
      <div className="mt-6 pt-4 border-t border-neutral-100">
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
          Status: {status === 'accepted' ? 'Diterima' : status === 'rejected' ? 'Ditolak' : status === 'interview' ? 'Wawancara' : 'Dalam Review'}
        </div>
      </div>
    </div>
  );
}
