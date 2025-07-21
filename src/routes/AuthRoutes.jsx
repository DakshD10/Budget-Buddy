import { Routes, Route } from "react-router-dom"; // Keep Routes and Route
import Signup from "../Authentication/SignUp";
import Login from "../Authentication/Login";
import LandingPage from "../Authentication/Landing";
import ProtectedRoute from "../Authentication/Protectedroute";
import MainRoutes from "./MainRoutes";
import ForgotPass from "../Authentication/ForgetPass";

const AuthRoutes = () => {
  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPass/>} />
      <Route
        path="/*"
        element={<ProtectedRoute><MainRoutes /></ProtectedRoute>}
      />
    </Routes>
  );
};

export default AuthRoutes;