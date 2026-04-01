# Design System Strategy: Galactic Liquidity

## 1. Overview & Creative North Star: "The Celestial Ledger"
This design system moves away from the rigid, spreadsheet-like nature of traditional finance and toward "The Celestial Ledger." The North Star for this system is **Astral Depth**. We are not building a flat interface; we are building a viewport into a digital nebula. 

The experience must feel weightless yet authoritative. We achieve this through **intentional asymmetry**, where data visualizations (orbital patterns) break the vertical flow of the grid, and **chromatic depth**, where the dark purple and black background isn't a wall, but an infinite void. Elements should feel like they are floating in space, held together by gravitational pull rather than boxes and lines.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the `surface` (#0e0e0e), acting as the vacuum of space. The neon accents are not just highlights; they are "light sources" that cast ambient glows on surrounding elements.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to section off the UI. 
*   **The Alternative:** Define boundaries through background shifts. Place a `surface-container-low` (#131313) component against a `surface` (#0e0e0e) background. 
*   **The Goal:** A seamless, "infinite" aesthetic where the eye perceives structure through tonal weight rather than wireframe outlines.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of obsidian and frosted glass:
*   **Base:** `surface` (#0e0e0e)
*   **Primary Containers:** `surface-container` (#1a1919) for main dashboard modules.
*   **Nested Elements:** `surface-container-high` (#201f1f) for inner cards or interactive zones.
*   **The "Glass & Gradient" Rule:** Floating panels (Modals, Hover Cards) must use Glassmorphism. Combine `surface-variant` (#262626) at 60% opacity with a `backdrop-blur` of 12px. Apply a subtle linear gradient from `primary` (#a1faff) to `secondary` (#bf81ff) at a 5% opacity overlay to give the glass a "soul."

---

## 3. Typography: The Editorial Edge
We utilize a high-contrast typographic scale to ensure the dashboard feels like a premium data-journal.

*   **Display (Space Grotesk):** Used for big-ticket numbers (e.g., Portfolio Balance). `display-lg` (3.5rem) should feel tectonic. 
*   **Headline (Space Grotesk):** For module titles. Use `headline-sm` (1.5rem) to command attention without crowding the "glass" containers.
*   **Body & Titles (Manrope):** The workhorse. `body-md` (0.875rem) provides the legibility needed for complex trade data.
*   **Labels (Inter):** Reserved for micro-data (e.g., "24h Change"). Use `label-sm` (0.6875rem) with increased letter-spacing (0.05em) to maintain a "technical/NASA" feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows have no place in a space theme. We use **Ambient Glows** and **Tonal Lift**.

*   **The Layering Principle:** To lift a trading ticket from the dashboard, shift its background from `surface-container-low` to `surface-container-highest`.
*   **Ambient Glows:** Instead of a drop shadow, use a `primary-dim` (#00e5ee) outer glow with a blur radius of 40px and an opacity of 8% for active states. This simulates a neon light reflecting off a dark surface.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` (#494847) at 15% opacity. It should be felt, not seen.
*   **Motion (Framer Motion):** Elements should not "pop" in. They should "drift" with a 0.4s ease-out duration and a slight 2% scale-up, mimicking an object entering a gravitational field.

---

## 5. Components & Interface Patterns

### Buttons (The Kinetic Triggers)
*   **Primary:** A vibrant gradient from `primary` (#a1faff) to `primary-dim` (#00e5ee). Text should be `on-primary` (#006165). No border.
*   **Secondary:** `surface-container-highest` background with a `primary` "Ghost Border" (20% opacity).
*   **Tertiary:** Pure text using `secondary` (#bf81ff) with a subtle `hover:glow` effect.

### Cards & Data Lists
*   **Anti-Divider Rule:** Never use `<hr />` or `border-b`. Use a `2.5` (0.5rem) vertical gap from the spacing scale or shift the background of alternating rows by 2% luminosity.
*   **Orbital Visualizations:** For asset allocation, avoid standard pie charts. Use concentric "orbital rings" using `primary`, `secondary`, and `tertiary` tokens with varying stroke-dasharrays to represent percentages.

### Input Fields
*   **State:** The default state is a `surface-container-lowest` (#000000) well. 
*   **Focus State:** The container transitions to `surface-container-high` (#201f1f) with a `primary` glow. The cursor/caret should be `tertiary` (#8eff71) for a high-contrast "terminal" feel.

### Trading Chips
*   **Sentiment Chips:** Use `tertiary-container` (#2ff801) for Long/Buy and `error-container` (#a70138) for Short/Sell, but keep the background opacity at 15% to prevent the neon from overpowering the data.

---

## 6. Do's and Don'ts

### Do:
*   **Use Asymmetry:** Place the "Orbital Visualization" off-center to create a sense of dynamic movement.
*   **Embrace the Void:** Use the `20` (4.5rem) spacing token between major dashboard modules to let the theme "breathe."
*   **Layer Glows:** Use multiple thin, layered box-shadows with neon colors to create a realistic "neon tube" effect on active buttons.

### Don't:
*   **Don't use 100% white:** Use `on-surface-variant` (#adaaaa) for secondary text to keep the "dark space" atmosphere intact. Pure white (`on-background`) is for critical data only.
*   **Don't use sharp corners:** While we are futuristic, 100% sharp corners feel "retro-brutalist." Use the `md` (0.375rem) or `lg` (0.5rem) roundedness tokens to make the glass feel "polished."
*   **Don't clutter:** If a screen feels busy, increase the background "void" (`surface`) rather than adding more containers.