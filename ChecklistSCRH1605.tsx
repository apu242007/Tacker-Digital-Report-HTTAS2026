import React, { useState, useMemo, useEffect } from 'react';
import scrhImage from './images/6-SETTING TOOL HIDRÁULICA SCRH 1605-7000.png';
import { TraceabilityItem, ControlCheckItem, ReportData, DimensionalData, InstrumentItem } from './types';
import { INITIAL_TRACEABILITY_SCRH1605, INITIAL_CHECKS_SCRH1605, INITIAL_INSTRUMENTS_SCRH1605 } from './constants';
import { TraceabilityTable } from './components/TraceabilityTable';
import { PreAssemblyChecks } from './components/PreAssemblyChecks';
import { DimensionalSection } from './components/DimensionalSection';
import { InstrumentsTable } from './components/InstrumentsTable';
import { PhotoPlaceholder } from './components/PhotoPlaceholder';
import { SignaturePad } from './components/SignaturePad';
import { Printer, Save, AlertTriangle, CheckCircle, XCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { evaluateToolStatus } from './logic';
import { checklistSCRH1605Service } from './src/services/api';

interface Props {
    onBack: () => void;
    reportId?: string;
}

export const ChecklistSCRH1605: React.FC<Props> = ({ onBack, reportId }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(reportId || null);

  const [data, setData] = useState<ReportData>({
    meta: {
      date: new Date().toISOString().split('T')[0],
      serial: '',
      reportNumber: 'POCOP001-A2-4'
    },
    traceability: INITIAL_TRACEABILITY_SCRH1605,
    preAssemblyChecks: INITIAL_CHECKS_SCRH1605,
    attachments: {
      lastJob: '',
      inspectionReport: '',
      incidentReport: '',
      hydroTestPsi: '',
      hydroTestMin: ''
    },
    functionalTest: {
      systemSetting: '',
      mandrelPass: false
    },
    comments: '',
    dimensional: {
      maxMin: { od: '', id: '' },
      od: {},
      lengths: {},
      accessories: { 
        piston: { a: false, b: false, u: false, check: false }, 
        mordaza: { a: false, b: false, u: false, check: false }, 
        block: { a: false, b: false, u: false, check: false }, 
        connUpper: '', 
        connLower: '' 
      }
    },
    instruments: INITIAL_INSTRUMENTS_SCRH1605,
    signatures: {
      assembledBy: '',
      assembledDate: '',
      assembledSignature: '',
      supervisedBy: '',
      supervisedDate: '',
      supervisedSignature: ''
    },
    photos: {
        section1: [],
        section2: [],
        section3: [],
        section4: []
    }
  });

  // Setting tool regulation config (7" vs 9 5/8")
  const [settingSize, setSettingSize] = useState<'7' | '9-5/8' | ''>('');
  // Calibrator load value
  const [calibratorLoad, setCalibratorLoad] = useState('4260');

  // Cargar reporte existente si hay reportId
  useEffect(() => {
    if (reportId) {
      setLoading(true);
      checklistSCRH1605Service.getById(reportId)
        .then(report => {
          if (report) {
            setData(report as any);
            setSavedId(reportId);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [reportId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const dataWithId = savedId ? { ...data, id: savedId } : data;
      const newId = await checklistSCRH1605Service.save(dataWithId as any, { settingSize, calibratorLoad });
      setSavedId(newId);
      alert('✅ Reporte guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('❌ Error al guardar el reporte');
    } finally {
      setSaving(false);
    }
  };

  const handleTraceabilityChange = (id: string, field: keyof TraceabilityItem, value: any) => {
    setData(prev => ({
      ...prev,
      traceability: prev.traceability.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleCheckChange = (id: number, value: any) => {
    setData(prev => ({
      ...prev,
      preAssemblyChecks: prev.preAssemblyChecks.map(item => {
        if (item.id === id) {
          return item.isYesNo ? { ...item, checked: value } : { ...item, measuredValue: value };
        }
        return item;
      })
    }));
  };

  const handleInstrumentChange = (id: string, field: keyof InstrumentItem, value: string) => {
    setData(prev => ({
        ...prev,
        instruments: prev.instruments.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        )
    }));
  };

  const handleSignatureChange = (field: 'assembledSignature' | 'supervisedSignature', val: string) => {
      setData(prev => ({
          ...prev,
          signatures: {
              ...prev.signatures,
              [field]: val
          }
      }));
  };

  const addPhotos = (section: keyof typeof data.photos, newPhotos: string[]) => {
      setData(prev => ({
          ...prev,
          photos: {
              ...prev.photos,
              [section]: [...(prev.photos[section] || []), ...newPhotos]
          }
      }));
  };

  const removePhoto = (section: keyof typeof data.photos, index: number) => {
      setData(prev => ({
          ...prev,
          photos: {
              ...prev.photos,
              [section]: (prev.photos[section] || []).filter((_, i) => i !== index)
          }
      }));
  };

  // Real-time evaluation
  const toolEvaluation = useMemo(() => evaluateToolStatus(data), [data]);

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 font-sans">
      
      {/* Back Button (Hidden on Print) */}
      <div className="max-w-5xl mx-auto mb-4 print:hidden">
        <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-tackerRed transition font-medium"
        >
            <ArrowLeft size={20} className="mr-2" /> Volver al Inicio
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden print:shadow-none print:w-full">
        
        {/* HEADER */}
        <header className="border-b-4 border-tackerRed p-6 flex flex-col md:flex-row justify-between items-center bg-white sticky top-0 z-10 shadow-sm print:static print:shadow-none">
          <div className="flex items-center space-x-4">
             <div className="text-3xl font-black italic tracking-tighter text-tackerRed">
                TACKER
                <span className="block text-xs font-normal text-black not-italic -mt-1 ml-1 tracking-widest">SOLUTIONS</span>
             </div>
             <div className="h-10 w-px bg-gray-300 mx-4 hidden md:block"></div>
             <div>
                <h1 className="text-xl font-bold text-gray-800 uppercase">Informe de Reparación</h1>
                <div className="print:hidden mt-2">
                   {/* STATUS BADGE */}
                   {toolEvaluation.status === 'APTO' && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-300">
                        <CheckCircle size={14} /> APTO PARA SERVICIO
                      </span>
                   )}
                   {toolEvaluation.status === 'NO APTO' && (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold border border-red-300 animate-pulse">
                        <XCircle size={14} /> NO APTO
                      </span>
                   )}
                   {toolEvaluation.status === 'INCOMPLETO' && (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-300">
                        <AlertTriangle size={14} /> DATOS INCOMPLETOS
                      </span>
                   )}
                </div>
             </div>
          </div>
          
          <div className="flex flex-col items-end mt-4 md:mt-0 text-sm">
             <div className="font-mono font-bold text-lg">{data.meta.reportNumber}</div>
             <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                    <span className="font-bold">Fecha:</span>
                    <input 
                      type="date" 
                      value={data.meta.date} 
                      onChange={(e) => setData({...data, meta: {...data.meta, date: e.target.value}})}
                      className="border-b border-gray-300 focus:border-tackerRed outline-none" 
                    />
                </label>
                <label className="flex items-center gap-2">
                    <span className="font-bold">N°:</span>
                    <input 
                      type="text" 
                      value={data.meta.serial} 
                      onChange={(e) => setData({...data, meta: {...data.meta, serial: e.target.value}})}
                      className="w-24 border-b border-gray-300 focus:border-tackerRed outline-none" 
                    />
                </label>
             </div>
             <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                    <span className="font-bold">Serial:</span>
                    <input 
                      type="text" 
                      className="w-32 border-b border-gray-300 focus:border-tackerRed outline-none"
                    />
                </label>
             </div>
          </div>
        </header>

        {/* FAIL REASONS BANNER (Only visible if NO APTO) */}
        {toolEvaluation.status === 'NO APTO' && (
            <div className="bg-red-50 border-b border-red-200 p-4 text-sm text-red-800 print:hidden">
                <p className="font-bold flex items-center gap-2"><AlertTriangle size={16}/> La herramienta no cumple los criterios:</p>
                <ul className="list-disc list-inside mt-1 ml-5">
                    {toolEvaluation.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                    ))}
                </ul>
            </div>
        )}

        {/* MAIN TITLE BAR */}
        <div className="bg-gray-100 border-b border-gray-300 p-3 text-center">
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                Setting Tool Hidráulica SCRH 1605-7000
            </h2>
        </div>

        <div className="p-6 space-y-6">
            {/* SECTION 1: TRAZABILIDAD */}
            <section>
                <div className="bg-tackerRed text-white px-3 py-1 font-bold text-sm mb-2 rounded-t-sm uppercase">
                    1. Trazabilidad
                </div>
                <TraceabilityTable data={data.traceability} onChange={handleTraceabilityChange} />
            </section>

            {/* SECTION 2: CONTROLES */}
            <section>
                <PreAssemblyChecks checks={data.preAssemblyChecks} onChange={handleCheckChange} />
                
                {/* Inline diagram note between checks 5 and 6 */}
                <div className="my-4 border border-gray-300 bg-gray-50 p-4 rounded text-sm">
                    <div className="text-center space-y-1 font-mono text-gray-700">
                        <p className="font-bold">1605-7000-0008 CAMISA PORTA TRABA</p>
                        <p>5716 (X2) PIN DE CORTE</p>
                        <p className="font-bold">1605-7000-0011 CAMISA ASIENTO TRABA</p>
                    </div>
                </div>

                {/* Setting configuration inline (related to check 10) */}
                <div className="my-4 border border-blue-200 bg-blue-50 p-4 rounded">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                        <span className="font-bold text-gray-700">Configuración de regulación:</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="settingSize" 
                                checked={settingSize === '7'}
                                onChange={() => setSettingSize('7')}
                                className="text-tackerRed"
                            />
                            <span className="font-mono">1605-7000-0013 para <strong>7"</strong></span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="settingSize" 
                                checked={settingSize === '9-5/8'}
                                onChange={() => setSettingSize('9-5/8')}
                                className="text-tackerRed"
                            />
                            <span className="font-mono">1605-6030-0013 para <strong>9 5/8"</strong></span>
                        </label>
                    </div>
                </div>

                {/* Calibrator load info (related to check 8) */}
                <div className="my-4 border border-gray-200 bg-gray-50 p-4 rounded">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                        <span className="font-bold text-gray-700">Tipo de calibrador por pin:</span>
                        <div className="flex items-center gap-2">
                            <input 
                                type="text" 
                                title="Carga del calibrador en Lbs"
                                placeholder="4260"
                                value={calibratorLoad}
                                onChange={(e) => setCalibratorLoad(e.target.value)}
                                className="w-20 border-b border-gray-400 text-center font-mono bg-transparent outline-none"
                            />
                            <span className="font-bold">Lbs</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: ADJUNTOS */}
            <section className="border border-gray-200 p-4 rounded bg-gray-50">
                <div className="bg-tackerRed text-white px-3 py-1 font-bold text-sm mb-4 rounded-sm uppercase">3. Adjuntos</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <label className="flex gap-2">
                            <input type="checkbox" /> 
                            <span>Ultimo trabajo:</span>
                            <input type="text" className="flex-1 border-b bg-transparent outline-none" />
                        </label>
                        <label className="flex gap-2">
                            <input type="checkbox" /> 
                            <span>N° Reporte de Inspección:</span>
                            <input type="text" className="flex-1 border-b bg-transparent outline-none" />
                        </label>
                        <label className="flex gap-2">
                            <input type="checkbox" /> 
                            <span>N° Reporte de Incidente:</span>
                            <input type="text" className="flex-1 border-b bg-transparent outline-none" />
                        </label>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Fecha:</span>
                            <input type="date" title="Fecha del reporte de inspección" className="border-b bg-transparent outline-none" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Fecha:</span>
                            <input type="date" title="Fecha del reporte de incidente" className="border-b bg-transparent outline-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: COTIZACIÓN */}
            <section>
                <div className="bg-tackerRed text-white px-3 py-1 font-bold text-sm mb-0 rounded-t-sm uppercase">
                    4. Cotización
                </div>
                <div className="border border-gray-300 p-2 bg-white">
                    <textarea 
                        className="w-full h-24 p-2 outline-none resize-none bg-[linear-gradient(to_bottom,transparent_1.5em,rgba(0,0,0,0.1)_1.55em)] bg-[length:100%_1.6em] leading-[1.6em]"
                        placeholder="Comentar / Observar Superior..."
                        value={data.comments}
                        onChange={(e) => setData({...data, comments: e.target.value})}
                    ></textarea>
                </div>
            </section>

             {/* SECTION 5: CONTROL DIMENSIONAL */}
             <section className="break-before-page">
                <DimensionalSection 
                    data={data.dimensional} 
                    onChange={(newDim) => setData({...data, dimensional: newDim})} 
                    imageFileName={scrhImage}
                />
                
                <div className="mt-4 border border-gray-300 p-4 bg-white">
                    <div className="grid grid-cols-2 gap-8 text-sm">
                         <div className="flex items-center gap-2">
                            <span className="font-bold">Libraje:</span> 7"
                         </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-xs text-gray-600">
                        <div>
                            <span className="font-bold">Área Setting Tool SCRH:</span> 14,57 pulg²
                        </div>
                        <div>
                            <span className="font-bold">Área Setting Tool SCRH:</span> 20,07 pulg²
                        </div>
                    </div>
                </div>

                {/* SECTION 6: INSTRUMENTOS */}
                <InstrumentsTable instruments={data.instruments} onChange={handleInstrumentChange} />
             </section>
             
             {/* SECTION 7: RESPONSABILIDADES */}
             <section className="mt-8">
                 <div className="bg-tackerRed text-white px-3 py-1 font-bold text-sm mb-6 text-center rounded-sm uppercase">7. Responsabilidades</div>
                 <div className="grid grid-cols-2 gap-12">
                     <div className="text-center">
                         <h4 className="font-bold text-lg mb-8 italic">Ensambló</h4>
                         <div className="border-t border-black pt-2 w-3/4 mx-auto text-left space-y-4 text-sm">
                             <div className="flex justify-between items-end">
                                <span>Fecha:</span> 
                                <input 
                                  type="date" 
                                  title="Fecha de ensamblaje"
                                  className="border-b border-gray-400 w-40 outline-none bg-transparent"
                                  value={data.signatures.assembledDate}
                                  onChange={(e) => setData({...data, signatures: {...data.signatures, assembledDate: e.target.value}})}
                                />
                             </div>
                             <div className="flex justify-between items-end">
                                <span>Nombre:</span> 
                                <input 
                                  title="Nombre de quien ensambló"
                                  placeholder="Nombre"
                                  className="border-b border-gray-400 w-40 outline-none bg-transparent"
                                  value={data.signatures.assembledBy}
                                  onChange={(e) => setData({...data, signatures: {...data.signatures, assembledBy: e.target.value}})}
                                />
                             </div>
                             <div className="mt-2">
                                <SignaturePad 
                                    label="Firma:" 
                                    value={data.signatures.assembledSignature}
                                    onChange={(val) => handleSignatureChange('assembledSignature', val)}
                                />
                             </div>
                         </div>
                     </div>
                     <div className="text-center">
                         <h4 className="font-bold text-lg mb-8 italic">Supervisó</h4>
                         <div className="border-t border-black pt-2 w-3/4 mx-auto text-left space-y-4 text-sm">
                             <div className="flex justify-between items-end">
                                <span>Fecha:</span> 
                                <input 
                                  type="date" 
                                  title="Fecha de supervisión"
                                  className="border-b border-gray-400 w-40 outline-none bg-transparent"
                                  value={data.signatures.supervisedDate}
                                  onChange={(e) => setData({...data, signatures: {...data.signatures, supervisedDate: e.target.value}})}
                                />
                             </div>
                             <div className="flex justify-between items-end">
                                <span>Nombre:</span> 
                                <input 
                                  title="Nombre del supervisor"
                                  placeholder="Nombre"
                                  className="border-b border-gray-400 w-40 outline-none bg-transparent"
                                  value={data.signatures.supervisedBy}
                                  onChange={(e) => setData({...data, signatures: {...data.signatures, supervisedBy: e.target.value}})}
                                />
                             </div>
                             <div className="mt-2">
                                <SignaturePad 
                                    label="Firma:" 
                                    value={data.signatures.supervisedSignature}
                                    onChange={(val) => handleSignatureChange('supervisedSignature', val)}
                                />
                             </div>
                         </div>
                     </div>
                 </div>
             </section>

             {/* PHOTOS */}
             <section className="grid grid-cols-1 gap-4 break-before-page">
                <PhotoPlaceholder 
                    title="Foto 1 (Conexiones)" 
                    images={data.photos.section1}
                    onAdd={(newPhotos) => addPhotos('section1', newPhotos)}
                    onRemove={(idx) => removePhoto('section1', idx)}
                />
                <PhotoPlaceholder 
                    title="Foto 2 (Orings)" 
                    images={data.photos.section2}
                    onAdd={(newPhotos) => addPhotos('section2', newPhotos)}
                    onRemove={(idx) => removePhoto('section2', idx)}
                />
                <PhotoPlaceholder 
                    title="Foto 3 (Camisa Asiento Traba)" 
                    images={data.photos.section3}
                    onAdd={(newPhotos) => addPhotos('section3', newPhotos)}
                    onRemove={(idx) => removePhoto('section3', idx)}
                />
                <PhotoPlaceholder 
                    title="Foto 4 (Sello)" 
                    images={data.photos.section4 || []}
                    onAdd={(newPhotos) => addPhotos('section4', newPhotos)}
                    onRemove={(idx) => removePhoto('section4', idx)}
                />
             </section>
        </div>

        {/* FLOATING ACTION BUTTONS */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 print:hidden">
            <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" title={savedId ? "Actualizar" : "Guardar"}>
                {saving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
            </button>
            <button className="bg-tackerRed text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center" title="Imprimir PDF" onClick={() => window.print()}>
                <Printer size={24} />
            </button>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl flex items-center gap-3">
              <Loader2 size={24} className="animate-spin text-tackerRed" />
              <span>Cargando reporte...</span>
            </div>
          </div>
        )}

      </div>
      <div className="text-center text-gray-500 text-xs mt-8 pb-4 print:hidden">
         Tacker Solutions Digital Report App v1.1 {savedId && <span className="text-green-600">| ID: {savedId.slice(0,8)}...</span>}
      </div>
    </div>
  );
};
 
