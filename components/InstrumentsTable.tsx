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
    <tr key={item.id} className="border-b border-gray-200">
      <td className="border-r border-gray-300 p-1 text-xs bg-gray-50">{item.name}</td>
      <td className="border-r border-gray-300 p-1 text-xs">
          <input 
            type="text" 
            value={item.code}
            onChange={(e) => onChange(item.id, 'code', e.target.value)}
            className="w-full bg-transparent outline-none font-mono"
            placeholder="-"
          />
      </td>
      <td className="border-r border-gray-300 p-1 w-20">
        <input 
          type="date" 
          value={item.expiration}
          onChange={(e) => onChange(item.id, 'expiration', e.target.value)}
          className="w-full bg-transparent outline-none text-center text-xs"
        />
      </td>
      <td className={`p-1 w-16 text-center text-xs font-bold ${item.status === 'VENC' ? 'bg-red-500 text-white' : item.status === 'OK' ? 'bg-green-100 text-green-800' : 'bg-white'}`}>
        <select 
          value={item.status}
          onChange={(e) => onChange(item.id, 'status', e.target.value as any)}
          className="bg-transparent outline-none w-full appearance-none text-center cursor-pointer"
        >
          <option value="" className="text-black"></option>
          <option value="VENC" className="text-black">VENC</option>
          <option value="OK" className="text-black">OK</option>
        </select>
      </td>
    </tr>
  );

  return (
    <div className="mt-4">
       <div className="bg-tackerRed text-white font-bold px-2 py-1 text-sm uppercase mb-0">
        6.1. Instrumentos Utilizados
      </div>
      <div className="flex border border-gray-300 border-t-0 bg-white">
        {/* Left Table */}
        <div className="w-1/2 border-r border-gray-300">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100 text-xs border-b border-gray-300">
                <th className="border-r border-gray-300 p-1 text-left w-1/3">Instrumento</th>
                <th className="border-r border-gray-300 p-1 text-left">Código</th>
                <th className="border-r border-gray-300 p-1 w-20">F. Vencimiento</th>
                <th className="p-1 w-16">Estado</th>
              </tr>
            </thead>
            <tbody>
              {leftColumn.map(renderRow)}
            </tbody>
          </table>
        </div>

        {/* Right Table */}
        <div className="w-1/2">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100 text-xs border-b border-gray-300">
                 <th className="border-r border-gray-300 p-1 text-left w-1/3">Instrumento</th>
                <th className="border-r border-gray-300 p-1 text-left">Código</th>
                <th className="border-r border-gray-300 p-1 w-20">F. Vencimiento</th>
                <th className="p-1 w-16">Estado</th>
              </tr>
            </thead>
            <tbody>
               {rightColumn.map(renderRow)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};