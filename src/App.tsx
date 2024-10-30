import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMessage from "./pages/SendMessage";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to={"/"} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/sendMessage/:username" element={<SendMessage />} />
      </Routes>
    </Router>
  );
};

export default App;
