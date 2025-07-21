import styles from "./Landing.module.css";
import {Wallet} from 'lucide-react';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";



const LandingPage =  () => {

   const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/*");
  }, [user , navigate]);

    return (
        <div className={styles.app}>
      <div className={styles.gradientBg}>
        <div className={styles.floatingElements}></div>
        
        <header>
          <div className={styles.container}>
            <nav className={styles.nav}>
              <a href="#" className={styles.logo}> <Wallet/> Budget Buddy</a>
              <ul className={styles.navLinks}>
                <li><Link to="/login" >Login</Link></li>
                <li><Link to= "/signup">SignUp</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.container}>
            <h1>Take Control of Your Financial Future</h1>
            <Link className={styles.ctaButton} to="/login" >
              Get Started 
            </Link>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; Made by Daksh</p>
        </div>
      </footer>
    </div>
    )
}

export  default LandingPage;
