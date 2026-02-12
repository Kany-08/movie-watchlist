import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    server: {
        watch: {
            usePolling: true,
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                watchlist: resolve(__dirname, 'watchlist.html'), 
            },
        },
    },
})
