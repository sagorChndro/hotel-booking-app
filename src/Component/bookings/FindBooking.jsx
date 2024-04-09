import React, { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunction";
import moment from "moment";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    room: { id: "" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  });
  const [isDeleted, setIsDeleted] = useState(false);

  const clearBookingInfo = {
    id: "",
    room: { id: "" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data?.message);
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingInfo.id);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancel successfully!");
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
    } catch (error) {
      setError(error);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 2000);
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h5>Find My Booking</h5>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter your confirmation code"
            />
            <button className="btn btn-hotel input-group-text">
              Find Booking
            </button>
          </div>
        </form>

        {isLoading ? (
          <div>Finding Your Booking.........</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5 card shadow-lg p-4">
            <h3>Booking Information</h3>
            <p>
              Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}
            </p>
            <p>Booking ID: {bookingInfo.id}</p>
            <p>Room Number: {bookingInfo.room.id}</p>
            <p>Room Type: {bookingInfo.room.roomType}</p>
            <p>
              Check-In Date:{" "}
              {moment(bookingInfo.checkInDate)
                .subtract(1, "month")
                .format("MMM Do, YYYY")}
            </p>
            <p>
              Check-Out Date:{" "}
              {moment(bookingInfo.checkOutDate)
                .subtract(1, "month")
                .format("MMM Do, YYYY")}
            </p>
            <p>Full Name: {bookingInfo.guestFullName}</p>
            <p>Email Address: {bookingInfo.guestEmail}</p>
            <p>Adults: {bookingInfo.numOfAdults}</p>
            <p>Children: {bookingInfo.numOfChildren}</p>
            <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>

            {!isDeleted && (
              <button
                className="btn btn-danger"
                onClick={() => handleBookingCancellation(bookingInfo.id)}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ) : (
          <div>Find Your Booking Room</div>
        )}
        {isDeleted && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default FindBooking;
