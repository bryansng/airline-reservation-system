import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import rest_endpoints from "../../../config/rest_endpoints.json";
const reservationEndpoint =
  rest_endpoints.rest_endpoints.reservation.get_all_by_customer_id;

const Container = styled.div.attrs({
  className: `flex flex-column justify-content-center`,
})``;

const HeaderRow = styled.div.attrs({
  className: `flex`,
})``;

const TitleContainer = styled.div.attrs({
  className: `pa3 mb2 w-50`,
})``;

const Title = styled.p.attrs({
  className: `f2 measure fw1 mt3 ml-5`,
})``;

const ReservationContainer = styled.div.attrs({
  className: `flex flex-column`,
})``;

const ReservationDiv = styled.div.attrs({
  className: `w-100 outline flex pa3 ma3`,
})``;

const ReservationText = styled.p.attrs({
  className: `f4 fw3`,
})``;

const NoReservationContainer = styled.div.attrs({
  className: ``,
})``;

const NoReservation = styled.p.attrs({
  className: `tc f2 fw3`,
})``;

const ReservationDetailDiv = styled.div.attrs({
  className: `w-25`,
})``;

const View = styled.p.attrs({
  className: `f4 dim pointer fw3`,
})``;

const ReservationDetails = ({ location }) => {
  const [reservations, setReservations] = useState([]);

  const url = reservationEndpoint + "/" + location.state.user.id;

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status} Error retrieving customer.`);
      })
      .then((res) => {
        console.log(res);
        setReservations(res.reservations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return (
    <Container>
      <HeaderRow>
        <TitleContainer>
          <Title>Reservations</Title>
        </TitleContainer>
      </HeaderRow>
      <ReservationContainer>
        {reservations.length === 0 ? (
          <NoReservationContainer>
            <NoReservation>No Reservations</NoReservation>
          </NoReservationContainer>
        ) : (
          reservations.map((reservation, key) => {
            return (
              <ReservationDiv key={key}>
                <ReservationDetailDiv>
                  <ReservationText>
                    <b>Time - </b>
                    {reservation.flight.departureTime},{" "}
                    {reservation.flight.departureDate}
                  </ReservationText>
                </ReservationDetailDiv>
                <ReservationDetailDiv className="tr">
                  <ReservationText>
                    <b>Airport - </b>
                    {reservation.flight.departureAirport}
                  </ReservationText>
                </ReservationDetailDiv>
                <ReservationDetailDiv className="tr">
                  <ReservationText>
                    <b>Flight - </b>
                    {reservation.flight.flightName}
                  </ReservationText>
                </ReservationDetailDiv>
                <ReservationDetailDiv className="tr">
                  <ReservationText>
                    {reservation.reservationStatus}
                  </ReservationText>
                </ReservationDetailDiv>
                <ReservationDetailDiv className="tr">
                  <Link
                    to={{
                      pathname: "/show/reservation/" + reservation.id,
                      state: {
                        reservation: reservation,
                      },
                    }}
                  >
                    <View>View</View>
                  </Link>
                </ReservationDetailDiv>
              </ReservationDiv>
            );
          })
        )}
      </ReservationContainer>
    </Container>
  );
};

export default ReservationDetails;
