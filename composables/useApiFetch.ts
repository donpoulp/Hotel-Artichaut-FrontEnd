import { useFetch } from "#app";

type useFetchType = typeof useFetch

export const useApiFetch: useFetchType = (path, options = {}) => {
    const config = useRuntimeConfig()

    options.baseURL = `http://app:80/api`

    const method = (options.method || 'GET').toUpperCase();

    const needsAuthHeaders = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    if (needsAuthHeaders) {
        options.credentials = 'include';

        const xsrfToken = useCookie('XSRF-TOKEN')?.value
        const userId = useCookie('user_id')?.value

        if (xsrfToken) {
            options.headers = options.headers || {}
            options.headers['X-XSRF-TOKEN'] = xsrfToken
        }

        if (userId) {
            options.headers['X-USER-ID'] = userId
        }
    }

    return useFetch(path, options)
}