import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Build optimizations for SEO and performance
  build: {
    // Generate sourcemaps for debugging
    sourcemap: false,

    // Minify for production (using built-in esbuild)
    minify: 'esbuild',

    // Target modern browsers for better optimization
    target: 'esnext',

    // Optimize chunk size
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
  },

  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
  },

  // Dev server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  },
});

