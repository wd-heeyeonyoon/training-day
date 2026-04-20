// Custom React Query hook for fetching the members list from the API
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../api/apiClient.js";

const MEMBERS_QUERY_KEY = ["members"];

// Since MEMBERS_QUERY_KEY needs to be reused in Delete mutation, divide fetchMembers into a separate function
async function fetchMembers() {
  const response = await fetch(`${API_BASE_URL}/members`);
  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }
  return response.json();
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
