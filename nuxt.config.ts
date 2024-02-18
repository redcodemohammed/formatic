// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    // https://nuxt.com/modules/eslint
    // https://pinia.vuejs.org/ssr/nuxt.html
    // https://v8.i18n.nuxtjs.org/
    ["@nuxtjs/eslint-module", { lintOnStart: false }],
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
        storesDirs: ["stores"],
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        langDir: "locales",
        locales: [
          {
            code: "ar",
            iso: "ar-IQ",
            file: "ar.json",
            name: "العربية",
            dir: "rtl",
          },
          {
            code: "en",
            iso: "en-US",
            file: "en.json",
            name: "English",
            dir: "ltr",
          },
        ],
        strategy: "no_prefix",
        defaultLocale: "ar",
        lazy: true,
        detectBrowserLanguage: {
          useCookie: true,
        },
        // todo set the base url before deploying to production
      },
    ],
    [
      "@nuxt/ui",
      {
        global: true,
        icons: ["tabler", "logos", "ph"],
      },
    ],
    "@vueuse/nuxt", // https://google-fonts.nuxtjs.org
    "@formkit/auto-animate",
    "@nuxtjs/device",
    "@nuxtjs/robots",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "IBM+Plex+Sans+Arabic": true,
          Poppins: true,
        },
        download: true,
        outputDir: "assets",
        fontsDir: "fonts",
        stylePath: "css/fonts.css",
      },
    ],
    "@nuxt/test-utils/module",
    "nuxt-typed-router",
    "@samk-dev/nuxt-vcalendar",
    "nuxt-auth-utils",
    "@nuxt/image",
  ],
  imports: {
    dirs: ["stores"],
  },
  runtimeConfig: {
    app: {
      apiUrl: process.env.NUXT_API_URL,
      githubOAuthEnabled: process.env.NUXT_GITHUB_OAUTH_ENABLED,
      googleOAuthEnabled: process.env.NUXT_GOOGLE_OAUTH_ENABLED,
      googleOAuthRedirectUri: process.env.NUXT_OAUTH_GOOGLE_REDIRECT_URI,
    },
    oauth: {
      github: {
        clientId: process.env.NUXT_GITHUB_OAUTH_CLIENT_ID,
        clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
      },
      google: {
        clientId: process.env.NUXT_GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.NUXT_GOOGLE_OAUTH_CLIENT_SECRET,
      },
    },
  },
});
