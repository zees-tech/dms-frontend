import { httpClient } from "@/utils/client";
import { RegisterResponse } from "@/types/auth";
import { UserRole } from "@/types/auth";

export async function register(username: string, email: string, password: string, role: UserRole, department: string|null): Promise<RegisterResponse> {
  try {
    const response = await httpClient.post<RegisterResponse>("/api/Auth/register", {
        name: username,
        email: email,
        password: password,
        role: role,
        department: department,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}