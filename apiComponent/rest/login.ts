import { httpClient } from "@/utils/client";
import { LoginResponse } from "@/types/auth";

export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await httpClient.post<LoginResponse>("/api/Auth/login", {
      email: username,
      password: password
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
