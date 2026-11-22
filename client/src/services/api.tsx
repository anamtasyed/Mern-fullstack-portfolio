
const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiOptions extends Omit<RequestInit, "body"> {
    body?: unknown;
}

async function apiRequest<T>(
    endpoint: string,
    options: ApiOptions = {}
): Promise<T> {
    const token = localStorage.getItem("token");

    const headers = new Headers(options.headers);

    if (options.body !== undefined) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const isFormData =
        typeof FormData !== "undefined" &&
        options.body instanceof FormData;

    const body: BodyInit | undefined =
        options.body === undefined
            ? undefined
            : isFormData
                ? options.body as FormData
                : JSON.stringify(options.body);

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        body
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong with the API."
        );
    }

    return data as T;
}

// API methods
export const api = {
    get: <T,>(endpoint: string) =>
        apiRequest<T>(endpoint, { method: "GET" }),

    post: <T,>(endpoint: string, body: unknown) =>
        apiRequest<T>(endpoint, {
            method: "POST",
            body
        }),

    put: <T,>(endpoint: string, body: unknown) =>
        apiRequest<T>(endpoint, {
            method: "PUT",
            body
        }),

    delete: <T,>(endpoint: string) =>
        apiRequest<T>(endpoint, { method: "DELETE" })
};

export default api;
