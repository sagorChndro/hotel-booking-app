import { isValid, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DateSlider from "../common/DateSlider";
import moment from "moment";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);
  const [search, setSearch] = useState("");
  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = filtered.data?.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate).getDate;
        const bookingEndDate = parseISO(booking.checkOutDate).getDate;
        console.log("Check-in Date :", bookingStartDate);
        console.log("Check-out Date :", bookingEndDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }

    if (search) {
      filtered = filtered.data.filter((booking) =>
        Object.values(booking).some((value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    setFilteredBookings(filtered);
    console.log("filtered Data :", filtered);
  };

  console.log("Before rendering - filteredBookings:", filteredBookings);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    filterBookings(); // Call filter function whenever search changes
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);
  return (
    <section className="p-4">
      <DateSlider
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
      />
      <div style={{marginLeft:"69rem"}} className="mb-4 col-3">
        <form onSubmit={(e)=> e.preventDefault()}>
          <input className="form-control"
            type="search"
            role="searchbox"
            placeholder="Search Here"
            value={search}
            onChange={handleSearch}
          />
        </form>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guest</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.data?.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.id}</td>
              <td>{booking.room.id}</td>
              <td>{booking.room.roomType}</td>
              <td>
                {moment(booking.checkInDate)
                  .subtract(1, "month")
                  .format("MMM Do, YYYY")}
              </td>
              <td>
                {moment(booking.checkOutDate)
                  .subtract(1, "month")
                  .format("MMM Do, YYYY")}
              </td>
              <td>{booking.guestFullName}</td>
              <td>{booking.guestEmail}</td>
              <td>{booking.numOfAdults}</td>
              <td>{booking.numOfChildren}</td>
              <td>{booking.totalNumOfGuest}</td>
              <td>{booking.bookingConfirmationCode}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingCancellation(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredBookings.data?.length === 0 && (
        <p>No booking found for the selected dates.</p>
      )}
    </section>
  );
};

export default BookingsTable;
