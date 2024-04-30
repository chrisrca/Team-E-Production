import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import eslint from "vite-plugin-eslint";
import * as process from "process";
console.log(process.env.FRONTEND_PORT);
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        preserveSymlinks: true,
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: "0.0.0.0",
        port: parseInt(process.env.FRONTEND_PORT),
        proxy: {
            "/api": process.env.BACKEND_SOURCE + ":" + process.env.BACKEND_PORT,
        },
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: "build",
    },
    plugins: [react(), eslint()],
    optimizeDeps: {
        exclude: ["@radix-ui/react-accordian"],
    },
});
