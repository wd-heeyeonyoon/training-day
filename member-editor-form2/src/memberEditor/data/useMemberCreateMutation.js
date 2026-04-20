// POST create member
import { useMutation } from "@tanstack/react-query";

export function useMemberCreateMutation() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to create member");
      }
      const result = await response.json();
      return result;
    },
  });
}
