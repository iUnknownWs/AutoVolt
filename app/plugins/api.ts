export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const apiKey = config.public.apiKey;
    const api = $fetch.create({
        baseURL: config.public.apiBase,
        onRequest({ options }) {
            options.headers = new Headers(options.headers);
            options.headers.set('Authorization', `Token ${apiKey}`);
        },

        onResponseError({ response }) {
            console.error('API Error:', response.status, response.statusText);
        }
    });

    return {
        provide: {
            api
        }
    }
});