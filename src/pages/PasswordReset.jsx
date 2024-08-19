import { AuthContext } from "../components/AuthProvider";
import { useContext, useState } from 'react';

export default function PasswordResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { sendResetEmail } = useContext(AuthContext);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await sendResetEmail(email);
      setMessage('YAY!! Password reset email sent! Please check your inbox.');
      setError('');
    } catch (error) {
      setError('NORREE!! Looks like an invalid email. Try entering a different one.');
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Reset Password</h1>
      <form onSubmit={handlePasswordReset} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send Password Reset Email</button>
        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <button type="button" style={styles.buttonReturn} onClick={() => window.location.href = '/'}>Return to Log In</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#ecd2ce',
    padding: '5em',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#533641',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff3f0',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#DBB9B3',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  buttonReturn: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#c6a09a',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  message: {
    color: '#533641',
    marginTop: '10px',
  },
  error: {
    color: '#533641',
    marginTop: '10px',
  },
};