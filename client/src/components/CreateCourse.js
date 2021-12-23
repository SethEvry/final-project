import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Cookies from "js-cookie";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const addCourse = async () => {
    const auth = Cookies.get("auth");
    try {
      const res = await fetch("http://localhost:5000/api/courses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + auth,
        },
        body: JSON.stringify({
          title,
          description,
          estimatedTime,
          materialsNeeded,
        }),
      });
      if (res.status === 400) {
        const json = await res.json();
        setErrors([...json.errors]);
      }

      if (res.status === 201) {
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <main>
      {!currentUser ? (
        <p>Loading...</p>
      ) : (
        <div className="wrap">
          <h2>Create Course</h2>
          {errors.length ? (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={`error-${index}`}>{error}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <p>{`By ${currentUser.firstName} ${currentUser.lastName}`}</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) => setMaterialsNeeded(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Create Course
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
