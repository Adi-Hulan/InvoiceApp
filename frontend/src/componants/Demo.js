import React, { useState } from "react";
import axios from "axios";

export const Demo = () => {
  const [name, setName] = useState(" ");
  const [age, setAge] = useState(" ");
  const [gender, setGender] = useState(" ");

  function sendData(e) {
    e.preventDefault();

    const newStudent = {
      name,
      age: Number(age),
      gender,
    };

    axios
      .post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        alert("Student Added!!");
      })
      .catch((err) => {
        alert(err);
      });

    console.log(newStudent);
  }

  return (
    <div className="row">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          aria-label="First name"
          onChange={(e) => {
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
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => sendData(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Demo;
