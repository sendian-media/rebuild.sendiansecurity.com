# Framer and motion guide

Use this guide for Framer-generated sites, sticky scenes, reveal effects, scroll-bound animation, and animated media.

## Determine the driver

For each animated region, establish whether it is driven by scroll position, time, hover, click, focus, pointer movement, viewport width, or a combination. Record the trigger, range, initial state, active state, and settled state. Do not replace a scroll-driven behavior with a click-only imitation.

## Rebuild progressively

1. Match the static layout and asset layering first.
2. Add responsive positioning and sticky behavior.
3. Use CSS transitions/keyframes for simple state changes.
4. Introduce a client-side island or animation dependency only when CSS cannot reproduce the observed behavior.
5. Respect `prefers-reduced-motion`; preserve an understandable static state.

Keep animation code scoped to the recreated site. Do not add a global animation framework for one section.

## Compare motion honestly

Compare initial, active, settled, and reverse-scroll states at matched viewport sizes. Capture the timing/range you observed and disclose any approximation. Test keyboard access and ensure animated overlays do not block visible controls or focus.
