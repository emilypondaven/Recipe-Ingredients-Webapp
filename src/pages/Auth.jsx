import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../components/AuthProvider";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { loginUser, createUser } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Handles submit - need to add some connection to google
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle login
      try {
        await loginUser(email, password);
        navigate("/home");
      } catch (error) {
        setMessage("Incorrect login credentials. Please try again!")
        console.log(error.message);
      }
    } else {
      // Handle signup
      try {
        await createUser(email, password);
        setIsLogin(true);
      } catch (error) {
        setMessage("Unsuccessful sign up. Please try again!")
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
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
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
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
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
    color: 'red',
    marginTop: '10px',
  },
};