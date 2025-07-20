 import Sidebar from "../Components/Sidebar"
import { Routes,Route,Navigate } from "react-router-dom";
 import styles from "./MainRoutes.module.css"
import Dashboard from "../Pages/Dashboard";
import AddTransaction from "../Pages/AddTransaction";
import TransactionHistory from "../Pages/Transactionhistory";


const MainRoutes = () => {
   return(
   <div className = {styles.appContainer}>
    <Sidebar className={styles.toggle}></Sidebar>
     <Routes>
        <Route path="/*" element={<Navigate to="/dashboard" replace />} /> 
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/addTransaction" element = {<AddTransaction/>}/>
        <Route path ="/transactionHistory" element={<TransactionHistory/>}/>
      </Routes> 
    </div>
   )
}
 export default MainRoutes;