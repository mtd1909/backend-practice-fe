// refer: https://github.com/johnsoncodehk/volar/issues/1077#issuecomment-1145361472
declare module '@vue/runtime-dom' {
    interface HTMLAttributes {
        [key: string]: any
    }
}

declare module '@vue/runtime-core' {
    interface AllowedComponentProps {
        [key: string]: any
    }
}


declare module 'nuxt/config' {
    interface NuxtConfig {
        intlify?: IntlifyModuleOptions
        vueuse?: VueUseNuxtOptions,
        sitemap?: any,
        pwa?: any,
    }
}

// refer: https://github.com/johnsoncodehk/volar/issues/1077#issuecomment-1145361472
declare global {
    interface String {
        addQueryString(queryObj: any): string | any;
        cformat(n, x, s, c): string | any;
    }
    interface Number {
        cformat(n, x, s): string | any;
    }

}


export { }
