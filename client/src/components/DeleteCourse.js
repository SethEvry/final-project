import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function DeleteCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  //attempts DELETE then redirects if successful
  const handleDelete = async (e) => {
    const auth = Cookies.get("auth");
    const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + auth,
      },
    });
    if(res.status === 204) {
        navigate("/")
    } else {
      navigate("/error")
    }

  };

  //returns to previous page
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  
  //awesome delete confirmation modal
  return (
    <div className="modal-bg">
      <div className="delete-modal">
        <h2> Are you sure you want to delete this course?</h2>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="button yes-delete" onClick={handleDelete}>
          YES
        </button>
      </div>
    </div>
  );
}
