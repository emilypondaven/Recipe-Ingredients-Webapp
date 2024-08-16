import React, { useState } from 'react';
import { auth } from '../config/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(''); // Clear error on form switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      } catch (error) {
        alert("Login unsucessful!");
      }
    } else {
      // Handle signup
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
      } catch (error) {
        alert("Signup unsuccessful!");
      }
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        {error && <p>{error}</p>}
      </form>
      <button onClick={toggleForm}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Auth;