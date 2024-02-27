import React, { useState } from "react";
import { addRoom, uploadImage } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photoUrl: null,
    roomType: "",
    roomPrice: "",
  });
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photoUrl: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newRoom);
    try {
      const imageUrl = await uploadImage(newRoom.photoUrl);
      const updatedRoom = { ...newRoom, photoUrl: imageUrl };
      setNewRoom(updatedRoom);

      // Bước 2: Thêm thông tin phòng mới vào cơ sở dữ liệu hoặc state quản lý
      const success = await addRoom(updatedRoom);
      if (success !== undefined) {
        setSuccessMessage("A new room was  added successfully !");
        setNewRoom({ photoUrl: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
        navigate("/existing-rooms");
      } else {
        setErrorMessage("Error adding new room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };
  //   console.log(" Add Room");
  return (
    <>
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="text-center my-5">Add A New Room</h2>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">
                {" "}
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                    setNewRoom={setNewRoom}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>
                <input
                  className="form-control"
                  type="number"
                  id="roomPrice"
                  name="roomPrice"
                  required
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Room Photo
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                ></input>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    width="200"
                    className="my-3"
                  ></img>
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <button className="btn btn-outline-primary ms-5" type="submit">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;
