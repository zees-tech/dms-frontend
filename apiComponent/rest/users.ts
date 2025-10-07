import { httpClient } from "@/utils/client";
import { User } from "@/types/auth";

export async function users() {
  try {
    const response = await httpClient.get<User[]>("/api/Users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}