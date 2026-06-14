import { defineConfig } from 'vite'
import { cpSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import webfontDownload from 'vite-plugin-webfont-dl';

// Copies the standalone beta/ site verbatim into dist/beta so it ships with
// the build. It has its own styles.css/images and only relative links, so it
// does not need to go through Vite's pipeline.
function copyBeta() {
    return {
        name: 'copy-beta',
        apply: 'build',
        closeBundle() {
            cpSync(resolve(__dirname, 'beta'), resolve(__dirname, 'dist/beta'), {
                recursive: true,
                filter: (src) => !['.idea', '.claude', 'text.md'].includes(basename(src)),
            })
        },
    }
}

export default defineConfig({
    plugins: [
        tailwindcss(),
        webfontDownload(),
        copyBeta(),
    ],

    base: '/',
})