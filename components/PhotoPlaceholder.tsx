import React, { useRef } from 'react';
import { Camera, Trash2, Plus } from 'lucide-react';

interface Props {
  title: string;
  images: string[];
  onAdd: (newImages: string[]) => void;
  onRemove: (index: number) => void;
}

export const PhotoPlaceholder: React.FC<Props> = ({ title, images, onAdd, onRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const promises = files.map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              resolve(e.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(base64Images => {
        onAdd(base64Images);
        // Reset input so same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
      });
    }
  };

  return (
    <div className="border border-black break-inside-avoid bg-white">
       <div className="p-1 text-sm font-bold border-b border-gray-200 bg-gray-50 flex justify-between items-center">
           <span>{title}</span>
           <span className="text-xs text-gray-500 font-normal print:hidden">
               {images.length} {images.length === 1 ? 'foto' : 'fotos'}
           </span>
       </div>
       
       <div className="p-2">
            {/* Image Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative group aspect-square border border-gray-200 rounded overflow-hidden">
                            <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                            <button 
                                onClick={() => onRemove(idx)}
                                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                                title="Eliminar foto"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Area (Hidden when printing) */}
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="h-24 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition print:hidden"
            >
                <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                {images.length === 0 ? (
                    <>
                        <Camera size={32} />
                        <span className="mt-1 text-xs">Click para agregar fotos</span>
                    </>
                ) : (
                    <>
                        <Plus size={24} />
                        <span className="mt-1 text-xs">Agregar más</span>
                    </>
                )}
            </div>

            {/* Empty state for print only */}
            {images.length === 0 && (
                 <div className="hidden print:flex h-[200px] items-center justify-center text-gray-300 italic text-xs">
                     Sin imágenes adjuntas
                 </div>
            )}
       </div>
    </div>
  );
};