import { ReportData, ControlCheckItem, InstrumentItem } from './types';

export type ValidationStatus = 'APTO' | 'NO APTO' | 'INCOMPLETO';

interface ValidationResult {
  status: ValidationStatus;
  reasons: string[];
}

export const validateMeasurement = (check: ControlCheckItem): 'ok' | 'fail' | 'empty' => {
  if (!check.measuredValue || check.measuredValue.trim() === '') return 'empty';
  
  const val = parseFloat(check.measuredValue);
  if (isNaN(val)) return 'fail'; // Not a number is a fail

  if (check.nominalValue !== undefined && check.acceptableValue !== undefined) {
    // Logic: 
    // If Acceptable < Nominal, it's a Minimum Limit (wear down).
    // If Acceptable > Nominal, it's a Maximum Limit (expansion).
    
    if (check.acceptableValue < check.nominalValue) {
       // Lower limit (e.g., Nominal 153.5, Acceptable 152.5 -> Value must be >= 152.5)
       return val >= check.acceptableValue ? 'ok' : 'fail';
    } else {
       // Upper limit (e.g., Nominal 399, Acceptable 400 -> Value must be <= 400)
       return val <= check.acceptableValue ? 'ok' : 'fail';
    }
  }
  return 'ok';
};

export const evaluateToolStatus = (data: ReportData): ValidationResult => {
  const reasons: string[] = [];
  let isIncomplete = false;
  let isFail = false;

  // 1. Check Pre-Assembly Measurements
  data.preAssemblyChecks.forEach(check => {
    if (check.isYesNo) {
      if (!check.checked) {
        isIncomplete = true; // Assuming unchecked means not done yet, rather than fail
      }
    } else if (check.hasMeasurement) {
      const status = validateMeasurement(check);
      if (status === 'fail') {
        isFail = true;
        reasons.push(`Medida fuera de rango: ${check.description} (${check.measuredValue})`);
      } else if (status === 'empty') {
        isIncomplete = true;
      }
    }
  });

  // 2. Check Instruments
  data.instruments.forEach(inst => {
    if (inst.name && inst.status === 'VENC') {
      isFail = true; // Strict rule: cannot use expired instruments
      reasons.push(`Instrumento vencido: ${inst.name}`);
    }
    if (inst.name && !inst.status) {
      isIncomplete = true;
    }
  });

  // 3. Functional Test
  if (!data.functionalTest.mandrelPass && !data.functionalTest.systemSetting) {
      // Loose check for functional test completion
      // isIncomplete = true; 
  }

  if (isFail) return { status: 'NO APTO', reasons };
  if (isIncomplete) return { status: 'INCOMPLETO', reasons: ['Faltan datos de verificación'] };
  
  return { status: 'APTO', reasons: [] };
};