// GET single member
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/apiClient.js";

export function useMemberQuery(memberId) {
  return useQuery({
    queryKey: ["member", memberId],
    queryFn: async () => {
      // fetch a single member by memberId
      const response = await fetch(`${API_BASE_URL}/members/${memberId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch member");
      }
      return response.json();
    },
  });
}
