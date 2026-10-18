import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH is set by the GitHub Pages workflow ("/SHPE_WEBSITE/").
// Leave it unset when hosting at a domain root such as shpe.rpi.edu.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
