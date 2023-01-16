import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebase } from "../firebase";

interface Auth {
  loggedIn: boolean;
  userId?: string;
  anonymous?: boolean;
}

interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({
  loggedIn: false,
});

export const useAuth = (): Auth => {
  return useContext(AuthContext);
};

export const useAuthInit = (): AuthInit => {
  const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
      setAuthInit({
        loading: false,
        auth: {
          loggedIn: Boolean(user),
          userId: user?.uid,
          anonymous: user?.isAnonymous,
        },
      });
    });
    return unsubscribe;
  }, []);

  return authInit;
};
