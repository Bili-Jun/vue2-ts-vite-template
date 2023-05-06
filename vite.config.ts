import path from "node:path";
import { defineConfig, UserConfigExport } from "vite";
import { createVuePlugin } from 'vite-plugin-vue2'
import legacy from '@vitejs/plugin-legacy';
import viteCompression from 'vite-plugin-compression';
import { viteExternalsPlugin } from 'vite-plugin-externals'
import { InputPluginOption } from 'rollup'
import externalGlobals from 'rollup-plugin-external-globals';
import autoprefixer from 'autoprefixer'

const externals = {
  vue: 'Vue',
  pinia: 'Pinia',
  'vue-demi': 'VueDemi',
  '@vue/composition-api': 'VueCompositionAPI'
}

let globals: InputPluginOption = externalGlobals(externals);

const rollupOptionsExternal = Object.keys(externals)

export const config: UserConfigExport = {
  plugins: [
    createVuePlugin(),
    viteExternalsPlugin(externals),
    viteCompression(),
    legacy({
      targets: [
        "> 0.5%",
        "last 2 versions",
        "Firefox ESR",
        "not dead",
        "IE 11",
        "not IE 10"
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  define: {
    // This is necessary in Vue 2 codebases. It is automatic in Vue 3
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  build: {
    sourcemap: true,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
        }
      },
      plugins: [globals],
      external: rollupOptionsExternal
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'ie >= 10',
            'IOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'Android 4.1'
          ]
        }) // add options if needed
      ],
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(config)
