import React, { useState, useEffect } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  //   const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data);
          //   setFilteredBookings(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
      //   setFilteredBookings(
      //     filteredBookings.filter((booking) => booking.id !== bookingId)
      //   );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Bookings"} />
      {error && <div className="text-danger">{error}</div>}
      {isLoading ? (
        <div>Loading existing bookings</div>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
          //   setFilteredBookings={setFilteredBookings}
          //   filteredBookings={filteredBookings}
        />
      )}
    </section>
  );
};

export default Bookings;
