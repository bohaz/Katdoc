# Katdoc

Sitio web de **Katdoc**, veterinaria y peluquería canina en Alta Vista Sur, Puerto Ordaz (Venezuela).
Sitio estático de una sola página, sin dependencias ni proceso de build.

- Producción: <https://katdoc.com.ve>
- Instagram: [@katdoc.mv](https://www.instagram.com/katdoc.mv)
- Conversión principal: agendar citas por WhatsApp

## Stack

| Capa | Tecnología |
|------|------------|
| Marcado | HTML5 semántico |
| Estilos | CSS3 con variables personalizadas (sin frameworks) |
| Comportamiento | JavaScript vanilla (ES2020) |
| Tipografías | Barlow Condensed (títulos) y DM Sans (texto), vía Google Fonts |
| Íconos | Sprite SVG inline (`<symbol>`) en `index.html` |

## Estructura

```
.
├── index.html            # Página única: head SEO, sprite de íconos y secciones
├── robots.txt            # Reglas para buscadores y ruta del sitemap
├── sitemap.xml           # Mapa del sitio
└── assets/
    ├── css/styles.css    # Todos los estilos
    ├── js/main.js        # Comportamiento e interacciones
    └── img/
        ├── logo.svg              # Logotipo (header y footer)
        ├── favicon.svg           # Favicon
        ├── apple-touch-icon.png  # Ícono iOS (180x180)
        ├── og.jpg                # Imagen para compartir (1200x630)
        ├── perroygato.webp       # Imagen del hero
        └── domicilio.png         # Fondo de la sección "A domicilio"
```

## Desarrollo local

El proyecto no tiene dependencias ni `package.json`; no hay que instalar nada.

- **Opción más simple:** abrir `index.html` directamente en el navegador.
- **VS Code:** extensión *Live Server* → clic derecho en `index.html` → *Open with Live Server*.
- **Terminal (requiere Node.js):** `npx serve .` y abrir la URL que indique.

## Configuración

### WhatsApp

El número y el mensaje por defecto están centralizados al inicio de `assets/js/main.js`:

```js
const KATDOC = {
  whatsapp: "584249229539",
  mensaje: "Hola Katdoc, quiero agendar una cita para mi mascota."
};
```

Cualquier enlace con el atributo `data-wa` recibe automáticamente la URL de `wa.me`.
Para un mensaje distinto, se asigna como valor del atributo:

```html
<a href="#" data-wa="Quiero agendar una ecografía.">Agendar por WhatsApp</a>
```

Sin valor (`data-wa`), usa `KATDOC.mensaje`. Para cambiar el número solo se edita `KATDOC.whatsapp`
(formato internacional, sin `+` ni espacios). El número visible en la sección de contacto y el
enlace `tel:` del footer están en `index.html` y deben actualizarse a mano.

## Secciones de la página

| ID | Sección |
|----|---------|
| `#inicio` | Hero con llamada a la acción |
| `#servicios` | Tarjetas de servicios veterinarios |
| `#domicilio` | Atención a domicilio |
| `#contacto` | WhatsApp, Instagram, ubicación y mapa |

El footer incluye logotipo, redes, teléfono, copyright, crédito de desarrollo y ubicación.

## Estilos (`assets/css/styles.css`)

- Los colores, tipografías y medidas globales están en variables dentro de `:root`
  (`--naranja`, `--azul`, `--carbon`, `--f-tit`, `--max`, etc.). Se modifican ahí, no en cada regla.
- El archivo está dividido en bloques comentados: Base, Botones, Header, Hero, Tarjetas,
  Íconos, Domicilio, Contacto, Mapa, Footer, WhatsApp, Colores de SVG, Menú, Animaciones y Responsive.
- Punto de quiebre móvil: `820px`. Las reglas móviles están agrupadas al final.
- Convención de nombres: clases cortas en español (`.card`, `.dom`, `.fila`, `.pie-*`).

### Agregar un servicio

Duplicar una `<article class="card">` dentro de `.grid`, ajustar título, descripción,
ícono (`#i-...`) y el mensaje de `data-wa`. El grid se adapta solo.

### Agregar un ícono

Añadir un `<symbol id="i-nombre" viewBox="0 0 24 24">` al sprite de `index.html` y usarlo así:

```html
<svg aria-hidden="true"><use href="#i-nombre"/></svg>
```

Clases de color disponibles dentro de los símbolos: `.c` (azul), `.o` (naranja) y `.os` (trazo naranja).
Los íconos `i-wa-solid` e `i-ig-solid` son monocromáticos y heredan `currentColor`.

## JavaScript (`assets/js/main.js`)

| Función | Descripción |
|---------|-------------|
| Enlaces WhatsApp | Genera `href`, `target` y `rel` de todos los `[data-wa]` |
| Menú móvil | Abre y cierra con botón, overlay, tecla `Esc` y al cambiar a escritorio; actualiza `aria-expanded` |
| Header | Añade sombra al hacer scroll |
| Año del footer | Inserta el año actual en `#anio` |
| Aparición al scroll | `IntersectionObserver` con clases `.rv` / `.in` |
| Parallax | Desplazamiento suave del fondo de `#domicilio` |

Las animaciones de scroll y el parallax se desactivan con `prefers-reduced-motion: reduce`.

## SEO

Configurado en el `<head>` de `index.html`:

- `title` y `meta description` optimizados para búsquedas locales
- URL canónica `https://katdoc.com.ve/`
- Open Graph y Twitter Cards (`assets/img/og.jpg`, 1200x630)
- Datos estructurados JSON-LD (`VeterinaryCare`) con dirección, teléfono, redes y catálogo de servicios
- `robots.txt` y `sitemap.xml`

Al cambiar de dominio, actualizar las URLs en `index.html`, `robots.txt` y `sitemap.xml`.
Al modificar contenido relevante, actualizar `lastmod` en `sitemap.xml`.

## Accesibilidad

- Idioma declarado (`lang="es-VE"`) y estructura de encabezados jerárquica
- Íconos decorativos con `aria-hidden`; botones e íconos de enlace con `aria-label`
- Estilo de foco visible (`:focus-visible`)
- Imágenes con `width`/`height` para evitar saltos de layout; imagen del hero priorizada y fondos con carga diferida

## Despliegue

Es un sitio estático: basta con publicar la raíz del repositorio en cualquier hosting estático.

Lista de verificación previa:

1. DNS de `katdoc.com.ve` apuntando al hosting y HTTPS activo.
2. Redirección de `www` al dominio sin `www`, para coincidir con la URL canónica.
3. Existen todos los archivos de `assets/img/` listados arriba.
4. Probar el sitio en móvil y escritorio, incluidos los botones de WhatsApp.
5. Enviar `sitemap.xml` en Google Search Console.
6. Validar la vista previa al compartir (Open Graph) y el JSON-LD con la
   [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results).

## Flujo de trabajo

- Rama principal: `main` (siempre desplegable).
- Cambios mediante ramas `feat/*`, `fix/*`, `docs/*` o `chore/*` y Pull Request.
- Mensajes de commit con [Conventional Commits](https://www.conventionalcommits.org/es/).

## Créditos

Diseñado y desarrollado por [tuplandigital.cl](https://tuplandigital.cl).