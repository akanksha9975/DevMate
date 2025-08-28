import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"


export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1600,
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name].[ext]',
                chunkFileNames: 'assets/[name].[hash].js',
                entryFileNames: 'assets/[name].[hash].js',
            },
        },
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
    preview: {
        port: 5173
    },
    server:{
        open: true,
    }
})
