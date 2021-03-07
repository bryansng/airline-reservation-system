import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import * as dayjs from "dayjs";
import ShowReservation from "./ShowReservation";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { reservation: reservation_apis } = rest_endpoints;

const Button = styled.button.attrs({
  className: `ma0 relative w-100 b--gray mh0 br2 ba hover-bg-light-gray tc`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
  ${(props) => props.disabled && `pointer-events: none;`}
`;

const RetrieveBooking = () => {
  const [reservation, setReservation] = useState(null);
  /*
  1. ability to retrieve booking by guests. (ensure flight has not occurred, i.e. error when booking's flight date has passed.)

  input user lastname and booking number

  2. guests can choose to cancel it (how to prevent ppl from randomly entering a booking id to cancel it?)
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const customerLastName = e.target.formCustomerLastName.value;
    const reservationId = e.target.formBookingNumber.value;

    // GET reservation by customer last name and reservation id.
    fetch(`${reservation_apis.get_by_id}/${customerLastName}/${reservationId}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status} Error retrieving reservation.`);
      })
      .then((res) => {
        const reservation = res.reservation;
        console.log(res);
        setReservation(reservation);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h2 className="mb2">Retrieve Booking</h2>

      {!reservation && (
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Card className="mv3">
            <Card.Header>Booking details</Card.Header>
            <Card.Body>
              <div className="flex">
                <Form.Group
                  controlId="formCustomerLastName"
                  className="w-50 mr2"
                >
                  <Form.Label className="dark-gray f5">Booking name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Doe"
                    // defaultValue="testLastName"
                    required
                  />
                  <Form.Text className="text-muted">Case-sensitive</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBookingNumber" className="w-50 ml2">
                  <Form.Label className="dark-gray f5">
                    Booking number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1"
                    // defaultValue="12345678"
                    required
                  />
                </Form.Group>
              </div>
            </Card.Body>
          </Card>
          <div className="flex justify-end">
            <div className="mt3">
              <Button type="submit">Retrieve</Button>
            </div>
          </div>
        </Form>
      )}

      {reservation && (
        <Redirect
          push
          to={{
            pathname: `/show/reservation/${reservation.id}`,
            state: { reservation: reservation },
          }}
        />
      )}
    </>
  );
};

export default RetrieveBooking;
