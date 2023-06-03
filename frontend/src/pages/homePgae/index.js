import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Wrapper from "../../components/wrapper/Wrapper";
import "./styles.css";

const Homepage = () => {
  const { token } = useSelector((state) => state.notesMain);

  const navigate = useNavigate();

  const redirectToNote = () => {
    if (token) {
      navigate("/notes");
    }
  };

  useEffect(() => {
    redirectToNote();
  }, [token]);

  return (
    <Wrapper>
      <div className="hompage-container">
        <div className="hompage-title">
          <h1>Notes Application</h1>
          <p>
            Introducing our new MERN-based notes application! This powerful tool
            allows you to easily create, edit, and organize your notes in a
            sleek and intuitive interface.
          </p>

          <p>
            Built using the latest MERN (MongoDB, Express, React, Node.js)
            stack, our application offers robust performance, scalability, and
            security. Your notes are securely stored in a MongoDB database,
            while the Express-based backend and Node.js runtime ensure fast and
            reliable access and processing. The React-based frontend provides a
            modern and responsive user interface that works seamlessly across
            devices.
          </p>
          <p>
            Whether you're a student, professional, or just looking for a better
            way to keep track of your ideas, our MERN-based notes application is
            the perfect solution. Try it today and see how it can help you stay
            organized and productive!"
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Homepage;
