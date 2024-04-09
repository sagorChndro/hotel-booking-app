import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProccessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProccessingPayment(true);
    setTimeout(() => {
      setIsProccessingPayment(false);
      onConfirm();
      setIsBookingConfirmed(true);      
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);
  return (
    <div className="card shadow-lg card-body mt-5">
      <h4>Reservation Summary</h4>
      <p>
        FullName : <strong>{booking.guestFullName}</strong>
      </p>
      <p>
        Email : <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-In Date :{" "}
        <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
      </p>

      <p>
        Check-out Date :{" "}
        <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
      </p>

      <p>
        Numer Of Days Booked: <strong>{numberOfDays}</strong>
      </p>

      <div>
        <h5>Number of Guest</h5>
        <strong style={{ marginRight: "15px" }}>
          Adult{booking.numOfAdults > 1 ? "s" : ""} :{" "}
          {booking.numOfAdults}
        </strong>
        <div>
          <strong>Children : {booking.numOfChildren > 0 ? booking.numOfChildren : 0 }</strong>
        </div>
      </div>
      {payment > 0 ? (
        <>
          <p className="mt-5">
            Total Payment : <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Booking Confirmed, redirecting to payment .....
                </>
              ) : (
                "Confirm Booking and proceed to payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading........</span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-danger">
          Check-out date must be after check-in date.
        </p>
      )}
    </div>
  );
};

export default BookingSummary;
