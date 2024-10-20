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
import UserContext from "./contexts/UserContext";
import { useContext } from "react";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const {user} = useContext(UserContext)
  return user ? children : <Navigate to={'/'} />
};

const App = () => {
  return (
    <Router basename="/ghost-chat">
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
        <Route path="/sendMessage" element={<SendMessage />} />
      </Routes>
    </Router>
  );
};

export default App;
