import { useFetch } from "#app";

type useFetchType = typeof useFetch

export const useWebFetch: useFetchType = (path, options = {}) => {
    const config = useRuntimeConfig()

    options.baseURL = `http://163.172.156.97:8000`

    return useFetch(path, options)
}