import { useState, useEffect, useContext } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      {!course ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="actions--bar">
            <div className="wrap">
              {currentUser &&
                currentUser.emailAddress == course.user.emailAddress && (
                  <>
                    <Link className="button" to="update">
                      Update Course
                    </Link>
                    <Link className="button" to="delete">
                      Delete
                    </Link>
                  </>
                )}
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>

          <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>{`By ${course.user.firstName} ${course.user.lastName}`}</p>
                  {course.description.split("\n\n").map((string, index) => (
                    <p key={index}>{string}</p>
                  ))}
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    {course.materialsNeeded && course.materialsNeeded
                      .split("* ")
                      .slice(1)
                      .map((material) => (
                        <li key={material}>{material}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <Outlet />
        </>
      )}
    </main>
  );
}
