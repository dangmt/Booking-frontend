import React, { useState, useEffect } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom, setNewRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      console.log(roomTypes);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
      setNewRoom({ ...newRoom, roomType: newRoomType });
    }
  };
  return (
    <>
      <div>
        <select
          id="roomType"
          name="roomType"
          onChange={(e) => {
            if (e.target.value === "Add New") {
              setShowNewRoomTypeInput(true);
            } else {
              console.log(e.target.value);
              handleRoomInputChange(e);
            }
          }}
          value={newRoom.roomType}
          className="form-select"
        >
          <option value="">Select a room type</option>
          <option value={"Add New"}>Add New</option>
          {/* {roomTypes.length > 0 && */}
          {roomTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
          {/* ))} */}
        </select>
        {showNewRoomTypeInput && (
          <div className="input-group mt-2">
            <input
              className="form-control"
              placeholder="Enter new room type"
              onChange={handleNewRoomTypeInputChange}
              type="text"
            ></input>
            <button
              className="btn btn-hotel"
              type="button"
              onClick={handleAddNewRoomType}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomTypeSelector;
