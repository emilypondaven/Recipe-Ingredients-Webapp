import React from 'react';

export default function EmailVerification() {
    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.title}>Email Verification Required</h1>
                <p style={styles.text}>Please verify your email address before logging in.</p>
                <p style={styles.text}>If you did not receive a verification email, check your spam folder.</p>
                <button onClick={() => window.location.href = '/'} style={styles.button}>Return to Login Page</button>
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
  text: {
    color: '#533641',
    marginBottom: '15px',
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
};