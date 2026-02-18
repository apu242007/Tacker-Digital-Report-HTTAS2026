import React from 'react';
import { TraceabilityItem } from '../types';

interface Props {
  data: TraceabilityItem[];
  onChange: (id: string, field: keyof TraceabilityItem, value: string | boolean) => void;
}

export const TraceabilityTable: React.FC<Props> = ({ data, onChange }) => {
  return (
    <>
      {/* Vista tabla - tablet/pc y print */}
      <div className="hidden sm:block print:block overflow-x-auto shadow-sm border border-gray-300 rounded-sm">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-gray-100 font-bold text-gray-700">
            <tr>
              <th className="border p-2 w-24">Código</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2 w-20">Lote</th>
              <th className="border p-2 w-20">Serie</th>
              <th className="border p-2 w-12 text-center">Si</th>
              <th className="border p-2 w-1/4">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border p-1 text-gray-800 font-mono text-xs">{item.code}</td>
                <td className="border p-1 text-xs">{item.description}</td>
                <td className="border p-1">
                  <input type="text" value={item.lot} onChange={(e) => onChange(item.id, 'lot', e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs" placeholder="-" title="Lote" />
                </td>
                <td className="border p-1">
                  <input type="text" value={item.serie} onChange={(e) => onChange(item.id, 'serie', e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs" placeholder="-" title="Serie" />
                </td>
                <td className="border p-1 text-center">
                  <input type="checkbox" checked={item.checked} onChange={(e) => onChange(item.id, 'checked', e.target.checked)} className="h-4 w-4 text-tackerRed focus:ring-tackerRed" title="Aprobado" />
                </td>
                <td className="border p-1">
                  <input type="text" value={item.observations} onChange={(e) => onChange(item.id, 'observations', e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-gray-600 italic text-xs" title="Observaciones" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista tarjeta - solo mobile (oculto en print) */}
      <div className="sm:hidden print:hidden space-y-3">
        {data.map((item, index) => (
          <div key={item.id} className={`border border-gray-300 rounded-lg p-3 shadow-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-tackerRed">{item.code}</span>
              <label className="flex items-center gap-1 text-xs font-bold">
                <input type="checkbox" checked={item.checked} onChange={(e) => onChange(item.id, 'checked', e.target.checked)} className="h-4 w-4 text-tackerRed" title="Aprobado" />
                <span className={item.checked ? 'text-green-700' : 'text-gray-400'}>{item.checked ? 'OK' : 'Pend.'}</span>
              </label>
            </div>
            <p className="text-xs text-gray-700 mb-2">{item.description}</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500 block mb-0.5">Lote</label>
                <input type="text" value={item.lot} onChange={(e) => onChange(item.id, 'lot', e.target.value)} className="w-full border-b border-gray-300 bg-transparent outline-none text-xs py-1 focus:border-tackerRed" placeholder="-" title="Lote" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-0.5">Serie</label>
                <input type="text" value={item.serie} onChange={(e) => onChange(item.id, 'serie', e.target.value)} className="w-full border-b border-gray-300 bg-transparent outline-none text-xs py-1 focus:border-tackerRed" placeholder="-" title="Serie" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 block mb-0.5">Observaciones</label>
                <input type="text" value={item.observations} onChange={(e) => onChange(item.id, 'observations', e.target.value)} className="w-full border-b border-gray-300 bg-transparent outline-none text-xs py-1 italic focus:border-tackerRed" title="Observaciones" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}; 
