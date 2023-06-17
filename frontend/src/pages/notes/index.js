import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseURL } from "../../utils/constant";
import List from "../../lists/List";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../components/wrapper/Wrapper";
import "./styles.css";
import useAutoSave from "../../hooks/useAutoSave";
import { handleChange } from "../../mainSlice/mainSlice";

const Notes = () => {
  const [input, setInput] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [shouldRunFunction, setShouldRunFunction] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { token, editmode } = useSelector((state) => state.notesMain);

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

  const saveNote = async (value) => {
    try {
      if (updateId) {
        // Update an existing note
        await axios.put(
          `${baseURL}/update/${updateId}`,
          { note: value },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Add a new note
        await fetch(`${baseURL}/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ note: value }),
        });
      }
      setUpdateUI((prevState) => !prevState);
    } catch (error) {
      console.error(error);
    }
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
      });
  };

  // useAutoSave(input, editmode ? updateNote : saveNote);

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  useEffect(() => {
    if (inputRef.current) {
      setPreviousValue(input);
      setInput(inputRef.current.value);
    }
  }, [inputRef.current?.value]);

  // useEffect(() => {
  //   const test3 = setTimeout(() => {
  //     setShouldRunFunction(false);
  //   }, 3000);

  //   return () => clearTimeout(test3);
  // }, [shouldRunFunction]);

  useEffect(() => {
    const test1 = setTimeout(() => {
      if (!shouldRunFunction) return;
      if (previousValue === input) {
        return;
      }
      if (previousValue !== input) {
        saveNote(input);
        setInput("");
        setPreviousValue("");
        dispatch(handleChange({ name: "editmodeF" }));
      }
      if (updateId) {
        updateNote();
        setPreviousValue("");
        setInput("");
      }
    }, 3000);

    return () => clearTimeout(test1);
  }, [input]);

  return (
    <Wrapper>
      <div className="notes-main">
        <div className="notes-container">
          <p className="title">CRUD Operations</p>
          <div className="notes-form">
            <textarea
              name=""
              ref={inputRef}
              id=""
              cols="30"
              rows="10"
              className="notes-textarea"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShouldRunFunction(true);
              }}
            ></textarea>
            {/* <button type="submit" onClick={updateId ? updateNote : addNote}>
              {updateId ? "Update Note" : "Add Note"}
            </button> */}
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
