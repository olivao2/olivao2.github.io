# FRAME · Portafolio Audiovisual Premium

Proyecto ejecutable basado en el código original exportado de Figma Make. Se conservan React 19, TypeScript, Vite y Tailwind CSS v4 para preservar el diseño y comportamiento existentes. No se migró a Next.js porque esta landing ya tenía una base funcional y no necesita servidor para su comportamiento actual.

## Ejecutar localmente

Requisitos: Node.js >=22.18.0 y npm. En una terminal dentro de esta carpeta:

```sh
npm ci
npm run dev
```

Abre http://127.0.0.1:5173/. El servidor es independiente de Figma. No abras index.html mediante file://; utiliza el servidor para cargar módulos y recursos.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

El build genera dist/. La vista previa de producción utiliza http://127.0.0.1:4173/. package-lock.json fija las dependencias verificadas: usa npm.

## Funcionalidad

Navegación por anclas, menú móvil, filtros de proyectos, reproductores en modales, cotizador, planes mensuales y formulario por pasos. El formulario valida datos y permite descargar un resumen local; no simula envíos. WhatsApp y correo abren canales externos cuando se configuran los contactos. No hay servidor de envíos, CRM, base de datos, pagos ni firma digital conectados.

Se conservan secciones, estilos responsive, animaciones, iconos, fuentes, fotografías y video originales. Se mantienen Escape, contención y restauración del foco en modales, mensajes de estado y movimiento reducido. Los recursos audiovisuales pesados no se cargan hasta abrir el reproductor; las imágenes secundarias utilizan carga diferida. Se añaden metadatos, favicon y cabeceras básicas para Vercel.

## Estructura y personalización

- src/App.tsx: landing, navegación y componentes Button y Heading.
- src/components/Modal.tsx: modal reutilizable con gestión del foco.
- src/components/RequestModal.tsx: solicitud, validación y descarga.
- src/data.ts: marca, contactos, redes, servicios, proyectos, planes y preguntas.
- src/pricing.ts: tarifas, multiplicadores, plazos y fórmula.
- src/index.css: estilos y responsive originales.
- src/Icon.tsx: iconografía original.
- public/: imágenes, fuentes, licencias y video.
- index.html: SEO y metadatos.
- vercel.json: configuración de despliegue.

En src/data.ts configura site.email, site.whatsapp (solo dígitos, incluido código de país) y las URLs HTTPS de site.socials. FRAME, la biografía, fotografías, servicios y proyectos son contenido de ejemplo heredado del archivo original, no datos verificados del profesional.

Para agregar proyectos añade objetos a projects y copia sus recursos a public/. Ajusta image, video y categoría; demoVideo controla el showreel. Conserva los avisos DEMO hasta sustituir el contenido por trabajos reales con permiso de publicación. Para videos grandes puedes usar un proveedor de streaming HTTPS con soporte de rangos.

### Tarifas

Las bases y extras sin configurar están en null. El cotizador muestra «Cotización personalizada» mientras falte una tarifa necesaria. Sustituye null únicamente por importes aprobados; revisa multiplicadores, plazos, límites y condiciones. Los importes numéricos de pricing.test.ts son datos sintéticos exclusivos de pruebas. El extra de urgencia vale cero porque aplica un multiplicador, sin cobrarlo dos veces.

Los volúmenes, prestaciones, revisiones y plazos del diseño son orientativos. Debes confirmarlos antes de ofrecerlos como condiciones comerciales. Los planes mensuales siguen sin precio definido.

### Contacto y privacidad

La descarga prepara un archivo local: no envía datos. WhatsApp y correo abren borradores externos; el visitante decide si los envía. mailto requiere una aplicación de correo y puede limitar la longitud del mensaje.

Para recibir solicitudes directamente en la web falta seleccionar y conectar un backend de correo o CRM, volver a validar campos en el servidor, limitar solicitudes y configurar secretos solo en el servidor. Nunca incluyas claves privadas en variables VITE_*: son públicas en el navegador.

## Publicar en Vercel

1. Sube el código a un repositorio Git propio, sin node_modules, secretos ni archivos personales.
2. Crea un proyecto en Vercel e importa ese repositorio. Si esta carpeta es parte de otro repositorio, selecciónala como raíz del proyecto.
3. Selecciona el preset Vite, instalación npm ci, build npm run build y salida dist. vercel.json ya declara el framework, build y salida.
4. Selecciona una versión de Node compatible con package.json. Verificado en esta sesión con Node 26.13.0; mínimo declarado 22.18.0.
5. Despliega y revisa reproducción, navegación, formularios y enlaces en la URL resultante.
6. Antes de indexar el sitio definitivo, sustituye todo el contenido de ejemplo, elimina noindex, nofollow de index.html y configura URL canónica, og:url, imagen social absoluta y sitemap con tu dominio real.

No se ha publicado el sitio desde esta sesión. Documentación oficial: [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite) y [despliegue desde Git](https://vercel.com/docs/git).

## Información pendiente antes del lanzamiento

- Nombre y marca definitivos, biografía y retrato propio.
- Correo comercial, WhatsApp y enlaces sociales reales.
- Proyectos, videos y portadas propios con permisos de publicación.
- Tarifas, extras, alcances mensuales, revisiones y plazos aprobados.
- Textos legales adaptados a tu actividad y jurisdicción.
- Dominio final, cuenta y repositorio de Vercel.
- Proveedor de correo/CRM y credenciales privadas, solo si se habilitan envíos desde servidor.

## Verificación y límites

Consulta VERIFICACION.md. Se ejecutaron TypeScript, ESLint, las cinco pruebas del cotizador y el build. No se afirma conformidad WCAG ni métricas Core Web Vitals. La vista previa no fue accesible desde el navegador de esta sesión; siguen pendientes la comparación visual y la revisión manual de escritorio/móvil. El CSS responsive y la disposición del original se conservaron.

## Créditos

Fotografías de Unsplash: desierto de Wolfgang Hasselmann (photo-1542401886-65d6c61db217), automóvil de Louis Meeckers (photo-1598814165187-ed79437d7490) y retrato de chester wade (photo-1508179522353-11ba468c4a1c). El video es un montaje silencioso de demostración de 30 segundos. Licencias de DM Sans y Space Grotesk conservadas en public/fonts/.

## Publicar en GitHub Pages
Consulta [GITHUB-PAGES.md](GITHUB-PAGES.md) para el diagnóstico y los pasos de despliegue.
