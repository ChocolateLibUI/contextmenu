import { resolve, } from 'path'
import { defineConfig } from 'vite';
import { name, dependencies } from "./package.json"
import solidPlugin from 'vite-plugin-solid';
import dts from "vite-plugin-dts"

export default defineConfig(({ command, mode, ssrBuild }) => {
    console.log(command, mode);

    switch (command) {
        case 'serve':
            if (mode === 'pages') {
                return {
                    plugins: [solidPlugin({}),],
                    server: {
                        host: true,
                        port: 666,
                    },
                    build: {
                        outDir: "../docs",
                        emptyOutDir: true,
                    },
                    preview: {
                        port: 666
                    },
                    root: "./pages"
                }
            } else {
                return {
                    plugins: [solidPlugin({}),],
                    server: {
                        host: true,
                        port: 999
                    },
                    build: {
                        outDir: "./dist"
                    },
                    preview: {
                        port: 999
                    },
                    root: "./cypress/pages",
                }
            }
        case 'build':
            if (mode === 'pages') {
                return {
                    plugins: [solidPlugin({}),],
                    root: "./pages",
                    build: {
                        outDir: "../docs",
                        emptyOutDir: true,
                    },
                    base: '',
                }
            } else if (mode === 'tests' || mode === 'production') {
                return {
                    plugins: [solidPlugin({}),],
                    root: "./cypress/pages",
                    build: {
                        outDir: "./dist",
                        target: "esnext"
                    },
                    base: ''
                }
            } else {
                return {
                    plugins: [
                        dts({ rollupTypes: true, }),
                        solidPlugin({}),
                    ],
                    server: {
                        port: 3000,
                    },
                    build: {
                        target: 'esnext',
                        lib: {
                            entry: resolve(__dirname, 'src/index.tsx'),
                            name: name,
                            fileName: 'index',
                            formats: ['es', 'cjs'],
                        },
                        rollupOptions: {
                            external: Object.keys(dependencies)
                        }
                    }
                }
            }
    }
});
