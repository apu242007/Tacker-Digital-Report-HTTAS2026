import React from 'react';
import { DimensionalData } from '../types';

interface Props {
  data: DimensionalData;
  onChange: (data: DimensionalData) => void;
  imageFileName?: string;
}

export const DimensionalSection: React.FC<Props> = ({ data, onChange, imageFileName = "1-EMPAQUE RECUPERABLE TKR1 0101-5000.png" }) => {
  
  const updateLength = (key: string, val: string) => {
    onChange({ ...data, lengths: { ...data.lengths, [key]: val } });
  };
  
  const updateOd = (key: string, val: string) => {
    onChange({ ...data, od: { ...data.od, [key]: val } });
  };

  const updateMaxMin = (key: 'od'|'id', val: string) => {
    onChange({ ...data, maxMin: { ...data.maxMin, [key]: val } });
  };

  const updateAccessory = (key: 'piston'|'mordaza'|'block', subKey: 'a'|'b'|'u'|'check', val: boolean) => {
    onChange({
      ...data,
      accessories: {
        ...data.accessories,
        [key]: {
          ...data.accessories[key],
          [subKey]: val
        }
      }
    });
  };

  return (
    <div className="border border-gray-300 p-4 rounded bg-white">
      <div className="bg-tackerRed text-white font-bold p-1 text-center mb-4 text-sm uppercase">
        6. Control Dimensional
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Replacement */}
        <div className="w-full md:w-1/3 flex items-start justify-center py-4 bg-white relative">
             <img 
                src={imageFileName} 
                alt="Diagrama de Herramienta Tacker" 
                className="w-full h-auto object-contain max-h-[900px]"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const errDiv = document.getElementById('img-error');
                    if (errDiv) errDiv.style.display = 'block';
                    // Update error text if possible, or leave generic
                    const errCode = document.getElementById('err-code-text');
                    if (errCode) errCode.innerText = imageFileName;
                }}
            />
            <div id="img-error" className="hidden text-center p-8 border-2 border-dashed border-gray-300 rounded text-gray-500 mt-10">
                <p className="font-bold text-red-500 mb-2">Imagen no encontrada</p>
                <p className="text-sm">Por favor, asegúrese de que el archivo de imagen exista en la carpeta del proyecto con el nombre:</p>
                <code id="err-code-text" className="block bg-gray-100 p-2 mt-2 font-mono text-black border border-gray-300 rounded text-xs break-all">{imageFileName}</code>
            </div>
        </div>

        {/* Input Fields */}
        <div className="w-full md:w-2/3 space-y-6 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-bold text-lg">Diametro: <span className="ml-2 font-mono">5"</span></span>
                <span className="font-bold text-lg">Libraje: <span className="ml-2 font-mono">18#</span></span>
            </div>

            {/* Max/Min Section */}
            <div>
               <h4 className="font-bold italic mb-2">Máximo y Mínimo Diámetro</h4>
               <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2">
                    <label className="w-10 font-bold">OD:</label>
                    <input 
                      type="text" 
                      value={data.maxMin.od}
                      onChange={(e) => updateMaxMin('od', e.target.value)}
                      className="border-b border-gray-400 w-32 px-1 focus:outline-none focus:border-tackerRed text-center" 
                    />
                    <span className="text-gray-500">pulg</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <label className="w-10 font-bold">ID:</label>
                    <input 
                      type="text" 
                      value={data.maxMin.id}
                      onChange={(e) => updateMaxMin('id', e.target.value)}
                      className="border-b border-gray-400 w-32 px-1 focus:outline-none focus:border-tackerRed text-center" 
                    />
                    <span className="text-gray-500">pulg</span>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-1">
                    <h4 className="font-bold italic mb-2">Longitudes</h4>
                    {['A', 'B', 'C'].map(label => (
                         <div key={label} className="flex justify-between items-center gap-2">
                            <label className="font-bold">{label}:</label>
                            <div className="flex items-center gap-1 flex-1">
                              <input 
                                  type="text"
                                  value={data.lengths[label] || ''}
                                  onChange={(e) => updateLength(label, e.target.value)}
                                  className="w-full border-b border-gray-400 text-center px-1 focus:outline-none focus:border-tackerRed"
                              />
                              <span className="text-gray-500 text-xs">pie</span>
                            </div>
                         </div>
                    ))}
                </div>

                <div className="space-y-1">
                     <h4 className="font-bold italic mb-2">Diámetros</h4>
                     {Array.from({length: 9}).map((_, i) => {
                         const label = `OD ${i+1}`;
                         const key = `od${i+1}`;
                         return (
                            <div key={key} className="flex justify-between items-center gap-2">
                                <label className="font-bold text-xs whitespace-nowrap">{label}:</label>
                                <div className="flex items-center gap-1 flex-1">
                                  <input 
                                      type="text"
                                      value={data.od[key] || ''}
                                      onChange={(e) => updateOd(key, e.target.value)}
                                      className="w-full border-b border-gray-400 text-center px-1 focus:outline-none focus:border-tackerRed"
                                  />
                                  <span className="text-gray-500 text-xs">pulg</span>
                                </div>
                            </div>
                         );
                     })}
                </div>
            </div>

            <div className="mt-4 pt-2">
                <h4 className="font-bold italic mb-2">Accesorios</h4>
                <div className="space-y-2">
                     {/* Header Row */}
                     <div className="flex justify-end gap-3 px-8 text-xs font-bold text-center">
                        <span className="w-4">A</span>
                        <span className="w-4">B</span>
                        <span className="w-4">U</span>
                        <span className="w-4">✔</span>
                     </div>
                     
                     {/* Piston Row */}
                     <div className="flex items-center justify-between border-b border-dashed border-gray-300 pb-1">
                        <span className="font-bold">Pistón: <span className="font-normal ml-2">6003</span></span>
                        <div className="flex gap-3 px-8">
                            <input type="checkbox" checked={data.accessories.piston.a} onChange={(e) => updateAccessory('piston', 'a', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.piston.b} onChange={(e) => updateAccessory('piston', 'b', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.piston.u} onChange={(e) => updateAccessory('piston', 'u', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.piston.check} onChange={(e) => updateAccessory('piston', 'check', e.target.checked)} />
                        </div>
                     </div>

                     {/* Mordaza Row */}
                     <div className="flex items-center justify-between border-b border-dashed border-gray-300 pb-1">
                        <span className="font-bold">Mordaza: <span className="font-normal ml-2">1007</span></span>
                        <div className="flex gap-3 px-8">
                            <input type="checkbox" checked={data.accessories.mordaza.a} onChange={(e) => updateAccessory('mordaza', 'a', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.mordaza.b} onChange={(e) => updateAccessory('mordaza', 'b', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.mordaza.u} onChange={(e) => updateAccessory('mordaza', 'u', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.mordaza.check} onChange={(e) => updateAccessory('mordaza', 'check', e.target.checked)} />
                        </div>
                     </div>

                     {/* Block Row */}
                     <div className="flex items-center justify-between border-b border-dashed border-gray-300 pb-1">
                        <span className="font-bold">Block: <span className="font-normal ml-2">8021</span></span>
                        <div className="flex gap-3 px-8">
                            <input type="checkbox" checked={data.accessories.block.a} onChange={(e) => updateAccessory('block', 'a', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.block.b} onChange={(e) => updateAccessory('block', 'b', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.block.u} onChange={(e) => updateAccessory('block', 'u', e.target.checked)} />
                            <input type="checkbox" checked={data.accessories.block.check} onChange={(e) => updateAccessory('block', 'check', e.target.checked)} />
                        </div>
                     </div>
                </div>

                <div className="mt-4 space-y-2">
                   <div className="flex items-center gap-2">
                      <span className="w-32 text-sm">Conexión Superior:</span>
                      <input 
                        type="text" 
                        value={data.accessories.connUpper}
                        onChange={(e) => onChange({...data, accessories: {...data.accessories, connUpper: e.target.value}})}
                        className="flex-1 border-b border-gray-400 px-2 focus:outline-none focus:border-tackerRed" 
                      />
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="w-32 text-sm">Conexión Inferior:</span>
                      <input 
                        type="text" 
                        value={data.accessories.connLower}
                        onChange={(e) => onChange({...data, accessories: {...data.accessories, connLower: e.target.value}})}
                        className="flex-1 border-b border-gray-400 px-2 focus:outline-none focus:border-tackerRed" 
                      />
                   </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}; 
