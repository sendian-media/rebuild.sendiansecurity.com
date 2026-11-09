# Validation record

3 November 2026. The supplied starter has had static checks only. Neither live website was changed.

Passed: JavaScript parses with `node --check`; CSS block delimiters balance; CSS rules are scoped to the desktop media query; the stylesheet does not replace the root font size; calculated sizing-token ratios remain consistent across the widths below. The formula calculations assume a 16px root.

| CSS width | Calculated unit | Calculated shell | H2 | 24px reference gap |
|---:|---:|---:|---:|---:|
| 1280 | 16.00px | 1280.00px | 30.00px | 24.00px |
| 1366 | 16.00px | 1280.00px | 30.00px | 24.00px |
| 1440 | 16.00px | 1280.00px | 30.00px | 24.00px |
| 1535 | 16.79px | 1343.33px | 31.48px | 25.19px |
| 1536 | 16.80px | 1344.00px | 31.50px | 25.20px |
| 1537 | 16.81px | 1344.67px | 31.52px | 25.21px |
| 1600 | 17.33px | 1386.67px | 32.50px | 26.00px |
| 1920 | 20.00px | 1600.00px | 37.50px | 30.00px |
| 2560 | 25.33px | 2026.67px | 47.50px | 38.00px |
| 3440 | 32.67px | 2613.33px | 61.25px | 49.00px |
| 3840 | 36.00px | 2880.00px | 67.50px | 54.00px |

Browser rendering was not completed for the starter: the local browser launch was prevented by the execution environment. Consequently no claims are made that the starter or the integrated live sites pass overflow, visual, interaction, text-resize, zoom, reflow, Arabic or cross-browser checks. These remain release requirements in the SOP.

The text-size helper multiplies the mapped type tokens independently of the viewport by design. Its visual and interaction behaviour must still be verified after integration. Mixing rem and vw is not evidence that browser zoom alone achieves 200% text enlargement.
