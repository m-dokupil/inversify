import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      plugins: [],
    })
  ],
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime.js'
    }
  }
})
