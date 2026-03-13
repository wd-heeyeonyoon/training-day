// This file should be responsible for the flow of the "edit existing member"
import React from "react";
import MemberEditorForm from "./components/MemberEditorForm.jsx";
import { useMemberQuery } from "./data/useMemberQuery.js";
import { useMemberUpdateMutation } from "./data/useMemberUpdateMutation.js";
import { useQueryClient } from "@tanstack/react-query";

function MemberEditorEditContainer({ memberId, onSuccess }) {
  const queryClient = useQueryClient();

  const { data: member, isLoading, isError, error } = useMemberQuery(memberId); // fetch the member data/error handling -  'data:member' means destructuring the 'data' property from the object and renaming it to 'member'.
  const updateMemberMutation = useMemberUpdateMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading member: {error.message}</div>;
  }

  const defaultValues = {
    name: member.name ?? "",
    job: member.job ?? "", // if there is no job in real API, then use "" as default value temporarily
  };

  const handleSubmit = async (formData) => {
    try {
      const result = await updateMemberMutation.mutateAsync({
        // 'mutateAsync' is a method that allows us to mutate(update) the data in the database
        memberId,
        ...formData,
      });

      // refresh member list so list page shows the latest data
      // 'invalidateQueries': a method that allows us to invalidate(refresh) the data in the cache - so invalidateQueries(["members"]) tells React Query to refetch the list.
      // 'queryKey': unique identifier that we use to find the data in the cache
      await queryClient.invalidateQueries({ queryKey: ["members"] });

      alert(
        `Profile updated successfully!\n` +
          `Request: PUT https://jsonplaceholder.typicode.com/users/${memberId}\n` +
          `Response: ${JSON.stringify(result)}\n`,
      );

      if (onSuccess) {
        onSuccess(); // navigate back to list page
      }
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <MemberEditorForm
      mode="update"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}

export default MemberEditorEditContainer;
