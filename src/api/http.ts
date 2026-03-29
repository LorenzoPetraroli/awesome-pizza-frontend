const apiBaseUrl =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ??
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ??
  ''

export class ApiError extends Error {
  public readonly status: number

  constructor(
    message: string,
    status: number,
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`

    try {
      const errorPayload = (await response.json()) as { message?: string }
      throw new ApiError(errorPayload.message ?? fallbackMessage, response.status)
    } catch {
      throw new ApiError(fallbackMessage, response.status)
    }
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
