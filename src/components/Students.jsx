import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialState = {
  loading: false,
  students: [],
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS_PENDING":
      return {
        loading: true,
        students: [],
        error: "",
      };
    case "FETCH_STUDENTS_SUCCESS":
      return {
        loading: false,
        students: action.payload,
        error: "",
      };
    case "FETCH_STUDENTS_ERROR":
      return {
        loading: false,
        students: [],
        error: "Something went wrong",
      };
    default:
      return state;
  }
};

const Students = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStudents = async () => {
    dispatch({ type: "FETCH_STUDENTS_PENDING" });
    try {
      const res = await axios.get("http://localhost:3000/students");
      const data = await res.data;
      dispatch({ type: "FETCH_STUDENTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_STUDENTS_ERROR" });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const navegation = useNavigate();
  const deleteStudent = (id) => {
    if (window.confirm("удалить ?")) {
      axios.delete(`http://localhost:3000/students/${id}`);
      data(true);
    }

  };

  const editStudent = (id) => {
    navegation(`/edit/student/${id}`);
  };

  return (
    <div>
      <div className="container d-flex w-75 py-4 px-5  justify-content-between mx-auto">
        <h1 className="text-light">Students</h1>
        <input
          type="text"
          className="form-control w-25"
          placeholder="search..."
        />
        <Link className="btn btn-success" to={"/add/student"}>
          <button className="btn btn-success py-2">+ add student</button>
        </Link>
      </div>
      <div className=" mx-5">
        {state.loading && <h2 className="text-center w-100">Loading...</h2>}
        {state.error && <h2 className="w-full text-center text-white">{state.error}</h2>}
        {state.students && (
          <table className="mx-auto w-75 bg-dark mb-5">
            <thead className="border-bottom pt-5 text-light">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">First name</th>
              <th className="px-4 py-3">Last name</th>
              <th className="px-4 py-3">Group</th>
              <th className="px-4 py-3">Actions</th>
            </thead>
            {state.students.map((student) => (
              <tbody
                key={student.id}
                className="border-bottom text-light py-3 mx-auto"
              >
                <td className="font-bold py-3 px-4">{student.id}</td>
                <td className="font-bold py-3 px-4">{student.firstName}</td>
                <td className="font-bold py-3 px-4">{student.lastName}</td>
                <td className="font-bold py-3 px-4">{student.group}</td>
                <td className="d-flex gap-2 pt-2">
                  <button
                    onClick={() => editStudent(id)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tbody>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default Students;
