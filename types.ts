export interface TraceabilityItem {
  id: string;
  code: string;
  description: string;
  lot: string;
  serie: string;
  checked: boolean; // "Si" column
  observations: string;
  isHeader?: boolean;
}

export interface ControlCheckItem {
  id: number;
  description: string;
  hasMeasurement: boolean;
  nominalValue?: number;
  nominalUnit?: string;
  acceptableValue?: number;
  measuredValue?: string; // string to allow empty state
  isYesNo: boolean; // true for checkbox only, false for measurement
  checked?: boolean; // For Yes/No items
}

export interface InstrumentItem {
  id: string;
  name: string;
  code: string;
  expiration: string;
  status: 'VENC' | 'OK' | '';
}

export interface DimensionalData {
  maxMin: {
    od: string;
    id: string;
  };
  od: Record<string, string>; // OD1, OD2...
  lengths: Record<string, string>; // A, B, C...
  accessories: {
    piston: { a: boolean; b: boolean; u: boolean; check: boolean };
    mordaza: { a: boolean; b: boolean; u: boolean; check: boolean };
    block: { a: boolean; b: boolean; u: boolean; check: boolean };
    connUpper: string;
    connLower: string;
  }
}

export interface ReportData {
  meta: {
    date: string;
    serial: string;
    reportNumber: string;
  };
  traceability: TraceabilityItem[];
  preAssemblyChecks: ControlCheckItem[];
  attachments: {
    lastJob: string;
    inspectionReport: string;
    incidentReport: string;
    hydroTestPsi: string;
    hydroTestMin: string;
  };
  functionalTest: {
    systemSetting: 'IZQUIERDO' | 'DERECHO' | '';
    mandrelPass: boolean;
  };
  comments: string;
  dimensional: DimensionalData;
  instruments: InstrumentItem[];
  signatures: {
    assembledBy: string;
    assembledDate: string;
    assembledSignature: string; // Base64 image
    supervisedBy: string;
    supervisedDate: string;
    supervisedSignature: string; // Base64 image
  };
  photos: {
    section1: string[]; // Conexiones
    section2: string[]; // Orings
    section3: string[]; // Balanceadoras
  }
}