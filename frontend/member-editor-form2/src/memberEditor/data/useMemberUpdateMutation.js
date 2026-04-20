// PUT update member
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/apiClient.js";

export function useMemberUpdateMutation() {
  return useMutation({
    mutationFn: async ({ memberId, ...data }) => {
      const response = await fetch(`${API_BASE_URL}/members/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update member");
      }
      return response.json();
    },
  });
}
