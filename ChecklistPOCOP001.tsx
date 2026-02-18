import React, { useState, useMemo, useEffect } from 'react';
import tkr1Image from './images/1-EMPAQUE RECUPERABLE TKR1 0101-5000.png';
import { TraceabilityItem, ControlCheckItem, ReportData, DimensionalData, InstrumentItem } from './types';
import { INITIAL_TRACEABILITY, INITIAL_CHECKS, INITIAL_INSTRUMENTS } from './constants';
import { TraceabilityTable } from './components/TraceabilityTable';
import { PreAssemblyChecks } from './components/PreAssemblyChecks';
import { DimensionalSection } from './components/DimensionalSection';
import { InstrumentsTable } from './components/InstrumentsTable';
import { PhotoPlaceholder } from './components/PhotoPlaceholder';
import { SignaturePad } from './components/SignaturePad';
import { Printer, Save, AlertTriangle, CheckCircle, XCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { evaluateToolStatus } from './logic';
import { checklistPOCOP001Service } from './src/services/api';

interface Props {
    onBack: () => void;
    reportId?: string;
}

export const ChecklistPOCOP001: React.FC<Props> = ({ onBack, reportId }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(reportId || null);

  const [data, setData] = useState<ReportData>({
    meta: {
      date: new Date().toISOString().split('T')[0],
      serial: 'BB-',
      reportNumber: 'POCOP001-A2-4'
    },
    traceability: INITIAL_TRACEABILITY,
    preAssemblyChecks: INITIAL_CHECKS,
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
    instruments: INITIAL_INSTRUMENTS,
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
        section3: []
    }
  });

  // Cargar reporte existente si hay reportId
  useEffect(() => {
    if (reportId) {
      setLoading(true);
      checklistPOCOP001Service.getById(reportId)
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
      const newId = await checklistPOCOP001Service.save(dataWithId as any);
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
              [section]: [...prev.photos[section], ...newPhotos]
          }
      }));
  };

  const removePhoto = (section: keyof typeof data.photos, index: number) => {
      setData(prev => ({
          ...prev,
          photos: {
              ...prev.photos,
              [section]: prev.photos[section].filter((_, i) => i !== index)
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
                    <span className="font-bold">Serial:</span>
                    <input 
                      type="text" 
                      value={data.meta.serial} 
                      onChange={(e) => setData({...data, meta: {...data.meta, serial: e.target.value}})}
                      className="w-24 border-b border-gray-300 focus:border-tackerRed outline-none" 
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
                Empaque Recuperable TKR1 0101-5000
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
                    <div className="flex items-end gap-2">
                         <label className="flex items-center gap-2">
                            <input type="checkbox" /> 
                            <span>Prueba Hidráulica:</span>
                         </label>
                         <input type="text" className="w-16 border-b bg-transparent text-center" placeholder="psi" />
                         <span>psi por</span>
                         <input type="text" className="w-16 border-b bg-transparent text-center" placeholder="min" />
                         <span>Minutos</span>
                    </div>
                </div>
            </section>

            {/* SECTION 4: FUNCTIONAL */}
            <section className="bg-red-50 border border-red-100 p-4 rounded">
                 <div className="bg-tackerRed text-white px-3 py-1 font-bold text-sm mb-2 text-center rounded-sm uppercase">4. Prueba Funcional</div>
                 <div className="flex flex-col md:flex-row justify-around items-center gap-4 text-sm">
                    <div className="flex items-center gap-4">
                        <span className="font-bold">16. Realizar Prueba funcional según ITFAB011</span>
                        <div className="flex gap-2">
                             <label className="font-bold">SI <input type="checkbox" className="ml-1" /></label>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-2 rounded shadow-sm">
                        <span className="font-bold text-gray-600">Sistema de Fijación "J"</span>
                        <label className="flex items-center"><input type="checkbox" className="mr-1" /> IZQUIERDO</label>
                        <label className="flex items-center"><input type="checkbox" className="mr-1" /> DERECHO</label>
                    </div>
                 </div>
            </section>

             {/* SECTION 5: COMMENTS */}
             <section>
                <div className="bg-tackerRed text-white px-3 py-1 font-bold text-sm mb-0 rounded-t-sm uppercase">
                    5. Comentarios
                </div>
                <div className="border border-gray-300 p-2 bg-white">
                    <textarea 
                        className="w-full h-24 p-2 outline-none resize-none bg-[linear-gradient(to_bottom,transparent_1.5em,rgba(0,0,0,0.1)_1.55em)] bg-[length:100%_1.6em] leading-[1.6em]"
                        placeholder="Escriba sus comentarios aquí..."
                        value={data.comments}
                        onChange={(e) => setData({...data, comments: e.target.value})}
                    ></textarea>
                </div>
             </section>

             {/* SECTION 6: DIMENSIONAL */}
             <section className="break-before-page">
                <DimensionalSection data={data.dimensional} onChange={(newDim) => setData({...data, dimensional: newDim})} imageFileName={tkr1Image} />
                <InstrumentsTable instruments={data.instruments} onChange={handleInstrumentChange} />
             </section>
             
             {/* SECTION 7: RESPONSIBILITIES */}
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
                                  title="Nombre de quien supervisó"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <PhotoPlaceholder 
                        title="Foto 3 (Balanceadoras y Portabalanceadoras)" 
                        images={data.photos.section3}
                        onAdd={(newPhotos) => addPhotos('section3', newPhotos)}
                        onRemove={(idx) => removePhoto('section3', idx)}
                   />
                   <div className="border border-black flex flex-col justify-end p-2 text-xs text-gray-400 bg-white">
                       <p className="text-center mb-4">Espacio reservado para detalles adicionales de las fotos.</p>
                       <p>Porta Camisa Balanceadora Superior 0101-5000-0007</p>
                       <p>Camisa Balanceadora Superior 0101-5000-0038</p>
                   </div>
                </div>
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
