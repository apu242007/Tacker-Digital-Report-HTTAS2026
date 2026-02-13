import { TraceabilityItem, ControlCheckItem, InstrumentItem } from './types';

// ==========================================
// TKR1 0101-5000 (ORIGINAL)
// ==========================================
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

// ==========================================
// TKR1 0178-5000 (NEW)
// ==========================================
export const INITIAL_TRACEABILITY_0178: TraceabilityItem[] = [
  { id: '1', code: '0101 0078', description: 'Sello', lot: '', serie: '', checked: false, observations: '' },
  { id: '2', code: 'O-90-2-125', description: 'O Ring (X8)', lot: '', serie: '', checked: false, observations: '' },
  { id: '3', code: 'O-90-2-231', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
  { id: '4', code: 'O-90-2-234', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
  { id: '5', code: 'O-90-2-235', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
  { id: '6', code: 'O-90-2-331', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
  { id: '7', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
  { id: '8', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
  { id: '9', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
  { id: '10', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '11', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '12', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '13', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '14', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '15', code: '0000 0000 6003', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
  { id: '16', code: '0000 0000 1007', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
  { id: '17', code: '0000 0000 1007', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
  { id: '18', code: '0000 0000 1007', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
  { id: '19', code: '0000 0000 8021', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
  { id: '20', code: '0000 0000 8021', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
  { id: '21', code: '0000 0000 8021', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
  { id: '22', code: '0178 0011', description: 'Anillo retencion flejes', lot: '', serie: '', checked: false, observations: '' },
  { id: '23', code: '0101 0019', description: 'Anillo Calibrador Superior', lot: '', serie: '', checked: false, observations: '' },
  { id: '24', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
  { id: '25', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
  { id: '26', code: '0101 0023', description: 'Anillo Calibrador Inferior', lot: '', serie: '', checked: false, observations: '' },
  { id: '27', code: '0178 5000 0001', description: '* Cabezal Superior 2 7/8 TSH PH-6 Box', lot: '', serie: '', checked: false, observations: '' },
  { id: '28', code: '0101 5000 0003', description: 'Tuerca Porta Sello', lot: '', serie: '', checked: false, observations: '' },
  { id: '29', code: '0178 5000 0005', description: '* Mandril', lot: '', serie: '', checked: false, observations: '' },
  { id: '30', code: '0178 5000 0007', description: 'Camisa Porta Balanceadora Superior', lot: '', serie: '', checked: false, observations: '' },
  { id: '31', code: '0178 5000 0008', description: 'Camisa Balanceadora Inferior', lot: '', serie: '', checked: false, observations: '' },
  { id: '32', code: '0178 5000 0010', description: 'Porta Piston', lot: '', serie: '', checked: false, observations: '' },
  { id: '33', code: '0101 5000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
  { id: '34', code: '0101 5000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
  { id: '35', code: '0101 5000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
  { id: '36', code: '0101 5000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
  { id: '37', code: '0101 5000 0021', description: '* Camisa Porta Gomas', lot: '', serie: '', checked: false, observations: '' },
  { id: '38', code: '0101 5000 0022', description: 'Anillo Retenedor Fleje', lot: '', serie: '', checked: false, observations: '' },
  { id: '39', code: '0101 5000 0025', description: 'Cono Portamordazas', lot: '', serie: '', checked: false, observations: '' },
  { id: '40', code: '0101 5000 0028', description: 'Anillo Porta Mordazas', lot: '', serie: '', checked: false, observations: '' },
  { id: '41', code: '0101 5000 0030', description: 'Camisa Jota', lot: '', serie: '', checked: false, observations: '' },
  { id: '42', code: '0101 5000 0032', description: 'Anillo Retencion Block', lot: '', serie: '', checked: false, observations: '' },
  { id: '43', code: '0101 5000 0035', description: '* Pin De Jota', lot: '', serie: '', checked: false, observations: '' },
  { id: '44', code: '0178 5000 0036', description: 'Camisa Porta Balanceadora Inferior', lot: '', serie: '', checked: false, observations: '' },
  { id: '45', code: '0178 5000 0038', description: 'Camisa Balanceadora Superior', lot: '', serie: '', checked: false, observations: '' },
  { id: '46', code: '0101 5000 0039', description: 'Camisaprotectora Jota', lot: '', serie: '', checked: false, observations: '' },
  { id: '47', code: '0000 0000 2007', description: 'Resorte (X16)', lot: '', serie: '', checked: false, observations: '' },
  { id: '48', code: '0000 0000 2011', description: 'Resorte (X8)', lot: '', serie: '', checked: false, observations: '' },
  { id: '49', code: '0000 0000 5007', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
  { id: '50', code: '0000 0000 5011', description: 'Tornillo (X2)', lot: '', serie: '', checked: false, observations: '' },
  { id: '51', code: '0000 0000 5038', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_0178: ControlCheckItem[] = [
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
    acceptableValue: 401, 
    nominalUnit: 'mm'
  },
  { 
    id: 8, 
    description: 'Verificar y realizar control dimensional al Camisa Porta Balanceadora Superior. Detalle A:',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 154.9, 
    acceptableValue: 153.9, 
    nominalUnit: 'mm'
  },
  { 
    id: 9, 
    description: 'Detalle B:',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 4.0, 
    acceptableValue: 3.8, 
    nominalUnit: 'mm'
  },
  { 
    id: 10, 
    description: 'Detalle C:',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 1.8, 
    acceptableValue: 2.1, 
    nominalUnit: 'mm'
  },
  { 
    id: 11, 
    description: 'Inspeccionar y realizar control dimensional a Camisa Balanceadora Superior (0178-5000-0038).',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 128, 
    acceptableValue: 127, 
    nominalUnit: 'mm'
  },
  { 
    id: 12, 
    description: 'Inspeccionar y realizar control dimensional a Camisa Balanceadora Inferior (0178-5000-0008).',
    isYesNo: false, 
    hasMeasurement: true,
    nominalValue: 105.5, 
    acceptableValue: 104.5, 
    nominalUnit: 'mm'
  },
  { id: 13, description: 'Verificar correcto ensamble de Camisas Balanceadoras con  Camisas Porta Balanceadora (Foto 3)', isYesNo: true, hasMeasurement: false },
  { id: 14, description: 'Inspeccionar visualmente Tetones del Pin de Jota', isYesNo: true, hasMeasurement: false },
  { id: 15, description: 'Inspeccionar estado de block de arrastre', isYesNo: true, hasMeasurement: false },
  { id: 16, description: 'Inspeccionar estado de porta block', isYesNo: true, hasMeasurement: false },
  { id: 17, description: 'Verificar torque a todas las uniones, tornillos y prisioneros.', isYesNo: true, hasMeasurement: false },
];

// ==========================================
// TKR1 0101-5500 (NEW)
// ==========================================
export const INITIAL_TRACEABILITY_5500: TraceabilityItem[] = [
    { id: '1', code: '0101 0079', description: 'Sello', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-224', description: 'O Ring (X8)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-332', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: 'O-90-2-336', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: 'O-90-2-337', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: 'O-90-2-340', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '7', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '8', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '9', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '10', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '11', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '12', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '13', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '14', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '15', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '16', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '17', code: '0000 0000 1005', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '18', code: '0000 0000 1005', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '19', code: '0000 0000 1005', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '20', code: '0000 0000 1005', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '21', code: '0000 0000 8002', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '22', code: '0000 0000 8002', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '23', code: '0000 0000 8002', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '24', code: '0000 0000 8002', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '25', code: '0101 0011', description: 'Anillo retencion flejes', lot: '', serie: '', checked: false, observations: '' },
    { id: '26', code: '0101 0019', description: 'Anillo Calibrador Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '27', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
    { id: '28', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
    { id: '29', code: '0101 0023', description: 'Anillo Calibrador Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '30', code: '0101 5500 0001', description: '* Cabezal Superior 2 7/8" EUE Box', lot: '', serie: '', checked: false, observations: '' },
    { id: '31', code: '0101 5500 0003', description: 'Tuerca Porta Sello', lot: '', serie: '', checked: false, observations: '' },
    { id: '32', code: '0101 5500 0005', description: '* Mandril', lot: '', serie: '', checked: false, observations: '' },
    { id: '33', code: '0101 5500 0007', description: 'Camisa Porta Balanceadora', lot: '', serie: '', checked: false, observations: '' },
    { id: '34', code: '0101 5500 0008', description: 'Camisa Balanceadora', lot: '', serie: '', checked: false, observations: '' },
    { id: '35', code: '0101 5500 0010', description: 'Porta Piston', lot: '', serie: '', checked: false, observations: '' },
    { id: '36', code: '0101 5500 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '37', code: '0101 5500 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '38', code: '0101 5500 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '39', code: '0101 5500 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '40', code: '0101 5500 0021', description: '* Camisa Porta Gomas', lot: '', serie: '', checked: false, observations: '' },
    { id: '41', code: '0101 5500 0022', description: 'Anillo Retenedor Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '42', code: '0101 5500 0024', description: 'Camisa Union', lot: '', serie: '', checked: false, observations: '' },
    { id: '43', code: '0101 5500 0025', description: 'Cono Portamordazas', lot: '', serie: '', checked: false, observations: '' },
    { id: '44', code: '0101 5500 0028', description: 'Anillo Porta Mordazas', lot: '', serie: '', checked: false, observations: '' },
    { id: '45', code: '0101 5500 0030', description: 'Camisa Jota', lot: '', serie: '', checked: false, observations: '' },
    { id: '46', code: '0101 5500 0032', description: 'Anillo Retención Block Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '47', code: '0101 5500 0035', description: '* Pin De Jota', lot: '', serie: '', checked: false, observations: '' },
    { id: '48', code: '0000 0000 2006', description: 'Resorte (X16)', lot: '', serie: '', checked: false, observations: '' },
    { id: '49', code: '0000 0000 2019', description: 'Resorte (X16)', lot: '', serie: '', checked: false, observations: '' },
    { id: '50', code: '0000 0000 5008', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '51', code: '0000 0000 5011', description: 'Tornillo (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '52', code: '0000 0000 5038', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '53', code: '0000 0000 5039', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '54', code: '0000 0000 5533', description: 'Tornillo (X2)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_5500: ControlCheckItem[] = [
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
      nominalValue: 272.5,
      acceptableValue: 274.5,
      nominalUnit: 'mm'
    },
    { 
      id: 8, 
      description: 'Verificar y realizar control dimensional al Camisa Porta Balanceadora. Detalle A:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 195,
      acceptableValue: 191,
      nominalUnit: 'mm'
    },
    { 
      id: 9, 
      description: 'Detalle B:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 4.3,
      acceptableValue: 4.1,
      nominalUnit: 'mm'
    },
    { 
      id: 10, 
      description: 'Detalle C:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 1.7,
      acceptableValue: 2.0,
      nominalUnit: 'mm'
    },
    { 
      id: 11, 
      description: 'Inspeccionar y realizar control dimensional a Camisa Balanceadora.',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 90.5,
      acceptableValue: 89.5,
      nominalUnit: 'mm'
    },
    { id: 12, description: 'Inspeccionar visualmente Tetones del Pin de Jota', isYesNo: true, hasMeasurement: false },
    { id: 13, description: 'Inspeccionar estado de block de arrastre', isYesNo: true, hasMeasurement: false },
    { id: 14, description: 'Inspeccionar estado de porta block', isYesNo: true, hasMeasurement: false },
    { id: 15, description: 'Verificar torque a todas las uniones, tornillos y prisioneros.', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS: InstrumentItem[] = [
  { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
  { id: '2', name: 'Durometro', code: '', expiration: '', status: 'VENC' },
  { id: '3', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
  { id: '4', name: 'Manometro', code: '', expiration: '', status: 'VENC' },
  { id: '5', name: 'Conejo', code: 'CONEJO-177-C1', expiration: '', status: 'VENC' },
  { id: '6', name: 'P/NP Porta Pistón', code: '0101-5000-0051', expiration: '', status: 'VENC' },
  { id: '7', name: 'P/NP Pistón', code: '0101-5000-0052', expiration: '', status: 'VENC' },
  { id: '8', name: '', code: '', expiration: '', status: '' },
];

// ==========================================
// TKR1 0101-7000 (NEW)
// ==========================================
export const INITIAL_TRACEABILITY_7000: TraceabilityItem[] = [
    { id: '1', code: '0101 0092', description: 'Sello', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-330', description: 'O Ring (X8)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-336', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: 'O-90-2-342', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: 'O-90-2-344', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: 'O-90-2-348', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '7', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '8', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '9', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '10', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '11', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '12', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '13', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '14', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '15', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '16', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '17', code: '0000 0000', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '18', code: '0000 0000', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '19', code: '0000 0000', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '20', code: '0000 0000', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '21', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '22', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '23', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '24', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '25', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '26', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '27', code: '0101 0011', description: 'Anillo retencion flejes', lot: '', serie: '', checked: false, observations: '' },
    { id: '28', code: '0101 0019', description: 'Anillo Calibrador Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '29', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
    { id: '30', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
    { id: '31', code: '0101 0023', description: 'Anillo Calibrador Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '32', code: '0101 7000 0001', description: '* Cabezal Superior 2 7/8" EUE Box', lot: '', serie: '', checked: false, observations: '' },
    { id: '33', code: '0101 7000 0003', description: 'Tuerca Porta Sello', lot: '', serie: '', checked: false, observations: '' },
    { id: '34', code: '0101 7000 0005', description: '* Mandril', lot: '', serie: '', checked: false, observations: '' },
    { id: '35', code: '0101 7000 0007', description: 'Camisa Porta Balanceadora', lot: '', serie: '', checked: false, observations: '' },
    { id: '36', code: '0101 7000 0008', description: 'Camisa Balanceadora', lot: '', serie: '', checked: false, observations: '' },
    { id: '37', code: '0101 7000 0010', description: 'Porta Piston', lot: '', serie: '', checked: false, observations: '' },
    { id: '38', code: '0101 7000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '39', code: '0101 7000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '40', code: '0101 7000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '41', code: '0101 7000 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '42', code: '0101 7000 0021', description: '* Camisa Porta Gomas', lot: '', serie: '', checked: false, observations: '' },
    { id: '43', code: '0101 7000 0022', description: 'Anillo Retenedor Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '44', code: '0101 7000 0024', description: 'Camisa Union', lot: '', serie: '', checked: false, observations: '' },
    { id: '45', code: '0101 7000 0025', description: 'Cono Portamordazas', lot: '', serie: '', checked: false, observations: '' },
    { id: '46', code: '0101 7000 0028', description: 'Anillo Porta Mordazas', lot: '', serie: '', checked: false, observations: '' },
    { id: '47', code: '0101 7000 0030', description: 'Camisa Jota', lot: '', serie: '', checked: false, observations: '' },
    { id: '48', code: '0101 7000 0032', description: 'Anillo Retención Block Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '49', code: '0101 7000 0035', description: '* Pin De Jota', lot: '', serie: '', checked: false, observations: '' },
    { id: '50', code: '0000 0000 2008', description: 'Resorte (X24)', lot: '', serie: '', checked: false, observations: '' },
    { id: '51', code: '0000 0000 2011', description: 'Resorte (X24)', lot: '', serie: '', checked: false, observations: '' },
    { id: '52', code: '0000 0000 5008', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '53', code: '0000 0000 5013', description: 'Tornillo (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '54', code: '0000 0000 5037', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '55', code: '0000 0000 5038', description: 'Tornillo (X8)', lot: '', serie: '', checked: false, observations: '' },
    { id: '56', code: '0000 0000 5533', description: 'Tornillo (X2)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_7000: ControlCheckItem[] = [
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
      nominalValue: 309,
      acceptableValue: 312,
      nominalUnit: 'mm'
    },
    { 
      id: 8, 
      description: 'Verificar y realizar control dimensional al Camisa Porta Balanceadora. Detalle A:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 249,
      acceptableValue: 244,
      nominalUnit: 'mm'
    },
    { 
      id: 9, 
      description: 'Detalle B:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 4.3,
      acceptableValue: 4.1,
      nominalUnit: 'mm'
    },
    { 
      id: 10, 
      description: 'Detalle C:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 1.4,
      acceptableValue: 1.7,
      nominalUnit: 'mm'
    },
    { 
      id: 11, 
      description: 'Inspeccionar y realizar control dimensional a Camisa Balanceadora.',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 101,
      acceptableValue: 99.5,
      nominalUnit: 'mm'
    },
    { id: 12, description: 'Inspeccionar visualmente Tetones del Pin de Jota', isYesNo: true, hasMeasurement: false },
    { id: 13, description: 'Inspeccionar estado de block de arrastre', isYesNo: true, hasMeasurement: false },
    { id: 14, description: 'Inspeccionar estado de porta block', isYesNo: true, hasMeasurement: false },
    { id: 15, description: 'Verificar torque a todas las uniones, tornillos y prisioneros.', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_7000: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
    { id: '3', name: 'Conejo', code: 'CONEJO-244-C1', expiration: '', status: 'VENC' },
    { id: '4', name: 'P/NP Porta Pistón', code: '0101-7000-0051', expiration: '', status: 'VENC' },
    { id: '5', name: 'P/NP Pistón', code: '0101-7000-0052', expiration: '', status: 'VENC' },
    { id: '6', name: 'NP Portabalanceadora', code: '0101-7000-0053', expiration: '', status: 'VENC' },
    { id: '7', name: 'P Portabalanceadora', code: '0101-7000-0054', expiration: '', status: 'VENC' },
    { id: '8', name: 'Durometro', code: '', expiration: '', status: 'VENC' },
    { id: '9', name: 'Manometro', code: '', expiration: '', status: 'VENC' },
];

// ==========================================
// TKR1 0101-9580 (NEW)
// ==========================================
export const INITIAL_TRACEABILITY_9580: TraceabilityItem[] = [
    { id: '1', code: '0101 0131', description: 'Sello', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-338', description: 'O Ring (X8)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-344', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: 'O-90-2-352', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: 'O-90-2-428', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: 'O-90-2-436', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '7', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '8', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '9', code: '0101', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '10', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '11', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '12', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '13', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '14', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '15', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '16', code: '0000 0000', description: 'Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '17', code: '0000 0000', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '18', code: '0000 0000', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '19', code: '0000 0000', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '20', code: '0000 0000', description: '* Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '21', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '22', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '23', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '24', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '25', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '26', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '27', code: '0000 0000', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '28', code: '0101 0011', description: 'Anillo retencion flejes', lot: '', serie: '', checked: false, observations: '' },
    { id: '29', code: '0101 0019', description: 'Anillo Calibrador Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '30', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
    { id: '31', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
    { id: '32', code: '0101 0023', description: 'Anillo Calibrador Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '33', code: '0101 9580 0001', description: '* Cabezal Superior 3 1/2" EUE Box', lot: '', serie: '', checked: false, observations: '' },
    { id: '34', code: '0101 9580 0003', description: 'Tuerca Porta Sello', lot: '', serie: '', checked: false, observations: '' },
    { id: '35', code: '0101 9580 0005', description: '* Mandril', lot: '', serie: '', checked: false, observations: '' },
    { id: '36', code: '0101 9580 0007', description: 'Camisa Porta Balanceadora', lot: '', serie: '', checked: false, observations: '' },
    { id: '37', code: '0101 9580 0008', description: 'Camisa Balanceadora', lot: '', serie: '', checked: false, observations: '' },
    { id: '38', code: '0101 9580 0010', description: 'Porta Piston', lot: '', serie: '', checked: false, observations: '' },
    { id: '39', code: '0101 9580 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '40', code: '0101 9580 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '41', code: '0101 9580 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '42', code: '0101 9580 0012', description: 'Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '43', code: '0101 9580 0021', description: '* Camisa Porta Gomas', lot: '', serie: '', checked: false, observations: '' },
    { id: '44', code: '0101 9580 0022', description: 'Anillo Retenedor Fleje', lot: '', serie: '', checked: false, observations: '' },
    { id: '45', code: '0101 9580 0024', description: 'Camisa Union', lot: '', serie: '', checked: false, observations: '' },
    { id: '46', code: '0101 9580 0025', description: 'Cono Portamordazas', lot: '', serie: '', checked: false, observations: '' },
    { id: '47', code: '0101 9580 0028', description: 'Anillo Porta Mordazas', lot: '', serie: '', checked: false, observations: '' },
    { id: '48', code: '0101 9580 0030', description: 'Camisa Jota', lot: '', serie: '', checked: false, observations: '' },
    { id: '49', code: '0101 9580 0032', description: 'Anillo Traba Block Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '50', code: '0101 9580 0035', description: '* Pin De Jota', lot: '', serie: '', checked: false, observations: '' },
    { id: '51', code: '0101 9580 0037', description: 'Anillo Traba Block Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '52', code: '0101 9580 0038', description: 'Soporte Mordazas', lot: '', serie: '', checked: false, observations: '' },
    { id: '53', code: '0000 0000 2008', description: 'Resorte (X24+32)', lot: '', serie: '', checked: false, observations: '' },
    { id: '54', code: '0000 0000 5013', description: 'Tornillo (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '55', code: '0000 0000 5015', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '56', code: '0000 0000 5037', description: 'Tornillo (X6)', lot: '', serie: '', checked: false, observations: '' },
    { id: '57', code: '0000 0000 5038', description: 'Tornillo (X8)', lot: '', serie: '', checked: false, observations: '' },
    { id: '58', code: '0000 0000 5533', description: 'Tornillo (X2)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_9580: ControlCheckItem[] = [
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
      nominalValue: 327,
      acceptableValue: 330,
      nominalUnit: 'mm'
    },
    { 
      id: 8, 
      description: 'Verificar y realizar control dimensional al Camisa Porta Balanceadora. Detalle A:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 255,
      acceptableValue: 249,
      nominalUnit: 'mm'
    },
    { 
      id: 9, 
      description: 'Detalle B:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 6.85,
      acceptableValue: 6.55,
      nominalUnit: 'mm'
    },
    { 
      id: 10, 
      description: 'Detalle C:',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 1.4,
      acceptableValue: 1.7,
      nominalUnit: 'mm'
    },
    { 
      id: 11, 
      description: 'Inspeccionar y realizar control dimensional a Camisa Balanceadora.',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 132,
      acceptableValue: 130,
      nominalUnit: 'mm'
    },
    { id: 12, description: 'Inspeccionar visualmente Tetones del Pin de Jota', isYesNo: true, hasMeasurement: false },
    { id: 13, description: 'Inspeccionar estado de block de arrastre', isYesNo: true, hasMeasurement: false },
    { id: 14, description: 'Inspeccionar estado de porta block', isYesNo: true, hasMeasurement: false },
    { id: 15, description: 'Verificar torque a todas las uniones, tornillos y prisioneros.', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_9580: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
    { id: '3', name: 'Conejo', code: 'CONEJO-300-C1', expiration: '', status: 'VENC' },
    { id: '4', name: 'Durometro', code: '', expiration: '', status: 'VENC' },
    { id: '5', name: 'Manometro', code: '', expiration: '', status: 'VENC' },
    { id: '6', name: '', code: '', expiration: '', status: '' },
    { id: '7', name: '', code: '', expiration: '', status: '' },
    { id: '8', name: '', code: '', expiration: '', status: '' },
];

// ==========================================
// SETTING TOOL HIDRÁULICA SCRH 1605-7000
// ==========================================
export const INITIAL_TRACEABILITY_SCRH1605: TraceabilityItem[] = [
    { id: '1', code: '1603 7013 0019', description: 'Sello Stinger', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-103', description: 'O Ring (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-223', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: 'O-90-2-225', description: 'O Ring (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: 'O-90-2-326', description: 'O Ring (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: 'O-90-2-332', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '7', code: 'O-90-2-335', description: 'O Ring (X5)', lot: '', serie: '', checked: false, observations: '' },
    { id: '8', code: 'O-90-2-347', description: 'O Ring (X8)', lot: '', serie: '', checked: false, observations: '' },
    { id: '9', code: '0000 0000 5716', description: 'Pin de Corte Liso', lot: '', serie: '', checked: false, observations: '' },
    { id: '10', code: '0000 0000 6745', description: 'Pin de Corte Liso', lot: '', serie: '', checked: false, observations: '' },
    { id: '11', code: '1603 7013 0012', description: '* Plancha De Cementación', lot: '', serie: '', checked: false, observations: '' },
    { id: '12', code: '1605 7000 0001', description: '* Mandril Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '13', code: '1605 7000 0002', description: '* Porta Pin', lot: '', serie: '', checked: false, observations: '' },
    { id: '14', code: '1605 7000 0003', description: 'Camisa Hidráulica Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '15', code: '1605 7000 0004', description: '* Mandril Conector', lot: '', serie: '', checked: false, observations: '' },
    { id: '16', code: '1605 7000 0005', description: 'Camisa Hidráulica Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '17', code: '1605 7000 0006', description: 'Tapa Porta Canillas', lot: '', serie: '', checked: false, observations: '' },
    { id: '18', code: '1605 7000 0007', description: 'Chaveta', lot: '', serie: '', checked: false, observations: '' },
    { id: '19', code: '1605 7000 0008', description: 'Camisa Porta Traba', lot: '', serie: '', checked: false, observations: '' },
    { id: '20', code: '1605 7000 0009', description: 'Soporte Camisa', lot: '', serie: '', checked: false, observations: '' },
    { id: '21', code: '1605 7000 0010', description: 'Traba', lot: '', serie: '', checked: false, observations: '' },
    { id: '22', code: '1605 7000 0011', description: 'Camisa Asiento Traba', lot: '', serie: '', checked: false, observations: '' },
    { id: '23', code: '1605 7000 0012', description: 'Camisa De Fijación', lot: '', serie: '', checked: false, observations: '' },
    { id: '24', code: '1605 7000 0013', description: 'Camisa De Regulación', lot: '', serie: '', checked: false, observations: '' },
    { id: '25', code: '1605 7000 0014', description: '* Tuerca', lot: '', serie: '', checked: false, observations: '' },
    { id: '26', code: '1605 7000 0015', description: '* Mandril Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '27', code: '1605 7000 0016', description: '* Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '28', code: '1605 7000 0022', description: '* Cabezal Superior 2 7/8" EUE Box', lot: '', serie: '', checked: false, observations: '' },
    { id: '29', code: '0001 0000 0025', description: '* Mandril Medio', lot: '', serie: '', checked: false, observations: 'N/A' },
    { id: '30', code: '1605 7000 0036', description: 'Camisa Hidráulica Media', lot: '', serie: '', checked: false, observations: 'N/A' },
    { id: '31', code: '0001 0000 0032', description: 'Segmento Derecho', lot: '', serie: '', checked: false, observations: '' },
    { id: '32', code: '0000 0000 2007', description: 'Resorte (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '33', code: '0000 0000 2013', description: 'Resorte (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '34', code: '0000 0000 5636', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '35', code: '0000 0000 5533', description: 'Prisionero (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '36', code: '0000 0000 5556', description: 'Prisionero (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '37', code: '0000 0000 5566', description: 'Prisionero (X10)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_SCRH1605: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas (Foto 1)', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar estado de las secciones pulidas donde trabajan los O rings', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar cantidad y estado de O rings (Foto 2)', isYesNo: true, hasMeasurement: false },
    { id: 4, description: 'Inspeccionar estado de segmento derecho y rosca del segmento sobre el mandril', isYesNo: true, hasMeasurement: false },
    { id: 5, description: 'Colocar la camisa asiento traba en el sentido que corresponde (Foto 3)', isYesNo: true, hasMeasurement: false },
    { id: 6, description: 'Verificar que el asiento de la bola esté en buen estado', isYesNo: true, hasMeasurement: false },
    { id: 7, description: 'Utilizar pin de corte (0000-0000-5716) debidamente calibrado Ø 5 X 14mm', isYesNo: true, hasMeasurement: false },
    { id: 8, description: 'Utilizar pin de corte (0000-0000-6745) debidamente calibrado Ø 3/8" X 1 1/8"', isYesNo: true, hasMeasurement: false },
    { id: 9, description: 'Colocar prisioneros (0000-0000-5566) debidamente calibrados en la porta pin', isYesNo: true, hasMeasurement: false },
    { id: 10, description: 'Colocar la camisa de regulación seteando la herramienta', isYesNo: true, hasMeasurement: false },
    { id: 11, description: 'Verificar sello stinger 1603-7013-0019 se encuentre en buen estado con su o-ring (Foto 4)', isYesNo: true, hasMeasurement: false },
    { id: 12, description: 'Verificar torque a todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_SCRH1605: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: '' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ==========================================
// SETTING TOOL HIDRÁULICA SCRH 1605-5500
// ==========================================
export const INITIAL_TRACEABILITY_SCRH5500: TraceabilityItem[] = [
    { id: '1', code: '1603 5500 0019', description: 'Sello Stinger', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-024', description: 'O Ring (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-223', description: 'O Ring (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: 'O-90-2-228', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: 'O-90-2-235', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: 'O-90-2-326', description: 'O Ring (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '7', code: 'O-90-2-328', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '8', code: 'O-90-2-329', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '9', code: 'O-90-2-337', description: 'O Ring (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '10', code: '0000 0000 5715', description: 'Pin de Corte Liso', lot: '', serie: '', checked: false, observations: '' },
    { id: '11', code: '0000 0000 5745', description: 'Pin de Corte Liso', lot: '', serie: '', checked: false, observations: '' },
    { id: '12', code: '1605 5500 0001', description: '* Mandril Superior', lot: '', serie: '', checked: false, observations: 'H3001' },
    { id: '13', code: '1605 5500 0002', description: 'Porta Pin', lot: '', serie: '', checked: false, observations: '' },
    { id: '14', code: '1605 5500 0003', description: 'Camisa Hidráulica Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '15', code: '1605 5500 0005', description: 'Camisa Hidráulica Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '16', code: '1605 0000', description: 'Soporte Anillo Traba', lot: '', serie: '', checked: false, observations: '' },
    { id: '17', code: '1605 5500 0007', description: 'Anillo Traba', lot: '', serie: '', checked: false, observations: '' },
    { id: '18', code: '1605 5500 0008', description: 'Camisa Porta Traba', lot: '', serie: '', checked: false, observations: '' },
    { id: '19', code: '1605', description: 'Soporte Camisa Fijación', lot: '', serie: '', checked: false, observations: '' },
    { id: '20', code: '1605 5500 0010', description: 'Traba', lot: '', serie: '', checked: false, observations: '' },
    { id: '21', code: '1605 5500 0011', description: 'Camisa Asiento Traba', lot: '', serie: '', checked: false, observations: '' },
    { id: '22', code: '1605', description: 'Camisa De Fijación', lot: '', serie: '', checked: false, observations: '' },
    { id: '23', code: '1605', description: 'Camisa De Regulación', lot: '', serie: '', checked: false, observations: '' },
    { id: '24', code: '1605 5500 0014', description: '* Tuerca Conectora', lot: '', serie: '', checked: false, observations: '' },
    { id: '25', code: '1605 5500 0015', description: '* Mandril Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '26', code: '1605 5500 0016', description: '* Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '27', code: '1605 5500 0018', description: 'Camisa Hidráulica Central', lot: '', serie: '', checked: false, observations: '' },
    { id: '28', code: '1605 5500 0019', description: '* Mandril Medio', lot: '', serie: '', checked: false, observations: '' },
    { id: '29', code: '1605 5500 0032', description: '* Cabezal Superior 2 7/8" Eue Box', lot: '', serie: '', checked: false, observations: '' },
    { id: '30', code: '0201 5500 0032', description: 'Segmento Derecho', lot: '', serie: '', checked: false, observations: '' },
    { id: '31', code: '1603 5500 0012', description: '* Plancha De Cementación', lot: '', serie: '', checked: false, observations: '' },
    { id: '32', code: '0000 0000 2013', description: 'Resorte (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '33', code: '0000 0000 5038', description: 'Tornillo (X4)', lot: '', serie: '', checked: false, observations: '' },
    { id: '34', code: '0000 0000 5533', description: 'Prisionero (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '35', code: '0000 0000 5556', description: 'Prisionero (X8)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_SCRH5500: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas (Foto 1)', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar estado de las secciones pulidas donde trabajan los O rings', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar cantidad y estado de O rings (Foto 2)', isYesNo: true, hasMeasurement: false },
    { id: 4, description: 'Inspeccionar estado de segmento derecho y rosca del segmento sobre el mandril', isYesNo: true, hasMeasurement: false },
    { id: 5, description: 'Colocar la camisa asiento traba en el sentido que corresponde (Foto 3)', isYesNo: true, hasMeasurement: false },
    { id: 6, description: 'Verificar que el asiento de la bola esté en buen estado', isYesNo: true, hasMeasurement: false },
    { id: 7, description: 'Utilizar pin de corte (0000-0000-5715) debidamente calibrado Ø 5 X 11mm', isYesNo: true, hasMeasurement: false },
    { id: 8, description: 'Utilizar pin de corte (0000-0000-5745) debidamente calibrado Ø 3/8" X 1 1/8"', isYesNo: true, hasMeasurement: false },
    { id: 9, description: 'Colocar prisioneros (0000-0000-5556) debidamente calibrados en la porta pin', isYesNo: true, hasMeasurement: false },
    { id: 10, description: 'Colocar la camisa de regulación seteando la herramienta', isYesNo: true, hasMeasurement: false },
    { id: 11, description: 'Verificar sello stinger 1603-5500-0019 se encuentre en buen estado con su o-ring (Foto 4)', isYesNo: true, hasMeasurement: false },
    { id: 12, description: 'Verificar torque a todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_SCRH5500: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: '' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ==========================================
// SETTING TOOL HIDRÁULICA SNT 1641-5000
// ==========================================
export const INITIAL_TRACEABILITY_SNT1641: TraceabilityItem[] = [
    { id: '1', code: 'O-90-2-118', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-225', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-326', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: 'O-90-2-328', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: 'O-90-2-329', description: 'O Ring (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: 'O-90-2-337', description: 'O Ring (X5)', lot: '', serie: '', checked: false, observations: '' },
    { id: '7', code: '0000 0000 5745', description: 'Pin de Corte Liso', lot: '', serie: '', checked: false, observations: '' },
    { id: '8', code: '1605 5500 0002', description: 'Porta Pin', lot: '', serie: '', checked: false, observations: '' },
    { id: '9', code: '1605 5500 0022', description: '* Cabezal Superior 2 3/8" Eue Box', lot: '', serie: '', checked: false, observations: '' },
    { id: '10', code: '1641 5500 0001', description: '* Mandril Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '11', code: '1641 5500 0002', description: 'Camisa Hidráulica Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '12', code: '1641 5500 0003', description: '* Mandril Medio', lot: '', serie: '', checked: false, observations: '' },
    { id: '13', code: '1641 5500 0004', description: 'Camisa Hidráulica Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '14', code: '1641 5500 0005', description: 'Niple De Unión', lot: '', serie: '', checked: false, observations: '' },
    { id: '15', code: '1641 5500 0006', description: '* Mandril Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '16', code: '1641 0007', description: 'Camisa De Regulación', lot: '', serie: '', checked: false, observations: '' },
    { id: '17', code: '1641 5500 0015', description: '* Pieza De Acople', lot: '', serie: '', checked: false, observations: '' },
    { id: '18', code: '1641 5500 0016', description: 'Asiento De Bola', lot: '', serie: '', checked: false, observations: '' },
    { id: '19', code: '0000 0000 5636', description: 'Prisionero (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '20', code: '0000 0000 5555', description: 'Prisionero (X2)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_SNT1641: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas (Foto 1)', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar estado de las secciones pulidas donde trabajan los O rings', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar cantidad y estado de O rings (Foto 2)', isYesNo: true, hasMeasurement: false },
    { id: 4, description: 'Verificar que el asiento de la bola esté en buen estado', isYesNo: true, hasMeasurement: false },
    { 
        id: 5, 
        description: 'Utilizar pin de corte (0000-0000-5745) debidamente calibrado Ø 3/8" X 7/16"',
        isYesNo: false, 
        hasMeasurement: true,
        nominalValue: 4280,
        nominalUnit: 'Lbs'
    },
    { id: 6, description: 'Colocar prisioneros (0000-0000-5666) sobre los pines de corte (0000-0000-5745) en la porta pin', isYesNo: true, hasMeasurement: false },
    { id: 7, description: 'Colocar la camisa de regulación apropiada para el trabajo: □ 1641-5000-0007 para 5"  □ 1641-5500-0007 para 5 1/2"', isYesNo: true, hasMeasurement: false },
    { id: 8, description: 'Verificar torque a todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_SNT1641: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: '' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ==========================================
// SETTING TOOL HIDRÁULICA SNT2 1667-7000
// ==========================================
export const INITIAL_TRACEABILITY_SNT2_1667: TraceabilityItem[] = [
    { id: '1', code: 'O-90-2-118', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-228', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-332', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: 'O-90-2-335', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: 'O-90-2-347', description: 'O Ring (X0)', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: '0000 0000 5745', description: 'Pin de Corte Liso', lot: '', serie: '', checked: false, observations: '' },
    { id: '7', code: '1605 7000 0022', description: '* Cabezal Superior Eue', lot: '', serie: '', checked: false, observations: '' },
    { id: '8', code: '1641 7000 0003', description: '* Porta Pin', lot: '', serie: '', checked: false, observations: '' },
    { id: '9', code: '1641 7000 0004', description: 'Camisa Hidráulica', lot: '', serie: '', checked: false, observations: '' },
    { id: '10', code: '1641 7000 0005', description: 'Camisa De Unión', lot: '', serie: '', checked: false, observations: '' },
    { id: '11', code: '1641 7000 0006', description: '* Mandril Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '12', code: '1641 7000 0007', description: 'Camisa De Fijación', lot: '', serie: '', checked: false, observations: '' },
    { id: '13', code: '1641 7000 0008', description: '* Adaptador', lot: '', serie: '', checked: false, observations: '' },
    { id: '14', code: '1641 7000 0016', description: 'Asiento De Bola', lot: '', serie: '', checked: false, observations: '' },
    { id: '15', code: '1667 7000 0002', description: '* Mandril Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '16', code: '1667 7000 0010', description: 'Camisa Hidráulica Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '17', code: '1667 7000 0011', description: '* Mandril Medio', lot: '', serie: '', checked: false, observations: '' },
    { id: '18', code: '0000 0000 5556', description: 'Prisionero (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '19', code: '0000 0000 5558', description: 'Prisionero (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '20', code: '0000 0000 5566', description: 'Prisionero (X10)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_SNT2_1667: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar estado de las secciones pulidas donde trabajan los O rings', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar cantidad y estado de O rings', isYesNo: true, hasMeasurement: false },
    { id: 4, description: 'Verificar que el asiento de la bola esté en buen estado', isYesNo: true, hasMeasurement: false },
    { 
        id: 5, 
        description: 'Utilizar pin de corte (0000-0000-5745) debidamente calibrado Ø 3/8" X 7/16"',
        isYesNo: false, 
        hasMeasurement: true,
        nominalValue: 4280,
        nominalUnit: 'Lbs'
    },
    { id: 6, description: 'Colocar prisioneros (0000-0000-5566) sobre los pines de corte (0000-0000-5745) en la porta pin', isYesNo: true, hasMeasurement: false },
    { id: 7, description: 'Verificar torque a todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_SNT2_1667: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: '' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ==========================================
// KIT WIRE LINE 1617-5500
// ==========================================
export const INITIAL_TRACEABILITY_KITWIRELINE: TraceabilityItem[] = [
    { id: '1', code: '1602 5065 0001', description: 'Camisa de Fijación', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: '1617 5065 0003', description: 'Adaptador', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: '1617 5065 0002', description: 'Mandril de Tensión', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: '0000 0000 2038', description: 'Resorte', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_KITWIRELINE: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_KITWIRELINE: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ==========================================
// STINGER PARA CEMENTAR 1621-5000
// ==========================================
export const INITIAL_TRACEABILITY_STINGER: TraceabilityItem[] = [
    { id: '1', code: '1603 5500 0019', description: 'Sello Stinger', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-024', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-219', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: '1603 5500 0101', description: 'Mandril Adaptador', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: '1601 5000 0103', description: 'Cabezal Adaptador', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: '1603 5500 0012', description: 'Puntera De Cementación', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_STINGER: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas (Foto 1)', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar estado de las secciones pulidas donde trabajan los O rings', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar cantidad y estado de O rings. (Foto 2)', isYesNo: true, hasMeasurement: false },
    { id: 4, description: 'Verificar sello stinger 1603-5500-0019 se encuentra en buen estado con su oring (Foto 3)', isYesNo: true, hasMeasurement: false },
    { id: 5, description: 'Verificar torque a todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_STINGER: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ==========================================
// TAPÓN RECUPERABLE TPR1 0201-5000
// ==========================================
export const INITIAL_TRACEABILITY_TPR1: TraceabilityItem[] = [
    { id: '1', code: '0101', description: 'Sello', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: 'O-90-2-238', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: 'O-90-2-314', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: 'O-90-2-318', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: 'O-90-2-329', description: 'O Ring (X2)', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: 'O-90-2-329', description: 'O Ring (X1)', lot: '', serie: '', checked: false, observations: '' },
    { id: '7', code: '0101 2002', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '8', code: '0101 2002', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '9', code: '0101 2002', description: 'Goma', lot: '', serie: '', checked: false, observations: 'Dureza Registrada: ' },
    { id: '10', code: '0000 0000 1346', description: 'Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '11', code: '0000 0000 1346', description: 'Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '12', code: '0000 0000 1346', description: 'Mordaza', lot: '', serie: '', checked: false, observations: '' },
    { id: '13', code: '0000 0000 8001', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '14', code: '0000 0000 8001', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '15', code: '0000 0000 8001', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '16', code: '0000 0000 8001', description: 'Blocks de Arrastre', lot: '', serie: '', checked: false, observations: '' },
    { id: '17', code: '0101 0019', description: 'Anillo Calibrador Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '18', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
    { id: '19', code: '0101 0017', description: 'Anillos Separadores', lot: '', serie: '', checked: false, observations: '' },
    { id: '20', code: '0201 5000 0001', description: 'Puerta De Pistón', lot: '', serie: '', checked: false, observations: '' },
    { id: '21', code: '0201 5000 0002', description: 'Manga De Válvula', lot: '', serie: '', checked: false, observations: '' },
    { id: '22', code: '0201 5000 0003', description: 'Mandril De Camisa Jota', lot: '', serie: '', checked: false, observations: '' },
    { id: '23', code: '0201 5000 0005', description: 'Mandril Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '24', code: '0201 5000 0008', description: 'Adaptador De Mandril', lot: '', serie: '', checked: false, observations: '' },
    { id: '25', code: '0201 5000 0009', description: 'Tubo Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '26', code: '0201 5000 0010', description: 'Anillo De Fricción Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '27', code: '0201 5000 0011', description: 'Anillo De Fricción Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '28', code: '0201 5000 0012', description: 'Camisa Corrección', lot: '', serie: '', checked: false, observations: '' },
    { id: '29', code: '0201 5000 0015', description: 'Camisa Porta Gomas', lot: '', serie: '', checked: false, observations: '' },
    { id: '30', code: '0201 5000 0020', description: 'Cono Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '31', code: '0201 5000 0022', description: 'Camisa Porta Mordazas', lot: '', serie: '', checked: false, observations: '' },
    { id: '32', code: '0201 5000 0025', description: 'Cono Portamordazas Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '33', code: '0201 5000 0027', description: 'Anillo Tope Block', lot: '', serie: '', checked: false, observations: '' },
    { id: '34', code: '0201 5000 0030', description: 'Camisa Porta Segmentos', lot: '', serie: '', checked: false, observations: '' },
    { id: '35', code: '0201 5000 0031', description: 'Segmento Izquierdo', lot: '', serie: '', checked: false, observations: '' },
    { id: '36', code: '0201 5000 0032', description: 'Segmento Derecho', lot: '', serie: '', checked: false, observations: '' },
    { id: '37', code: '0201 5000 0035', description: 'Adaptador Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '38', code: '0201 5000 0036', description: 'Mandril Superior', lot: '', serie: '', checked: false, observations: '' },
    { id: '39', code: '0201 5000 0038', description: 'Mandril Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '40', code: '0201 5000 0040', description: 'Anillo Tope Block Inferior', lot: '', serie: '', checked: false, observations: '' },
    { id: '41', code: '0000 0000 2005', description: 'Resorte (X5)', lot: '', serie: '', checked: false, observations: '' },
    { id: '42', code: '0000 0000 2015', description: 'Resorte (X3)', lot: '', serie: '', checked: false, observations: '' },
    { id: '43', code: '0000 0000 2019', description: 'Resorte (X12)', lot: '', serie: '', checked: false, observations: '' },
    { id: '44', code: '0000 0000 0002', description: 'Tornillo (X6)', lot: '', serie: '', checked: false, observations: '' },
    { id: '45', code: '0000 0000 5036', description: 'Tornillo (X12)', lot: '', serie: '', checked: false, observations: '' },
    { id: '46', code: '0000 0000 5122', description: 'Prisionero (X2)', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_TPR1: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de mordazas, conos y camisas portamordazas', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar visualmente estado de roscas (Foto 1)', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar estado de las secciones pulidas donde trabajan los O rings', isYesNo: true, hasMeasurement: false },
    { id: 4, description: 'Verificar cantidad y estado de O rings. (Foto 2)', isYesNo: true, hasMeasurement: false },
    { id: 5, description: 'Verificar que el port de pesca no presente obstrucciones', isYesNo: true, hasMeasurement: false },
    { id: 6, description: 'Verificar camisa de válvula tanto interna como externamente', isYesNo: true, hasMeasurement: false },
    { id: 7, description: 'Verificar sellado del mandril de válvula', isYesNo: true, hasMeasurement: false },
    { id: 8, description: 'Verificar estado de anillo de fricción superior e inferior', isYesNo: true, hasMeasurement: false },
    { id: 9, description: 'Inspeccionar estado de blocks de arrastre', isYesNo: true, hasMeasurement: false },
    { id: 10, description: 'Inspeccionar estado de porta block', isYesNo: true, hasMeasurement: false },
    { id: 11, description: 'Inspeccionar estado de segmento derecho y segmento izquierdo (Foto 3)', isYesNo: true, hasMeasurement: false },
    { id: 12, description: 'Inspeccionar estado de mandril inferior', isYesNo: true, hasMeasurement: false },
    { id: 13, description: 'Verificar torque al pin de pesca, todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_TPR1: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];
// ============================================
// PESCADOR TCR2 1102-5000 (POCOP001-A2-4)
// ============================================
export const INITIAL_TRACEABILITY_PESCADOR_TCR2: TraceabilityItem[] = [
    { id: '1', code: '1101-5000-0001', description: 'Cabezal', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: '1101-5000-0002', description: 'Cuerpo Porta Pin', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: '1101-5000-0003', description: 'Anillo', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: '1102-5000-0006', description: 'Cuerpo De Conexión', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: '1102-5000-0007', description: 'Camisa De Fricción', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: '1102-5000-0008', description: 'Zapato', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_PESCADOR_TCR2: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar visualmente estado de los pin', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar visualmente estado de la Camisa de Fricción (Nominal: 66.6mm - Aceptable: 68.1mm)', isYesNo: true, hasMeasurement: true },
    { id: 4, description: 'Verificar torque', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_PESCADOR_TCR2: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: '' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ============================================
// PESCADOR TCR2 1102-5500 (POCOP001-A2-4)
// ============================================
export const INITIAL_TRACEABILITY_PESCADOR_TCR2_5500: TraceabilityItem[] = [
    { id: '1', code: '1101-5500-0001', description: 'Cabezal', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: '1101-5500-0002', description: 'Cuerpo Porta Pin', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: '1101-5500-0003', description: 'Anillo', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: '1102-5500-0006', description: 'Cuerpo De Conexión', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: '1102-5500-0007', description: 'Camisa De Fricción', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: '1102-5500-0008', description: 'Zapato', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_PESCADOR_TCR2_5500: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar visualmente estado del pin', isYesNo: true, hasMeasurement: false },
    { 
      id: 3, 
      description: 'Verificar y realizar control dimensional al Camisa de Fricción',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 78.5,
      acceptableValue: 79.5,
      nominalUnit: 'mm'
    },
    { id: 4, description: 'Verificar torque a todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_PESCADOR_TCR2_5500: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: '' },
    { id: '3', name: 'P/NP C. Fricción', code: '1102-5500-0051', expiration: '', status: 'VENC' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ============================================
// PESCADOR TCR2 1102-9580 (POCOP001-A2-4)
// ============================================
export const INITIAL_TRACEABILITY_PESCADOR_TCR2_9580: TraceabilityItem[] = [
    { id: '1', code: '1101-9580-0001', description: 'Cabezal', lot: '', serie: '', checked: false, observations: '' },
    { id: '2', code: '1101-9580-0002', description: 'Cuerpo Porta Pin', lot: '', serie: '', checked: false, observations: '' },
    { id: '3', code: '1101-9580-0004', description: 'Pin X 2', lot: '', serie: '', checked: false, observations: '' },
    { id: '4', code: '1102-9580-0006', description: 'Cuerpo De Unión', lot: '', serie: '', checked: false, observations: '' },
    { id: '5', code: '1102-9580-0007', description: 'Camisa De Fricción', lot: '', serie: '', checked: false, observations: '' },
    { id: '6', code: '1102-9580-0008', description: 'Zapato', lot: '', serie: '', checked: false, observations: '' },
];

export const INITIAL_CHECKS_PESCADOR_TCR2_9580: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de roscas', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar visualmente estado del pin (1101-9580-0004)', isYesNo: true, hasMeasurement: false },
    { 
      id: 3, 
      description: 'Verificar y realizar control dimensional a Camisa de Fricción',
      isYesNo: false, 
      hasMeasurement: true,
      nominalValue: 138,
      acceptableValue: 139.5,
      nominalUnit: 'mm'
    },
    { id: 4, description: 'Verificar torque a todas las uniones, tornillos y prisioneros', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_PESCADOR_TCR2_9580: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
    { id: '3', name: '', code: '', expiration: '', status: '' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ─────────────────────────────────────────────
// RETENEDOR DE CEMENTO 1505-7000
// ─────────────────────────────────────────────

export const INITIAL_CHECKS_RETENEDOR_1505: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de la Cupla de Corte', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar visualmente Válvula', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar y realizar control dimensional', isYesNo: true, hasMeasurement: false },
    { id: 4, description: 'Verificar dureza del elastómero', isYesNo: true, hasMeasurement: false },
    { id: 5, description: 'Verificar alambre retenedor de mordaza', isYesNo: true, hasMeasurement: false },
];

export const INITIAL_INSTRUMENTS_RETENEDOR_1505: InstrumentItem[] = [
    { id: '1', name: 'Pie de Rey', code: 'CAL-DIG-300-C1', expiration: '', status: 'VENC' },
    { id: '2', name: 'Cinta Métrica', code: 'CINTA-MET-C1', expiration: '', status: 'VENC' },
    { id: '3', name: 'Durómetro', code: 'DURO-DIAL-SHA', expiration: '', status: 'VENC' },
    { id: '4', name: '', code: '', expiration: '', status: '' },
];

// ─────────────────────────────────────────────
// RETENEDOR DE CEMENTO 1540-5500
// ─────────────────────────────────────────────

export const INITIAL_CHECKS_RETENEDOR_1540: ControlCheckItem[] = [
    { id: 1, description: 'Verificar visualmente estado de la Cupla de Corte', isYesNo: true, hasMeasurement: false },
    { id: 2, description: 'Verificar visualmente Tapón', isYesNo: true, hasMeasurement: false },
    { id: 3, description: 'Verificar y realizar control dimensional', isYesNo: true, hasMeasurement: false },
    { id: 4, description: 'Verificar dureza del elastómero', isYesNo: true, hasMeasurement: false },
    { id: 5, description: 'Verificar alambre retenedor de mordaza', isYesNo: true, hasMeasurement: false },
]; 
