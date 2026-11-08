# Verificación · 8 de noviembre de 2026

## Comprobaciones realizadas

- TypeScript: correcto, ejecutado mediante tsc --noEmit como parte de npm run build.
- ESLint: correcto, sin errores.
- Pruebas: 5 aprobadas, 0 fallidas. Cubren tarifas sin configurar, fórmula, urgencia, extras, límites y resumen.
- Build Vite: correcto. HTML 1,34 kB, CSS 45,33 kB (10,81 kB gzip), JavaScript 264,14 kB (81,84 kB gzip).
- Recursos: 16 archivos públicos idénticos al ZIP original mediante SHA-256. Incluyen las fuentes y sus licencias, las tres fotografías, el favicon, el video y .gitattributes.
- CSS: src/index.css idéntico al original por SHA-256, con sus reglas responsive y de movimiento reducido.
- Entorno de verificación: Windows, Node 26.13.0 y npm 11.20.0.

## Cambios respecto al ZIP

- Configuración Vite independiente de Figma Make.
- Scripts npm, lockfile npm, ESLint y configuración de Vercel.
- Extracción de Modal y RequestModal a componentes reutilizables.
- Estabilidad del foco al actualizar modales y exclusión de controles deshabilitados en la contención del foco.
- Límite de videos coherente entre campo, cálculo y formulario.
- Validación de nombre/descripción y fecha local sin dependencia del formato regional.
- Descarga del resumen con revocación diferida del objeto URL y marca configurable.
- Preferencia de movimiento reducido aplicada también al desplazamiento desde el formulario.
- Tarifas no configuradas en null: los precios numéricos solo quedan en pruebas.
- Metadatos, favicon, precarga de fuentes y cabeceras para Vercel.
- Documentación local y de despliegue actualizada.

## Límites de esta verificación

El servidor Vite inició correctamente. Sin embargo, tanto el navegador integrado como las peticiones HTTP desde el entorno agotaron el tiempo al acceder a localhost/127.0.0.1. También se intentó servir en todas las interfaces, sin resolver el acceso del navegador. Se detuvo el servidor de pruebas al cerrar la tarea.

No se verificaron visualmente escritorio, móvil, geometría renderizada de recursos ni reproducción real. Tampoco se ejecutó una auditoría de accesibilidad, SEO renderizado o Core Web Vitals. Estas comprobaciones manuales siguen pendientes; conservar el CSS no demuestra por sí solo fidelidad visual total.

## Revisión manual al ejecutar el proyecto

1. Revisar 1440, 1024, 768 y 390 píxeles de ancho: legibilidad, menú, tarjetas y ausencia de desplazamiento horizontal.
2. Abrir showreel y proyectos; comprobar reproducción, Escape, Tab y retorno del foco al disparador.
3. Filtrar todas las categorías y alternar todos los proyectos/selección.
4. Modificar cantidades, extras y urgencia. Sin tarifas reales debe mantenerse Cotización personalizada.
5. Probar solicitudes freelance y mensuales: cambios de plan, validaciones, retroceso, resumen y descarga.
6. Comprobar los avisos de contactos sin configurar. Tras configurarlos, revisar los borradores externos sin enviarlos durante las pruebas.
7. Activar movimiento reducido y recorrer la navegación con teclado.
8. En Vercel, comprobar recursos, metadatos, consola, accesibilidad y rendimiento con Lighthouse.

La entrega es ejecutable y compilable. El contenido comercial, contactos, recursos propios y tarifas siguen pendientes del titular; no hay un servicio de envío conectado ni se ha publicado el sitio.
