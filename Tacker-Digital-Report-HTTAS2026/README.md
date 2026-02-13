# Tacker Solutions - Portal de Informes Digitales

Aplicación web progresiva (PWA) construida con React, TypeScript y Tailwind CSS para la gestión de informes de reparación y checklists de herramientas Tacker.

## Características

*   **Arquitectura sin compilación (No-Build):** Utiliza ES Modules nativos y `esm.sh` para cargar dependencias (React, Lucide) directamente en el navegador sin necesidad de Node.js, Webpack o Vite.
*   **Gestión de Formularios:** Checklists interactivos para herramientas específicas (TKR1 0101-5000, TKR1 0178-5000).
*   **Validación Lógica:** Evaluación automática de criterios de aceptación/rechazo (APTO/NO APTO).
*   **Firmas Digitales:** Captura de firmas manuscritas mediante Canvas HTML5.
*   **Modo de Impresión:** Estilos optimizados para generar PDFs limpios directamente desde el navegador (`window.print`).

## Estructura del Proyecto

*   `index.html`: Punto de entrada de la aplicación. Configura Tailwind vía CDN y el mapa de importaciones (Import Map).
*   `index.tsx`: Montaje de la aplicación React.
*   `App.tsx`: Enrutador principal.
*   `constants.ts`: Definición de datos estáticos (items de trazabilidad, valores nominales, etc.).
*   `components/`: Componentes reutilizables de UI (Tablas, Secciones dimensionales, Pad de firmas).

## Cómo ejecutar

Debido al uso de Módulos ES6 (`<script type="module">`), este proyecto **no puede ejecutarse abriendo el archivo `index.html` directamente** (protocolo `file://`) debido a políticas de seguridad CORS de los navegadores.

### Opción 1: VS Code (Recomendado)
1.  Instala la extensión **Live Server**.
2.  Haz clic derecho en `index.html`.
3.  Selecciona "Open with Live Server".

### Opción 2: Python
Si tienes Python instalado, abre una terminal en la carpeta del proyecto y ejecuta:
```bash
python3 -m http.server
```
Luego abre `http://localhost:8000` en tu navegador.

### Opción 3: Node.js
```bash
npx serve .
```

## Despliegue

Este proyecto está listo para ser desplegado en cualquier hosting de archivos estáticos como:
*   GitHub Pages
*   Netlify
*   Vercel

Solo asegúrate de subir todos los archivos y carpetas manteniendo la estructura actual.

---
© Tacker Solutions