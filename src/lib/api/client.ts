const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL || "http://localhost:4000/api"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    throw new Error(
      "Не удалось связаться с сервером. Проверьте подключение и попробуйте снова.",
    );
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const message = Array.isArray(error.message)
      ? error.message.join(". ")
      : error.message || `Ошибка ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}
