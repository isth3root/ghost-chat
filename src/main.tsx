import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <UserProvider>
      <App />
    </UserProvider>
  );
}
