import { createContext, useState } from "react";

export const AuthContext = createContext();

const url = "localhost:5000/api/users";
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signIn = async (email, password) => {
    const data = await fetch(url, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${credentials.username}:${credentials.password}`
          ).toString("base64"),
      },
    });
    if (data.status === 200) {
      data.json().then((json) => setCurrentUser(json));
    } else if (data.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  const signUp = async (firstName, lastName, email, password) => {
    try {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
    } catch (err) {
      console.log(err);
    }
    data.json().then((json) => setCurrentUser(json));
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={(currentUser, signIn, signUp, signOut)}>
      {children}
    </AuthContext.Provider>
  );
};
