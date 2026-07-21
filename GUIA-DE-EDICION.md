# Guía para editar el portafolio tú mismo

Todo el contenido del sitio (servicios, proyectos, skills, experiencia, certificaciones,
educación, y tus datos de contacto) vive en archivos simples dentro de la carpeta
`src/content/`. Hay dos formas de editarlo: el **panel visual `/admin`** (recomendado,
con formularios, sin tocar código) o editando los archivos JSON directamente en GitHub
(más manual, útil como respaldo). Cuando guardes un cambio, el sitio se vuelve a
publicar solo en 1-2 minutos.

## Opción A: Panel visual en `/admin` (recomendado)

Ve a **https://yonaidissoto.github.io/admin/** — ahí encuentras un formulario para cada
sección (Site Info, Services, Projects, Skills, Experience, Certifications, Education,
menú de navegación), con botones para **Agregar**, **Eliminar**, y **Guardar cambios**.
No necesitas tocar JSON ni código para el uso normal.

### Configuración única (la primera vez)

El panel necesita permiso para guardar cambios en tu repositorio. Para eso, crea un
**token de acceso personal** en GitHub (una sola vez):

1. Ve a **https://github.com/settings/personal-access-tokens/new**
2. En **"Token name"** escribe algo como `Portafolio admin`.
3. En **"Expiration"** elige, por ejemplo, 90 días o 1 año (cuando expire, simplemente
   creas uno nuevo y lo vuelves a pegar en `/admin`).
4. En **"Repository access"** selecciona **"Only select repositories"** y elige
   `yonaidissoto.github.io`.
5. Baja a **"Permissions"** → **"Repository permissions"** → busca **"Contents"** →
   cámbialo a **"Read and write"**.
6. Baja hasta el final y dale **"Generate token"**.
7. GitHub te muestra el token una sola vez (empieza con `github_pat_...`) — **cópialo**
   antes de salir de esa página (no podrás verlo de nuevo, aunque si lo pierdes puedes
   generar uno nuevo repitiendo estos pasos).
8. Ve a `https://yonaidissoto.github.io/admin/`, pega el token en el campo de acceso, y
   dale **"Entrar"**.

El token queda guardado solo en ese navegador (no se comparte con nadie, no viaja a
ningún lado excepto directamente a GitHub). Si usas otra computadora, repites el paso de
pegar el token ahí también. Puedes revocar el token en cualquier momento desde
**github.com/settings/personal-access-tokens** sin afectar el sitio.

### Usando el panel

- Elige una sección en el menú de la izquierda (ej. "Projects").
- Haz clic en un elemento para abrirlo y editar sus campos, o en **"Agregar"** para crear
  uno nuevo.
- Los campos que dicen "una por línea" o "uno por línea" son listas — cada renglón del
  cuadro de texto se convierte en un elemento separado.
- El campo **Ícono** es un menú desplegable — solo puedes elegir íconos válidos, no hay
  riesgo de escribir uno inválido.
- Cuando termines, dale **"Guardar cambios"**. Verás un mensaje de confirmación; el sitio
  se actualiza en 1-2 minutos.

## Opción B: Editar los archivos JSON directamente en GitHub (manual)

1. Ve a `github.com/YonaidisSoto/yonaidissoto.github.io`.
2. Entra a la carpeta `src` → `content`.
3. Haz clic en el archivo que quieres cambiar (por ejemplo `projects.json`).
4. Haz clic en el ícono de lápiz ✏️ (arriba a la derecha del archivo) para editarlo.
5. Cambia el texto que quieras (ver reglas abajo).
6. Baja hasta el final de la página, escribe una breve descripción del cambio, y haz clic
   en **"Commit changes..."** → **"Commit directly to the main branch"**.
7. Espera 1-2 minutos y revisa `https://yonaidissoto.github.io/` — ya debería verse tu cambio.

## Reglas importantes (formato JSON)

Estos archivos usan un formato llamado JSON. Es sensible a un par de reglas — si las
rompes, la página dejará de compilar (no te preocupes, no se rompe el sitio en vivo,
solo no se actualiza hasta que arregles el archivo):

- Todo texto va entre comillas dobles `"así"` (no comillas simples `'así'`).
- Cada elemento de una lista termina en coma `,`, **excepto el último**.
- Los corchetes `[ ]` marcan una lista; las llaves `{ }` marcan un elemento.
- No borres comas, comillas o llaves al copiar/pegar — solo cambia el texto entre comillas.

Truco: copia un bloque completo existente (por ejemplo, un proyecto entero entre `{ }`),
pégalo justo antes o después, y solo cambia los textos adentro. Así es más difícil
romper el formato.

## Qué hay en cada archivo

| Archivo | Qué controla |
|---|---|
| `src/content/site.json` | Tu nombre, título, descripción, email, LinkedIn, GitHub, y las palabras clave de SEO |
| `src/content/nav.json` | Los links del menú de navegación |
| `src/content/services.json` | Las tarjetas de "Services" |
| `src/content/projects.json` | Las tarjetas de "Projects" (problema, solución, tecnologías, resultados, links) |
| `src/content/skills.json` | Los grupos de habilidades técnicas |
| `src/content/experience.json` | La línea de tiempo de experiencia laboral |
| `src/content/certifications.json` | Las tarjetas de certificaciones |
| `src/content/education.json` | Educación y los contadores animados (ej. "15+ Workflows Automated") |

## Agregar o eliminar un elemento (ej. un proyecto, servicio, certificación)

Cada archivo es una lista `[ ... ]` de elementos entre llaves `{ ... }`, separados por
comas. Para **agregar** uno nuevo: copia un elemento existente completo (desde `{` hasta
`}`), pégalo después de una coma, y cambia sus textos. Para **eliminar** uno: borra ese
bloque completo `{ ... }` junto con la coma que lo separaba del siguiente.

Ejemplo — agregar un servicio nuevo al final de `services.json` (nota la coma después del
`}` anterior):

```json
  },
  {
    "id": "mi-nuevo-servicio",
    "title": "Mi Nuevo Servicio",
    "description": "Descripción breve de en qué consiste.",
    "icon": "star",
    "keywords": ["Palabra clave 1", "Palabra clave 2"]
  }
]
```

## Íconos disponibles (para `services.json` y `skills.json`)

El campo `"icon"` acepta una de estas palabras: `award`, `barChart`, `bookOpen`,
`briefcase`, `calendar`, `checkCircle`, `clock`, `code`, `cpu`, `database`, `edit`,
`gitBranch`, `globe`, `heart`, `home`, `layers`, `mail`, `message`, `phone`, `send`,
`server`, `settings`, `share`, `shield`, `star`, `target`, `tool`, `trending`, `users`,
`zap`. Si escribes una palabra que no está en esta lista, se usará un ícono por defecto
en su lugar (no rompe nada).

## Reemplazar tu foto, currículum, o imagen de vista previa

- **Foto de perfil**: sube tu foto a `public/images/portrait.jpg` (en GitHub: entra a
  `public/images`, "Add file" → "Upload files"). Avísame para conectar la foto al Hero —
  ese paso sí requiere un cambio de código pequeño (una sola vez).
- **Currículum (PDF)**: sube el archivo a `public/resume.pdf` con el mismo nombre exacto
  — el botón "Download Resume" ya apunta ahí, no necesitas tocar código.
- **Imagen para compartir en LinkedIn/redes** (`og-image.png`, 1200×630 px): sube el
  archivo a `public/og-image.png` con ese nombre exacto — la metadata ya apunta ahí.

## Si algo se rompe

Si después de guardar un cambio el sitio no se actualiza, ve a la pestaña **Actions** del
repo — si el último run tiene una ❌, haz clic ahí para ver el error (casi siempre es una
coma o comilla faltante en el JSON que editaste). Corrige el archivo y vuelve a guardar.
