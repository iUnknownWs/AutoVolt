import type { UseFetchOptions } from "#app";

export const useApi = <T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) =>
  useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch
  });
