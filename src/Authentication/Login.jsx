import { Wallet } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import styles from "./login.module.css";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const {
    loginForm,
    loginHandler,
    googleSignInHandler,
    setloginForm,
    isLoading,
    error,
    user,
    authLoading,
  } = useAuth();

  const navigate = useNavigate();

 
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/*");
    }
  }, [user, navigate , authLoading]);

  return (
    <form onSubmit={loginHandler}
    
    className={styles.loginContainer}>
      <div className={styles.logoSection}>
        <Wallet className={styles.walletIcon} />
        <h1 className={styles.logoTitle}>Budget Buddy</h1>
      </div>

      <input
        type="text"
        placeholder="Username"
        value={loginForm.Username}
        onChange={(e) =>
          setloginForm({ ...loginForm, Username: e.target.value })
        }
        className={styles.formInput}
      />

      <input
        type="email"
        value={loginForm.email}
        onChange={(e) => setloginForm({ ...loginForm, email: e.target.value })}
        placeholder="Email"
        className={styles.formInput}
      />

      <input
        value={loginForm.password}
        onChange={(e) =>
          setloginForm({ ...loginForm, password: e.target.value })
        }
        placeholder="Password"
        type="password"
        className={styles.formInput}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={styles.loginBtn}
      >
        {isLoading ? "Logging in ....." : "Login with Email"}
      </button>

      <button
        className={styles.googleBtn}
        onClick={googleSignInHandler}>
        <FaGoogle />
      </button>
<Link to="/forgot-password" className={styles.signupLink}>Forgot Password?</Link>

      <Link to={"/signup"} className={styles.signupLink}>Sign-up</Link>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
