export default defineNuxtConfig({
    css: [
        "~/styles/base.scss",
        "~/styles/account.scss",
    ],

    // app config
    app: {
        head: {
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                }
            ],
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com'
                },
                {
                    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
                    rel: "preload",
                    as: "style",
                    onload: "this.onload=null;this.rel='stylesheet'"
                },
                {
                    href: "",
                    rel: "",
                    type: ""
                },
            ],
            script: [
                {
                    src: "",
                    type: "text/javascript"
                },
            ],
        },
        // pageTransition: { name: 'page', mode: 'out-in' },
        // layoutTransition: { name: 'layout', mode: 'out-in' },
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
        '@unocss/nuxt',
        '@pinia/nuxt',
        'nuxt-icon',
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
            baseUrl: process.env.BASE_URL,
            apiBase: process.env.API_BASE_URL
        }
    },

    site: {
        indexable: true,
        url: '',
        name: '',
        description: '',
        defaultLocale: '',
    },

    experimental: {
        viewTransition: true
    },

    compatibilityDate: "2024-09-17",
})