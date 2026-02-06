import React from 'react';
import { FileText, ArrowRight, Settings } from 'lucide-react';

interface Props {
  onNavigate: (route: string) => void;
}

export const Home: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* Hero / Header */}
      <header className="bg-white shadow-sm border-b-4 border-tackerRed">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             {/* Logo Placeholder - Text based matching brand */}
             <div className="flex flex-col">
                <span className="text-3xl font-black italic tracking-tighter text-tackerRed leading-none">
                    TACKER
                </span>
                <span className="text-xs font-normal text-tackerDark tracking-[0.3em] uppercase">
                    Solutions
                </span>
             </div>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Portal de Informes Digitales
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Seleccione un Informe</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Bienvenido al sistema de gestión de reportes de taller. Seleccione el checklist correspondiente a la herramienta que desea inspeccionar o reparar.
            </p>
        </div>

        {/* Grid of Checklists */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: POCOP001 */}
            <div 
                onClick={() => onNavigate('checklist-001')}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer group"
            >
                <div className="h-2 bg-tackerRed w-full group-hover:h-3 transition-all"></div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-50 text-tackerRed rounded-full">
                            <FileText size={24} />
                        </div>
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                            REV. A2-4
                        </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Empaque Recuperable TKR1
                    </h3>
                    <p className="text-sm text-gray-500 font-mono mb-4">
                        POCOP001-A2-4 | 0101-5000
                    </p>

                    <div className="flex items-center text-tackerRed font-bold text-sm group-hover:translate-x-2 transition-transform">
                        Iniciar Reporte <ArrowRight size={16} className="ml-2" />
                    </div>
                </div>
            </div>

            {/* Placeholder for future lists */}
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-gray-400 min-h-[200px]">
                <Settings size={32} className="mb-3 opacity-50" />
                <span className="text-sm font-medium">Próximamente más modelos</span>
            </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-tackerDark text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Tacker Solutions. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};