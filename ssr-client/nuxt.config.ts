import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        '@pinia/nuxt',
    ],
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
        ]
    },
    runtimeConfig: {
        jwtSecretWord: '', // .env NUXT_JWT_SECRET_WORD
        dbName: '', // .env NUXT_DB_NAME
        dbUsername: '', // .env NUXT_DB_USERNAME
        dbPassword: '', // .env NUXT_DB_PASSWORD
        dbHost: '', // .env NUXT_DB_HOST
    }
})
