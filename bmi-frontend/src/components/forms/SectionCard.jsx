export default function SectionCard({ title, icon: Icon, children, description }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-100">
        {Icon && (
          <div className="p-3 bg-bmi-soft/50 text-bmi-navy rounded-2xl">
            <Icon size={24} />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-bmi-navy">{title}</h2>
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
