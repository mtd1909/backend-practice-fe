export default defineNuxtConfig({
  css: [
    "~/styles/base.scss",
    "~/styles/account.scss",
  ],
  devtools: {
    enabled: false
  },
  // app config
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width,initial-scale=1",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  webpack: {
    optimizeCSS: true,
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },

  typescript: {
    shim: false,
    strict: true,
    //typeCheck: true,
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@unocss/nuxt",
    "@nuxt/ui",
  ],

  vite: {
    build: {
      cssMinify: true,
      minify: true,
      rollupOptions: {

        output: {
          manualChunks: (
            id: string
          ) => {
            if (id.indexOf("node_modules/vue-router/") !== -1) {
              return "vue-router";
            }
            if (id.indexOf("node_modules/@vueuse/") !== -1) {
              return "vueuse/";
            }

            if (id.indexOf("node_modules/vue-final-modal/") !== -1) {
              return "vue-final-modal";
            }

            if (id.indexOf("/repositories/") !== -1) {
              return "repositories";
            }
            if (id.indexOf("utils/") !== -1) {
              return "utils";
            }
          },
        }
      }
    },
    plugins: [

    ],

    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },

  components: [
    {
      path: "~/components",
      global: true,
    },
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
      AUTH_COOKIE: process.env.AUTH_COOKIE,
    }
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: "2024-09-17",
})