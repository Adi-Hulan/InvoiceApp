import axios from "axios";
import React, { useEffect, useState } from "react";

export const Show = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    function getStudent(id) {
      axios
        .get("http://localhost:8070/student/" + id)
        .then((res) => {
          setStudent(res.data);
          console.log(student);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getStudent("676857b3952d6e069fd6654d");
  });

  useEffect(() => {
    console.log(student);
  }, [student]);

  const [name, setName] = useState(" ");
  const [age, setAge] = useState(" ");
  const [gender, setGender] = useState(" ");

  function updateData(e) {
    e.preventDefault();

    const updatedStudent = {
      name,
      age,
      gender,
    };

    axios
      .put(
        "http://localhost:8070/student/update/" + student._id,
        updatedStudent
      )
      .then(() => {
        alert("Updated");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="row">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          aria-label="First name"
          value={student.name} // This links the input value to the state
          onChange={(e) => {
            // Correctly update the state with setStudent
            setStudent((prevState) => ({
              ...prevState, // Keep the other properties intact
              name: e.target.value, // Update only the name
            }));
            setName(e.target.value);
          }}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          aria-label="Last name"
          value={student.age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          aria-label="Last name"
          value={student.gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => updateData(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
