import { useFetch } from "#app";

type useFetchType = typeof useFetch

export const useApiFetch: useFetchType = (path, options = {}) => {
    const config = useRuntimeConfig()

    options.baseURL = `http://app:80/api`

    return useFetch(path, options)
}