import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photoUrl: "",
    roomType: "",
    roomPrice: "",
  });
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photoUrl: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        // const blob = new Blob([room.photo], { type: "image/jpeg" });
        // setImagePreview(roomData.photo);
        // console.log(roomData.photo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage(newRoom.photoUrl);
      const updatedRoom = { ...room, photoUrl: imageUrl };
      setRoom(updatedRoom);
      const response = await updateRoom(roomId, updatedRoom);
      if (response.status === 200) {
        setSuccessMessage("Room updated successfully!");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        // setImagePreview(updatedRoomData.photo);
        setErrorMessage("");
        navigate("/existing-rooms");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="container my-5">
      <h2 className="text-center my-5">Edit Room</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label hotel-color" htmlFor="roomType">
                {" "}
                Room Type
              </label>
              <input
                type="text"
                className="form-control"
                id="roomType"
                name="roomType"
                value={room.roomType}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                Room Price
              </label>
              <input
                type="number"
                className="form-control"
                id="roomPrice"
                name="roomPrice"
                value={room.roomPrice}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label hotel-color">
                Photo
              </label>
              <input
                required
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              ></input>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Room preview"
                  width="200"
                  className="mt-3"
                />
              ) : (
                room.photoUrl && (
                  <img
                    src={room.photoUrl}
                    alt="Room preview"
                    width="200"
                    className="mt-3"
                  />
                )
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link
                to={"/existing-rooms"}
                className="btn btn-outline-info ms-5"
              >
                Back
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Edit Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
