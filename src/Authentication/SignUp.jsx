import { useNavigate } from "react-router-dom";
import styles from "./login.module.css"
import { Wallet } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";


 const Signup = () => {
  const {
    signUpForm,
    setsignUpForm,
    handleSignup,
    isLoading,
    error,
     user,
  } = useAuth();

     const navigate = useNavigate();


    useEffect(() => {
       if (user) {
         navigate("/*");
       }
     }, [user, navigate]);
 


  return (
    <form onSubmit={handleSignup}
   className={styles.loginContainer}>
         <div className={styles.logoSection}>
           <Wallet className={styles.walletIcon} />
           <h1 className={styles.logoTitle}>Budget Buddy</h1>
         </div>

   <input
      type= "text"
      placeholder="Username"
     className={styles.formInput}
      value={signUpForm.Username}
       onChange={(e) => setsignUpForm({...signUpForm, Username : e.target.value})} required
 /> 

 <input
 type = "email"
 placeholder="Email"
 className= {styles.formInput}
 value={signUpForm.email}
 onChange={(e) => setsignUpForm({...signUpForm, email : e.target.value})}
/>

<input 
type="password"
placeholder="Password (min 6 chars)"
className= {styles.formInput}
value={signUpForm.password}
onChange={(e) => setsignUpForm({...signUpForm, password : e.target.value})}
/>
<button
type="submit"
className={styles.loginBtn}  
>{isLoading ? "Signing in ....." : "Signin"}</button>

 {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
   
    
  );
}
export default Signup;


