# Projectile Motion Mobile App

A simple mobile-friendly web app that converts the Activity 4.3 projectile motion Python examples into interactive graphs.

## Files

- `index.html` — app UI
- `style.css` — responsive mobile-style layout
- `app.js` — simulation logic for vertical fall and 2D projectile motion

## How to use

1. Open `mobile_app/index.html` in a browser.
2. Adjust the inputs for drag, mass, velocity, and time steps.
3. Tap `Run Vertical Motion` or `Run Projectile Motion` to update the charts.

## Notes

- The app compares motion without air resistance and with drag proportional to speed.
- `Chart.js` is loaded via CDN, so no local dependencies are required.
