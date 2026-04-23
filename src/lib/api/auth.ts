import { fetchAPI } from "./client";

interface LoginResponse {
  accessToken: string;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return fetchAPI<LoginResponse>("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
