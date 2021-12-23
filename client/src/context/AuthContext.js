import { Buffer } from "buffer";
import Cookies from "js-cookie";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const url = "http://localhost:5000/api/users";
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const cookie = Cookies.get("currentUser");
    setCurrentUser(cookie ? JSON.parse(cookie) : null);
  }, []);

  const signIn = async (email, password) => {
    const auth = Buffer.from(`${email}:${password}`).toString("base64");

    const data = await fetch(url, {
      headers: {
        Authorization: "Basic " + auth,
      },
    });
    if (data.status === 200) {
      const json = await data.json();
      setCurrentUser(json);
      Cookies.set("currentUser", JSON.stringify(json), { expires: 1 });
      Cookies.set("auth", auth, { expires: 1 });
    } else if (data.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  const signUp = async (firstName, lastName, emailAddress, password) => {
    try {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, emailAddress, password }),
      });
      if (data.status === 201) {
        signIn(emailAddress, password);
      } else if (data.status === 400) {
        const json = await data.json();
        return json.errors;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const signOut = async () => {
    setCurrentUser(null);
    Cookies.remove("currentUser");
    Cookies.remove("auth");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, errors, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
