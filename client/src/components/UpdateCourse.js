import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setTitle(data.title);
        setDescription(data.description);
        setEstimatedTime(data.estimatedTime);
        setMaterialsNeeded(data.materialsNeeded);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const updateCourse = async () => {
    try {
      const auth = Cookies.get("auth");
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "PUT",
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

      if (res.status === 204) {
        navigate(`/courses/${id}`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse();
  };

  return (
    <main>
      {!user ? (
        <p>Loading...</p>
      ) : (
        <div className="wrap">
          <h2>Update Course</h2>
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

                <p>{`By ${user.firstName} ${user.lastName}`}</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
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
                  onChange={(e) => setMaterialsNeeded(e.target.value)}
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
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
