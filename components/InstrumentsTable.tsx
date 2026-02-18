import React from 'react';
import { InstrumentItem } from '../types';

interface Props {
  instruments: InstrumentItem[];
  onChange: (id: string, field: keyof InstrumentItem, value: string) => void;
}

export const InstrumentsTable: React.FC<Props> = ({ instruments, onChange }) => {
  // Split instruments into two columns for display
  const midPoint = Math.ceil(instruments.length / 2);
  const leftColumn = instruments.slice(0, midPoint);
  const rightColumn = instruments.slice(midPoint);

  const renderRow = (item: InstrumentItem) => (
    <tr key={item.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
      <td className="border-r border-gray-300 p-2 text-xs bg-gray-50 font-medium text-gray-700 align-middle break-words">
        {item.name}
      </td>
      <td className="border-r border-gray-300 p-1 text-xs align-middle">
          <input 
            type="text" 
            value={item.code}
            onChange={(e) => onChange(item.id, 'code', e.target.value)}
            className="w-full h-9 px-2 bg-transparent outline-none font-mono focus:bg-blue-50 rounded-sm transition-colors text-gray-900"
            placeholder="-"
            title={`Código: ${item.name}`}
          />
      </td>
      <td className="border-r border-gray-300 p-1 w-24 align-middle">
        <input 
          type="date" 
          value={item.expiration}
          onChange={(e) => onChange(item.id, 'expiration', e.target.value)}
          className="w-full h-9 bg-transparent outline-none text-center text-xs focus:bg-blue-50 rounded-sm"
          title={`Fecha vencimiento: ${item.name}`}
        />
      </td>
      <td className={`p-1 w-16 text-center text-xs font-bold align-middle transition-colors ${
          item.status === 'VENC' ? 'bg-red-500 text-white' : 
          item.status === 'OK' ? 'bg-green-100 text-green-800' : 'bg-white'
      }`}>
        <select 
          value={item.status}
          onChange={(e) => onChange(item.id, 'status', e.target.value as any)}
          className="bg-transparent outline-none w-full h-full appearance-none text-center cursor-pointer py-1"
          title={`Estado: ${item.name}`}
        >
          <option value="" className="text-black">-</option>
          <option value="VENC" className="text-black">VENC</option>
          <option value="OK" className="text-black">OK</option>
        </select>
      </td>
    </tr>
  );

  return (
    <div className="mt-6 shadow-sm rounded-sm overflow-hidden border border-gray-300">
       <div className="bg-tackerRed text-white font-bold px-3 py-2 text-sm uppercase">
        6.1. Instrumentos Utilizados
      </div>
      {/* Desktop / Tablet / Print: dos columnas lado a lado */}
      <div className="hidden sm:flex print:flex flex-col lg:flex-row bg-white divide-y lg:divide-y-0 lg:divide-x divide-gray-300">
        <div className="w-full lg:w-1/2">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100 text-xs border-b border-gray-300 text-gray-600 uppercase tracking-wider">
                <th className="border-r border-gray-300 p-2 text-left font-bold w-[30%]">Instrumento</th>
                <th className="border-r border-gray-300 p-2 text-left font-bold">Código</th>
                <th className="border-r border-gray-300 p-2 w-24 font-bold text-center">Vence</th>
                <th className="p-2 w-16 font-bold text-center">Est.</th>
              </tr>
            </thead>
            <tbody>{leftColumn.map(renderRow)}</tbody>
          </table>
        </div>
        {rightColumn.length > 0 && (
          <div className="w-full lg:w-1/2">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-gray-100 text-xs border-b border-gray-300 text-gray-600 uppercase tracking-wider">
                  <th className="border-r border-gray-300 p-2 text-left font-bold w-[30%]">Instrumento</th>
                  <th className="border-r border-gray-300 p-2 text-left font-bold">Código</th>
                  <th className="border-r border-gray-300 p-2 w-24 font-bold text-center">Vence</th>
                  <th className="p-2 w-16 font-bold text-center">Est.</th>
                </tr>
              </thead>
              <tbody>{rightColumn.map(renderRow)}</tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile: tabla única scrollable (oculto en print) */}
      <div className="sm:hidden print:hidden overflow-x-auto bg-white">
        <table className="w-full border-collapse min-w-[360px]">
          <thead>
            <tr className="bg-gray-100 text-xs border-b border-gray-300 text-gray-600 uppercase tracking-wider">
              <th className="border-r border-gray-300 p-2 text-left font-bold">Instrumento</th>
              <th className="border-r border-gray-300 p-2 text-left font-bold">Código</th>
              <th className="border-r border-gray-300 p-2 w-20 font-bold text-center">Vence</th>
              <th className="p-2 w-14 font-bold text-center">Est.</th>
            </tr>
          </thead>
          <tbody>
            {[...leftColumn, ...rightColumn].map(renderRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 
