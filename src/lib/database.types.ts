/**
 * Database Types - Generado para Supabase
 * Proyecto: Httas2026 - Tacker Digital Report
 * 
 * Este archivo define los tipos TypeScript que coinciden con
 * las tablas de la base de datos Supabase.
 */

// ─────────────────────────────────────────────
// ENUMS (coinciden con los ENUMs de PostgreSQL)
// ─────────────────────────────────────────────

export type ToolType = 
  | 'TKR1_0101_5000'
  | 'TKR1_0178_5000'
  | 'TKR1_0101_5500'
  | 'TKR1_0101_7000'
  | 'TKR1_0101_9580'
  | 'SCRH_1605_7000'
  | 'SCRH_1605_5500'
  | 'SNT_1641_5000'
  | 'SNT2_1667_7000'
  | 'KIT_WIRELINE'
  | 'STINGER_CEMENTAR'
  | 'TPR1_0201_5000'
  | 'PESCADOR_TCR2'
  | 'PESCADOR_TCR2_5500'
  | 'PESCADOR_TCR2_9580'
  | 'RETENEDOR_CEMENTO_1505_7000'
  | 'RETENEDOR_CEMENTO_1505_5500'
  | 'RETENEDOR_CEMENTO_1540_5500'
  | 'RETENEDOR_CEMENTO_1540_5500_2';

export type ValidationStatus = 'APTO' | 'NO APTO' | 'INCOMPLETO';

export type InstrumentStatusEnum = 'OK' | 'VENC' | '';

export type SystemSetting = 'IZQUIERDO' | 'DERECHO' | '';

// ─────────────────────────────────────────────
// JSONB TYPES (para columnas JSONB)
// ─────────────────────────────────────────────

export interface AttachmentsJson {
  lastJob: string;
  inspectionReport: string;
  incidentReport: string;
  hydroTestPsi: string;
  hydroTestMin: string;
}

export interface FunctionalTestJson {
  systemSetting: SystemSetting;
  mandrelPass: boolean;
}

// Datos dimensionales base (se extiende según el tipo)
export interface BaseDimensionalData {
  maxMin?: { od: string; id: string };
  od?: Record<string, string>;
  lengths?: Record<string, string>;
}

// Datos dimensionales para TKR1 (Empaque Recuperable)
export interface TKR1DimensionalData extends BaseDimensionalData {
  accessories?: {
    piston: { a: boolean; b: boolean; u: boolean; check: boolean };
    mordaza: { a: boolean; b: boolean; u: boolean; check: boolean };
    block: { a: boolean; b: boolean; u: boolean; check: boolean };
    connUpper: string;
    connLower: string;
  };
}

// Datos dimensionales para Kit Wire Line
export interface KitWireLineDimensionalData {
  libraje: string;
  maxMin: { od: string; id: string };
  lengths: { a: string };
  diameters: { od1: string };
}

// Datos dimensionales para TPR1
export interface TPR1DimensionalData {
  diametro: string;
  libraje: string;
  maxMin: { od: string; id: string };
  lengths: { a: string; b: string; c: string };
  diameters: Record<string, string>;
  accesorios: {
    block8001: boolean;
    blockA: boolean;
    blockB: boolean;
    blockC: boolean;
    blockD: boolean;
    blockE: boolean;
    blockF: boolean;
    conexionInferior: string;
  };
}

// Datos dimensionales para Pescador TCR2
export interface PescadorTCR2DimensionalData {
  libraje: string;
  maxMin: { od: string; id: string };
  lengths: { a: string };
  diameters: { od1: string; od2: string };
  conexionSuperior: string;
}

// Tipo unión de todos los datos dimensionales
export type DimensionalDataJson = 
  | TKR1DimensionalData 
  | KitWireLineDimensionalData 
  | TPR1DimensionalData 
  | PescadorTCR2DimensionalData
  | BaseDimensionalData
  | Record<string, any>;

// Configuración extra por tipo de herramienta
export interface ExtraConfigJson {
  settingSize?: '7' | '9-5/8' | '';
  calibratorLoad?: string;
  carreraRegistrada?: string;
  [key: string]: any;
}

// ─────────────────────────────────────────────
// DATABASE SCHEMA TYPES
// ─────────────────────────────────────────────

export type Database = {
  public: {
    Tables: {
      // ───── REPAIR REPORTS (Tabla Padre) ─────
      repair_reports: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          tool_type: ToolType;
          report_date: string;
          serial: string | null;
          report_number: string;
          attachments: AttachmentsJson;
          functional_test: FunctionalTestJson;
          comments: string;
          dimensional_data: DimensionalDataJson;
          validation_status: ValidationStatus;
          validation_reasons: string[];
          assembled_by: string | null;
          assembled_date: string | null;
          assembled_signature: string | null;
          supervised_by: string | null;
          supervised_date: string | null;
          supervised_signature: string | null;
          extra_config: ExtraConfigJson;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          tool_type: ToolType;
          report_date?: string;
          serial?: string | null;
          report_number?: string;
          attachments?: AttachmentsJson;
          functional_test?: FunctionalTestJson;
          comments?: string;
          dimensional_data?: DimensionalDataJson;
          validation_status?: ValidationStatus;
          validation_reasons?: string[];
          assembled_by?: string | null;
          assembled_date?: string | null;
          assembled_signature?: string | null;
          supervised_by?: string | null;
          supervised_date?: string | null;
          supervised_signature?: string | null;
          extra_config?: ExtraConfigJson;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          tool_type?: ToolType;
          report_date?: string;
          serial?: string | null;
          report_number?: string;
          attachments?: AttachmentsJson;
          functional_test?: FunctionalTestJson;
          comments?: string;
          dimensional_data?: DimensionalDataJson;
          validation_status?: ValidationStatus;
          validation_reasons?: string[];
          assembled_by?: string | null;
          assembled_date?: string | null;
          assembled_signature?: string | null;
          supervised_by?: string | null;
          supervised_date?: string | null;
          supervised_signature?: string | null;
          extra_config?: ExtraConfigJson;
        };
      };

      // ───── TRACEABILITY ITEMS (Tabla Hija) ─────
      traceability_items: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          report_id: string;
          sort_order: number;
          code: string;
          description: string;
          lot: string;
          serie: string;
          checked: boolean;
          observations: string;
          is_header: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          report_id: string;
          sort_order?: number;
          code: string;
          description: string;
          lot?: string;
          serie?: string;
          checked?: boolean;
          observations?: string;
          is_header?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          report_id?: string;
          sort_order?: number;
          code?: string;
          description?: string;
          lot?: string;
          serie?: string;
          checked?: boolean;
          observations?: string;
          is_header?: boolean;
        };
      };

      // ───── CONTROL CHECK ITEMS (Tabla Hija) ─────
      control_check_items: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          report_id: string;
          sort_order: number;
          description: string;
          is_yes_no: boolean;
          has_measurement: boolean;
          nominal_value: number | null;
          nominal_unit: string | null;
          acceptable_value: number | null;
          measured_value: string | null;
          checked: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          report_id: string;
          sort_order?: number;
          description: string;
          is_yes_no?: boolean;
          has_measurement?: boolean;
          nominal_value?: number | null;
          nominal_unit?: string | null;
          acceptable_value?: number | null;
          measured_value?: string | null;
          checked?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          report_id?: string;
          sort_order?: number;
          description?: string;
          is_yes_no?: boolean;
          has_measurement?: boolean;
          nominal_value?: number | null;
          nominal_unit?: string | null;
          acceptable_value?: number | null;
          measured_value?: string | null;
          checked?: boolean;
        };
      };

      // ───── INSTRUMENT ITEMS (Tabla Hija) ─────
      instrument_items: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          report_id: string;
          sort_order: number;
          name: string;
          code: string;
          expiration: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          report_id: string;
          sort_order?: number;
          name?: string;
          code?: string;
          expiration?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          report_id?: string;
          sort_order?: number;
          name?: string;
          code?: string;
          expiration?: string | null;
          status?: string;
        };
      };

      // ───── REPORT PHOTOS (Tabla Hija) ─────
      report_photos: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          report_id: string;
          section: string;
          sort_order: number;
          photo_url: string;
          caption: string | null;
          file_name: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          report_id: string;
          section: string;
          sort_order?: number;
          photo_url: string;
          caption?: string | null;
          file_name?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          report_id?: string;
          section?: string;
          sort_order?: number;
          photo_url?: string;
          caption?: string | null;
          file_name?: string | null;
        };
      };
    };
    Views: {
      v_reports_summary: {
        Row: {
          id: string;
          tool_type: ToolType;
          report_date: string;
          serial: string | null;
          report_number: string;
          validation_status: ValidationStatus;
          assembled_by: string | null;
          supervised_by: string | null;
          created_at: string;
          updated_at: string;
          traceability_count: number;
          checks_count: number;
          instruments_count: number;
          photos_count: number;
        };
      };
    };
    Enums: {
      tool_type: ToolType;
      validation_status: ValidationStatus;
      instrument_status: InstrumentStatusEnum;
      system_setting: SystemSetting;
    };
  };
};

// ─────────────────────────────────────────────
// TIPOS DE CONVENIENCIA
// ─────────────────────────────────────────────

// Tipos de fila completa
export type RepairReportRow = Database['public']['Tables']['repair_reports']['Row'];
export type TraceabilityItemRow = Database['public']['Tables']['traceability_items']['Row'];
export type ControlCheckItemRow = Database['public']['Tables']['control_check_items']['Row'];
export type InstrumentItemRow = Database['public']['Tables']['instrument_items']['Row'];
export type ReportPhotoRow = Database['public']['Tables']['report_photos']['Row'];

// Tipos de inserción
export type RepairReportInsert = Database['public']['Tables']['repair_reports']['Insert'];
export type TraceabilityItemInsert = Database['public']['Tables']['traceability_items']['Insert'];
export type ControlCheckItemInsert = Database['public']['Tables']['control_check_items']['Insert'];
export type InstrumentItemInsert = Database['public']['Tables']['instrument_items']['Insert'];
export type ReportPhotoInsert = Database['public']['Tables']['report_photos']['Insert'];

// Tipos de actualización
export type RepairReportUpdate = Database['public']['Tables']['repair_reports']['Update'];

// Tipo de reporte con relaciones
export interface RepairReportWithRelations extends RepairReportRow {
  traceability_items?: TraceabilityItemRow[];
  control_check_items?: ControlCheckItemRow[];
  instrument_items?: InstrumentItemRow[];
  report_photos?: ReportPhotoRow[];
}
