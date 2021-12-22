import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserSignUp() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, firstName, lastName);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value) } />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text"value={lastName} onChange={(e) => setLastName(e.target.value) } />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={(e) => setEmail(e.target.value) } />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value) } />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button
            className="button button-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
         <Link to="../signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
}
