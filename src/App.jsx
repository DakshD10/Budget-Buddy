
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import AuthRoutes from "./routes/AuthRoutes";
// import { useAuth } from "./Authentication/AuthContext";
// import MainRoutes from "./routes/MainRoutes";
// import Spinner from "./Components/Spinner";

   
//  const AppContent = () => {
//      const {user , authLoading} = useAuth();
//      if (authLoading) return <Spinner/>
//      return user ? <MainRoutes/> : <AuthRoutes/>
//   }

// function App() {
//  return (
//   <AppContent/>
//  )

   

// }

// export default App;






import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router here
import { AuthProvider, useAuth } from "./Authentication/AuthContext"; // Import AuthProvider
import AuthRoutes from "./routes/AuthRoutes";
import MainRoutes from "./routes/MainRoutes";
import Spinner from "./Components/Spinner";


const AppContent = () => {
  const { user, authLoading } = useAuth();
  if (authLoading) { return <Spinner />;}
return user ? <MainRoutes /> : <AuthRoutes />;
};

// Main App component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
