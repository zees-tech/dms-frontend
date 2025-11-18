import { httpClient } from "@/utils/client";
import { User } from "@/types/auth";

export async function users() {
  try {
    const response = await httpClient.get<User[]>("/api/Users");
    return response.data;
  } catch (error) {
    throw error;
  }
}