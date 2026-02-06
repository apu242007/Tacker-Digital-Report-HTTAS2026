import { TraceabilityItem, ControlCheckItem, InstrumentItem } from './types';

export const INITIAL_TRACEABILITY: TraceabilityItem[] = [
  { id: '1', code: '0101 0078', description: 'Sello', lot: '', serie: '', checked: false, observations: '' },
  { id: '2', code: 'O-90-2-125', description: 'O Ring (X8)', lot: '', serie: '', checked: false, observations: '' },
  { id: '3', code: 'O-90-2-231', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
  { id: '4', code: 'O-90-2-232', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
  { id: '5', code: 'O-90-2-234', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
  { id: '6', code: 'O-90-2-331', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
  { id: '7', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
  { id: '8', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
  { id: '9', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
  { id: '10', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '11', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '12', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '13', code: '0000 0000 1007', description: 'Mordaza', lot: '', serie: '', checked: false, observations: '' },
  { id: '14', code: '0000 0000 1007', description: 'Mordaza', lot: '', serie: '', checked: false, observations: '' },
  { id: '15', code: '0000 0000 1007', description: 'Mordaza', lot: '', serie: '', checked: false, observations: '' },
  { id: '16', code: '0000 0000 8021', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
  { id: '17', code: '0000 0000 8021', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
  { id: '18', code: '0101 0011', description: 'Anillo retencion flejes', lot: '', serie: '', checked: false, observations: '' },
  { id: '19', code: '0101 0019', description: 'Anillo Calibrador Superior', lot: '', serie: '', checked: false, observations: '' },
  { id: '20', code: '0101 5000 0001', description: 'Cabezal Superior 2 7/8 EUE Box', lot: '', serie: '', checked: false, observations: '' },
  { id: '21', code: '0101 5000 0005', description: 'Mandril', lot: '', serie: '', checked: false, observations: '' },
  { id: '22', code: '0101 5000 0010', description: 'Porta Piston', lot: '', serie: '', checked: false, observations: '' },
  { id: '23', code: '0101 5000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
  { id: '24', code: '0101 5000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
  { id: '25', code: '0101 5000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
  { id: '26', code: '0101 5000 0021', description: 'Camisa Porta Gomas', lot: '', serie: '', checked: false, observations: '' },
  { id: '27', code: '0101 5000 0025', description: 'Cono Portamordazas', lot: '', serie: '', checked: false, observations: '' },
  { id: '28', code: '0101 5000 0030', description: 'Camisa Jota', lot: '', serie: '', checked: false, observations: '' },
  { id: '29', code: '0101 5000 0035', description: 'Pin De Jota', lot: '', serie: '', checked: false, observations: '' },
  { id: '30', code: '0000 0000 2007', description: 'Resorte (X16)', lot: '', serie: '', checked: false, observations: '' },
  { id: '31', code: '0000 0000 5007', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS: ControlCheckItem[] = [
  { id: 1, description: 'Verificar visualmente estado de mordazas y conos portamordazas', isYesNo: true, hasMeasurement: false },
  { id: 2, description: 'Verificar visualmente estado de roscas (Foto 1)', isYesNo: true, hasMeasurement: false },
  { id: 3, description: 'Verificar estado de pistones y alojamientos con Calibres P/NP', isYesNo: true, hasMeasurement: false },
  { id: 4, description: 'Verificar cantidad y estado de O rings. (Foto 2)', isYesNo: true, hasMeasurement: false },
  { id: 5, description: 'Verificar estado de las secciones pulidas donde trabajan los O rings', isYesNo: true, hasMeasurement: false },
  { id: 6, description: 'Realizar prueba hidráulica y adjuntar registro', isYesNo: true, hasMeasurement: false },
  { 
    id: 7, 
    description: 'Inspeccionar y realizar control dimensional al Mandril.',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 399,
    acceptableValue: 400,
    nominalUnit: 'mm'
  },
  { 
    id: 8, 
    description: 'Verificar y realizar control dimensional al Camisa Porta Balanceadora (Detalle A)',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 153.5,
    acceptableValue: 152.5,
    nominalUnit: 'mm'
  },
  { 
    id: 9, 
    description: 'Verificar y realizar control dimensional al Camisa Porta Balanceadora (Detalle B)',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 4.0,
    acceptableValue: 3.8,
    nominalUnit: 'mm'
  },
  { 
    id: 10, 
    description: 'Inspeccionar y realizar control dimensional a Camisa Balanceadora Superior (0101-5000-0038)',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 128,
    acceptableValue: 127.5,
    nominalUnit: 'mm'
  },
  { 
    id: 11, 
    description: 'Inspeccionar y realizar control dimensional a Camisa Balanceadora Inferior (0101-5000-0008)',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 114,
    acceptableValue: 113.5,
    nominalUnit: 'mm'
  },
  { id: 12, description: 'Verificar correcto ensamble de Camisas Balanceadoras (Foto 3)', isYesNo: true, hasMeasurement: false },
  { id: 13, description: 'Inspeccionar estado de block de arrastre', isYesNo: true, hasMeasurement: false },
  { id: 14, description: 'Inspeccionar estado de porta block', isYesNo: true, hasMeasurement: false },
  { id: 15, description: 'Verificar torque a todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS: InstrumentItem[] = [
  { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
  { id: '2', name: 'Durometro', code: '', expiration: '', status: 'VENC' },
  { id: '3', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
  { id: '4', name: 'Manometro', code: '', expiration: '', status: 'VENC' },
  { id: '5', name: 'Conejo', code: 'CONEJO-177-C1', expiration: '', status: 'VENC' },
  { id: '6', name: 'P/NP Porta Pistón', code: '0101-5000-0051', expiration: '', status: 'VENC' },
  { id: '7', name: '', code: '', expiration: '', status: '' },
  { id: '8', name: 'P/NP Pistón', code: '0101-5000-0052', expiration: '', status: 'VENC' },
];
