// GET single member
import { useQuery } from "@tanstack/react-query";

export function useMemberQuery(memberId) {
  return useQuery({
    queryKey: ["member", memberId],
    queryFn: async () => {
      // fetch a single member by memberId
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${memberId}`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch member");
      }
      const result = await response.json();
      return result;
    },
  });
}
