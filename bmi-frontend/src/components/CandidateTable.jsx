import { clsx } from 'clsx';
import { Eye, FileText, Calendar, ChevronRight } from 'lucide-react';

/**
 * CandidateTable Component - Display candidates in a modern table format
 */
export default function CandidateTable({
  candidates = [],
  onView,
  onScheduleInterview,
  onDownloadCV,
  isLoading = false,
}) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      'interview': { bg: 'bg-info/10', text: 'text-info', label: 'Wawancara' },
      'reviewing': { bg: 'bg-warning/10', text: 'text-warning', label: 'Dalam Review' },
      'accepted': { bg: 'bg-success/10', text: 'text-success', label: 'Diterima' },
      'rejected': { bg: 'bg-error/10', text: 'text-error', label: 'Ditolak' },
    };
    
    const config = statusConfig[status?.toLowerCase()] || statusConfig.reviewing;
    
    return (
      <span className={clsx('px-3 py-1 rounded-full text-xs font-semibold', config.bg, config.text)}>
        {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-neutral-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
            <FileText className="h-8 w-8 text-neutral-400" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-1">Tidak ada kandidat</h3>
        <p className="text-neutral-600">Belum ada data kandidat untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Nama Kandidat</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Posisi</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">Tanggal</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      {candidate.full_name?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">{candidate.full_name}</p>
                    <p className="text-sm text-neutral-600 truncate">{candidate.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-neutral-900">{candidate.job_position || '-'}</td>
              <td className="px-6 py-4">
                {getStatusBadge(candidate.status)}
              </td>
              <td className="px-6 py-4 text-sm text-neutral-600">
                {candidate.applied_date ? new Date(candidate.applied_date).toLocaleDateString('id-ID') : '-'}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onView?.(candidate.id)}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Lihat profil"
                  >
                    <Eye className="h-4 w-4 text-neutral-600" />
                  </button>
                  <button
                    onClick={() => onScheduleInterview?.(candidate.id)}
                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                    title="Jadwalkan wawancara"
                  >
                    <Calendar className="h-4 w-4 text-primary" />
                  </button>
                  {candidate.cv && (
                    <button
                      onClick={() => onDownloadCV?.(candidate.id)}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Unduh CV"
                    >
                      <FileText className="h-4 w-4 text-neutral-600" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
