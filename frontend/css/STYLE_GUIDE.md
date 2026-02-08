# 🎨 Media Tracker Design System

This guide defines the visual language and CSS architecture for the Media Tracker System (v2.0).

## Color Palette
We utilize a high-contrast dark theme to prioritize visual focus on media posters.

| Element | Variable | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Background** | `--bg-color` | `#121212` | Main page background |
| **Surface** | `--card-bg` | `#1e1e1e` | Card and navigation background |
| **Accent** | `--accent-color` | `#03dac6` | Buttons, links, and active states (Teal/Cyan) |
| **Text (High)** | `--text-primary`| `#e0e0e0` | Headlines and body text |
| **Text (Low)** | `--text-muted` | `#aaa` | Descriptions and secondary info |


## Layout & Spacing
- **Container**: Max-width of `1000px` for optimal readability.
- **Grid System**: `repeat(auto-fill, minmax(180px, 1fr))` ensures a responsive gallery.
- **Aspect Ratio**: All media posters follow a **2:3 ratio** to mimic physical posters.

## Component: Media Card
The Media Card is the core unit of the UI.
1. **Normal State**: Subtle 1px border (`#333`).
2. **Hover State**: 1.05x scale transform with an `--accent-color` border glow.
3. **Overlay**: 85% opacity black background at the bottom for metadata.


## Typography
- **Font Stack**: `Segoe UI`, `Roboto`, `Helvetica`, `Arial`, sans-serif.
- **Scale**:
  - `h1`: 3rem (Hero) / 2rem (Standard)
  - `p`: 1rem
  - `caption`: 0.8rem (Progress counters)