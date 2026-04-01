# Chrome MCP Lab QA

Use Chrome MCP to verify the lab before shipping any layout or interaction changes.

## Viewports

- Desktop standard: `1280x900`
- Desktop short: `1280x700`
- Mobile: `390x844`

## Core Route Checks

1. Open `/lab`.
2. Confirm the configurator begins in the first viewport.
3. Confirm there is no right-side live-result rail on desktop.
4. Confirm the active step header and inline live-result card appear before the step progression controls.
5. Confirm there is no large empty desktop column on step 4.
6. Confirm there are no console errors on load.

## Step Scenarios

### Step 1: Peppers

1. Select a pepper and confirm the inline result card updates immediately.
2. Deselect a pepper and confirm the inline result card updates immediately.
3. Confirm the pepper selector uses compact image thumbnails rather than text-only cards.
4. Confirm the `Continue to accents` action appears after the active step content, not above the generation action.

### Step 2: Accents

1. Add an accent and confirm chips and result status update immediately.
2. Remove an accent and confirm the card updates immediately.
3. Confirm the `Continue to heat` action stays below the active step content.

### Step 3: Heat

1. Change the slider.
2. Confirm the heat label updates in the inline result card immediately.
3. Confirm the current heat read in the step body updates immediately.

### Step 4: Style

1. Change the label style.
2. Confirm the inline result card updates the label direction immediately.
3. Confirm the layout stays balanced with no large empty left-side area.

## Concept Actions

1. Click `Generate Concept`.
2. Confirm the name, blurb, and status update without layout breakage.
3. Click `Refresh Label`.
4. If `VITE_POLLINATIONS_KEY` is missing, confirm the UI reports that gracefully instead of breaking.
5. Expand `Concept details`.
6. Confirm bottle preview, prompt trace, flavor line, and suggested uses appear as secondary content below the step flow.

## Reset and Randomize

1. Click `Randomize Recipe`.
2. Confirm the builder returns to a valid state and resets to step 1.
3. Click `Reset`.
4. Confirm the default formulation returns and the builder stays valid.

## Secondary Content

1. Expand the single optional references panel below the builder.
2. Confirm visual prompts and step notes both live inside that one panel.
3. Confirm the lab no longer ends with two separate giant disclosure blocks.

## Navigation Checks

1. Navigate `Home -> Lab -> Wiki -> Lab`.
2. Confirm the routes load correctly.
3. Confirm no console errors appear during navigation.
4. Confirm the lab state is still valid after returning.

## Pass Criteria

- The lab opens on the configurator, not on a large editorial hero.
- The primary CTA is visually tied to the selections that drive it.
- Step progression does not appear above the concept-generation action.
- Live result information is not duplicated across multiple competing desktop regions.
- The inline result card updates immediately after pepper, accent, heat, and style changes.
- Secondary concept details stay collapsed by default.
- No console errors appear during the tested flows.
