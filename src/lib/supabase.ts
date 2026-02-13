/**
 * Supabase Client Configuration
 * Proyecto: Httas2026 - Tacker Digital Report
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Configuración de Supabase
const supabaseUrl = 'https://qswpkeynaegfodlxstdz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzd3BrZXluYWVnZm9kbHhzdGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDg0MzIsImV4cCI6MjA4NjI4NDQzMn0.ziTdxQvYp_-LrZYFnUCjFg3N_NeUa4t6ZvyKkk7VYDE';

// Cliente tipado de Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Exportar tipos útiles
export type { Database };
