import React, { useEffect, useState } from "react";
import { handleChange } from "../../mainSlice/mainSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/wrapper/Wrapper";
import "./styles.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loggedStatus, setLoggedStatus] = useState(null);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.notesMain);

  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!input.email || !input.password) {
      setError(true);
      return;
    }
    try {
      const url = "http://localhost:5000/api/login";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const info = await data.json();
      dispatch(handleChange({ name: "token", value: info }));

      localStorage.setItem("tokenDetails", JSON.stringify(info));

      if (data.status === 400) {
        setLoggedStatus(true);
      } else if (data.status === 200) {
        navigate("/notes");
      }
    } catch (error) {}
  };

  const reset = () => {
    setLoggedStatus(null);
    setError(null);
  };
  useEffect(() => {
    const clear = setTimeout(() => {
      reset();
    }, 3000);

    return () => {
      clearTimeout(clear);
    };
  }, [loggedStatus, error]);
  return (
    <Wrapper>
      <div className="login-container">
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
        {loggedStatus && <p style={{ color: "red" }}>Invalid Credentials</p>}
        {error && <p style={{ color: "red" }}>Please Provide Details</p>}

        <div className="login-btns">
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
