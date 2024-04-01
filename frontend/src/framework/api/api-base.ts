class HttpApiBase {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, method: string, data: unknown = null): Promise<T> {
        const config: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: ['POST', 'PUT', 'PATCH'].includes(method) ? JSON.stringify(data) : null
        };

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json() as Promise<T>;
            } else {
                return {} as T; 
            }
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    private handleError(error: unknown): void {
        console.error('API Service Error:', error);
    }

    protected async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, 'GET');
    }

    protected async post<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, 'POST', data);
    }

    protected async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, 'DELETE');
    }
    protected async update<T>(endpoint: string, data: unknown): Promise<T> {
        return this.request<T>(endpoint, 'PATCH', data);
    }
}

export { HttpApiBase };
