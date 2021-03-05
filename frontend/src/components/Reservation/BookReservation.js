import React, { useState, useEffect } from "react";
import HandlePassengersDetails from "./HandlePassengersDetails";
import HandlePaymentDetails from "./HandlePaymentDetails";
import ConfirmItineraryDetails from "./ConfirmItineraryDetails";
import Itinerary from "./Itinerary";
import { Redirect } from "react-router";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { reservation: reservation_apis, flight: flight_apis } = rest_endpoints;

const BookReservation = ({ location, user, isAuthenticated }) => {
  const [flightId] = useState(location.state.flightId);
  const [flight, setFlight] = useState(null);
  const [numPassengers] = useState(location.state.numPassengers);
  const [passengersDetails, setPassengersDetails] = useState(null);
  const [confirmationBooking, setConfirmationBooking] = useState(null);
  const [isConfirmedBooking, setIsConfirmedBooking] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [bookedReservation, setBookedReservation] = useState(null);

  useEffect(() => {
    // GET flight details.
    fetch(`${flight_apis.get_by_id}/${flightId}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status} Error retrieving flight.`);
      })
      .then((res) => {
        console.log(res);
        const flight = res.flight;
        setFlight(flight);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [flightId]);

  useEffect(() => {
    if (flight && numPassengers && passengersDetails) {
      // create confirmation booking.
      setConfirmationBooking({
        reservation: {
          totalCost: flight.flightPrice * numPassengers,
          bookings: passengersDetails,
          customer: passengersDetails[0],
          flight: flight,
        },
      });
    }
  }, [flight, numPassengers, passengersDetails]);

  useEffect(() => {
    if (flightId && passengersDetails && paymentDetails) {
      // POST to get actual booking with booking number.
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          // token: `${token}`,
          flightId: flightId,
          customers: passengersDetails,
          creditCardDetails: paymentDetails,
        }),
      };

      fetch(reservation_apis.create, requestOptions)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status} Error booking a reservation.`);
        })
        .then((res) => {
          const reservation = res.reservation;
          console.log(res);
          setBookedReservation(reservation);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [flightId, passengersDetails, paymentDetails]);

  /*
  on click from select flight in search flight, brings user to reserve

  url: /book/flightId

  1. enter passengers details (number of passengers selected by user)
  2. confirm itinerary details
  3. enter payment details (add ability to retrieve saved payment details) (save option hidden when not executive club member)
  4. once successful, show reservation details.
  */
  return (
    <div>
      <h2 className="mb2">Reservation</h2>
      <Itinerary flight={flight} numPassengers={numPassengers} />
      {/* {<div>Reserving for user with id: {userId}</div>}
      {<div>Reserving for flight with id: {flightId}</div>}
      {<div>Reserving for {numPassengers} passengers</div>} */}
      {!passengersDetails && (
        <HandlePassengersDetails
          setPassengersDetails={setPassengersDetails}
          numPassengers={numPassengers}
          loggedInUser={user}
          isAuthenticated={isAuthenticated}
        />
      )}
      {passengersDetails && !isConfirmedBooking && confirmationBooking && (
        <ConfirmItineraryDetails
          confirmationBooking={confirmationBooking}
          isConfirmation={true}
          setIsConfirmedBooking={setIsConfirmedBooking}
        />
      )}
      {isConfirmedBooking && !paymentDetails && (
        <HandlePaymentDetails
          setPaymentDetails={setPaymentDetails}
          loggedInUser={user}
          isAuthenticated={isAuthenticated}
        />
      )}
      {paymentDetails && bookedReservation && (
        <Redirect
          push
          to={{
            pathname: `/show/reservation/${bookedReservation.id}`,
            state: { reservation: bookedReservation },
          }}
        />
      )}
    </div>
  );
};

export default BookReservation;