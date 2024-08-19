import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../components/AuthProvider";
import { sendEmailVerification } from 'firebase/auth';

export default function LogInOrSignUp() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { loginUser, registerUser } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const resetPasswordForm = () => {
    navigate("/password-reset");
  };

  // Handles submit - need to add some connection to google
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle login
      try {
        if (!email && !password) {
          await loginUser("mikema5013@chaladas.com", "visitorpass1297")
        } else {
          await loginUser(email, password);
        }
        navigate("/home");
      } catch (error) {
        setMessage("Incorrect login credentials. Have you verified you're email?")
        console.log(error.message);
      }
    } else {
      // Handle signup
      try {
        registerUser(email, password);
        setMessage("Verify email before logging in!");
        navigate("/email-verification")
      } catch (error) {
        setMessage("Unsuccessful sign up. Try again :)")
        console.log(error.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLogin ? email || password ? 'Login' : 'Log in Anonymously' : 'Sign Up'}
          </button>
          {isLogin ? <button onClick={resetPasswordForm} style={styles.buttonPass}>
            Forgot Password?
          </button> : ""}
          {message && <p style={styles.message}>{message}</p>}
        </form>
        <button onClick={toggleForm} style={styles.toggleButton}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#ecd2ce',
    padding: '5em',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '3vh',
    backgroundColor: '#fff3f0',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '1em',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#533641',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonPass: {
    padding: '3px',
    marginTop: '10px',
    backgroundColor: '#c6a09a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  button: {
    padding: '10px',
    backgroundColor: '#DBB9B3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  toggleButton: {
    marginTop: '10px',
    backgroundColor: 'transparent',
    color: '#DBB9B3',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  message: {
    color: '#533641',
    marginTop: '10px',
  },
};