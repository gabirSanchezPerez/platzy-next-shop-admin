import React, { useState, useContext, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import endPoints from "@/src/services/api";

type PropsChildren = {
  children: React.ReactNode;
};
interface AppContextInterface {
  user: null;
  fail: string;
  signIn: (email, password) => Promise<void>;
  setFail: React.Dispatch<React.SetStateAction<string>>;
}
/*id: number;
  name: string;
  email: string;
  role: string;
  token: string;*/
const AuthContext = createContext<AppContextInterface | null>(null);

export function ProviderAuth({ children }: PropsChildren) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [fail, setFail] = useState("");

  const signIn = async (email: string, password: string) => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const {
      data: { access_token },
    } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token) {
      Cookies.set("token", access_token, {
        expires: 5,
      });
      axios.defaults.headers.Authorization = `Bearer ${access_token}`;
      const { data } = await axios.get(endPoints.auth.profile);
      setUser(data);
    }
  };

  return {
    user,
    fail,
    signIn,
    setFail,
  };
};
