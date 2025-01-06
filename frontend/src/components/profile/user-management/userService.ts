import { UserData } from "@/types/user";
import { UserFormData } from "./types";

const handleApiError = async (response: Response) => {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Session expired. Please login again.");
    } else if (response.status === 403) {
      throw new Error("You don't have permission to perform this action.");
    } else if (response.status === 404) {
      throw new Error("User not found. Please check the ID and try again.");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || "An error occurred");
    }
  }
};

export const fetchUserDetails = async (userId: number): Promise<UserData> => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    await handleApiError(response);
    throw new Error("Failed to fetch user details");
  }
};

export const updateUser = async (userId: number, formData: UserFormData): Promise<void> => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    await handleApiError(response);
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    await handleApiError(response);
  }
};