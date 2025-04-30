import 'reflect-metadata';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Import Ant Design styles (this is automatically handled in Ant Design v5)

// Ensure reflect-metadata is imported before the app starts
// This is required for InversifyJS decorators to work properly

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
