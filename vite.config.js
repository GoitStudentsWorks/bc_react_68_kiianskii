import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/bc_react_68_kiianskii/",
  build: {
    sourcemap: true,
  }
});
