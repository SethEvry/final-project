import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function DeleteCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    }

  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

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
