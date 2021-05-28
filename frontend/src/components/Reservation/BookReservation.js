import React, { useState, useEffect } from "react";
import HandlePassengersDetails from "./HandlePassengersDetails";
import HandlePaymentDetails from "./HandlePaymentDetails";
import ConfirmItineraryDetails from "./ConfirmItineraryDetails";
import Itinerary from "./Itinerary";
import { Redirect } from "react-router";
import ErrorMessage from "../Common/ErrorMessage";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const {
  reservation: reservation_apis,
  flight: flight_apis,
  admin: admin_apis,
} = rest_endpoints;

const BookReservation = ({ location, token, user, isAuthenticated }) => {
  const [isEditMode] = useState(location.state.isEditMode);
  const [flightId] = useState(location.state.flightId);
  const [flight, setFlight] = useState(null);
  const [numPassengers] = useState(location.state.numPassengers);
  const [passengersDetails, setPassengersDetails] = useState(null);
  const [confirmationBooking, setConfirmationBooking] = useState(null);
  const [isConfirmedBooking, setIsConfirmedBooking] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [bookedReservation, setBookedReservation] = useState(null);
  const [hasFormError, setHasFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const reservation = location.state.reservation;

  useEffect(() => {
    if (flightId && !flight) {
      // GET flight details.
      fetch(`${flight_apis.get_by_id}/${flightId}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status} Error retrieving flight.`);
        })
        .then((res) => {
          const flight = res.flight;
          setFlight(flight);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [flight, flightId]);

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
    if (
      flightId &&
      passengersDetails &&
      isConfirmedBooking &&
      ((user && user.roles === "ADMIN") || paymentDetails)
    ) {
      // POST to get actual booking with booking number.
      const bookings = [];
      passengersDetails.forEach((passenger) => {
        bookings.push({
          isCheckedIn: false,
          isCancelled: false,
          customer: passenger,
        });
      });

      const authHeaders =
        isAuthenticated && user ? { Authorization: `Bearer ${token}` } : {};

      const requestOptions =
        flightId &&
        numPassengers &&
        isEditMode &&
        reservation &&
        user &&
        user.roles === "ADMIN"
          ? {
              // change flights, add/delete passengers
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                ...authHeaders,
              },
              body: JSON.stringify({
                reservationStatus: reservation.reservationStatus,
                totalCost: flight.flightPrice * bookings.length,
                bookings: bookings,
                customer: passengersDetails[0],
                flightId: flightId,
              }),
            }
          : isEditMode && user && user.roles === "ADMIN"
          ? {
              // only edit passenger details
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                ...authHeaders,
              },
              body: JSON.stringify({
                reservationStatus: reservation.reservationStatus,
                totalCost: reservation.totalCost,
                bookings: bookings,
                customer: passengersDetails[0],
                flightId: reservation.flight.id,
              }),
            }
          : user && user.roles === "ADMIN"
          ? {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...authHeaders,
              },
              body: JSON.stringify({
                flightId: flightId,
                customers: passengersDetails,
              }),
            }
          : {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...authHeaders,
              },
              body: JSON.stringify({
                flightId: flightId,
                customers: passengersDetails,
                creditCardDetails: paymentDetails,
              }),
            };
      // console.log(requestOptions.body);

      fetch(
        `${
          isEditMode && user && user.roles === "ADMIN"
            ? admin_apis.reservation.edit + reservation.id
            : user && user.roles === "ADMIN"
            ? admin_apis.reservation.create
            : reservation_apis.create
        }`,
        requestOptions
      )
        .then((resp) => {
          console.log(resp);
          if (resp.ok) {
            return resp.json();
          }
          throw resp;
        })
        .then((res) => {
          console.log(res);
          const reservation = res.reservation;
          setBookedReservation(reservation);
          setHasFormError(false);
          // console.log(reservation);
        })
        .catch((error) => {
          error.json().then((body) => {
            setErrorMessage(`Error: ${body.message}`);
            setPaymentDetails(null);
            setHasFormError(true);
          });
        });
    }
  }, [flightId, isConfirmedBooking, passengersDetails, paymentDetails]);

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
      <h2 className="mb2">
        {isEditMode
          ? `Edit reservation ${location.state.reservation.id} for ${location.state.reservation.customer.lastName}`
          : "Reservation"}
      </h2>
      <Itinerary flight={flight} numPassengers={numPassengers} />
      {!passengersDetails && (
        <HandlePassengersDetails
          setPassengersDetails={setPassengersDetails}
          numPassengers={numPassengers}
          loggedInUser={user}
          isAuthenticated={isAuthenticated}
          passengersDetails={
            isEditMode && reservation ? reservation.bookings : null
          }
        />
      )}
      {passengersDetails && !isConfirmedBooking && confirmationBooking && (
        <ConfirmItineraryDetails
          confirmationBooking={confirmationBooking}
          isConfirmation={true}
          setIsConfirmedBooking={setIsConfirmedBooking}
        />
      )}
      {hasFormError && <ErrorMessage error>{errorMessage}</ErrorMessage>}
      {(!user || user.roles !== "ADMIN") &&
        isConfirmedBooking &&
        (!paymentDetails || (paymentDetails && !bookedReservation)) && (
          <HandlePaymentDetails
            token={token}
            setPaymentDetails={setPaymentDetails}
            loggedInUser={user}
            isAuthenticated={isAuthenticated}
          />
        )}
      {((user && user.roles === "ADMIN") || paymentDetails) &&
        bookedReservation && (
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
