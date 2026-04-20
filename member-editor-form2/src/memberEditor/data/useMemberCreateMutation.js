// POST create member
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/apiClient.js";

export function useMemberCreateMutation() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${API_BASE_URL}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create member");
      }
      return response.json();
    },
  });
}
