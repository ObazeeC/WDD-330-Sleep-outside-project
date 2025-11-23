import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),

        // Individual Week 3: Product Listing Page
        product_listing: resolve(__dirname, 'src/product_listing/index.html'),

        // Product detail pages
        product_cedar_ridge: resolve(__dirname, 'src/product_pages/cedar-ridge-rimrock-2.html'),
        product_marmot_ajax: resolve(__dirname, 'src/product_pages/marmot-ajax-3.html'),
        product_northface_alpine: resolve(__dirname, 'src/product_pages/northface-alpine-3.html'),
        product_northface_talus: resolve(__dirname, 'src/product_pages/northface-talus-4.html'),
      }
    }
  }
});
