import { useState, useEffect, useContext } from "react";
import {
  Link,
  useParams,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ReactMarkdown from "react-markdown";

export default function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { currentUser } = useContext(AuthContext);
  //react-router v5.1-v6 hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //runs the Course function on render
  useEffect(() => {
    getCourse();
  }, []);


  //finds the course, if it doesn't exist, redirects to /notfound
  const getCourse = async () => {
    const res = await fetch(`http://localhost:5000/api/courses/${id}`);
    if (res.status === 200) {
      const json = await res.json();
      setCourse(json);
    } else {
      const json = await res.json();
      console.log(json.message);
      if (json.message === "Course does not exist") {
        navigate("/notfound");
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <main>
      {!course ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="actions--bar">
            <div className="wrap">
            {/* Checks for the proper user before rendering the update/delete options */}
              {currentUser &&
                currentUser.emailAddress == course.user.emailAddress ? (
                  <>
                    <Link className="button" to="update">
                      Update Course
                    </Link>
                    <Link className="button" to="delete">
                      Delete
                    </Link>
                  </>
                ) : null}
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
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          {/* The Modal element for the delete confirmation (used react-routerv6 syntax) */}
          <Outlet />
        </>
      )}
    </main>
  );
}
