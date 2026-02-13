-- ============================================
-- TACKER DIGITAL REPORT - MIGRACIÓN SUPABASE
-- Proyecto: Httas2026
-- Generado: Febrero 2026
-- ============================================

-- ─────────────────────────────────────────────
-- FASE 1: EXTENSIONES Y FUNCIONES AUXILIARES
-- ─────────────────────────────────────────────

-- Extensión para generación de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────
-- FASE 2: TIPOS ENUM
-- ─────────────────────────────────────────────

-- Tipo de herramienta/checklist
CREATE TYPE tool_type AS ENUM (
    'TKR1_0101_5000',    -- Empaque Recuperable TKR1 Original
    'TKR1_0178_5000',    -- Empaque Recuperable TKR1 0178
    'TKR1_0101_5500',    -- Empaque Recuperable TKR1 5500
    'TKR1_0101_7000',    -- Empaque Recuperable TKR1 7000
    'TKR1_0101_9580',    -- Empaque Recuperable TKR1 9580
    'SCRH_1605_7000',    -- Setting Tool Hidráulica SCRH 1605-7000
    'SCRH_1605_5500',    -- Setting Tool Hidráulica SCRH 1605-5500
    'SNT_1641_5000',     -- Setting Tool Hidráulica SNT 1641-5000
    'SNT2_1667_7000',    -- Setting Tool Hidráulica SNT2 1667-7000
    'KIT_WIRELINE',      -- Kit Wire Line 1617-5500
    'STINGER_CEMENTAR',  -- Stinger para Cementar 1621-5000
    'TPR1_0201_5000',    -- Tapón Recuperable TPR1 0201-5000
    'PESCADOR_TCR2',      -- Pescador TCR2 1102-5000
    'PESCADOR_TCR2_5500',  -- Pescador TCR2 1102-5500
    'PESCADOR_TCR2_9580',  -- Pescador TCR2 1102-9580
    'RETENEDOR_CEMENTO_1505_7000',  -- Retenedor de Cemento 1505-7000
    'RETENEDOR_CEMENTO_1505_5500',  -- Retenedor de Cemento 1505-5500
    'RETENEDOR_CEMENTO_1540_5500',  -- Retenedor de Cemento 1540-5500 (7" 17-38#)
    'RETENEDOR_CEMENTO_1540_5500_2'  -- Retenedor de Cemento 1540-5500 (5 1/2" 14-23#)
);

-- Si la tabla ya existe, agregar los nuevos valores:
-- ALTER TYPE tool_type ADD VALUE 'RETENEDOR_CEMENTO_1505_7000';
-- ALTER TYPE tool_type ADD VALUE 'RETENEDOR_CEMENTO_1505_5500';
-- ALTER TYPE tool_type ADD VALUE 'RETENEDOR_CEMENTO_1540_5500';
-- ALTER TYPE tool_type ADD VALUE 'RETENEDOR_CEMENTO_1540_5500_2';

-- Estado de validación del reporte
CREATE TYPE validation_status AS ENUM ('APTO', 'NO APTO', 'INCOMPLETO');

-- Estado de instrumento
CREATE TYPE instrument_status AS ENUM ('OK', 'VENC', '');

-- Sistema de fijación J
CREATE TYPE system_setting AS ENUM ('IZQUIERDO', 'DERECHO', '');

-- ─────────────────────────────────────────────
-- FASE 3: TABLA PADRE - REPORTES DE REPARACIÓN
-- ─────────────────────────────────────────────

CREATE TABLE repair_reports (
    -- Identificadores principales
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Tipo de herramienta/checklist
    tool_type tool_type NOT NULL,
    
    -- Metadatos del reporte (meta)
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    serial TEXT,
    report_number TEXT NOT NULL DEFAULT 'POCOP001-A2-4',
    
    -- Adjuntos (attachments) - JSONB por ser objeto simple sin ID
    attachments JSONB DEFAULT '{
        "lastJob": "",
        "inspectionReport": "",
        "incidentReport": "",
        "hydroTestPsi": "",
        "hydroTestMin": ""
    }'::jsonb,
    
    -- Prueba funcional (functionalTest) - JSONB por variabilidad
    functional_test JSONB DEFAULT '{
        "systemSetting": "",
        "mandrelPass": false
    }'::jsonb,
    
    -- Comentarios
    comments TEXT DEFAULT '',
    
    -- Datos dimensionales - JSONB por alta variabilidad entre tipos
    dimensional_data JSONB DEFAULT '{}'::jsonb,
    
    -- Estado de validación calculado
    validation_status validation_status DEFAULT 'INCOMPLETO',
    validation_reasons TEXT[] DEFAULT '{}',
    
    -- Firmas (base64 < 1MB → TEXT)
    assembled_by TEXT,
    assembled_date DATE,
    assembled_signature TEXT, -- Base64 de firma
    supervised_by TEXT,
    supervised_date DATE,
    supervised_signature TEXT, -- Base64 de firma
    
    -- Configuración específica por tipo (JSONB flexible)
    extra_config JSONB DEFAULT '{}'::jsonb
);

-- Comentarios de columnas
COMMENT ON TABLE repair_reports IS 'Reportes de reparación de herramientas Tacker';
COMMENT ON COLUMN repair_reports.tool_type IS 'Tipo de checklist/herramienta';
COMMENT ON COLUMN repair_reports.attachments IS 'Adjuntos: último trabajo, reportes de inspección/incidente, prueba hidráulica';
COMMENT ON COLUMN repair_reports.functional_test IS 'Datos de prueba funcional (systemSetting, mandrelPass)';
COMMENT ON COLUMN repair_reports.dimensional_data IS 'Datos dimensionales específicos del tipo de herramienta';
COMMENT ON COLUMN repair_reports.extra_config IS 'Configuración adicional específica del tipo (settingSize, calibratorLoad, etc.)';

-- Trigger updated_at
CREATE TRIGGER set_updated_at_repair_reports
    BEFORE UPDATE ON repair_reports
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Índices
CREATE INDEX idx_repair_reports_tool_type ON repair_reports(tool_type);
CREATE INDEX idx_repair_reports_report_date ON repair_reports(report_date);
CREATE INDEX idx_repair_reports_serial ON repair_reports(serial);
CREATE INDEX idx_repair_reports_validation_status ON repair_reports(validation_status);

-- ─────────────────────────────────────────────
-- FASE 4: TABLA HIJA - ITEMS DE TRAZABILIDAD
-- ─────────────────────────────────────────────

CREATE TABLE traceability_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- FK al reporte padre
    report_id UUID NOT NULL REFERENCES repair_reports(id) ON DELETE CASCADE,
    
    -- Orden del item en la lista
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    -- Campos del item
    code TEXT NOT NULL,
    description TEXT NOT NULL,
    lot TEXT DEFAULT '',
    serie TEXT DEFAULT '',
    checked BOOLEAN DEFAULT false,
    observations TEXT DEFAULT '',
    is_header BOOLEAN DEFAULT false
);

COMMENT ON TABLE traceability_items IS 'Items de trazabilidad de componentes del reporte';

-- Trigger updated_at
CREATE TRIGGER set_updated_at_traceability_items
    BEFORE UPDATE ON traceability_items
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Índices
CREATE INDEX idx_traceability_items_report_id ON traceability_items(report_id);
CREATE INDEX idx_traceability_items_sort_order ON traceability_items(report_id, sort_order);

-- ─────────────────────────────────────────────
-- FASE 5: TABLA HIJA - CONTROL CHECK ITEMS
-- ─────────────────────────────────────────────

CREATE TABLE control_check_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- FK al reporte padre
    report_id UUID NOT NULL REFERENCES repair_reports(id) ON DELETE CASCADE,
    
    -- Orden del item
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    -- Campos del control
    description TEXT NOT NULL,
    is_yes_no BOOLEAN DEFAULT true,
    has_measurement BOOLEAN DEFAULT false,
    nominal_value NUMERIC,
    nominal_unit TEXT,
    acceptable_value NUMERIC,
    measured_value TEXT, -- String para permitir vacío
    checked BOOLEAN DEFAULT false
);

COMMENT ON TABLE control_check_items IS 'Items de control de pre-ensamble';

-- Trigger updated_at
CREATE TRIGGER set_updated_at_control_check_items
    BEFORE UPDATE ON control_check_items
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Índices
CREATE INDEX idx_control_check_items_report_id ON control_check_items(report_id);
CREATE INDEX idx_control_check_items_sort_order ON control_check_items(report_id, sort_order);

-- ─────────────────────────────────────────────
-- FASE 6: TABLA HIJA - INSTRUMENTOS
-- ─────────────────────────────────────────────

CREATE TABLE instrument_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- FK al reporte padre
    report_id UUID NOT NULL REFERENCES repair_reports(id) ON DELETE CASCADE,
    
    -- Orden del item
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    -- Campos del instrumento
    name TEXT DEFAULT '',
    code TEXT DEFAULT '',
    expiration DATE,
    status TEXT DEFAULT '' -- 'VENC', 'OK', ''
);

COMMENT ON TABLE instrument_items IS 'Instrumentos utilizados en el reporte';

-- Trigger updated_at
CREATE TRIGGER set_updated_at_instrument_items
    BEFORE UPDATE ON instrument_items
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Índices
CREATE INDEX idx_instrument_items_report_id ON instrument_items(report_id);

-- ─────────────────────────────────────────────
-- FASE 7: TABLA HIJA - FOTOS DEL REPORTE
-- ─────────────────────────────────────────────

CREATE TABLE report_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- FK al reporte padre
    report_id UUID NOT NULL REFERENCES repair_reports(id) ON DELETE CASCADE,
    
    -- Sección de la foto (section1=Conexiones, section2=Orings, section3=Balanceadoras, section4=Sello)
    section TEXT NOT NULL,
    
    -- Orden dentro de la sección
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    -- URL de la foto en Supabase Storage o base64
    photo_url TEXT NOT NULL,
    
    -- Metadatos opcionales
    caption TEXT,
    file_name TEXT
);

COMMENT ON TABLE report_photos IS 'Fotos adjuntas al reporte, organizadas por sección';
COMMENT ON COLUMN report_photos.section IS 'Sección: section1, section2, section3, section4';
COMMENT ON COLUMN report_photos.photo_url IS 'URL de Supabase Storage o base64 (para fotos pequeñas)';

-- Trigger updated_at
CREATE TRIGGER set_updated_at_report_photos
    BEFORE UPDATE ON report_photos
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Índices
CREATE INDEX idx_report_photos_report_id ON report_photos(report_id);
CREATE INDEX idx_report_photos_section ON report_photos(report_id, section);

-- ─────────────────────────────────────────────
-- FASE 8: ROW LEVEL SECURITY (Permisivo para desarrollo)
-- ─────────────────────────────────────────────

-- repair_reports
ALTER TABLE repair_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All Operations on repair_reports" ON repair_reports
    FOR ALL USING (true) WITH CHECK (true);

-- traceability_items
ALTER TABLE traceability_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All Operations on traceability_items" ON traceability_items
    FOR ALL USING (true) WITH CHECK (true);

-- control_check_items
ALTER TABLE control_check_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All Operations on control_check_items" ON control_check_items
    FOR ALL USING (true) WITH CHECK (true);

-- instrument_items
ALTER TABLE instrument_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All Operations on instrument_items" ON instrument_items
    FOR ALL USING (true) WITH CHECK (true);

-- report_photos
ALTER TABLE report_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow All Operations on report_photos" ON report_photos
    FOR ALL USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────
-- FASE 9: STORAGE BUCKET PARA FOTOS (Opcional)
-- ─────────────────────────────────────────────

-- NOTA: Ejecutar esto en el Dashboard de Supabase > Storage
-- o usando la API de Supabase directamente:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('report-photos', 'report-photos', true);
--
-- CREATE POLICY "Allow public read on report-photos"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'report-photos');
--
-- CREATE POLICY "Allow authenticated upload on report-photos"
--     ON storage.objects FOR INSERT
--     WITH CHECK (bucket_id = 'report-photos');

-- ─────────────────────────────────────────────
-- FASE 10: VISTAS DE UTILIDAD
-- ─────────────────────────────────────────────

-- Vista de reportes con conteo de items
CREATE OR REPLACE VIEW v_reports_summary AS
SELECT 
    r.id,
    r.tool_type,
    r.report_date,
    r.serial,
    r.report_number,
    r.validation_status,
    r.assembled_by,
    r.supervised_by,
    r.created_at,
    r.updated_at,
    (SELECT COUNT(*) FROM traceability_items ti WHERE ti.report_id = r.id) as traceability_count,
    (SELECT COUNT(*) FROM control_check_items ci WHERE ci.report_id = r.id) as checks_count,
    (SELECT COUNT(*) FROM instrument_items ii WHERE ii.report_id = r.id) as instruments_count,
    (SELECT COUNT(*) FROM report_photos rp WHERE rp.report_id = r.id) as photos_count
FROM repair_reports r
ORDER BY r.created_at DESC;

COMMENT ON VIEW v_reports_summary IS 'Vista resumen de reportes con conteo de items relacionados';

-- ─────────────────────────────────────────────
-- FIN DE MIGRACIÓN
-- ─────────────────────────────────────────────
 
