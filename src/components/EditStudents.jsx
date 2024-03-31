import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const EditStudents = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    group: "",
  });
  const closeBtn = () => {
    navigation("/");
  };
  const hendelChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:3000/students/${id}`)
        .then((res) => {
          const student = res.data;
          setStudent({
            firstName: student.firstName,
            lastName: student.lastName,
            group: student.group,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const editSave = () => {
    axios
      .put(`http://localhost:3000/students/${id}`, student)
      .then((res) => {
        closeBtn();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container py-3">
      <div className=" d-flex">
        <Link to={"/"}>
          <button className="btn btn-light mb-5"> ←back </button>
        </Link>
        <h1 className="text-white w-100 text-center">Edit Student </h1>
      </div>
      <div className="card mx-auto w-50 rounded-4">
        <div className="cardbody d-flex flex-column px-5 py-4 d-flex gap-4">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstName"
            onChange={hendelChange}
            value={student.firstName}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lastName"
            onChange={hendelChange}
            value={student.lastName}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Group"
            name="group"
            onChange={hendelChange}
            value={student.group}
          />
          <div className="card-footer d-flex justify-content-between py-3">
            <button onClick={closeBtn} className="btn btn-primary px-3">
              Cancel
            </button>
            <button onClick={editSave} className="btn btn-success px-3">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudents;
