# Projectile Motion Web App

This repository contains a lightweight web application for comparing projectile motion with and without air resistance.

The app is based on Activity 4.3 and includes:

- a vertical fall simulation for motion with and without drag
- a 2D projectile path comparison with and without air resistance
- interactive charts that update when parameters change

## Running the app

1. Open `mobile_app/index.html` in a browser.
2. Adjust the input values for mass, drag coefficient, air density, initial speed, and launch angle.
3. Click `Run Vertical Motion` or `Run Projectile Motion` to see the results.

## Files

- `mobile_app/index.html` — app interface
- `mobile_app/style.css` — mobile-friendly layout and styling
- `mobile_app/app.js` — simulation logic and charts
- `mobile_app/README.md` — app-specific notes

## Notes

- The app uses drag proportional to speed to simulate air resistance.
- The repository intentionally ignores PDF source files and the Python helper file used during development.
