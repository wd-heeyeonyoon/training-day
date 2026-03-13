import "@peakon/bedrock/css/custom-properties/index.css";
import "@peakon/bedrock/css/reset/index.css";
import "@peakon/bedrock/css/index.css";
import "./index.css";
import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MemberEditorAddContainer from "./memberEditor/MemberEditorAddContainer.jsx";
import MemberEditorEditContainer from "./memberEditor/MemberEditorEditContainer.jsx";
import MemberListPage from "./memberList/MemberListPage.jsx";

const queryClient = new QueryClient();

export function App() {
  const [page, setPage] = useState("list"); // 'list' | 'add' | 'edit'
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const goToList = () => setPage("list");
  const goToAdd = () => setPage("add");
  const goToEdit = (memberId) => {
    setSelectedMemberId(memberId);
    setPage("edit");
  };

  if (page === "add") {
    return <MemberEditorAddContainer onSuccess={goToList} />; // navigate back to list after submit
  }

  if (page === "edit" && selectedMemberId !== null) {
    return (
      <MemberEditorEditContainer
        memberId={selectedMemberId}
        onSuccess={goToList}
      />
    ); // navigate back to list after submit
  }

  // default: list page
  return <MemberListPage onAddClick={goToAdd} onEditClick={goToEdit} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
