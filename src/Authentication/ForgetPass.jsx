import  { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import styles from "./ForgetPass.module.css"

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.resetContainer}>
      <div className={styles.logoSection}>
        <Wallet className={styles.walletIcon} />
        <h1 className={styles.resetTitle}>Reset Password</h1>
      </div>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.resetInput}
      />

      <button type="submit" className={styles.resetButton}>
        Send Reset Link
      </button>

      <Link to="/login" className={styles.resetBackLink}>
        Back to Login
      </Link>
    </form>
  );
};

export default ForgotPass;
