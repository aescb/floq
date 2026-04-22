# Handoff: Floq Design System (base)

## Overview
Sistema de diseño base para **Floq** — plataforma chilena de cercas virtuales y monitoreo de salud para ganado (floq.cl). Este handoff contiene los **tokens + primitivas de UI** necesarios para construir cualquier superficie del producto (web marketing, dashboard, app móvil) con consistencia visual.

Incluye:
- Tokens de color, tipografía, espaciado, radii, sombras, easing
- Escala tipográfica con roles semánticos
- Primitivas: Button, Badge, Input/Checkbox/Toggle, Card
- Logos en SVG (primario, blanco, logomark)

**No incluye** UI kits completos (marketing web, app móvil) — este paquete es solo el sistema base.

## About the Design Files
Los archivos en `references/` son **prototipos HTML de referencia visual** — no producción. Muestran el look & behavior esperado pero usan HTML plano. La tarea es **recrear estos primitivos en el stack del repo objetivo** (React, Vue, SwiftUI, lo que aplique), usando sus patrones (styled-components, Tailwind, CSS Modules, etc.) y respetando sus convenciones. Si el repo aún no tiene stack definido, elige el más apropiado e implementa ahí.

El archivo `colors_and_type.css` sí es **directamente portable** — contiene todos los tokens como CSS custom properties. Lo puedes usar tal cual o convertir a tu formato (JS, JSON, SCSS, Tailwind config, etc).

## Fidelity
**Alta fidelidad (hifi)**. Los tokens son finales: colores hex exactos, tipografía con variaciones concretas, espaciado del sistema 4/8, radii y sombras definidos. Los primitivos en `references/` tienen medidas exactas (padding, font-size, border-width) que deben respetarse al portarlos.

## Design Tokens

### Colors

#### Greens — "The Land" (marca principal)
| Token | Hex | Uso |
|---|---|---|
| `--floq-leaf` | `#0F2318` | Texto más oscuro, casi negro |
| `--floq-pine` | `#1A3D29` | Texto oscuro sobre fondo claro |
| `--floq-grass` | `#27673F` | **Brand primary** — CTAs, estado sano |
| `--floq-moss` | `#3E8E5E` | Verde medio |
| `--floq-sprout` | `#72BB91` | Acento claro |
| `--floq-meadow` | `#B2D9C2` | Muy claro — bordes sutiles |
| `--floq-mist` | `#E6F2EC` | Fondo tintado suave |

#### Ambers — "Sun, Health, Alerts"
| Token | Hex | Uso |
|---|---|---|
| `--floq-ember` | `#9E4E00` | Texto sobre cream |
| `--floq-amber` | `#D97706` | Warnings, CTAs secundarios |
| `--floq-honey` | `#F5B942` | Glow suave, cercas en mapa |
| `--floq-cream` | `#FEF3DC` | Fondo aviso |

#### Neutrals
| Token | Hex | Uso |
|---|---|---|
| `--floq-dark` | `#0D1612` | Negro casi puro |
| `--floq-ink` | `#1C2B21` | Texto body primario |
| `--floq-slate` | `#4A5E53` | Texto secundario |
| `--floq-fog` | `#8A9E93` | Placeholder, disabled |
| `--floq-cloud` | `#D4E2DA` | Bordes, dividers |
| `--floq-paper` | `#F3F7F5` | Fondo de card |
| `--floq-chalk` | `#F9FBFA` | Fondo de página |
| `--floq-white` | `#FFFFFF` | Blanco puro |

#### Status
| Token | Hex | Uso |
|---|---|---|
| `--floq-status-healthy` | `#27673F` | Sano |
| `--floq-status-warning` | `#D97706` | Aviso |
| `--floq-status-critical` | `#C43C3C` | Crítico |
| `--floq-status-inactive` | `#8A9E93` | Inactivo |
| `--floq-status-info` | `#1E6FA8` | Info / en celo |

#### Aliases semánticos
```
--color-bg:           var(--floq-chalk);
--color-bg-card:      var(--floq-paper);
--color-bg-sunken:    var(--floq-mist);
--color-border:       var(--floq-cloud);
--color-border-focus: var(--floq-grass);
--color-text-primary:   var(--floq-ink);
--color-text-secondary: var(--floq-slate);
--color-text-muted:     var(--floq-fog);
--color-brand:          var(--floq-grass);
--color-accent:         var(--floq-amber);
```

### Typography

**Fonts** (desde Google Fonts):
- **Display**: `'Roboto Flex', 'Inter', sans-serif` — usada con eje variable `wdth 75` (condensada) en tamaños grandes para el feel alargado del wordmark. En headings medianos, `wdth 85`.
- **Body**: `'DM Sans', sans-serif`
- **Mono**: `'JetBrains Mono', monospace`

Import (ya incluido en `colors_and_type.css`):
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,300..1000&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
```

**Escala** (major third, 1.25):
| Token | rem | px |
|---|---|---|
| `--text-xs`   | 0.64   | 10.2 |
| `--text-sm`   | 0.8    | 12.8 |
| `--text-base` | 1      | 16 |
| `--text-md`   | 1.25   | 20 |
| `--text-lg`   | 1.563  | 25 |
| `--text-xl`   | 1.953  | 31.2 |
| `--text-2xl`  | 2.441  | 39 |
| `--text-3xl`  | 3.052  | 48.8 |
| `--text-4xl`  | 3.815  | 61 |
| `--text-5xl`  | 4.768  | 76 |

**Weights**: 300, 400, 500, 600, 700, 800

**Roles semánticos**:
| Role | Font | Weight | Tracking | Leading | `font-variation-settings` |
|---|---|---|---|---|---|
| Display | Roboto Flex | 800 | −0.015em | 0.92 | `'wdth' 75, 'opsz' 144` |
| Heading | Roboto Flex | 700 | −0.01em | 1.0 | `'wdth' 85, 'opsz' 32` |
| Label | DM Sans | 600 | 0.05em | 1.5 | (normal) |
| Body | DM Sans | 400 | 0.01em | 1.7 | (normal) |
| Caption | DM Sans | 300 | 0.01em | 1.5 | (normal) |
| Data | JetBrains Mono | 500 | 0.01em | 1.5 | (normal) |

### Spacing (sistema 4px)
```
--space-1:  4px    --space-6:   24px
--space-2:  8px    --space-8:   32px
--space-3:  12px   --space-10:  40px
--space-4:  16px   --space-12:  48px
--space-5:  20px   --space-16:  64px
                   --space-20:  80px
                   --space-24:  96px
```

### Radii
```
--radius-sm:   4px
--radius-md:   8px      ← default para buttons, inputs
--radius-lg:   12px     ← default para cards
--radius-xl:   16px
--radius-2xl:  24px
--radius-full: 9999px   ← badges, pills
```

### Shadows
```
--shadow-xs: 0 1px 2px rgba(15,35,24,0.06);
--shadow-sm: 0 2px 6px rgba(15,35,24,0.08), 0 1px 2px rgba(15,35,24,0.04);
--shadow-md: 0 4px 16px rgba(15,35,24,0.10), 0 2px 4px rgba(15,35,24,0.06);
--shadow-lg: 0 8px 32px rgba(15,35,24,0.12), 0 4px 8px rgba(15,35,24,0.08);
--shadow-xl: 0 16px 48px rgba(15,35,24,0.16), 0 8px 16px rgba(15,35,24,0.08);
--shadow-focus: 0 0 0 3px rgba(39,103,63,0.28);
```

### Motion
```
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:   cubic-bezier(0.45, 0, 0.55, 1);
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
--duration-fast: 120ms;
--duration-base: 220ms;
--duration-slow: 380ms;
```

## Components (primitivas)

### Button
Referencia: `references/components-buttons.html`

**Base**:
- `border-radius: 8px`, `border: none`, `cursor: pointer`
- Padding default: `10px 18px` · font-size `14px` · font-weight `600` · font-family body (DM Sans)
- Transición: `all 120ms var(--ease-out)`
- `:active { transform: scale(0.97) }`

**Tamaños**:
- `sm` — padding `6px 12px`, font-size `12px`, radius `6px`
- `md` (default) — padding `10px 18px`, font-size `14px`
- `lg` — padding `13px 24px`, font-size `15px`

**Variantes**:
| Variante | Background | Color | Border | Hover |
|---|---|---|---|---|
| `primary` | `--floq-grass` | `#fff` | none | bg `#1E5430` |
| `secondary` | `--floq-mist` | `--floq-grass` | `1px solid --floq-meadow` | bg `--floq-meadow` |
| `ghost` | transparent | `--floq-pine` | `1px solid --floq-cloud` | bg `--floq-mist` |
| `amber` | `--floq-amber` | `#fff` | none | bg `#B65F05` |
| `danger` | `#C43C3C` | `#fff` | none | |

**Estados**:
- `disabled`: `opacity: 0.4; cursor: not-allowed`
- Focus: añadir `box-shadow: var(--shadow-focus)` (`0 0 0 3px rgba(39,103,63,0.28)`)
- Icon + label: gap `8px`, icon 15×15, stroke-width 2

### Badge
Referencia: `references/components-badges.html`

**Base**: display `inline-flex`, gap 6px, padding `3px 10px`, `border-radius: 9999px`, font-size 11px, weight 600, letter-spacing 0.02em

**Variantes de estado** (con dot 6×6 opcional):
| Estado | Background | Color | Dot |
|---|---|---|---|
| Sano | `--floq-mist` | `--floq-grass` | `#27673F` |
| Aviso | `#FEF3DC` | `#9E4E00` | `#D97706` |
| Crítico | `#FAE5E5` | `#8A2929` | `#C43C3C` |
| En celo | `#DEF0FC` | `#155F94` | `#1E6FA8` |
| Inactivo | `#EEF0EE` | `#4A5E53` | `#8A9E93` |

**Otras**:
- Solid: bg `--floq-grass`, color `#fff`
- Outline: bg `#fff`, border `1px solid --floq-cloud`, color `--floq-pine`
- Pill counter: bg `--floq-pine`, color `#fff`, font mono, padding `2px 8px`

### Input
Referencia: `references/components-inputs.html`

**Base**:
- Padding `10px 12px`, radius 8px, border `1px solid --floq-cloud`, bg `#fff`, font-size 14px (DM Sans)
- Placeholder: `color: --floq-fog`
- `:focus`: border `--floq-grass` + `box-shadow: 0 0 0 3px rgba(39,103,63,0.22)`
- Error: border `#C43C3C`

**Label**: font-size 12px, weight 600, color `--floq-pine`, letter-spacing 0.02em
**Hint**: font-size 11px, color `--floq-slate` (error: `#C43C3C`)

### Checkbox
- Box: 18×18, radius 4px
- Checked: bg `--floq-grass`, icono check blanco (stroke-width 3)
- Unchecked: bg `#fff`, border `1.5px solid --floq-cloud`

### Toggle
- Track: 36×20, radius 999px, bg `--floq-grass` (on) / `--floq-cloud` (off)
- Thumb: 16×16, bg `#fff`, radius 999px, inset 2px

### Card
Referencia: `references/components-cards.html`

**Base**:
- bg `#fff`, border `1px solid --floq-cloud`, radius 12px, padding 16px
- `box-shadow: 0 2px 6px rgba(15,35,24,0.06)` (shadow-sm)
- `h4` interno: font display (Roboto Flex), size 16px, weight 700, color `--floq-pine`, tracking −0.01em
- `p` interno: font body, size 12.5px, color `--floq-slate`, leading 1.55
- Meta row: font mono, size 10px, color `--floq-fog`, uppercase, letter-spacing 0.08em

**Variantes**:
- Dark: bg `--floq-pine`, color blanco, heading blanco, body `#B2D9C2`
- Tinted: bg `--floq-mist`, border `--floq-meadow`

## Logo

### Primary (`assets/logo.svg`)
- viewBox 290×86
- Hexágono doble concéntrico (stroke 1.5 outer, 4.5 inner) — motif de marca
- Wordmark "Floq" en Roboto Flex 800, size 78, `wdth 75, opsz 144`, tracking −1
- Dot verde 9px radius, `cx=270, cy=65`, color `--floq-grass`

### White (`assets/logo-white.svg`)
- Igual pero con stroke y texto en blanco, dot en `--floq-sprout` (#72BB91)

### Logomark (`assets/logomark.svg`)
- Solo el hexágono doble, viewBox 80×80. Usar para favicons/iconos app.

**Regla de uso**: espacio libre mínimo alrededor = altura del hexágono mayor (~8% del viewBox width). No alterar proporciones del hexágono ni el dot.

## Files incluidos

```
design_handoff_floq_design_system/
├── DESIGN.md                      ← este archivo
├── colors_and_type.css            ← tokens portables (CSS custom properties)
├── assets/
│   ├── logo.svg                   ← logo primario (color)
│   ├── logo-white.svg             ← logo blanco
│   └── logomark.svg               ← solo hexágono (icon/favicon)
└── references/
    ├── components-buttons.html    ← spec visual de buttons
    ├── components-badges.html
    ├── components-inputs.html
    ├── components-cards.html
    ├── type-display.html
    ├── type-roles.html
    ├── type-scale.html
    ├── colors-brand.html
    ├── colors-neutral.html
    ├── colors-status.html
    ├── spacing-tokens.html
    ├── radii.html
    ├── shadows.html
    ├── logo-primary.html
    └── logo-mark.html
```

## Sugerencia de integración

1. **Tokens** — portar `colors_and_type.css` a tu formato. Si usas Tailwind, mapea a `theme.extend.colors` / `fontFamily` / `spacing` en `tailwind.config.js`. Si usas CSS Modules o styled-components, deja el CSS como está e impórtalo en tu entry.
2. **Fonts** — si tu app tiene requisitos de offline o CSP estricto, descarga los WOFF2 de Google Fonts y autohostéalos. Si no, el `@import` actual basta.
3. **Primitivas** — reconstruye `Button`, `Badge`, `Input`, `Checkbox`, `Toggle`, `Card` como componentes en tu framework. Usa los HTML de `references/` como spec visual, pero implementa con tus convenciones.
4. **Logo** — importa los SVG directamente. Nota: el wordmark del logo depende de que Roboto Flex esté cargada. Si necesitas un SVG que funcione sin la fuente, pide que se convierta el texto a path (outline).

---

**Contacto / iteración**: este sistema fue diseñado en la herramienta de diseño de Floq. Para cambios en tokens o primitivas, vuelve a la fuente y regenera este handoff.
