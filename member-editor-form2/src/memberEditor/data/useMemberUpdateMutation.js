// PUT update member
import { useMutation } from "@tanstack/react-query";

export function useMemberUpdateMutation() {
  return useMutation({
    mutationFn: async ({ memberId, ...data }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${memberId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to update member");
      }
      const result = await response.json();
      return result;
    },
  });
}
