#!/bin/bash
echo "Building..."
echo "   - JavaScript"
npx webpack --config config/webpack.config.js
echo "   - CSS"
npx tailwindcss -i src/main.css -o dist/main.css --config config/tailwind.config.js --minify
echo "   - HTML"
npx minify src/index.html > dist/index.html