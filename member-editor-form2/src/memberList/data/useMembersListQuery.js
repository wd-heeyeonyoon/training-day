import { useQuery } from "@tanstack/react-query";

const MEMBERS_QUERY_KEY = ["members"];

async function fetchMembers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }
  const result = await response.json();
  return result;
}
export function useMembersListQuery() {
  return useQuery({
    // queryKey is the unique identifier that we use to find the data in the cache
    queryKey: MEMBERS_QUERY_KEY,
    // queryFn is the function that defines how to fetch the data
    queryFn: fetchMembers,
  });
}

export { MEMBERS_QUERY_KEY };
