import React from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import "./styles.css";

const About = () => {
  return (
    <Wrapper>
      <div className="about">
        <h1>About</h1>
        <p>
          Welcome to <b>Ashrumochan's</b> MERN stack notes app! Create, edit,
          and organize notes easily in one place. Intuitive UI with advanced
          features including note sharing and reminders. Built using MongoDB,
          Express.js, React, and Node.js for a powerful and scalable platform.
          Feedback always welcome. Enjoy using this MERN stack notes app!
        </p>
      </div>
    </Wrapper>
  );
};

export default About;
