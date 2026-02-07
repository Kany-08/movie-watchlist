import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        watch: {
            // Это критично для Windows/WSL2
            usePolling: true,
        },
    },
})