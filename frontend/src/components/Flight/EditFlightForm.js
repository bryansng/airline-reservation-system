import React, { useState } from "react";
import FlightForm from "./FlightForm";
import isNewFlightResponseCorrect from "./isNewFlightResponseCorrect";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Redirect } from "react-router";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { flight: flight_apis } = rest_endpoints.admin;
dayjs.extend(isBetween);

const EditFlightForm = ({ location }) => {
  const [hasFormError, setHasFormError] = useState(false);
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newFlightId, setNewFlightId] = useState("");
  const originalFlight = location.state.flight;

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const flightName = e.target.formFlightName.value;
    const flightPrice = e.target.formFlightPrice.value;
    const departureAirport = e.target.formDepartureAirport.value;
    const arrivalAirport = e.target.formArrivalAirport.value;
    const departureDateTime = e.target.formDepartureDateTime.value;
    const arrivalDateTime = e.target.formArrivalDateTime.value;

    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        // token: `${token}`,
        flightName: flightName,
        flightPrice: flightPrice,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        departureDateTime: departureDateTime,
        arrivalDateTime: arrivalDateTime,
        numOfSeats: 100,
      }),
    };

    fetch(flight_apis.edit + `${originalFlight.id}`, request)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`Error editing flight.`);
      })
      .then((resp) => {
        if (isNewFlightResponseCorrect(request.body, resp.flight)) {
          setResponseMessage(`Edited flight ${resp.flight.id} successfully.`);
          setIsErrorResponse(false);
          setNewFlightId(resp.flight.id);
        } else throw new Error(`Flight response incorrect.`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`Error: ${error.message}`);
        setHasFormError(true);
      });
  };
  return (
    <>
      <FlightForm
        handleSubmit={handleEditSubmit}
        isEditMode={true}
        originalFlight={originalFlight}
        hasEditFormError={hasFormError}
        editErrorMessage={errorMessage}
      />
      {newFlightId && (
        <Redirect
          push
          to={{
            pathname: `/flight`,
            state: {
              responseMessage: responseMessage,
              isErrorResponse: isErrorResponse,
            },
          }}
        />
      )}
    </>
  );
};
export default EditFlightForm;
