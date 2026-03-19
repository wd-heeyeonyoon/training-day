import React from "react";
import { Button } from "@peakon/bedrock/react/button";
import { Stack, Box } from "@peakon/bedrock/react/layout";
import { Card } from "@peakon/bedrock/react/card";
import { Heading1, LabelText } from "@peakon/bedrock/react/typography";
import { useNavigate } from "react-router-dom";
import { useMembersListQuery } from "./data/useMembersListQuery.js";
import { useDeleteMemberMutation } from "./data/useDeleteMemberMutation.js";
import { SystemIcon } from "@peakon/bedrock/react/assets/SystemIcon";
import "../App.css";

function MemberListPage() {
  const navigate = useNavigate();
  const { data: members, isLoading, isError, error } = useMembersListQuery();
  const deleteMemberMutation = useDeleteMemberMutation();

  const handleAddClick = () => {
    navigate("/members/add");
  };

  const handleEditClick = (memberId) => {
    navigate(`/members/${memberId}/edit`);
  };
  const handleDeleteClick = (memberId, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );
    if (!confirmed) return;
    deleteMemberMutation.mutate(memberId, {
      onError: (error) => {
        alert(`Failed to delete ${name}: ${error.message}`);
      },
    });
  };

  if (isLoading) return <div>Loading members...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="member-list-page">
      <Box padding={8}>
        <div className="member-list-card-wrapper">
          <Card noDepth>
            <Box paddingBlock={40} paddingInline={40}>
              <Stack direction="column" spacing={16}>
                <div className="member-list-header-wrapper">
                  <Heading1 level={1} textAlign="center">
                    Member List
                  </Heading1>
                </div>

                <div className="member-list-header">
                  <LabelText as="span" className="member-header-name">
                    Name
                  </LabelText>
                  <LabelText as="span" className="member-header-company">
                    Company
                  </LabelText>
                  <span className="member-header-actions" />
                </div>

                <ul className="member-list">
                  {members.map((member) => (
                    <li key={member.id} className="member-list-item">
                      <span className="member-name">{member.name}</span>
                      <span className="member-company">
                        {member.company?.name ?? "—"}
                      </span>
                      <div className="member-actions">
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => handleEditClick(member.id)}
                        >
                          <SystemIcon name="edit-write" />
                        </Button>
                        <Button
                          variant="danger"
                          size="small"
                          disabled={deleteMemberMutation.isPending}
                          onClick={() =>
                            handleDeleteClick(member.id, member.name)
                          }
                        >
                          {deleteMemberMutation.isPending ? (
                            "Deleting…"
                          ) : (
                            <SystemIcon name="edit-delete" />
                          )}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="button-row">
                  <Button variant="primary" onClick={handleAddClick}>
                    Add Member
                  </Button>
                </div>
              </Stack>
            </Box>
          </Card>
        </div>
      </Box>
    </div>
  );
}

export default MemberListPage;
