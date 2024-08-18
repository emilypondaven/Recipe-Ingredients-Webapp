import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { loginUser, loading, user } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle login
      try {
        setEmail("")
        setPassword("")
        loginUser(email, password);
        navigate("/home")
      } catch (error) {
        setMessage("Incorrect login credentials. Please try again!")
        console.log(error.message);
      }
    } else {
      // Handle signup
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setIsLogin(true)
      } catch (error) {
        setMessage("Unsuccesful sign up. Please try again!")
        console.log(error.message)
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
        {message && <p>{message}</p>}
      </form>
      <button onClick={toggleForm}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Auth;