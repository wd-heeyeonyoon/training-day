// Custom React Query mutation hook for deleting a member and refetching the list
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MEMBERS_QUERY_KEY } from "./useMembersListQuery";
import { API_BASE_URL } from "../../api/apiClient.js";

async function deleteMemberOnServer(memberId) {
  const response = await fetch(`${API_BASE_URL}/members/${memberId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete member");
  }
  return true;
}

export function useDeleteMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMemberOnServer,
    onSuccess: () => {
      // refetch the members list after successful deletion
      queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY });
    },
  });
}
