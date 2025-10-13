import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Use automatic JSX runtime
      jsxRuntime: 'automatic'
    })
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  build: {
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('styled-components')) {
              return 'ui-vendor'
            }
            if (id.includes('react-query')) {
              return 'query-vendor'
            }
            // Other vendor dependencies
            return 'vendor'
          }
          // Split InteractiveColoring into its own chunk (it's large)
          if (id.includes('/components/InteractiveColoring')) {
            return 'interactive-coloring'
          }
        },
        // Optimized file names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Minification - use esbuild for faster builds
    minify: 'esbuild',
    // Target modern browsers for smaller bundles
    target: 'es2015',
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps for debugging (disable in production for smaller size)
    sourcemap: false,
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    // Rollup output options
    reportCompressedSize: false, // Faster builds
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components', 'react-query'],
    // Exclude large dependencies from pre-bundling
    exclude: []
  },
  // Preload module
  preview: {
    port: 3000
  }
})
