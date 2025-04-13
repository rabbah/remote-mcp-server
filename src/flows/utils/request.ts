export async function getRequest<T>(url: string): Promise<T | null> {
    return request<T>(url, 'POST')
}

export async function postRequest<T>(
    url: string,
    body: object,
): Promise<T | null> {
    return request<T>(url, 'POST', body)
}

export async function putRequest<T>(
    url: string,
    body: object,
): Promise<T | null> {
    return request<T>(url, 'PUT', body)
}

async function request<T>(
    url: string,
    method: 'PUT' | 'POST' | 'GET',
    body?: object,
): Promise<T | null> {
    const headers = {
        Accept: 'application/json',
    }

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        })
        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status} ${response.statusText}`,
            )
        }
        return (await response.json()) as T
    } catch (error) {
        console.error('Error making API request:', error)
        return null
    }
}
