// This file MemberEditorAddContainer.jsx should own the submit logic
// This file should be responsible for the flow of the "add new member"
import React from "react";
import MemberEditorForm from "./components/MemberEditorForm.jsx";
import { useMemberCreateMutation } from "./data/useMemberCreateMutation.js";
import { useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../api/apiClient.js";

function MemberEditorAddContainer({ onSuccess }) {
  const queryClient = useQueryClient();
  const createMemberMutation = useMemberCreateMutation();

  const handleSubmit = async (formData) => {
    try {
      const result = await createMemberMutation.mutateAsync({
        name: formData.name,
        company: { name: formData.company.name },
      });

      // refresh member list so list page shows the latest data
      await queryClient.invalidateQueries({ queryKey: ["members"] });

      alert(
        `Profile created successfully!\n` +
          `Request: POST ${API_BASE_URL}/members\n` +
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
      defaultValues={{
        name: "",
        company: { name: "" },
      }}
      onSubmit={handleSubmit}
    />
  );
}

export default MemberEditorAddContainer;
