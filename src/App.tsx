import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import List from "./components/List";

const Content: React.FC = () => {
  const { token } = useAuth();

  return <>{token ? <List /> : <Login />}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Content />
    </AuthProvider>
  );
};

export default App;
