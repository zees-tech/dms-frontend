import { httpClient } from "@/utils/client";
import { RegisterResponse } from "@/types/auth";
import { UserRole } from "@/types/auth";

export async function register(username: string, email: string, password: string, role: UserRole): Promise<RegisterResponse> {
  try {
    const response = await httpClient.post<RegisterResponse>("/api/Auth/register", {
        name: username,
        email: email,
        password: password,
        role: 'user'
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}