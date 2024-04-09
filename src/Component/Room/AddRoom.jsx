import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunction";
import RoomTypeSelector from "../common/RoomTypeSelector";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Header from "../common/Header";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (success !== undefined) {
        setSuccessMessage("A New Room Was Added Successfully!");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error Adding New Room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(()=>{
      setSuccessMessage("");
      setErrorMessage("");
    },5000)
  };



  return (
    <>
      <selection className="container col-8 mt-5 mb-5 card shadow-lg p-4">
      <Header title={"Add New Room Form"}/>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6">
            <h2 className="mt-3 mb-2">Add a New Room</h2>


          {successMessage &&(
            <div className="alert alert-success fade show">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="alert alert-danger fade show">{errorMessage}</div>
          )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Types
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="roomPrice" className="from-label">
                  Room Prices
                </label>
                <input
                  className="form-control"
                  required
                  id="roomPrice"
                  name="roomPrice"
                  type="number"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                  placeholder="Enter room price"
                />
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
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <Link to={'/existing-rooms'} className="btn btn-outline-info">
                  Back
                </Link>
                <button className="btn btn-outline-primary ms-2">Save Room</button>
              </div>
            </form>
          </div>
        </div>
      </selection>
    </>
  );
};

export default AddRoom;
