import React from 'react';
import { FileText, ArrowRight, Settings, Wrench, ClipboardCheck, Shield, Cable, Circle, Anchor } from 'lucide-react';

interface Props {
  onNavigate: (route: string) => void;
}

const empaques = [
  { route: 'checklist-001', title: 'Empaque TKR1', size: '5"', code: '0101-5000' },
  { route: 'checklist-5500', title: 'Empaque TKR1', size: '5 1/2"', code: '0101-5500' },
  { route: 'checklist-7000', title: 'Empaque TKR1', size: '7"', code: '0101-7000', variant: '0101' },
  { route: 'checklist-0178', title: 'Empaque TKR1', size: '7"', code: '0178-5000', variant: '0178' },
  { route: 'checklist-9580', title: 'Empaque TKR1', size: '9 5/8"', code: '0101-9580' },
];

const settingTools = [
  { route: 'checklist-scrh1605', title: 'Setting Tool SCRH', size: '7"', code: '1605-7000' },
  { route: 'checklist-scrh5500', title: 'Setting Tool SCRH', size: '5"', code: '1605-5500' },
  { route: 'checklist-snt1641', title: 'Setting Tool SNT', size: '5"', code: '1641-5000' },
  { route: 'checklist-snt2-1667', title: 'Setting Tool SNT2', size: '7"', code: '1667-7000' },
];

const kits = [
  { route: 'checklist-kitwireline', title: 'Kit Wire Line', size: '5" - 5 1/2"', code: '1617-5500' },
  { route: 'checklist-stinger', title: 'Stinger para Cementar', size: '5"', code: '1621-5000' },
];

const tapones = [
  { route: 'checklist-tpr1', title: 'Tapón Recuperable TPR1', size: '5"', code: '0201-5000' },
];

const pescadores = [
  { route: 'checklist-pescador-tcr2', title: 'Pescador TCR2', size: '5"', code: '1102-5000' },
  { route: 'checklist-pescador-tcr2-5500', title: 'Pescador TCR2', size: '5 1/2"', code: '1102-5500' },
  { route: 'checklist-pescador-tcr2-9580', title: 'Pescador TCR2', size: '9 5/8"', code: '1102-9580' },
];

const retenedores = [
  { route: 'checklist-retenedor-cemento', title: 'Retenedor de Cemento', size: '7"', code: '1505-7000' },
  { route: 'checklist-retenedor-cemento-5500', title: 'Retenedor de Cemento', size: '5 1/2"', code: '1505-5500' },
  { route: 'checklist-retenedor-1540-5500', title: 'Retenedor de Cemento', size: '7"', code: '1540-5500' },
  { route: 'checklist-retenedor-1540-5500-2', title: 'Retenedor de Cemento', size: '5 1/2"', code: '1540-5500', variant: '14-23#' },
];

export const Home: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 font-sans flex flex-col">
      {/* Hero / Header */}
      <header className="bg-gradient-to-r from-tackerDark via-gray-900 to-tackerDark shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
               <div className="bg-tackerRed p-3 rounded-xl shadow-lg">
                  <Wrench size={32} className="text-white" />
               </div>
               <div className="flex flex-col">
                  <span className="text-4xl font-black italic tracking-tighter text-white leading-none">
                      TACKER
                  </span>
                  <span className="text-xs font-medium text-gray-400 tracking-[0.4em] uppercase">
                      Solutions
                  </span>
               </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield size={16} className="text-tackerRed" />
              <span className="text-sm text-gray-300 font-medium">
                Portal de Informes Digitales
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-center gap-8 md:gap-16">
            <div className="text-center">
              <span className="block text-2xl font-bold text-tackerRed">{empaques.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Empaques</span>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-tackerRed">{settingTools.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Setting Tools</span>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-tackerRed">{kits.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Kits</span>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-tackerRed">{tapones.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Tapones</span>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-tackerRed">{pescadores.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Pescadores</span>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-tackerRed">{retenedores.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Retenedores</span>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-tackerRed">{empaques.length + settingTools.length + kits.length + tapones.length + pescadores.length + retenedores.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Total Reportes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        
        <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Seleccione un <span className="text-tackerRed">Informe</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                Sistema de gestión de reportes de taller. Seleccione el checklist correspondiente a la herramienta que desea inspeccionar o reparar.
            </p>
        </div>

        {/* EMPAQUES SECTION */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Empaques Recuperables TKR1</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {empaques.map((item) => (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-tackerRed hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {item.size}
                    </span>
                    {item.variant && (
                      <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">
                        {item.variant}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-tackerRed transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {item.code}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">POCOP001-A2-4</span>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-tackerRed group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SETTING TOOLS SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Settings size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Setting Tools Hidráulicas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {settingTools.map((item) => (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-tackerRed hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-50 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                      {item.size}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-tackerRed transition-colors text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {item.code}
                  </p>
                  <div className="flex items-center justify-end">
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-tackerRed group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* KITS SECTION */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Cable size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Kits y Accesorios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kits.map((item) => (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-tackerRed hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-50 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                      {item.size}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-tackerRed transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {item.code}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">POCOP001-A2-4</span>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-tackerRed group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* TAPONES SECTION */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
              <Circle size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Tapones Recuperables</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tapones.map((item) => (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-tackerRed hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                      {item.size}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-tackerRed transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {item.code}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">POCOP001-A2-4</span>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-tackerRed group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* PESCADORES SECTION */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Anchor size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Pescadores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pescadores.map((item) => (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-tackerRed hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-50 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                      {item.size}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-tackerRed transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {item.code}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">POCOP001-A2-4</span>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-tackerRed group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
        {/* RETENEDORES SECTION */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
              <Shield size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Retenedores de Cemento</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {retenedores.map((item) => (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-tackerRed hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-50 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">
                      {item.size}
                    </span>
                    {item.variant && (
                      <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">
                        {item.variant}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-tackerRed transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {item.code}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">POCOP001-A2-4</span>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-tackerRed group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-tackerDark text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={20} className="text-tackerRed" />
              <span className="font-bold text-white">Tacker Solutions</span>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};