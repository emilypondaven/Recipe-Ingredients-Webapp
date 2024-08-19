import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/Firebase';
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification
} from "firebase/auth"

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const registerUser = async (email, password) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Send email verification
          await sendEmailVerification(user);

        } catch (error) {
          console.error('Error registering user:', error.message);
        }
    };

    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Check if the email is verified
            if (!user.emailVerified) {
                throw new Error('Please verify your email before logging in.');
            }
    
        } catch (error) {
            console.error('Error logging in:', error.message);
            throw error; // Propagate the error to be handled in the UI
        }
    };

    const logOut = () => {
        return signOut(auth);
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authValue = {
        registerUser,
        user,
        loginUser,
        logOut
    };

    return <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>;
};

export { AuthProvider, AuthContext };