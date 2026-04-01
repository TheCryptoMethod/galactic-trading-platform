# Design System Documentation: AstroTrade Dashboard

## Project Overview

**Project:** AstroTrade - A futuristic crypto trading dashboard
**Type:** Dashboard
**Style:** Dark, Retro-Futuristic with Brutalist Data Displays
**Theme:** Dark space, neon accents, orbital visualizations, real-time market data, AI-powered trading signals.

This document outlines the core design principles and specifications for the AstroTrade dashboard, ensuring a cohesive, high-impact, and anti-AI-slop aesthetic.

---

## 1. Core Aesthetic: Retro-Futuristic & Brutalist Data Displays

The AstroTrade dashboard embraces a **Retro-Futuristic** aesthetic for its overall presentation, featuring deep space backgrounds, neon accents, and sleek, geometric forms. This is combined with a **Brutalist/Raw** approach for the real-time data and trading signal displays, emphasizing clarity, sharp edges, and a high-tech, industrial feel. Expect asymmetry, grid-breaking elements, and a controlled density of information within data modules, contrasted with generous negative space in primary sections.

---

## 2. Color Palette

The color palette is built around deep, atmospheric darks, punctuated by sharp, vibrant neon accents. All colors are defined using CSS custom properties for easy management.

```css
:root {
  /* Backgrounds & Surfaces */
  --color-bg-primary: #02040A; /* Deep Space Black-Blue */
  --color-bg-secondary: #050B17; /* Slightly lighter background for subtle depth */
  --color-surface-primary: #0A111F; /* Card/Panel background */
  --color-surface-secondary: #121C2E; /* Hover/Active surface */

  /* Text Colors */
  --color-text-primary: #E0E7EF; /* Off-white for main content */
  --color-text-secondary: #BCC8D8; /* Subheadings, less critical info */
  --color-text-muted: #8B9BB7; /* Muted text, descriptions */
  --color-text-accent: var(--color-accent-blue); /* Text that needs to pop */

  /* Accent Colors (Neon) */
  --color-accent-blue: #00E0FF; /* Electric Cyan - Primary accent */
  --color-accent-green: #00FF99; /* Neon Green - Positive signals, highlights */
  --color-accent-magenta: #FF00E0; /* Vibrant Magenta - Alerts, warnings, specific data points */
  --color-accent-red: #FF4D4D; /* Alert Red - Negative signals, critical warnings */

  /* Borders & Dividers */
  --color-border-primary: #1A2B47; /* Subtle dark blue-grey border */
  --color-border-accent: var(--color-accent-blue); /* Accent border for focus */
}
```

**Background Atmosphere:**
The `--color-bg-primary` will not be a solid fill. It will be layered with a subtle dark gradient mesh (e.g., `radial-gradient` with very dark blues and blacks) and a fine grain overlay (`filter: url(#grain)`) to add depth and prevent a flat appearance.

---

## 3. Typography

A distinctive display font is paired with a refined, tech-inspired body font to maintain the retro-futuristic aesthetic while ensuring readability.

*   **Heading Font (Display):** `Oxanium` (Google Fonts)
    *   **Usage:** H1-H6, navigation links, prominent labels, dashboard titles.
    *   **Characteristics:** Geometric, slightly condensed, techy, strong presence.
    *   **Fallback:** `sans-serif`

*   **Body Font (Refined):** `Rajdhani` (Google Fonts)
    *   **Usage:** Paragraphs, data tables, button text, detailed descriptions.
    *   **Characteristics:** Semi-condensed, modern, highly readable, complements `Oxanium`.
    *   **Fallback:** `sans-serif`

```css
:root {
  --font-family-heading: 'Oxanium', sans-serif;
  --font-family-body: 'Rajdhani', sans-serif;

  /* Font Sizes */
  --font-size-base: 16px;
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-md: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */
  --font-size-5xl: 3rem; /* 48px */
  --font-size-6xl: 3.75rem; /* 60px */

  /* Line Heights */
  --line-height-heading: 1.1;
  --line-height-body: 1.6;
  --line-height-tight: 1.25;
}

h1 { font-size: var(--font-size-5xl); line-height: var(--line-height-heading); font-family: var(--font-family-heading); }
h2 { font-size: var(--font-size-4xl); line-height: var(--line-height-heading); font-family: var(--font-family-heading); }
h3 { font-size: var(--font-size-3xl); line-height: var(--line-height-heading); font-family: var(--font-family-heading); }
h4 { font-size: var(--font-size-2xl); line-height: var(--line-height-heading); font-family: var(--font-family-heading); }
h5 { font-size: var(--font-size-xl); line-height: var(--line-height-heading); font-family: var(--font-family-heading); }
h6 { font-size: var(--font-size-lg); line-height: var(--line-height-heading); font-family: var(--font-family-heading); }
p  { font-size: var(--font-size-md); line-height: var(--line-height-body); font-family: var(--font-family-body); }
```

---

## 4. Spacing Scale

A modular spacing scale, based on an 8px grid, ensures consistent and harmonious spatial relationships.

```css
:root {
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 48px;
  --spacing-xl: 80px;
  --spacing-2xl: 120px;
}
```

---

## 5. Border Radius

To maintain the sharp, brutalist, and futuristic aesthetic, border radii are kept minimal or entirely absent.

```css
:root {
  --border-radius-none: 0px;
  --border-radius-sm: 4px; /* For subtle rounding on data cards */
  --border-radius-md: 8px; /* For larger interactive elements */
}
```

---

## 6. Shadow Styles

Shadows are used sparingly and subtly, often as inner glows or very dark, diffused effects to create depth without obscuring the dark theme. Neon glows are reserved for interactive states.

```css
:root {
  /* Subtle inner shadow for embedded look */
  --shadow-inner-sm: inset 0 0 8px rgba(0, 0, 0, 0.4);
  --shadow-inner-md: inset 0 0 16px rgba(0, 0, 0, 0.6);

  /* Outer glow for interactive elements */
  --shadow-glow-blue: 0 0 15px var(--color-accent-blue), 0 0 30px rgba(0, 224, 255, 0.3);
  --shadow-glow-green: 0 0 15px var(--color-accent-green), 0 0 30px rgba(0, 255, 153, 0.3);

  /* Very subtle, dark outer shadow for floating elements */
  --shadow-float-sm: 0 4px 15px rgba(0, 0, 0, 0.3);
}
```

---

## 7. Navigation Bar

The navigation bar is a sticky header, providing persistent access to core pages.

*   **Structure:**
    *   Left: Project Logo (text-based, using `Oxanium` font, `--color-accent-blue`).
    *   Center: Main navigation links (Home, Features, Pricing).
    *   Right: Call-to-action button (e.g., "Launch Dashboard").
*   **Styling:**
    *   **Background:** `--color-bg-secondary` with a subtle `backdrop-filter: blur(10px)` for a frosted glass effect over the background.
    *   **Height:** `80px` (desktop).
    *   **Active State:** Current page link highlighted with `--color-accent-blue` text and a subtle bottom border or glow.
    *   **Hover State:** Navigation links change to `--color-accent-blue` on hover.
*   **Mobile:**
    *   **Hamburger Menu:** On screens `<= 768px`, a hamburger icon (`--color-text-primary`) replaces navigation links.
    *   **Off-canvas Menu:** Clicking the hamburger reveals a full-screen or slide-out menu with vertical links, styled with a dark background and neon accents.

---

## 8. Footer Component

A minimalist footer provides essential links and copyright information.

*   **Structure:**
    *   Left: Copyright information (`© 2023 AstroTrade. All rights reserved.`).
    *   Center: Key links (e.g., Privacy Policy, Terms of Service).
    *   Right: Social media icons (Twitter, Discord, Telegram).
*   **Styling:**
    *   **Background:** `--color-bg-secondary` or a darker variant.
    *   **Text:** `--color-text-muted`.
    *   **Links:** `--color-text-muted` with `--color-accent-blue` on hover.
    *   **Social Icons:** Geometric, monochromatic icons that glow with `--color-accent-blue` on hover.
    *   **Padding:** Generous vertical padding (`--spacing-lg`).

---

## 9. Component Specifications for Key Sections

Each section is designed to be distinct and impactful, leveraging the chosen aesthetic.

### 9.1. Hero Section (Home Page)

*   **Layout:** Asymmetrical, full-width. Dominant orbital visualization on one side, bold headline and CTA on the other.
*   **Content:**
    *   **Headline:** `<h1>` using `Oxanium`, `--color-text-primary`, with key words highlighted in `--color-accent-blue`.
    *   **Sub-headline:** `<h2>` using `Rajdhani`, `--color-text-secondary`.
    *   **Call-to-Action:** Prominent button with a subtle neon glow effect (`--shadow-glow-blue`) on hover.
    *   **Orbital Visualization:** Interactive, subtle animation, representing crypto assets or market flow.
*   **Background:** `--color-bg-primary` with a deep space gradient mesh and subtle starfield overlay.

### 9.2. Features Section

*   **Layout:** Grid-based, but with elements that can overlap or break the grid slightly to create dynamic visual interest. Each feature card is a distinct module.
*   **Content:**
    *   **Feature Cards:** `--color-surface-primary` background, sharp corners (`--border-radius-none`).
    *   **Iconography:** Abstract, geometric icons (SVG) in `--color-accent-blue` or `--color-accent-green`.
    *   **Titles:** `<h3>` using `Oxanium`.
    *   **Descriptions:** `p` using `Rajdhani`, `--color-text-secondary`.
*   **Interaction:** Subtle hover effect on cards, perhaps a border highlight in `--color-accent-blue`.

### 9.3. Real-Time Data Section

*   **Layout:** Controlled density, using a strict grid for data tables and charts, but with brutalist-inspired dividers and clear visual hierarchy.
*   **Content:**
    *   **Data Tables:** Monospace font for numbers (e.g., `Share Tech Mono` as a secondary body font for data, if needed, otherwise `Rajdhani` with `font-feature-settings: "tnum"`).
    *   **Live Updates:** Numbers changing color (`--color-accent-green` for up, `--color-accent-red` for down) with a quick, subtle flash animation.
    *   **Charts:** Minimalist, line-based charts with `--color-accent-blue` or `--color-accent-green` lines against a dark background.
*   **Styling:** Sharp borders (`--color-border-primary`), minimal padding within data cells.

### 9.4. AI Signals Section

*   **Layout:** Card-based, potentially staggered or with a slight Z-index overlap to emphasize individual signals.
*   **Content:**
    *   **Signal Cards:** `--color-surface-primary` background.
    *   **Signal Status:** Clear "BUY" or "SELL" indicators using `--color-accent-green` or `--color-accent-red` with bold `Oxanium` text and a corresponding background glow.
    *   **Explanation:** Concise text using `Rajdhani`.
    *   **Confidence Score:** Visualized with a progress bar or radial indicator using `--color-accent-blue`.
*   **Interaction:** Hovering over a signal card could expand it slightly or trigger a more pronounced glow.

### 9.5. Visualizations Section

*   **Layout:** Generous negative space around the primary visualization to allow it to breathe and be the focal point.
*   **Content:**
    *   **Main Visualization:** The interactive orbital visualization, potentially showing market cap distribution or asset correlations.
    *   **Controls:** Minimalist, icon-based controls for interaction, styled with `--color-text-muted` and `--color-accent-blue` on hover/active.
*   **Background:** Dark, subtle, allowing the visualization to dominate.

---

## 10. Responsive Breakpoints

The design is fully responsive, adapting to various screen sizes.

*   **Mobile:** `640px` (e.g., `sm` in TailwindCSS)
*   **Tablet:** `768px` (e.g., `md` in TailwindCSS)
*   **Desktop:** `1024px` (e.g., `lg` in TailwindCSS)
*   **Wide Desktop:** `1280px` (e.g., `xl` in TailwindCSS)

---

## 11. Animation Guidelines

Animations are used strategically for high-impact moments, providing feedback and enhancing the futuristic feel. CSS-only animations are preferred where possible.

*   **Page Transitions:**
    *   **Effect:** A subtle `fade-in` and slight `scale-up` for new content when navigating between pages.
    *   **Timing:** `0.4s ease-out`.
    *   **Implementation:** Apply a class to the main content area on page load/transition.

*   **Scroll Reveals:**
    *   **Effect:** Elements (`features`, `data cards`, `AI signals`) animate into view as they enter the viewport.
    *   **Animation:** `opacity: 0` to `opacity: 1`, combined with `transform: translateY(20px)` to `translateY(0)`.
    *   **Timing:** `0.6s ease-out` with staggered `animation-delay` (e.g., `0.1s` per item in a grid).
    *   **Implementation:** Use an Intersection Observer API to trigger CSS classes.

*   **Hover States:**
    *   **Buttons/Interactive Elements:**
        *   **Effect:** Background subtle glow (`--shadow-glow-blue`), text color shifts to `--color-accent-blue`.
        *   **Timing:** `0.2s ease-in-out`.
    *   **Data Points/Cards:**
        *   **Effect:** Subtle `scale(1.02)` or a `border-color` change to `--color-accent-blue`.
        *   **Timing:** `0.15s ease-out`.

*   **Visualization Animations:**
    *   **Orbital Visualization:** Continuous, subtle rotation and movement of elements to convey activity and dynamism. This will likely involve JavaScript for complex interactions but CSS for basic background movement.
    *   **Data Updates:** Quick, subtle `flash` or `pulse` animation on numbers when they change, using `--color-accent-green` or `--color-accent-red`.

*   **Loading States:**
    *   **Effect:** Minimalist, geometric loading spinners or progress bars using `--color-accent-blue`.
    *   **Timing:** Continuous animation.

---