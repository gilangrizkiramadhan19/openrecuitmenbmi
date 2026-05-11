import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Sidebar({ items, isOpen, onClose, userRole }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-100 pt-16 md:pt-0 w-64 transition-transform md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header for mobile */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-100">
          <span className="font-bold text-bmi-navy">Menu</span>
          <button onClick={onClose} className="p-2 hover:bg-bmi-soft rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-bmi-navy text-white shadow-md'
                    : 'text-slate-700 hover:bg-bmi-soft'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
