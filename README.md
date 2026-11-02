# INISTMap

An embeddable, dependency-free SVG map of Niger State, Nigeria. Use it as a lightweight browser plugin to explore local data, compare values by LGA, add map pins, or build a custom dashboard.

## Quick start

Copy `inistmap.js` and `inistmap.css` into your project. The built-in Niger State SVG is bundled in the JavaScript file. To use the Niger ward drilldown offline, also copy `assets/niger-wards.js` and load it before `inistmap.js`. Add a mount point and initialize the map:

```html
<link rel="stylesheet" href="/vendor/inistmap/inistmap.css">
<div id="niger-map" style="height: 520px"></div>
<script src="/vendor/inistmap/inistmap.js"></script>
<script>
  const map = new INISTMap('#niger-map', {
    title: 'Niger State',
    data: {
      BORGU: { value: 82, label: '82%' },
      BOSSO: { value: 64, label: '64%' },
      SULEJA: { value: 91, label: '91%' }
    },
    valueLabel: 'Coverage',
    showLegend: true,
    onFeatureClick(feature) {
      console.log(feature.name, feature.value);
    }
  });
</script>
```

The map needs a container with a non-zero height. The default LGA SVG is bundled in `inistmap.js`. The optional `assets/niger-wards.js` file bundles ward geometry as `INISTMapWardData`, so demos can run directly from `file://` without fetching data. Load that script before `inistmap.js` and set `wardDrilldown: true`. If you prefer to host GeoJSON, set `wardDataUrl` to a URL and serve it over HTTP(S) with suitable CORS headers. Set `mapUrl` only when you want to use another SVG; it must include a `viewBox`, be served from the same origin or with suitable CORS headers, and have a `featureMap` that maps element IDs to names. Each instance exposes a `ready` promise that resolves to the map or `null` if the SVG could not load; errors are also sent to `onError` and `inistmap:error`.

## Features

- No runtime dependencies, framework, API key, or build step.
- Responsive SVG map that preserves the original geometry.
- Data-driven choropleth colors, optional per-feature labels, legend, and summary metrics.
- Search and keyboard-accessible LGA selection.
- Wheel/pinch zoom, drag-to-pan, zoom-to-selection, reset, and fullscreen controls.
- SVG and PNG export of the current map view.
- Optional pins with custom content and click callbacks.
- Events and methods for updating data, selecting an LGA, and adding/removing pins.
- A clean `variant: 'plain'` map for full-bleed dashboard and presentation layouts.
- Optional click-through from all 25 Niger State LGAs to interactive ward maps, with zoom, pan, hover details, selection, and a one-click return to the state map.
- Optional silhouette-only 3D depth, rendered as one continuous outer edge behind all regions.
- Linear, equal-interval, and quantile color classification, plus custom feature maps for alternate SVGs.
- Customizable map URL, colors, feature data, legend, and callbacks.

## Options

| Option | Default | Description |
|---|---|---|
| `mapUrl` | Built-in Niger State SVG | Optional URL for alternate SVG geometry. |
| `title` | `Niger State` | Accessible map name and heading. |
| `data` | `{}` | Feature data keyed by LGA name or SVG feature ID. Each item can include `value`, `label`, `description`, `color`, `url`, `redirect`, `target`, and `linkLabel`. |
| `featureMap` | Built-in IDs | Optional object mapping SVG element IDs to names when using alternate geometry, e.g. `{ region_a: 'Area A' }`. |
| `valueLabel` | `Value` | Label shown in tooltips and the legend. |
| `showLegend` | `true` | Show the data scale. |
| `showSearch` | `true` | Show the LGA search field. |
| `showStats` | `true` | Show feature count and average when numeric values exist. |
| `showLabels` | `false` | Show data labels inside features when space allows; generated labels choose foreground and outline colors for contrast with each area. |
| `labelMode` | `value` | Set to `name` or `both` for generated feature labels. Generated labels select their feature; source labels pass clicks through to the feature below. |
| `compact` | `false` | Use tighter spacing for dashboard cards. |
| `variant` | `card` | Set to `plain` for a flat, map-only layout with floating controls and no map shadow. |
| `theme` | `light` | Set to `dark` for a dark dashboard card. |
| `showControls` | `true` | Show zoom, focus, reset, fullscreen, and export controls. |
| `wheelZoom` | `true` | Enable wheel and touchpad zoom over the map. Two-finger touch zoom is also supported. |
| `wheelSensitivity` | `20` | Adjust wheel and trackpad zoom speed from `0.1` (gentle) to `20` (fast). Large values are capped to a smooth per-step change. |
| `minZoom` / `maxZoom` | `1` / `8` | Set allowed zoom bounds. |
| `panOverscroll` | `0.12` | Allow a small pan margin around the map, including at the initial zoom level. Set to `0` to keep the map inside its original bounds. |
| `extrusionDepth` | `0` | Draw one continuous, offset map silhouette behind the regions. Set a small value such as `8` for outside-only 3D depth. |
| `extrusionColor` | `#25334a` | Color for the outside-only extrusion layer. |
| `zoomOnSelect` | `false` | Zoom into a feature whenever it is selected or a label is clicked. |
| `popover` | `false` | Enable an anchored detail popover with the metric, description, and optional link. |
| `popoverTrigger` | `both` | Choose `hover`, `click`, `contextmenu` (right-click), or `both` to control how an enabled popover opens. Hover previews stay open while the pointer moves from a region or label onto the popover. |
| `wardDrilldown` | `false` | Smoothly zoom into the selected LGA and reveal its ward boundaries fitted to and clipped by that LGA's own map outline. Each LGA is fitted independently. Wards remain interactive, and Back returns to all LGAs. |
| `wardDataUrl` | `null` | Optional HTTP(S) GeoJSON FeatureCollection URL. Local `file://` pages should load `assets/niger-wards.js` instead of fetching GeoJSON. |
| `wardGeoJSON` | `null` | Pass a GeoJSON FeatureCollection directly; otherwise INISTMap uses the bundled `INISTMapWardData` global if loaded. |
| `wardData` | `{}` | Optional ward metrics keyed by LGA, then ward name, e.g. `{ Borgu: { Baro: { value: 42, label: '42%' } } }`. |
| `redirectOnFeatureClick` | `false` | Navigate to that feature's `url`, `href`, or `redirect` URL on click. A feature can opt in individually with `redirect: true`. |
| `redirectTarget` | `_self` | Open automatic redirects in the current tab or use `_blank` for a new tab. |
| `scaleType` | `linear` | Choose `linear`, `equal`, or `quantile` choropleth coloring. |
| `classes` | `5` | Number of color classes for equal or quantile scales (2–9). |
| `colors` | `['#e8f3f1', '#087f72']` | Color ramp; provide 2 or more hex colors. |
| `pins` | `[]` | Pins: `{ id, x, y, label, description, color, onClick }` in the SVG viewBox coordinate system. |
| `onFeatureClick(feature)` | — | Called when a feature is clicked, tapped, or selected with the keyboard. |
| `onFeatureHover(feature \| null)` | — | Called when pointer focus enters or leaves a feature. |
| `onViewportChange(view)` | — | Called after zoom or pan; includes the zoom factor and SVG viewBox. |
| `onReady(map)` | — | Called after the SVG has loaded and features are initialized. |
| `onError(error)` | — | Called if the SVG cannot be loaded or parsed. |

Feature objects passed to callbacks contain `id`, `name`, `value`, `label`, `description`, and the original `data` object. Area and label clicks share the same selection, callback, popover, and optional redirect behavior. Calling `map.setData(data)` refreshes colors and labels. Use `map.select(nameOrId)` to select an area, `map.zoomTo(nameOrId)` to focus it, `map.zoomBy(factor)` to zoom, `map.resetView()` to return to the full map, `map.addPin(pin)` / `map.removePin(id)` / `map.clearPins()` to manage pins, and `map.export('svg')` or `map.export('png')` to download the current view. `map.destroy()` removes listeners and rendered markup.

When ward drilldown is enabled, feature callbacks also include `level` (`'lgas'` or `'wards'`) and the parent `lga` for ward selections. Listen for `inistmap:level-change` to respond to map transitions. Call `map.backToLGAs()` to return to the full state view.

### Popovers and redirects

```js
new INISTMap('#niger-map', {
  popover: true,
  popoverTrigger: 'both', // 'hover', 'click', 'contextmenu', or 'both'
  wardDrilldown: true,
  data: {
    Suleja: {
      value: 88,
      label: '88%',
      description: 'Service coverage in this area.',
      url: '/areas/suleja'
    },
    Tafa: {
      value: 74,
      label: '74%',
      url: '/areas/tafa',
      redirect: true // Navigate on area or label click.
    }
  }
});
```

When `redirect` is omitted, the popover shows an explicit link and selection stays on the current page. Set `redirectOnFeatureClick: true` to make every feature with a valid `url` navigate when selected.

### Ward boundary source

The bundled ward polygons come from **GRID3 NGA Operational Wards v4.0**, published in October 2026. The source includes Niger State's 25 LGAs and 275 wards. Attribution is shown while a ward map is open. The dataset is licensed CC BY-SA 4.0; redistributed copies and derived boundary data must keep the attribution and the same license. GRID3 describes the boundaries as operational and not yet fully validated by government authorities, so treat them as a planning/map layer rather than authoritative legal boundaries. See [GRID3's Nigeria data catalogue](https://grid3.org/geospatial-data-nigeria) and the [GRID3 v4 ArcGIS Feature Service](https://services3.arcgis.com/BU6Aadhn6tbBEdyk/ArcGIS/rest/services/GRID3_NGA_operational_wards_v4_0/FeatureServer).

## Events

The map dispatches bubbling custom events from its container:

```js
document.querySelector('#niger-map').addEventListener('inistmap:select', (event) => {
  console.log(event.detail); // selected feature
});
```

Available events: `inistmap:ready`, `inistmap:select`, `inistmap:hover`, `inistmap:viewport`, `inistmap:level-change`, and `inistmap:error`.

The map supports keyboard shortcuts when a region is focused: `+` / `-` zoom, `0` or `Home` resets, and arrow keys move focus between areas. On touch screens, drag to pan and pinch to zoom. Generated data labels activate the same selection, callback, popover, and redirect behavior as their mapped area.

## Demos

Open [`index.html`](index.html) through a local web server for an interactive gallery with a starter map, a data choropleth, a pins example, and integration snippets. For example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/INISTMap/` from the repository root.

## Data and attribution

The map geometry and original project content are maintained in this repository. The map is an illustrative district-level SVG, not a survey-grade boundary dataset; verify geographic boundaries before using it for official decisions. The legacy labels duplicated Suleja and omitted Tafa. To expose all 25 LGAs, this plugin currently labels the legacy `ngjs26` shape as Tafa. Confirm that specific shape assignment against an authoritative boundary source before official use.

Copyright © Said Abdulsalam. All rights reserved. The repository and its map geometry are provided for educational and academic research use. Obtain permission before other use or redistribution.

## Legacy files

`nist_Map.html` and `nis/nistMap.html` are compatibility entry points that load the new plugin. `nist_Map1.html` is now a compact dashboard example. The plugin and all current demos use native JavaScript and CSS; jQuery and Bootstrap are not required.
