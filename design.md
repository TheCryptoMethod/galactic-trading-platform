# Design System: Galactic Modernism

## 1. Overview & Creative North Star
**Creative North Star: The Celestial Horizon**

This design system moves away from the "boxy" nature of traditional fintech and trading platforms. Instead, it adopts an editorial, cinematic approach to digital interface design. By leveraging the vastness of deep space, we treat the screen not as a flat surface, but as a window into a three-dimensional void. 

The aesthetic identity is defined by **Atmospheric Depth**. We break the "template" look through intentional asymmetry, where large-scale 3D galactic elements bleed off the canvas, and typography is treated with the precision of a high-end fashion magazine. We prioritize breathing room over density, using the "Deep Space" concept to create a sense of infinite scale and premium exclusivity.

## 2. Colors & Atmospheric Tones
The palette is rooted in the void of the universe, using varying levels of "darkness" to define structure rather than light.

### The Palette
- **Core Void:** `surface` (#131313) serves as our foundation.
- **Nebula Accents:** `primary` (#d0bcff) and `secondary` (#89ceff) provide the ethereal glow of distant stars.
- **Supernova CTA:** `tertiary` (#ffb690) is reserved strictly for high-conversion moments, slicing through the cool tones with heat.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning content. To define boundaries, designers must use:
1.  **Tonal Shifts:** Transitioning from `surface` to `surface-container-low` to create soft regionality.
2.  **Negative Space:** Using large steps in the spacing scale (e.g., `20` or `24`) to denote the end of a narrative block.

### Surface Hierarchy & Nesting
Treat the UI as a series of floating celestial bodies. 
- Use `surface-container-lowest` (#0e0e0e) for the background to ground the experience.
- Use `surface-container` (#201f1f) for primary content containers.
- Use `surface-bright` (#3a3939) for elevated interactive elements.
This creates a "nested" depth where the eye perceives layers of gas and shadow rather than a flat grid.

### The "Glass & Gradient" Rule
To achieve the "High-End" finish, apply `backdrop-blur` (20px+) to any floating element. Use subtle linear gradients for CTAs, transitioning from `primary` (#d0bcff) to `primary-container` (#a078ff) at a 135-degree angle. This provides a "soul" to the components that flat colors cannot replicate.

## 3. Typography
Our typography is the "Voice of Authority." It is clean, expansive, and highly legible.

*   **Display & Headlines (Manrope):** These are our "Editorial Hooks." Use `display-lg` for hero statements with a `-0.02em` letter spacing. The heavier weights of Manrope provide a technical yet sophisticated feel.
*   **Body (Inter):** Inter provides the functional clarity required for trading data. Always use `body-lg` for primary marketing copy to maintain a premium, spacious feel.
*   **Technical Labels (Space Grotesk):** For micro-data, labels, and "galactic coordinates" (metadata), use Space Grotesk. Its monospaced characteristics evoke a futuristic, cockpit-instrumentation aesthetic.

**Hierarchy Note:** Always maintain a high contrast between `headline-lg` and `body-md`. If everything is important, nothing is.

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering**, mimicking how light behaves in a vacuum.

*   **The Layering Principle:** Avoid shadows where possible. Instead, place a `surface-container-high` element on top of a `surface-container-low` background. The slight shift in gray-value creates a more modern, sophisticated "lift."
*   **Ambient Shadows:** If an element must "float" (like a dropdown or modal), use a massive blur (40px-64px) with the color `primary` at 5% opacity. This creates a "glow" rather than a "shadow," suggesting the element is self-illuminated.
*   **The "Ghost Border" Fallback:** If containment is required for accessibility, use the `outline-variant` token at **15% opacity**. This creates a whisper of an edge that disappears into the background, maintaining the minimalist ethos.
*   **Signature Grain:** Apply a 3% opacity film grain texture to the `surface` layer. This breaks the digital perfection of the hex codes and adds a tactile, cinematic quality.

## 5. Components

### Buttons
*   **Primary:** `primary` background with a subtle outer glow (0px 0px 15px `primary_fixed_variant` at 30% opacity). Roundedness: `md` (0.375rem).
*   **Secondary (Glass):** Semi-transparent `surface-variant` with a `backdrop-blur`.
*   **Tertiary (Supernova):** `tertiary` (#ffb690) for the "Trade Now" or "Launch" actions. Use high-contrast `on-tertiary` text.

### Cards & Marketing Blocks
*   **Structure:** No divider lines. Separate content using the `spacing-8` (2.75rem) value.
*   **Visuals:** Every card should feature a "Corner Glow"â€”a radial gradient of `primary` at 5% opacity tucked into one corner to suggest light hitting the edge of a planet.

### Input Fields
*   **Style:** Underline-only or subtle "Glass" containers. Focus states should trigger a soft transition of the border-bottom from `outline-variant` to `primary`. 
*   **Helper Text:** Use `label-sm` in `on-surface-variant` with `0.05em` tracking.

### Signature Component: The "Nebula Pulse"
For real-time trading indicators, do not use standard green/red dots. Use a soft, breathing radial gradient (Pulse) that glows from `secondary` (for up) or `error` (for down), creating a living, organic interface.

## 6. Do's and Don'ts

### Do
*   **Do** use generous tracking (`0.02em`+) on all labels to feel "expensive."
*   **Do** let 3D assets overlap section boundaries to break the grid.
*   **Do** use `surface-container-lowest` for the footer to "sink" the page into the void.
*   **Do** prioritize asymmetry in layoutâ€”place a headline on the left and a 3D element floating slightly off-center to the right.

### Don't
*   **Don't** use 100% white (#FFFFFF). Always use `on-surface` (#e5e2e1) to prevent eye strain on the dark background.
*   **Don't** use standard shadows. If it doesn't glow, it shouldn't have an outer effect.
*   **Don't** use sidebars or dashboards. This is a marketing-first, high-conversion experience; keep the user on a single, focused vertical scroll.
*   **Don't** use hard corners. Always utilize the `md` or `lg` roundedness scale to keep the tech feeling approachable and "soft-tech."