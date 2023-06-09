import React, { createContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import app from "../Firebase/Firebase.config";
import axios from "axios";
import { data } from "autoprefixer";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignUp = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    setUser(null);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      console.log("logged in user inside auth state observer", loggedUser);
      setUser(loggedUser);
      if (loggedUser) {
        axios
          .post("http://localhost:5000/jwt", { email: loggedUser.email })
          .then((data) => {
            //console.log(data.data.token);
            localStorage.setItem("access-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }

      if (loggedUser) {
        fetch(`http://localhost:5000/checkuser?email=${loggedUser.email}`)
          .then((res) => res.json())
          .then((data) => setRole(data.role));
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log("current user", currentUser);

  //     // get and set token
  //     if (currentUser) {
  //       axios
  //         .post("http://localhost:5000/jwt", {
  //           email: currentUser.email,
  //         })
  //         .then((data) => {
  //           // console.log(data.data.token)
  //           localStorage.setItem("access-token", data.data.token);
  //           setLoading(false);
  //         });
  //     } else {
  //       localStorage.removeItem("access-token");
  //     }
  //   });
  //   return () => {
  //     return unsubscribe();
  //   };
  // }, []);

  const authInfo = {
    user,
    loading,
    signUp,
    signIn,
    googleSignUp,
    logOut,
    updateUserProfile,
    setLoading,
    role,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
