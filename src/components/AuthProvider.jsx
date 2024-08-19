import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/Firebase';
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth"

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    }

    const sendResetEmail = (email) => {
        return sendPasswordResetEmail(auth, email);
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
        createUser,
        user,
        loginUser,
        logOut,
        sendResetEmail
    };

    return <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>;
};

export { AuthProvider, AuthContext };