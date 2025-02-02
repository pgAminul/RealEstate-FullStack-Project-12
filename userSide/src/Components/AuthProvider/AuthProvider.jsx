import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase";
import useAxiosInstance from "../Axios/useaxiosInstance";
export const ContextProvider = createContext();
export default function Provider({ children }) {
  //   const axiosInstance = useAxiosInstance();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [forget, setForget] = useState();
  const axiosInstance = useAxiosInstance();
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  const profileUpdate = (updated) => {
    return updateProfile(auth.currentUser, updated);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser?.email };
        axiosInstance
          .post("/jwt", userInfo)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
          })
          .catch((error) => {
            console.error("Error generating JWT token:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);
  const updateNewProfile = (updated) => {
    return updateProfile(auth.currentUser, updated)
      .then(() => {
        setUser({ ...auth.currentUser, ...updated });
        setLoading(true);
      })
      .catch((error) => {});
  };
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const forgetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const informationPass = {
    signUp,
    setUser,
    user,
    loading,
    logOut,
    logIn,
    profileUpdate,
    updateNewProfile,
    forgetPass,
    forget,
    setForget,
    googleLogin,
    setRole,
    role,
  };
  return (
    <div>
      <ContextProvider.Provider value={informationPass}>
        {children}
      </ContextProvider.Provider>
    </div>
  );
}
