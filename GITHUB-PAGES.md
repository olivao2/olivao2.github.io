# Publicar en GitHub Pages

## Diagnóstico del ZIP original

React 19 + TypeScript 5 + Vite 8 + Tailwind CSS 4. Node mínimo: 22.18.0; gestor: npm con package-lock.json.

El index.html de la raíz carga /src/main.tsx: es código fuente y necesita compilación. dist/ ya contenía una compilación, pero sus rutas /assets/... apuntaban a la raíz del dominio. Las imágenes y el video también usaban rutas absolutas. No había workflow de GitHub Pages; vercel.json y las instrucciones originales apuntaban a Vercel. Un initial commit por sí solo no activa ni configura Pages. No se inspeccionaron los ajustes de tu repositorio: estas son las causas detectadas en los archivos.

## Cambios incluidos

- vite.config.ts: base relativa ./, adecuada para esta landing con navegación por anclas.
- src/data.ts: imágenes y video usan import.meta.env.BASE_URL.
- .github/workflows/deploy.yml: instala, verifica, compila y publica dist en Pages.
- dist regenerado si la compilación de esta sesión concluye correctamente.

Vite transforma automáticamente las referencias del HTML y las fuentes del CSS al compilar. No hace falta modificar manualmente cada fuente.

## Ruta recomendada: GitHub Actions

1. Descomprime el ZIP corregido.
2. Sube EL CONTENIDO de la carpeta del proyecto a la raíz de tu repositorio: package.json, package-lock.json, index.html, vite.config.ts, src/, public/ y .github/, además de los otros archivos de configuración. No subas la carpeta contenedora ni node_modules/. Activa la visualización de archivos ocultos para incluir .github/.
3. Confirma los cambios en main. Si tu rama principal tiene otro nombre, cambia branches: [main] en .github/workflows/deploy.yml.
4. En GitHub abre Settings > Pages > Build and deployment > Source y selecciona GitHub Actions.
5. Abre Actions > Publicar en GitHub Pages. Si no se ejecutó al hacer commit, pulsa Run workflow después de configurar Pages.
6. Espera a que termine en verde. Abre la dirección que aparece en Settings > Pages o en el despliegue: normalmente https://USUARIO.github.io/REPOSITORIO/.

No necesitas instalar Node en tu computadora para esta ruta: GitHub Actions lo instala y compila. No hace falta instalar React ni Vite globalmente. El workflow debe estar en .github/workflows/deploy.yml en la raíz del repositorio. Si package.json quedó dentro de otra carpeta, mueve el contenido a la raíz para usar este workflow sin cambios.

## Compilar en tu computadora

Instala Node.js compatible (>=22.18.0). Abre una terminal en la carpeta que contiene package.json:

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

Abre http://127.0.0.1:4173/. build produce dist/. dev inicia el servidor de desarrollo en el puerto 5173; preview permite revisar la compilación. format ejecuta oxfmt.

## Alternativa manual, sin Actions

Usa el contenido del ZIP sitio-estatico-pages.zip, o el contenido de dist/ después de compilar. Pon index.html, assets/, fonts/, images/, video/ y favicon.png directamente en la raíz de una rama dedicada, por ejemplo gh-pages, junto a un archivo vacío .nojekyll. En Settings > Pages elige Deploy from a branch, selecciona esa rama y /(root). No subas la carpeta dist como contenedora. No mezcles este método con el flujo automático de arriba.

## Si todavía no aparece

- 404 en toda la web: comprueba la dirección de Pages, la fuente y la rama configuradas, y que el despliegue haya terminado.
- Pantalla vacía: revisa Actions; no publiques el index.html fuente sin compilar. Prueba una recarga completa del navegador.
- Error de npm ci: verifica que package-lock.json se subió junto con package.json.
- El workflow no aparece: confirma que .github no se omitió al subir archivos y está en la raíz.

noindex, nofollow sigue en index.html: impide la indexación en buscadores, pero no impide abrir la página. El formulario actual descarga un resumen local; publicar en Pages no añade un servidor de correo.

Fuentes oficiales:
https://vite.dev/guide/static-deploy
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
