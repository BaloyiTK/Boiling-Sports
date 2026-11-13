# Forme — Static beauty storefront

A responsive React + Vite + Tailwind CSS storefront. Product catalogue content is local static data in `src/data/products.js`; images are static image URLs. The shopping bag and saved items persist in the visitor's browser using local storage.

## Requirements

- Node.js 20.19 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

## Verify a production build

```bash
npm run build
npm run preview
```

## Features

- Responsive desktop and mobile navigation
- Search, category selection, price filtering, sale filtering and sorting
- Product cards with consistent image proportions
- Saved products and persistent shopping bag
- Quantity controls, subtotal and free-delivery progress indicator
- Accessible status feedback, focus styles and reduced-motion support
- Static metadata for search and social sharing

## Important production limitations

This is a **static storefront**, not a complete transactional e-commerce system. There is no server, database, customer account, inventory synchronisation, order management, payment gateway, shipping integration or email delivery. Checkout and newsletter submission are clearly marked as demos and do not collect payment or submit customer data.

Before publishing, replace all sample product names, descriptions, prices, ratings, badges and third-party test images with approved, accurate store content. Confirm product claims, stock, delivery thresholds, returns policy, privacy policy, terms, contact details and image usage rights. Configure a real domain and HTTPS on the chosen static host.

## Deployment

Build with `npm run build` and publish the generated `dist/` directory. Configure the static host to serve `index.html` for the root route. Re-run the build after every content or dependency change.
