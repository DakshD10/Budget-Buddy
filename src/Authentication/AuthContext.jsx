/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useReducer } from "react";
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,sendPasswordResetEmail} from "firebase/auth";
import { updateProfile } from "firebase/auth";

const AuthContext = createContext({
});

const initialState = { 
  user : null,
  isLoading : false,
  error : null
}

const AuthReducer = (state, action) => {
  if(action.type === "AUTH_START"){
    return {...state,isLoading : true,error : null} 
  }
  else if (action.type=== "AUTH_SUCCESS"){
    return{...state, isLoading : false, user : action.payload} 
  }
  else if (action.type === "AUTH_FAILURE") {
    return{...state, isLoading : false , error : action.payload }
  }
  else if (action.type === "LOGOUT"){
    return {
      ...state, user : null
    }
  }
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state , dispatch] = useReducer(AuthReducer,initialState);
  const [loginForm,setloginForm] = useState({email : "",password : "",Username : ""})
  const [signUpForm ,setsignUpForm] =useState({email : "",password : "", Username : ""})
  const [authLoading, setAuthLoading] = useState(true);
 useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        dispatch({ type: "AUTH_SUCCESS", payload: user });
        
      } else {
        dispatch({ type: "LOGOUT" });
      }
      setAuthLoading(false);
       
    });
    return () => unsub();
  }, []);

const loginHandler = async (e) => {
  e.preventDefault();  
  dispatch({ type: "AUTH_START" });
  if (!loginForm.email || !loginForm.password || !loginForm.Username) {
    dispatch({ type: "AUTH_FAILURE", payload: "Missing fields" });
    return;
  }
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      loginForm.email,
      loginForm.password
    );
    const updatedUser = {
      ...result.user,
      displayName: result.user.displayName || loginForm.Username,
    };

    if (!result.user.displayName) {
      await updateProfile(result.user, {
        displayName: loginForm.Username,
      });
    }

    dispatch({ type: "AUTH_SUCCESS", payload: updatedUser });
  } catch (error) {
    dispatch({ type: "AUTH_FAILURE", payload: error.message });
  }
};

    const googleSignInHandler = async () => {
      dispatch({type : "AUTH_START"})
      const provider = new GoogleAuthProvider();
      try {
         const result  = await signInWithPopup(auth, provider);
          dispatch({type : "AUTH_SUCCESS" , payload : result.user})
        
      } catch (err) {
        alert("Google sign-in failed: " + err.message);
      }
    };

      const handleSignup = async (e) => {
        e.preventDefault();
        dispatch({type : "AUTH_START"})
    try {
      if (!signUpForm.email || !signUpForm.password || !signUpForm.Username) {
        alert("Email and password are required.");
        return;
      }
       const result = await createUserWithEmailAndPassword(
        auth, 
        signUpForm.email, 
        signUpForm.password,
        signUpForm.Username,
      );
    await updateProfile(result.user, {
    displayName : signUpForm.Username
    })

      dispatch({type : "AUTH_SUCCESS", payload : {...result.user , displayName: signUpForm.Username}})
      
    } catch(error) {
     dispatch({type : "AUTH_FAILURE" , payload : error.message })
    }
      
  }

  const logout = async() => {
    await signOut(auth);
    dispatch({type : "LOGOUT" })

  }


const resetPassword = async (email) => {
  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent. Please check your inbox.");
  } catch (error) {
    alert("Error resetting password: " + error.message);
  }
};


  return (
    <AuthContext.Provider value={{ 
      ...state,
      loginForm,
      signUpForm,
      setloginForm,
      setsignUpForm,
      handleSignup,
      loginHandler,
      googleSignInHandler,
      logout,
      authLoading,
      resetPassword,
     }}>
      {children}
    </AuthContext.Provider>
  );
};

