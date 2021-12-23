import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext"

export const ProtectedRoute = ({ children }) => {

    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    //sends user to the sign in page if they aren't logged in while
    // attempting to navigate to a protectedroute
    if(!currentUser){
        return <Navigate to="/signin" state={{ from: location }} />;
    }

    return children
}
