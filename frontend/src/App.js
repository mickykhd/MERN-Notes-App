import React, { useEffect, useState } from "react";

import axios from "axios";
import { baseURL } from "./utils/constant";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { handleChange } from "./mainSlice/mainSlice";

import router from "./routes/routes";
import Homepage from "./pages/homePgae";
import Signup from "./pages/signUp";
import Login from "./pages/login";
import Navbar from "./components/Navbar/Navbar";
import Notes from "./pages/notes";
import { useDispatch, useSelector } from "react-redux";
import About from "./pages/about";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.notesMain);

  return (
    <div className="main-app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
