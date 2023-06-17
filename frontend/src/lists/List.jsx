import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";

import "./List.css";
import { handleChange } from "../mainSlice/mainSlice";

const List = ({ id, note, setUpdateUI, updateMode }) => {
  const { token } = useSelector((state) => state.notesMain);
  const dispatch = useDispatch();

  const removeNote = async () => {
    try {
      const response = await fetch(`${baseURL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUpdateUI((prevState) => !prevState);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    dispatch(handleChange({ name: "editmode", value: true }));
    updateMode(id, note);
  };

  return (
    <div className="list-main">
      <div className="notes-list">
        <textarea name="" id="" value={note} readOnly></textarea>
        <div className="icon_holder">
          <BiEditAlt className="icon-edit" onClick={handleEdit} />
          <BsTrash className="icon-remove" onClick={removeNote} />
        </div>
      </div>
    </div>
  );
};

export default List;
