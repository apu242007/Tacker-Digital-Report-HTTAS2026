import React from 'react';
import { ControlCheckItem } from '../types';
import { validateMeasurement } from '../logic';

interface Props {
  checks: ControlCheckItem[];
  onChange: (id: number, value: string | boolean) => void;
}

export const PreAssemblyChecks: React.FC<Props> = ({ checks, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-2 bg-tackerRed text-white text-sm font-bold p-2 items-center">
        <div className="col-span-8 md:col-span-8">2. Controles previos al ensamble</div>
        <div className="col-span-4 md:col-span-4 text-right">Responsable</div>
      </div>
      
      {checks.map((check) => {
        const validation = !check.isYesNo ? validateMeasurement(check) : 'ok';
        const borderColor = validation === 'fail' ? 'border-red-500 bg-red-50 text-red-700 font-bold' : 
                            validation === 'ok' && check.measuredValue ? 'border-green-500 bg-green-50 text-green-800 font-bold' : 
                            'border-tackerRed bg-gray-50';

        return (
          <div key={check.id} className="border-b border-gray-200 pb-2 mb-2">
            <div className="flex flex-col md:flex-row md:items-start justify-between">
              <div className="w-full md:w-2/3 pr-2">
                <span className="font-bold text-sm mr-1">{check.id}.</span>
                <span className="text-sm text-gray-800">{check.description}</span>
                
                {!check.isYesNo && check.hasMeasurement && (
                   <div className="mt-1 text-xs text-gray-500 flex gap-4">
                      <span>Nominal: <strong>{check.nominalValue}{check.nominalUnit}</strong></span>
                      <span>Aceptable: <strong>{check.acceptableValue}{check.nominalUnit}</strong></span>
                      {validation === 'fail' && (
                        <span className="text-red-600 font-bold animate-pulse">
                           ⚠️ FUERA DE TOLERANCIA
                        </span>
                      )}
                   </div>
                )}
              </div>

              <div className="w-full md:w-1/3 flex items-center justify-end mt-2 md:mt-0 gap-2">
                {check.isYesNo ? (
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <span className={`text-sm font-bold ${check.checked ? 'text-green-700' : 'text-gray-400'}`}>
                      {check.checked ? 'APROBADO' : 'PENDIENTE'}
                    </span>
                    <input 
                      type="checkbox"
                      checked={check.checked || false}
                      onChange={(e) => onChange(check.id, e.target.checked)}
                      className="w-5 h-5 text-tackerRed rounded border-gray-300 focus:ring-tackerRed"
                    />
                  </label>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">Medida Registrada:</span>
                    <div className="relative">
                      <input 
                        type="text"
                        value={check.measuredValue || ''}
                        onChange={(e) => onChange(check.id, e.target.value)}
                        className={`w-24 border-b-2 px-2 py-1 text-center font-mono outline-none transition-colors ${borderColor}`}
                        placeholder="0.00"
                      />
                      <span className="absolute right-1 top-1 text-xs text-gray-400">mm</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};