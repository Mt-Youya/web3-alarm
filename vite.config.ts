import { defineConfig } from "vite"
import { extname } from "path"
import { fileURLToPath, URL } from "node:url"
import react from "@vitejs/plugin-react-swc"
import AutoImport from "unplugin-auto-import/vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        AutoImport({
            imports: ["react"],
            include: [/\.[tj]sx?$/],
            dts: true,
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        outDir: "dist",
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                chunkFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: "assets/js/[name].[hash].js",
                compact: true,
                manualChunks: {
                    react: ["react", "react-dom", "react-icons"],
                    ethers: ["ethers", "eth-revert-reason"],
                    tailwind: ["autoprefixer", "@tailwindcss/forms", "postcss"],
                },
                assetFileNames: chunkInfo => {
                    const ext = extname(chunkInfo.name)
                    let subDir = "images"

                    if (ext === ".css") {
                        subDir = "css"
                    }

                    return `assets/${subDir}/[name].[hash].[ext]`
                },
            },
        },
    },
})
