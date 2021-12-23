import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Header() {
  const { currentUser } = useContext(AuthContext);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {!currentUser ? (
            <ul className="header--signedout">
              <li>
                <Link to="signup">Sign Up</Link>
              </li>
              <li>
                <Link to="signin">Sign In</Link>
              </li>
            </ul>
          ) : (
            <ul className="header--signedin">
              <li>{`Welcome, ${currentUser.firstName} ${currentUser.lastName}`}</li>
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
