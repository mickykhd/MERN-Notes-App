import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../../mainSlice/mainSlice";
import Wrapper from "../../components/wrapper/Wrapper";
const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorStatus, setErrorStatus] = useState(null);

  const errorMessage =
    errorStatus === 400
      ? "Please fill all the fields"
      : errorStatus === 409
      ? "Email already exists"
      : errorStatus === 201
      ? "Successfull,Proceed With Log In"
      : "";
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const url = "http://localhost:5000/api/register";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const info = await data.json();
      setErrorStatus(data.status);
      console.log(data);
      setInput({ name: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(errorStatus);
  return (
    <Wrapper>
      <div className="login-container">
        <div>
          <label htmlFor="name">Full Name : </label>
          <input
            type="text"
            id="name"
            name="name"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email ID : </label>
          <input
            type="text"
            id="email"
            name="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>
        {errorStatus && <p>{errorMessage}</p>}
        <div className="login-btns">
          <button onClick={handleSignup}>Signup</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Signup;
