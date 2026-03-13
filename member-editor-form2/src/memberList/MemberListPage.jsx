import React from "react";
import { Button } from "@peakon/bedrock/react/button";
import { useMembersListQuery } from "./data/useMembersListQuery.js";
import { Heading1 } from "@peakon/bedrock/react/typography";

function MemberListPage({ onAddClick, onEditClick }) {
  const { data: members, isLoading, isError, error } = useMembersListQuery();

  if (isLoading) return <div>Loading members...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="member-list-page">
      <Heading1 level={1}>Member List</Heading1>
      <div style={{ marginBottom: "16px" }}>
        <Button onClick={onAddClick}>Add Member</Button>
      </div>

      <ul className="member-list">
        {members.map((member) => (
          <li key={member.id} className="member-list-item">
            <span>{member.name}</span>
            <Button
              type="button"
              size="small"
              onClick={() => onEditClick(member.id)}
            >
              Edit
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberListPage;
