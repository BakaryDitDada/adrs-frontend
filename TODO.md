# Enterprise UI Refactor — Actionable TODO Roadmap

This roadmap is ordered by:

1. highest visual impact
2. highest architectural ROI
3. lowest regression risk

Follow this order strictly.

---

# PHASE 1 — Design System Foundation (Highest Priority)

## Goal

Fix the systemic visual problems affecting the entire application.

Estimated impact:
🔥 Massive

Estimated effort:
Medium

---

# 1. Refactor Spacing Scale

## Current Problem

The UI is too vertically spacious.

---

## TODO

### Update spacing tokens

Reduce overall spacing density.

### Replace current scale with:

```js id="rx7u7u"
spacing: {
  xxs: '0.4rem',
  xs: '0.8rem',
  sm: '1.2rem',
  md: '1.6rem',
  lg: '2rem',
  xl: '2.4rem',
  xxl: '3.2rem',
}
```

---

## Audit & Replace

Search globally for:

```txt id="s4h3kt"
theme.spacing.xl
theme.spacing.xxl
padding: 3rem+
gap: 3rem+
```

Reduce aggressively.

---

# 2. Refactor Typography Scale

## Current Problem

Titles are too large and visually heavy.

---

## TODO

### Create enterprise typography scale

```js id="j8lc5l"
fontSizes: {
  xs: '1.2rem',
  sm: '1.3rem',
  body: '1.4rem',
  bodyLg: '1.6rem',

  h4: '1.8rem',
  h3: '2rem',
  h2: '2.4rem',
  h1: '3.2rem',
}
```

---

## Replace oversized headings

### Audit:

```txt id="0ng1yv"
2.4rem+
2.6rem+
3rem+
```

Especially:

* Card titles
* Section headers
* Sidebar titles

---

# 3. Refactor Border System

## Current Problem

Borders are too visible.

---

## TODO

### Replace:

```js id="jxts7r"
#4b5563
```

### With:

```js id="c1m9c0"
rgba(255,255,255,0.06)
```

---

## Add elevation system

### Add:

```js id="e03evg"
shadows: {
  low: '0 1px 2px rgba(0,0,0,0.2)',
  medium: '0 8px 24px rgba(0,0,0,0.24)',
  high: '0 16px 40px rgba(0,0,0,0.3)',
}
```

---

# 4. Refactor Radius Scale

## Current Problem

The UI feels too soft and rounded.

---

## TODO

### Replace:

```js id="0v9bo6"
xl: '2rem'
```

### With:

```js id="xlnqvr"
radii: {
  sm: '0.6rem',
  md: '0.8rem',
  lg: '1.2rem',
  xl: '1.6rem',
  full: '9999px',
}
```

---

# 5. Create Semantic Surface System

## Current Problem

Backgrounds are not semantic enough.

---

## TODO

### Add:

```js id="2chh9v"
surface: {
  page: '#020817',
  card: '#0f172a',
  elevated: '#111827',
  hover: '#1e293b',
  active: '#2563eb15',
}
```

---

# PHASE 2 — Primitive Component System

## Goal

Create scalable reusable enterprise primitives.

Estimated impact:
🔥🔥🔥

Estimated effort:
High

---

# 6. Create True UI Primitives

## TODO

Create:

```txt id="hhy3dw"
components/ui/
├── Button
├── Card
├── Surface
├── Stack
├── Grid
├── Text
├── Heading
├── Badge
├── Divider
```

---

# 7. Refactor Button Component

## TODO

### Add variants

```txt id="k0nn7j"
primary
secondary
ghost
danger
outline
```

---

### Add sizes

```txt id="nbstj9"
sm
md
lg
```

---

### Add states

```txt id="q6m4cz"
hover
focus-visible
disabled
loading
active
```

---

### Add support for:

```txt id="89t94n"
iconOnly
fullWidth
leftIcon
rightIcon
```

---

# 8. Refactor Card Component

## TODO

### Add variants

```txt id="exk0fg"
default
elevated
interactive
compact
```

---

### Reduce padding globally

From:

```txt id="t0wsfk"
24px–32px
```

To:

```txt id="4ptzkn"
16px–20px
```

---

### Add:

```txt id="ynp8s6"
hover state
subtle elevation
transition
```

---

# PHASE 3 — Layout System Refactor

## Goal

Improve enterprise responsiveness and alignment consistency.

Estimated impact:
🔥🔥🔥🔥

---

# 9. Standardize App Layout Grid

## TODO

### Use:

```css id="xznl9n"
grid-template-columns:
  minmax(0, 1fr)
  32rem;
```

---

### Standardize:

```css id="s6s79q"
gap: 24px;
align-items: start;
```

---

# 10. Create Layout Tokens

## TODO

Add:

```js id="0otj9f"
layout: {
  sidebarWidth: '28rem',
  contentMax: '160rem',
  headerHeight: '6.4rem',
}
```

---

# 11. Fix Sidebar Sticky Logic

## TODO

Replace:

```css id="mqgl5g"
top: 2rem;
```

With:

```css id="g8t39e"
top: var(--app-header-height);
```

---

# 12. Improve Mobile Responsiveness

## TODO

Audit:

```txt id="h93xv8"
Header
Action bars
Sidebar
Cards
Grid layouts
```

---

### Add responsive stacking:

```css id="50d3pk"
@media (max-width: 768px)
```

Especially:

* page headers
* action groups
* metadata panels

---

# PHASE 4 — Density Optimization

## Goal

Make the interface feel enterprise-grade.

Estimated impact:
🔥🔥🔥🔥🔥

---

# 13. Reduce Card Heights

## TODO

Reduce:

* padding
* section gaps
* empty space

---

## Audit

```txt id="j4q1d5"
min-height
large padding
large margins
oversized gaps
```

---

# 14. Compact Task Rows

## TODO

Reduce row height:

```txt id="zkh6yw"
56px max
```

---

### Improve alignment

Normalize:

* avatar alignment
* checkbox alignment
* actions alignment

---

### Add:

```txt id="c5a1aj"
hover background
focus state
inline edit
```

---

# 15. Improve Metadata Panels

## TODO

Merge:

```txt id="w5d8q8"
Dates
Details
```

into:

```txt id="qmpnza"
Task Information
```

Reduce sidebar fragmentation.

---

# PHASE 5 — Interaction & UX Sophistication

## Goal

Increase perceived product quality dramatically.

Estimated impact:
🔥🔥🔥🔥🔥

---

# 16. Add Motion System

## TODO

Add:

```js id="m4j5qq"
motion: {
  fast: '120ms ease',
  normal: '180ms ease',
  slow: '260ms ease',
}
```

---

# 17. Add Hover States Everywhere

## TODO

Audit:

```txt id="mn0ncl"
Cards
Rows
Buttons
Sidebar items
Task items
Attachments
```

---

# 18. Add Focus Accessibility States

## TODO

Implement:

```css id="4dujlwm"
:focus-visible
```

on:

* buttons
* inputs
* task rows
* navigation

---

# 19. Add Loading States

## TODO

Create:

```txt id="lm4hri"
Skeleton loaders
Button loaders
Page loaders
Card loaders
```

---

# 20. Add Transition Hierarchy

## TODO

Use transitions ONLY for:

* hover
* elevation
* opacity
* transform

Avoid:

```txt id="bbis6g"
long animations
bounce effects
heavy motion
```

---

# PHASE 6 — Advanced Enterprise UX

## Goal

Push the platform toward premium SaaS quality.

---

# 21. Improve Progress Stepper

## TODO

Refactor:

* thinner lines
* smaller nodes
* softer inactive states

---

### Add:

```txt id="g7cefe"
clickable stages
tooltips
hover states
```

---

# 22. Improve Avatar Stack

## TODO

Normalize:

```txt id="sw7jct"
32px avatars
2px border
-8px overlap
```

---

### Add:

```txt id="yga5ww"
tooltips
hover expansion
online state
```

---

# 23. Add Empty States

## TODO

Create reusable:

```txt id="6hy3l6"
EmptyState
```

For:

* tasks
* attachments
* notes
* reports
* comments

---

# 24. Add Error States

## TODO

Create:

```txt id="gtghmb"
Inline errors
Page errors
Retry actions
```

---

# 25. Add Keyboard Navigation

## TODO

Support:

```txt id="vl8ewl"
tab navigation
escape close
enter submit
arrow navigation
```

Especially for:

* modals
* dropdowns
* task lists

---

# PHASE 7 — Architecture Maturity

## Goal

Prepare the platform for long-term scalability.

---

# 26. Split Theme System

## TODO

Move from:

```txt id="nnij1t"
theme.js
```

To:

```txt id="ih9y2v"
theme/
├── foundations/
├── semantic/
├── components/
├── tokens/
```

---

# 27. Introduce Component Variants

## TODO

Adopt:

```txt id="0rsl5v"
variant
size
density
state
```

patterns consistently.

---

# 28. Add Design Constraints

## TODO

Create internal rules:

### Example:

```txt id="dx87qx"
No section title above 20px
No card padding above 24px
No border opacity above 0.08
No radius above 16px
```

This prevents design drift.

---

# Recommended Execution Order

## Week 1

✅ Theme refactor
✅ Spacing
✅ Typography
✅ Borders
✅ Shadows
✅ Radius

---

## Week 2

✅ Button system
✅ Card system
✅ Layout system
✅ Responsive improvements

---

## Week 3

✅ Density optimization
✅ Task rows
✅ Sidebar refinement
✅ Metadata cleanup

---

## Week 4

✅ Motion system
✅ Hover states
✅ Skeletons
✅ Accessibility
✅ Advanced UX

---

# Highest ROI Changes

If you only do 5 things:

1. Reduce spacing scale
2. Reduce typography sizes
3. Reduce border visibility
4. Reduce radii
5. Add proper shadows/elevation

Your UI quality will jump dramatically.
