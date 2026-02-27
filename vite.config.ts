import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { gzipSync, brotliCompressSync } from 'zlib'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'

function compressionPlugin(): Plugin {
  let cfg: ResolvedConfig
  return {
    name: 'vite:compression',
    apply: 'build' as const,
    configResolved(c) { cfg = c },
    closeBundle() {
      const outDir = resolve(cfg.root, cfg.build.outDir ?? 'dist')
      const compress = (dir: string) => {
        try {
          for (const f of readdirSync(dir)) {
            const p = join(dir, f)
            if (statSync(p).isDirectory()) compress(p)
            else if (/\.(js|css|html|svg|json)$/.test(f)) {
              const buf = readFileSync(p)
              writeFileSync(p + '.gz', gzipSync(buf, { level: 9 }))
              writeFileSync(p + '.br', brotliCompressSync(buf))
            }
          }
        } catch {}
      }
      compress(outDir)
    },
  }
}

export default defineConfig({
  plugins: [react(), compressionPlugin()],

  server: {
    port: 5177,
  },

  build: {
    target: 'es2020',
    minify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,

    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) return 'vendor-react'
          if (id.includes('/gsap/')) return 'vendor-gsap'
          // Three.js — heaviest dep in aurora (~727 KB), cache aggressively
          if (id.includes('/three/')) return 'vendor-three'
          // R3F + drei — separate from Three.js core
          if (id.includes('/@react-three/')) return 'vendor-r3f'
          // D3 — data processing only
          if (id.includes('/d3') || id.includes('/internmap') || id.includes('/robust-predicates/')) return 'vendor-d3'
          return 'vendor'
        },
      },
    },
  },
})
