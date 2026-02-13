import React from 'react';
import { TraceabilityItem } from '../types';

interface Props {
  data: TraceabilityItem[];
  onChange: (id: string, field: keyof TraceabilityItem, value: string | boolean) => void;
}

export const TraceabilityTable: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="overflow-x-auto shadow-sm border border-gray-300 rounded-sm">
      <table className="w-full text-xs md:text-sm text-left border-collapse">
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
              <td className="border p-1 text-gray-800 font-mono">{item.code}</td>
              <td className="border p-1">{item.description}</td>
              <td className="border p-1">
                <input 
                  type="text" 
                  value={item.lot}
                  onChange={(e) => onChange(item.id, 'lot', e.target.value)}
                  className="w-full bg-transparent outline-none focus:bg-blue-50"
                  placeholder="-"
                />
              </td>
              <td className="border p-1">
                <input 
                  type="text" 
                  value={item.serie}
                  onChange={(e) => onChange(item.id, 'serie', e.target.value)}
                  className="w-full bg-transparent outline-none focus:bg-blue-50"
                  placeholder="-"
                />
              </td>
              <td className="border p-1 text-center">
                <input 
                  type="checkbox" 
                  checked={item.checked}
                  onChange={(e) => onChange(item.id, 'checked', e.target.checked)}
                  className="h-4 w-4 text-tackerRed focus:ring-tackerRed"
                />
              </td>
              <td className="border p-1">
                <input 
                  type="text" 
                  value={item.observations}
                  onChange={(e) => onChange(item.id, 'observations', e.target.value)}
                  className="w-full bg-transparent outline-none focus:bg-blue-50 text-gray-600 italic"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 
