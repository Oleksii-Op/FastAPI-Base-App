import { UserData } from "@/types/user";
import { UserFormData } from "./types";

export const fetchUserDetails = async (userId: number): Promise<UserData> => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      throw new Error("Unauthorized: Please log in again");
    }
    if (response.status === 404) {
      throw new Error("User not found");
    }
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const updateUser = async (userId: number, data: UserFormData): Promise<UserData> => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      throw new Error("Unauthorized: Please log in again");
    }
    throw new Error(`Failed to update user: ${response.statusText}`);
  }

  const updatedData = await response.json();
  return updatedData;
};

export const deleteUser = async (userId: number): Promise<void> => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      throw new Error("Unauthorized: Please log in again");
    }
    throw new Error(`Failed to delete user: ${response.statusText}`);
  }
};