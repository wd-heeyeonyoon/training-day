// This file MemberEditorAddContainer.jsx should own the submit logic
// This file should be responsible for the flow of the "add new member"
import React from "react";
import MemberEditorForm from "./components/MemberEditorForm.jsx";
import { useMemberCreateMutation } from "./data/useMemberCreateMutation.js";
import { useQueryClient } from "@tanstack/react-query";

function MemberEditorAddContainer({ onSuccess }) {
  const queryClient = useQueryClient();
  const createMemberMutation = useMemberCreateMutation();

  const handleSubmit = async (formData) => {
    // formData is the data from the MemberEditorForm
    try {
      const result = await createMemberMutation.mutateAsync(formData);

      // refresh member list so list page shows the latest data
      await queryClient.invalidateQueries({ queryKey: ["members"] });

      alert(
        `Profile created successfully!\n` +
          `Request: POST https://jsonplaceholder.typicode.com/users\n` +
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
      mode="create"
      defaultValues={{ name: "", job: "" }}
      onSubmit={handleSubmit}
    />
  );
}

export default MemberEditorAddContainer;
