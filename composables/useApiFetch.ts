import { useFetch } from "#app";

type useFetchType = typeof useFetch

export const useApiFetch: useFetchType = (path, options = {}) => {

    options.baseURL = `http://localhost:8000/api`

    return useFetch(path, options)
}