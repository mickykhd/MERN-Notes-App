import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils/constant";
import List from "../../lists/List";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../components/wrapper/Wrapper";
import "./styles.css";

const Notes = () => {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const { token } = useSelector((state) => state.notesMain);

  useEffect(() => {
    if (typeof input === "string" && input.length) {
      const debounceTimout = setTimeout(() => {
        // update request logic
      }, 1000);

      return () => {
        clearTimeout(debounceTimout);
      };
    }
  }, [input]);

  const navigate = useNavigate();
  const handleNotesStatus = () => {
    if (!token) {
      navigate("/login");
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [updateUI]);

  useEffect(() => {
    handleNotesStatus();
  }, [token]);

  const addNote = async () => {
    try {
      const response = await fetch(`${baseURL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: input }),
      });
      if (response.ok) {
        const data = await response.json();
        setInput("");
        setUpdateUI((prevState) => !prevState);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateNote = () => {
    axios
      .put(
        `${baseURL}/update/${updateId}`,
        { note: input },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateId(null);
        setInput("");
      });
  };
  return (
    <Wrapper>
      <div className="notes-main">
        <div className="notes-container">
          <p className="title">CRUD Operations</p>
          <div className="notes-form">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="notes-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>

            <button type="submit" onClick={updateId ? updateNote : addNote}>
              {updateId ? "Update Note" : "Add Note"}
            </button>
          </div>
        </div>

        <div className="mapped-list">
          {notes.map((note) => {
            return (
              <List
                key={note._id}
                id={note._id}
                note={note.note}
                setUpdateUI={setUpdateUI}
                updateMode={updateMode}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default Notes;
