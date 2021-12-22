import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//context
import { AuthContext } from "../context/authContext";

export default function UserSignIn() {

  const { signIn } =  useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="../signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
}
