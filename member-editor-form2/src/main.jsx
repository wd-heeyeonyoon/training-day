import "@peakon/bedrock/css/custom-properties/index.css";
import "@peakon/bedrock/css/reset/index.css";
import "@peakon/bedrock/css/index.css";
import "./index.css";
import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MemberEditorAddContainer from "./memberEditor/MemberEditorAddContainer.jsx";
import MemberEditorEditContainer from "./memberEditor/MemberEditorEditContainer.jsx";
import MemberListPage from "./memberList/MemberListPage.jsx";

const queryClient = new QueryClient();

function MemberEditorAddContainerRoute() {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("/members");
  };
  return <MemberEditorAddContainer onSuccess={handleSuccess} />;
}

function MemberEditorEditContainerRoute() {
  const navigate = useNavigate();
  const { memberId } = useParams(); // read :memberId from the URL
  const handleSuccess = () => {
    navigate("/members");
  };
  return (
    <MemberEditorEditContainer memberId={memberId} onSuccess={handleSuccess} />
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to /members by default route */}
        <Route path="/" element={<Navigate to="/members" replace />} />

        {/* Member list page */}
        <Route path="/members" element={<MemberListPage />} />

        {/* Member Add page */}
        <Route
          path="/members/add"
          element={<MemberEditorAddContainerRoute />}
        />

        {/* Member Edit page */}
        <Route
          path="/members/:memberId/edit"
          element={<MemberEditorEditContainerRoute />}
        />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
