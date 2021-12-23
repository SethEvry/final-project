import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function UserSignOut() {
  const { signOut } = useContext(AuthContext);

  useEffect(()=>{
    signOut()
  }, [])
  return <Navigate replace to="/" />;
}
