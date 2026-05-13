import { useRef } from 'react';
import { Camera, User } from 'lucide-react';

export default function UploadPhoto({ previewUrl, onFileSelect, error }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative mb-4 group cursor-pointer rounded-full p-1 transition-all ${error ? 'bg-red-100' : 'bg-transparent'}`}
        onClick={handleClick}
      >
        <div className={`w-32 h-32 rounded-full border-4 shadow-lg overflow-hidden flex items-center justify-center transition-all ${error ? 'border-red-400' : 'border-white bg-slate-100'}`}>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <User size={48} className={error ? 'text-red-400' : 'text-slate-400'} />
          )}
        </div>
        
        {/* Overlay Hover */}
        <div className="absolute inset-1 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="text-white" size={24} />
        </div>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/jpeg, image/png, image/jpg" 
        className="hidden" 
      />
      
      <button 
        type="button"
        className="text-sm font-semibold text-bmi-blue hover:text-bmi-navy transition-colors focus:outline-none"
        onClick={handleClick}
      >
        Unggah Pas Foto
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
