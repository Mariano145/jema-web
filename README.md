# JEMA Web

Landing one-page de JEMA (Astro 5 + Tailwind 4 + TypeScript).

## Stack

- **Astro** 5.x (sitio estático, zero JS por default)
- **Tailwind CSS** 4.x (via `@tailwindcss/vite`, sin integration legacy)
- **TypeScript** estricto (extends `astro/tsconfigs/strict`)
- **Inter** desde Google Fonts

## Estructura

```
src/
├── styles/global.css              # @theme tokens (colores, spacing, font-size, radius)
├── layouts/Layout.astro           # html shell + meta + Google Fonts
├── components/ui/Button.astro     # variants: primary | secondary | ghost
├── sections/hero/
│   ├── Hero.astro                 # Hero section con copy literal
│   └── BrandMark.astro            # SVG inline "J + orb"
├── config/ctas.ts                 # URLs y mensajes predefinidos (con TODOs)
└── pages/index.astro              # composicion de secciones
```

## Comandos

```bash
pnpm install        # instalar dependencias
pnpm run dev        # dev server en http://localhost:4321
pnpm run build      # build de produccion en ./dist
pnpm run preview    # preview del build
```

## Tokens de diseno

Definidos en `src/styles/global.css` bajo `@theme`:

- **Colors**: `--color-text` `#112222`, `--color-background` `#f5efe5`, `--color-primary` `#00a897`, `--color-secondary` `#028192`, `--color-accent` `#f4a462`, `--color-white` `#ffffff`
- **Spacing**: base 8px (`--spacing: 0.5rem`) -> `p-4` = 32px
- **Font size**: `sm` 14 -> `6xl` 64px
- **Radius**: `sm` 4 -> `2xl` 24px

## Pendiente

- Implementar las 7 secciones restantes (Servicios, Como trabajamos, Sobre JEMA, Casos, FAQ, Contacto, Footer).
- Reemplazar placeholders en `src/config/ctas.ts` (URL real de Calendly, numero de WhatsApp, endpoint del form).
- Favicon y assets OG image cuando esten definidos.
