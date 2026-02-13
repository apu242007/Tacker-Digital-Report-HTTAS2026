/**
 * API Services - CRUD Operations for Supabase
 * Proyecto: Httas2026 - Tacker Digital Report
 * 
 * Este archivo contiene todos los servicios para guardar y recuperar
 * reportes de reparación desde Supabase.
 */

import { supabase } from '../lib/supabase';
import type {
  ToolType,
  ValidationStatus,
  RepairReportRow,
  RepairReportInsert,
  TraceabilityItemRow,
  TraceabilityItemInsert,
  ControlCheckItemRow,
  ControlCheckItemInsert,
  InstrumentItemRow,
  InstrumentItemInsert,
  ReportPhotoRow,
  ReportPhotoInsert,
  RepairReportWithRelations,
  AttachmentsJson,
  FunctionalTestJson,
  DimensionalDataJson,
  ExtraConfigJson,
} from '../lib/database.types';

// Importar tipos del frontend
import type { 
  ReportData, 
  TraceabilityItem, 
  ControlCheckItem, 
  InstrumentItem,
  DimensionalData 
} from '../../types';

// ─────────────────────────────────────────────
// HELPERS GENÉRICOS
// ─────────────────────────────────────────────

/**
 * Helper genérico para guardar un reporte padre con todas sus tablas hijas.
 * Realiza upsert del padre y reemplaza los hijos (delete + insert).
 */
async function saveReportWithChildren<T extends { id?: string }>(
  table: string,
  data: T,
  childrenConfig: { table: string; data: any[]; fk: string }[] = []
): Promise<RepairReportRow> {
  const { id, ...rest } = data;

  // Upsert padre (si id existe y es UUID válido, actualiza; sino, inserta)
  const isValidUUID = id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  
  const { data: parent, error } = await (supabase
    .from(table) as any)
    .upsert({ 
      ...(isValidUUID ? { id } : {}), 
      ...rest 
    })
    .select()
    .single();

  if (error) {
    console.error(`Error saving ${table}:`, error);
    throw error;
  }
  if (!parent) {
    throw new Error(`Failed to save ${table}`);
  }

  // Reemplazar hijos (delete + insert) para cada configuración
  for (const config of childrenConfig) {
    if (config.data && config.data.length > 0) {
      // Eliminar hijos existentes
      const { error: deleteError } = await (supabase
        .from(config.table) as any)
        .delete()
        .eq(config.fk, (parent as any).id);

      if (deleteError) {
        console.error(`Error deleting ${config.table}:`, deleteError);
        throw deleteError;
      }

      // Insertar nuevos hijos (sin IDs del frontend para que se generen nuevos)
      const cleanChildren = config.data.map((child, index) => ({
        ...child,
        id: undefined, // Forzar generación de nuevo UUID
        [config.fk]: (parent as any).id,
        sort_order: index,
      }));

      const { error: insertError } = await (supabase
        .from(config.table) as any)
        .insert(cleanChildren);

      if (insertError) {
        console.error(`Error inserting ${config.table}:`, insertError);
        throw insertError;
      }
    }
  }

  return parent as RepairReportRow;
}

/**
 * Helper genérico para obtener reportes con sus tablas hijas.
 */
async function fetchReportsWithRelations(
  toolType?: ToolType
): Promise<RepairReportWithRelations[]> {
  let query = supabase
    .from('repair_reports')
    .select(`
      *,
      traceability_items (
        id, sort_order, code, description, lot, serie, checked, observations, is_header
      ),
      control_check_items (
        id, sort_order, description, is_yes_no, has_measurement, nominal_value, nominal_unit, acceptable_value, measured_value, checked
      ),
      instrument_items (
        id, sort_order, name, code, expiration, status
      ),
      report_photos (
        id, section, sort_order, photo_url, caption, file_name
      )
    `)
    .order('created_at', { ascending: false });

  if (toolType) {
    query = query.eq('tool_type', toolType);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching reports:', error);
    return [];
  }

  return (data as RepairReportWithRelations[]) || [];
}

/**
 * Obtener un reporte individual por ID con todas sus relaciones.
 */
async function fetchReportById(id: string): Promise<RepairReportWithRelations | null> {
  const { data, error } = await supabase
    .from('repair_reports')
    .select(`
      *,
      traceability_items (
        id, sort_order, code, description, lot, serie, checked, observations, is_header
      ),
      control_check_items (
        id, sort_order, description, is_yes_no, has_measurement, nominal_value, nominal_unit, acceptable_value, measured_value, checked
      ),
      instrument_items (
        id, sort_order, name, code, expiration, status
      ),
      report_photos (
        id, section, sort_order, photo_url, caption, file_name
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching report by ID:', error);
    return null;
  }

  return data as RepairReportWithRelations;
}

// ─────────────────────────────────────────────
// MAPPERS: Frontend ↔ Database
// ─────────────────────────────────────────────

/**
 * Convierte TraceabilityItem del frontend a formato de base de datos.
 * camelCase → snake_case
 */
function mapTraceabilityToDb(item: TraceabilityItem, index: number): Omit<TraceabilityItemInsert, 'report_id'> {
  return {
    sort_order: index,
    code: item.code,
    description: item.description,
    lot: item.lot || '',
    serie: item.serie || '',
    checked: item.checked || false,
    observations: item.observations || '',
    is_header: item.isHeader || false,
  };
}

/**
 * Convierte TraceabilityItem de DB a formato frontend.
 * snake_case → camelCase
 */
function mapTraceabilityFromDb(row: TraceabilityItemRow): TraceabilityItem {
  return {
    id: row.id,
    code: row.code,
    description: row.description,
    lot: row.lot,
    serie: row.serie,
    checked: row.checked,
    observations: row.observations,
    isHeader: row.is_header,
  };
}

/**
 * Convierte ControlCheckItem del frontend a formato de base de datos.
 */
function mapControlCheckToDb(item: ControlCheckItem, index: number): Omit<ControlCheckItemInsert, 'report_id'> {
  return {
    sort_order: index,
    description: item.description,
    is_yes_no: item.isYesNo,
    has_measurement: item.hasMeasurement,
    nominal_value: item.nominalValue ?? null,
    nominal_unit: item.nominalUnit ?? null,
    acceptable_value: item.acceptableValue ?? null,
    measured_value: item.measuredValue ?? null,
    checked: item.checked ?? false,
  };
}

/**
 * Convierte ControlCheckItem de DB a formato frontend.
 */
function mapControlCheckFromDb(row: ControlCheckItemRow): ControlCheckItem {
  return {
    id: parseInt(row.sort_order.toString()) + 1, // Usar sort_order + 1 como ID numérico
    description: row.description,
    isYesNo: row.is_yes_no,
    hasMeasurement: row.has_measurement,
    nominalValue: row.nominal_value ?? undefined,
    nominalUnit: row.nominal_unit ?? undefined,
    acceptableValue: row.acceptable_value ?? undefined,
    measuredValue: row.measured_value ?? undefined,
    checked: row.checked,
  };
}

/**
 * Convierte InstrumentItem del frontend a formato de base de datos.
 */
function mapInstrumentToDb(item: InstrumentItem, index: number): Omit<InstrumentItemInsert, 'report_id'> {
  return {
    sort_order: index,
    name: item.name || '',
    code: item.code || '',
    expiration: item.expiration || null,
    status: item.status || '',
  };
}

/**
 * Convierte InstrumentItem de DB a formato frontend.
 */
function mapInstrumentFromDb(row: InstrumentItemRow): InstrumentItem {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    expiration: row.expiration || '',
    status: (row.status as 'VENC' | 'OK' | '') || '',
  };
}

/**
 * Agrupa fotos por sección desde la base de datos.
 */
function groupPhotosFromDb(photos: ReportPhotoRow[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {
    section1: [],
    section2: [],
    section3: [],
    section4: [],
  };

  photos
    .sort((a, b) => a.sort_order - b.sort_order)
    .forEach(photo => {
      if (grouped[photo.section]) {
        grouped[photo.section].push(photo.photo_url);
      }
    });

  return grouped;
}

/**
 * Convierte fotos del frontend a formato de base de datos.
 */
function mapPhotosToDb(photos: Record<string, string[]>): Omit<ReportPhotoInsert, 'report_id'>[] {
  const result: Omit<ReportPhotoInsert, 'report_id'>[] = [];

  Object.entries(photos).forEach(([section, urls]) => {
    urls.forEach((url, index) => {
      result.push({
        section,
        sort_order: index,
        photo_url: url,
      });
    });
  });

  return result;
}

// ─────────────────────────────────────────────
// SERVICIO GENÉRICO DE REPORTES
// ─────────────────────────────────────────────

/**
 * Servicio genérico para cualquier tipo de reporte.
 * Mapea entre el formato del frontend (ReportData) y la base de datos.
 */
export const reportService = {
  /**
   * Guardar un reporte completo con todos sus datos relacionados.
   */
  async save(
    toolType: ToolType,
    data: ReportData,
    extraConfig?: ExtraConfigJson
  ): Promise<string> {
    try {
      // Preparar payload del reporte padre
      const reportPayload: RepairReportInsert = {
        id: (data as any).id, // Si existe, actualiza
        tool_type: toolType,
        report_date: data.meta?.date || new Date().toISOString().split('T')[0],
        serial: data.meta?.serial || null,
        report_number: data.meta?.reportNumber || 'POCOP001-A2-4',
        attachments: data.attachments as AttachmentsJson,
        functional_test: data.functionalTest as unknown as FunctionalTestJson,
        comments: data.comments || '',
        dimensional_data: data.dimensional as DimensionalDataJson,
        validation_status: 'INCOMPLETO', // Se puede calcular en el backend
        validation_reasons: [],
        assembled_by: data.signatures?.assembledBy || null,
        assembled_date: data.signatures?.assembledDate || null,
        assembled_signature: data.signatures?.assembledSignature || null,
        supervised_by: data.signatures?.supervisedBy || null,
        supervised_date: data.signatures?.supervisedDate || null,
        supervised_signature: data.signatures?.supervisedSignature || null,
        extra_config: extraConfig || {},
      };

      // Preparar datos de tablas hijas
      const traceabilityData = data.traceability?.map(mapTraceabilityToDb) || [];
      const checksData = data.preAssemblyChecks?.map(mapControlCheckToDb) || [];
      const instrumentsData = data.instruments?.map(mapInstrumentToDb) || [];
      const photosData = mapPhotosToDb(data.photos || {});

      // Guardar reporte con hijos
      const savedReport = await saveReportWithChildren(
        'repair_reports',
        reportPayload,
        [
          { table: 'traceability_items', data: traceabilityData, fk: 'report_id' },
          { table: 'control_check_items', data: checksData, fk: 'report_id' },
          { table: 'instrument_items', data: instrumentsData, fk: 'report_id' },
          { table: 'report_photos', data: photosData, fk: 'report_id' },
        ]
      );

      return savedReport.id;
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  },

  /**
   * Obtener todos los reportes de un tipo específico.
   */
  async getAll(toolType?: ToolType): Promise<ReportData[]> {
    try {
      const reports = await fetchReportsWithRelations(toolType);
      return reports.map(report => this.mapDbToFrontend(report));
    } catch (error) {
      console.error('Error getting reports:', error);
      return [];
    }
  },

  /**
   * Obtener un reporte por ID.
   */
  async getById(id: string): Promise<ReportData | null> {
    try {
      const report = await fetchReportById(id);
      if (!report) return null;
      return this.mapDbToFrontend(report);
    } catch (error) {
      console.error('Error getting report by ID:', error);
      return null;
    }
  },

  /**
   * Eliminar un reporte por ID (cascade elimina hijos automáticamente).
   */
  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('repair_reports')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting report:', error);
      return false;
    }
  },

  /**
   * Mapear de estructura de DB a estructura frontend.
   */
  mapDbToFrontend(report: RepairReportWithRelations): ReportData & { id: string } {
    const traceability = (report.traceability_items || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(mapTraceabilityFromDb);

    const preAssemblyChecks = (report.control_check_items || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(mapControlCheckFromDb);

    const instruments = (report.instrument_items || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(mapInstrumentFromDb);

    const photos = groupPhotosFromDb(report.report_photos || []);

    return {
      id: report.id,
      meta: {
        date: report.report_date,
        serial: report.serial || '',
        reportNumber: report.report_number,
      },
      traceability,
      preAssemblyChecks,
      attachments: report.attachments as ReportData['attachments'],
      functionalTest: report.functional_test as unknown as ReportData['functionalTest'],
      comments: report.comments,
      dimensional: report.dimensional_data as DimensionalData,
      instruments,
      signatures: {
        assembledBy: report.assembled_by || '',
        assembledDate: report.assembled_date || '',
        assembledSignature: report.assembled_signature || '',
        supervisedBy: report.supervised_by || '',
        supervisedDate: report.supervised_date || '',
        supervisedSignature: report.supervised_signature || '',
      },
      photos: photos as ReportData['photos'],
    };
  },
};

// ─────────────────────────────────────────────
// SERVICIOS ESPECÍFICOS POR TIPO DE HERRAMIENTA
// ─────────────────────────────────────────────

/**
 * Servicio para Empaque Recuperable TKR1 0178-5000
 */
export const checklist0178Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('TKR1_0178_5000');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('TKR1_0178_5000', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Empaque Recuperable TKR1 0101-5000 (Original/POCOP001)
 */
export const checklistPOCOP001Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('TKR1_0101_5000');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('TKR1_0101_5000', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Empaque Recuperable TKR1 5500
 */
export const checklist5500Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('TKR1_0101_5500');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('TKR1_0101_5500', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Empaque Recuperable TKR1 7000
 */
export const checklist7000Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('TKR1_0101_7000');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('TKR1_0101_7000', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Empaque Recuperable TKR1 9580
 */
export const checklist9580Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('TKR1_0101_9580');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('TKR1_0101_9580', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Setting Tool Hidráulica SCRH 1605-7000
 */
export const checklistSCRH1605Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('SCRH_1605_7000');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData, extraConfig?: ExtraConfigJson): Promise<string> {
    return reportService.save('SCRH_1605_7000', data, extraConfig);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Setting Tool Hidráulica SCRH 5500
 */
export const checklistSCRH5500Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('SCRH_1605_5500');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData, extraConfig?: ExtraConfigJson): Promise<string> {
    return reportService.save('SCRH_1605_5500', data, extraConfig);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Setting Tool SNT 1641-5000
 */
export const checklistSNT1641Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('SNT_1641_5000');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('SNT_1641_5000', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Setting Tool SNT2 1667-7000
 */
export const checklistSNT2_1667Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('SNT2_1667_7000');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('SNT2_1667_7000', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Kit Wire Line 1617-5500
 */
export const checklistKitWireLineService = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('KIT_WIRELINE');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('KIT_WIRELINE', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Stinger para Cementar 1621-5000
 */
export const checklistStingerService = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('STINGER_CEMENTAR');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('STINGER_CEMENTAR', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Tapón Recuperable TPR1 0201-5000
 */
export const checklistTPR1Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('TPR1_0201_5000');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData, extraConfig?: { carreraRegistrada?: string }): Promise<string> {
    return reportService.save('TPR1_0201_5000', data, extraConfig);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Pescador TCR2 1102-5000
 */
export const checklistPescadorTCR2Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('PESCADOR_TCR2');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('PESCADOR_TCR2', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Pescador TCR2 1102-5500
 */
export const checklistPescadorTCR2_5500Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('PESCADOR_TCR2_5500');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('PESCADOR_TCR2_5500', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

/**
 * Servicio para Pescador TCR2 1102-9580
 */
export const checklistPescadorTCR2_9580Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('PESCADOR_TCR2_9580');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('PESCADOR_TCR2_9580', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

// ─────────────────────────────────────────────
// SERVICIO CRUD - RETENEDOR DE CEMENTO 1505-7000
// ─────────────────────────────────────────────

/**
 * Servicio CRUD para Retenedor de Cemento 1505-7000
 * Tipo: RETENEDOR_CEMENTO_1505_7000
 */
export const checklistRetenedor1505Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('RETENEDOR_CEMENTO_1505_7000');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('RETENEDOR_CEMENTO_1505_7000', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

// ─────────────────────────────────────────────
// SERVICIO CRUD - RETENEDOR DE CEMENTO 1505-5500
// ─────────────────────────────────────────────

/**
 * Servicio CRUD para Retenedor de Cemento 1505-5500
 * Tipo: RETENEDOR_CEMENTO_1505_5500
 */
export const checklistRetenedor1505_5500Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('RETENEDOR_CEMENTO_1505_5500');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('RETENEDOR_CEMENTO_1505_5500', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

// ─────────────────────────────────────────────
// SERVICIO CRUD - RETENEDOR DE CEMENTO 1540-5500
// ─────────────────────────────────────────────

/**
 * Servicio CRUD para Retenedor de Cemento 1540-5500
 * Tipo: RETENEDOR_CEMENTO_1540_5500
 */
export const checklistRetenedor1540_5500Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('RETENEDOR_CEMENTO_1540_5500');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('RETENEDOR_CEMENTO_1540_5500', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

// ─────────────────────────────────────────────
// SERVICIO CRUD - RETENEDOR DE CEMENTO 1540-5500 (5 1/2" 14-23#)
// ─────────────────────────────────────────────

export const checklistRetenedor1540_5500_2Service = {
  async getAll(): Promise<ReportData[]> {
    return reportService.getAll('RETENEDOR_CEMENTO_1540_5500_2');
  },

  async getById(id: string): Promise<ReportData | null> {
    return reportService.getById(id);
  },

  async save(data: ReportData): Promise<string> {
    return reportService.save('RETENEDOR_CEMENTO_1540_5500_2', data);
  },

  async delete(id: string): Promise<boolean> {
    return reportService.delete(id);
  },
};

// ─────────────────────────────────────────────
// SERVICIO DE STORAGE PARA FOTOS
// ─────────────────────────────────────────────

export const photoStorageService = {
  /**
   * Subir una foto a Supabase Storage
   * @param file - Archivo de imagen o base64
   * @param reportId - ID del reporte
   * @param section - Sección de la foto
   * @returns URL pública de la foto
   */
  async upload(
    file: File | Blob,
    reportId: string,
    section: string
  ): Promise<string> {
    const fileName = `${reportId}/${section}/${Date.now()}.jpg`;
    
    const { data, error } = await supabase.storage
      .from('report-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from('report-photos')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  },

  /**
   * Eliminar una foto de Supabase Storage
   */
  async delete(photoUrl: string): Promise<boolean> {
    try {
      // Extraer path del URL
      const urlParts = photoUrl.split('/report-photos/');
      if (urlParts.length < 2) return false;
      
      const path = urlParts[1];
      
      const { error } = await supabase.storage
        .from('report-photos')
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting photo:', error);
      return false;
    }
  },

  /**
   * Convertir base64 a Blob para subir
   */
  base64ToBlob(base64: string, mimeType: string = 'image/jpeg'): Blob {
    const byteCharacters = atob(base64.split(',')[1] || base64);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  },
};

// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────

export default {
  reportService,
  checklist0178Service,
  checklistPOCOP001Service,
  checklist5500Service,
  checklist7000Service,
  checklist9580Service,
  checklistSCRH1605Service,
  checklistSCRH5500Service,
  checklistSNT1641Service,
  checklistSNT2_1667Service,
  checklistKitWireLineService,
  checklistStingerService,
  checklistTPR1Service,
  checklistPescadorTCR2Service,
  checklistPescadorTCR2_5500Service,
  checklistPescadorTCR2_9580Service,
  checklistRetenedor1505Service,
  checklistRetenedor1505_5500Service,
  checklistRetenedor1540_5500Service,
  checklistRetenedor1540_5500_2Service,
  photoStorageService,
};
