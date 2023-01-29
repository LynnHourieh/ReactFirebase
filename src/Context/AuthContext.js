import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const value = { currentUser, signup, login, logout, resetPassword , updateEmail, updatePassword};

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  //firebase will take the last user from loaclStorage.
  //set loading condition to render the children whenever loading is false.
  //to make sure that our user is not null.
  //---------------------------------------------------------------------------------------------------------------------------------------------------//
  //Firebase has the perfect event listener for this called onAuthStateChanged() which takes a callback function and passes the user object to it.
  // This is exactly what we need.
  // Now on any auth state change we will be able to check if the user object exists and if it does, store it in setcurrentUser(user)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
};
export default AuthContext;
