import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MEMBERS_QUERY_KEY } from "./useMembersListQuery";

async function deleteMemberOnServer(memberId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${memberId}`,
    { method: "DELETE" },
  );
  if (!response.ok) {
    throw new Error("Failed to delete member");
  }
  //const result = await response.json();
  //return result;
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
