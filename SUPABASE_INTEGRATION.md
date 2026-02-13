# Integración Supabase - Tacker Digital Report

## 📋 Resumen de Archivos Generados

| Archivo | Descripción |
|---------|-------------|
| `src/lib/migration.sql` | Script SQL completo para crear tablas en Supabase |
| `src/lib/supabase.ts` | Cliente de conexión a Supabase |
| `src/lib/database.types.ts` | Tipos TypeScript para las tablas |
| `src/services/api.ts` | Servicios CRUD con mapeo camelCase ↔ snake_case |

---

## 🗄️ Diagrama de Relaciones

```
┌─────────────────────────────────────────────────────────────────────┐
│                         repair_reports                               │
│  (Tabla Padre - Un registro por reporte)                            │
├─────────────────────────────────────────────────────────────────────┤
│  id (PK)              │ UUID                                        │
│  tool_type            │ ENUM (TKR1_0178_5000, SCRH_1605_7000, etc.) │
│  report_date          │ DATE                                        │
│  serial               │ TEXT                                        │
│  report_number        │ TEXT                                        │
│  attachments          │ JSONB (lastJob, inspectionReport, etc.)     │
│  functional_test      │ JSONB (systemSetting, mandrelPass)          │
│  dimensional_data     │ JSONB (datos específicos por herramienta)   │
│  comments             │ TEXT                                        │
│  validation_status    │ ENUM (APTO, NO APTO, INCOMPLETO)            │
│  assembled_by/date/signature │ Firma del ensamblador                │
│  supervised_by/date/signature │ Firma del supervisor                │
│  extra_config         │ JSONB (settingSize, calibratorLoad, etc.)   │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                │ 1:N (ON DELETE CASCADE)
                                │
        ┌───────────────────────┼───────────────────────┬───────────────────────┐
        │                       │                       │                       │
        ▼                       ▼                       ▼                       ▼
┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│ traceability_items│   │control_check_items│   │ instrument_items  │   │  report_photos    │
│ (Items trazabilid)│   │ (Controles/Checks)│   │  (Instrumentos)   │   │    (Fotos)        │
├───────────────────┤   ├───────────────────┤   ├───────────────────┤   ├───────────────────┤
│ id (PK)           │   │ id (PK)           │   │ id (PK)           │   │ id (PK)           │
│ report_id (FK)    │   │ report_id (FK)    │   │ report_id (FK)    │   │ report_id (FK)    │
│ sort_order        │   │ sort_order        │   │ sort_order        │   │ section           │
│ code              │   │ description       │   │ name              │   │ sort_order        │
│ description       │   │ is_yes_no         │   │ code              │   │ photo_url         │
│ lot               │   │ has_measurement   │   │ expiration        │   │ caption           │
│ serie             │   │ nominal_value     │   │ status            │   │ file_name         │
│ checked           │   │ acceptable_value  │   └───────────────────┘   └───────────────────┘
│ observations      │   │ measured_value    │
│ is_header         │   │ checked           │
└───────────────────┘   └───────────────────┘
```

---

## 🚀 Instrucciones de Instalación

### Paso 1: Instalar dependencia de Supabase

```bash
cd Tacker-Digital-Report-HTTAS2026
npm install @supabase/supabase-js
```

### Paso 2: Ejecutar el SQL en Supabase

1. Ir a [Supabase Dashboard](https://supabase.com/dashboard/project/qswpkeynaegfodlxstdz)
2. Navegar a **SQL Editor**
3. Crear un nuevo Query
4. Copiar y pegar el contenido de `src/lib/migration.sql`
5. Ejecutar el script (botón "Run")

### Paso 3: Crear bucket de Storage (opcional, para fotos)

En Supabase Dashboard > Storage:
1. Crear nuevo bucket: `report-photos`
2. Marcar como "Public bucket"
3. Agregar políticas de acceso

### Paso 4: Verificar conexión

Importar y usar el servicio:

```typescript
import { checklist0178Service } from './src/services/api';

// Probar conexión
const reports = await checklist0178Service.getAll();
console.log('Reportes:', reports);
```

---

## 💻 Ejemplos de Integración en Componentes

### Guardar un reporte (handleSave)

```typescript
// En tu componente Checklist*.tsx
import { checklist0178Service } from '../src/services/api';

const [loading, setLoading] = useState(false);
const [savedId, setSavedId] = useState<string | null>(null);

const handleSave = async () => {
  setLoading(true);
  try {
    const reportId = await checklist0178Service.save(data);
    setSavedId(reportId);
    alert('Reporte guardado exitosamente');
  } catch (error) {
    console.error('Error al guardar:', error);
    alert('Error al guardar el reporte');
  } finally {
    setLoading(false);
  }
};

// En el JSX:
<button 
  onClick={handleSave} 
  disabled={loading}
  className="bg-blue-600 text-white p-4 rounded-full"
>
  {loading ? 'Guardando...' : <Save size={24} />}
</button>
```

### Cargar un reporte existente

```typescript
import { useEffect, useState } from 'react';
import { checklist0178Service } from '../src/services/api';

interface Props {
  onBack: () => void;
  reportId?: string; // ID del reporte a editar (opcional)
}

export const Checklist0178: React.FC<Props> = ({ onBack, reportId }) => {
  const [data, setData] = useState<ReportData>({ /* valores iniciales */ });
  const [loading, setLoading] = useState(false);

  // Cargar reporte si hay ID
  useEffect(() => {
    if (reportId) {
      setLoading(true);
      checklist0178Service.getById(reportId)
        .then(report => {
          if (report) setData(report);
        })
        .finally(() => setLoading(false));
    }
  }, [reportId]);

  if (loading) {
    return <div>Cargando reporte...</div>;
  }

  // ... resto del componente
};
```

### Listar todos los reportes (en Home)

```typescript
import { reportService } from '../src/services/api';
import type { ToolType } from '../src/lib/database.types';

const [reports, setReports] = useState<any[]>([]);

useEffect(() => {
  // Cargar todos los reportes
  reportService.getAll()
    .then(setReports);
  
  // O filtrar por tipo:
  // reportService.getAll('TKR1_0178_5000').then(setReports);
}, []);

// Mostrar lista
{reports.map(report => (
  <div key={report.id}>
    <span>{report.meta.reportNumber}</span>
    <span>{report.meta.date}</span>
    <button onClick={() => navigateTo(`edit/${report.id}`)}>
      Editar
    </button>
  </div>
))}
```

### Eliminar un reporte

```typescript
const handleDelete = async (id: string) => {
  if (!confirm('¿Eliminar este reporte?')) return;
  
  const success = await checklist0178Service.delete(id);
  if (success) {
    alert('Reporte eliminado');
    // Refrescar lista
  }
};
```

---

## 🔄 Mapeo de Campos (Frontend ↔ Database)

### ReportData (Frontend) → repair_reports (DB)

| Frontend (camelCase) | Database (snake_case) |
|---------------------|----------------------|
| `meta.date` | `report_date` |
| `meta.serial` | `serial` |
| `meta.reportNumber` | `report_number` |
| `attachments` | `attachments` (JSONB) |
| `functionalTest` | `functional_test` (JSONB) |
| `comments` | `comments` |
| `dimensional` | `dimensional_data` (JSONB) |
| `signatures.assembledBy` | `assembled_by` |
| `signatures.assembledDate` | `assembled_date` |
| `signatures.assembledSignature` | `assembled_signature` |
| `signatures.supervisedBy` | `supervised_by` |
| `signatures.supervisedDate` | `supervised_date` |
| `signatures.supervisedSignature` | `supervised_signature` |

### TraceabilityItem (Frontend) → traceability_items (DB)

| Frontend | Database |
|----------|----------|
| `id` (string) | `id` (UUID) |
| `code` | `code` |
| `description` | `description` |
| `lot` | `lot` |
| `serie` | `serie` |
| `checked` | `checked` |
| `observations` | `observations` |
| `isHeader` | `is_header` |

### ControlCheckItem (Frontend) → control_check_items (DB)

| Frontend | Database |
|----------|----------|
| `id` (number) | `sort_order + 1` |
| `description` | `description` |
| `isYesNo` | `is_yes_no` |
| `hasMeasurement` | `has_measurement` |
| `nominalValue` | `nominal_value` |
| `nominalUnit` | `nominal_unit` |
| `acceptableValue` | `acceptable_value` |
| `measuredValue` | `measured_value` |
| `checked` | `checked` |

### InstrumentItem (Frontend) → instrument_items (DB)

| Frontend | Database |
|----------|----------|
| `id` (string) | `id` (UUID) |
| `name` | `name` |
| `code` | `code` |
| `expiration` | `expiration` |
| `status` | `status` |

---

## 📸 Manejo de Fotos

### Opción 1: Base64 directo (fotos pequeñas)

```typescript
// Las fotos se guardan como base64 en report_photos.photo_url
// No requiere configuración de Storage
```

### Opción 2: Supabase Storage (recomendado para producción)

```typescript
import { photoStorageService } from '../src/services/api';

// Subir foto
const handleAddPhoto = async (section: string, file: File) => {
  const url = await photoStorageService.upload(file, reportId, section);
  // Agregar url al estado de fotos
  addPhotos(section, [url]);
};

// Desde base64
const handleAddBase64Photo = async (section: string, base64: string) => {
  const blob = photoStorageService.base64ToBlob(base64);
  const url = await photoStorageService.upload(blob, reportId, section);
  addPhotos(section, [url]);
};
```

---

## 🔐 Seguridad (RLS)

Las políticas actuales permiten todas las operaciones (desarrollo).
Para producción, modificar en `migration.sql`:

```sql
-- Ejemplo: Solo usuarios autenticados pueden ver/editar sus reportes
CREATE POLICY "Users can only access their reports" ON repair_reports
    FOR ALL USING (auth.uid() = user_id);
```

---

## 📊 Tipos de Herramienta (tool_type)

| Valor ENUM | Descripción |
|-----------|-------------|
| `TKR1_0101_5000` | Empaque Recuperable TKR1 Original |
| `TKR1_0178_5000` | Empaque Recuperable TKR1 0178 |
| `TKR1_0101_5500` | Empaque Recuperable TKR1 5500 |
| `TKR1_0101_7000` | Empaque Recuperable TKR1 7000 |
| `TKR1_0101_9580` | Empaque Recuperable TKR1 9580 |
| `SCRH_1605_7000` | Setting Tool Hidráulica SCRH 1605-7000 |
| `SCRH_1605_5500` | Setting Tool Hidráulica SCRH 1605-5500 |
| `SNT_1641_5000` | Setting Tool Hidráulica SNT 1641-5000 |
| `SNT2_1667_7000` | Setting Tool Hidráulica SNT2 1667-7000 |
| `KIT_WIRELINE` | Kit Wire Line 1617-5500 |
| `STINGER_CEMENTAR` | Stinger para Cementar 1621-5000 |
| `TPR1_0201_5000` | Tapón Recuperable TPR1 0201-5000 |
| `PESCADOR_TCR2` | Pescador TCR2 1102-5000 |

---

## ⚠️ Notas Importantes

1. **El SQL debe ejecutarse en orden**: Las extensiones y funciones deben crearse antes que las tablas.

2. **Fotos grandes**: Para fotos > 1MB, usar Supabase Storage en lugar de base64.

3. **Firmas**: Se almacenan como TEXT (base64) en la tabla padre. Para firmas muy grandes, considerar Storage.

4. **Datos dimensionales**: Varían por tipo de herramienta, por eso usan JSONB flexible.

5. **Validación**: El campo `validation_status` se puede calcular en el backend o frontend.

---

## 🛠️ Troubleshooting

### Error: "relation does not exist"
- Asegurarse de ejecutar el script SQL completo
- Verificar que las extensiones se crearon

### Error: "permission denied"
- Revisar las políticas RLS
- Para desarrollo, las políticas permiten todo

### Error: "invalid input syntax for type uuid"
- El ID debe ser un UUID válido
- El servicio maneja esto automáticamente

---

**Generado automáticamente para el proyecto Httas2026 - Tacker Solutions**
