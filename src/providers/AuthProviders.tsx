import { createContext, useState,useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.init";
import { User, UserCredential } from "firebase/auth";

type AuthInfo = {
  user: null | User;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  createUserSignIn: (email: string, password: string) => Promise<UserCredential>;
  updateUser: (currentUser: any, image: string, name: string) => Promise<UserCredential>;
  logOutUser: any;
  loading: any
};

export const AuthContext = createContext<AuthInfo | null>(null);

const auth = getAuth(app);

const AuthProviders = ({children} : any) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  // Create user with email and password
  const createUserSignIn = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email and password
  const loginUser = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //update display
  const updateUser = (currentUser: any, image: string, name: string): Promise<UserCredential> => {
    setLoading(true)
    return updateProfile(currentUser, {
      photoURL: image,
      displayName: name
    })
  }

  // Get current user
 useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  return unSubscribe;
 },[])


 //log out 
 const logOutUser = () => {
  return signOut(auth)
 }

  const authInfo: AuthInfo = {
    user,
    loginUser,
    createUserSignIn,
    updateUser,
    logOutUser,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
