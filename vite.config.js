import { defineConfig } from 'vite'
import netlifyPlugin from "@netlify/vite-plugin-react-router";
// https://vite.dev/config/
export default defineConfig({
  plugins: [netlifyPlugin()],
  server: { open: true, port: 3000}
})
