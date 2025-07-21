
import { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Menu , Wallet} from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom"
 import { signOut } from "firebase/auth";
 import { auth } from "../firebase";
  import styles from "./Sidebar.module.css"

const  Sidebar = () => {

  const navigate= useNavigate()
   const logoutHandler = async () => {
       try {
         await signOut(auth);
        navigate("/login");
       } catch (error) {
         console.error("Error signing out:", error);
      }
     };
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }}
     role="presentation"
       onClick={toggleDrawer(false)}
      className={styles.SidebarContainer}
      >
       <div className={styles.SidebarContainer}>
    <div className={styles.logocontainer}>
       <Wallet className= {styles.appLogo}></Wallet>
       <h2 className= {styles.title}>Budget Buddy</h2>
     </div>
     <ul className= {styles.appmenu}>
      <li><NavLink to="/dashboard" >Dashboard</NavLink></li>
       <li><NavLink to="/addTransaction">Add transaction</NavLink></li>  
       <li><NavLink to="/transactionHistory">Transaction history </NavLink></li>    
       <button  className={styles.signOut} onClick={logoutHandler}>Sign-out</button>
     </ul>
   </div>
      
    </Box>
  );

  return (
    <div className={styles.sidebar}>
      <Button onClick={toggleDrawer(true)}><Menu/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default Sidebar;