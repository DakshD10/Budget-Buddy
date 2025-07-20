import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "../Components/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth(); 

  if (authLoading) {
    return <Spinner/>;
  }

  if (!user) {
  
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;