import React, { useState, useEffect } from "react";
import styled from "styled-components";

import rest_endpoints from "../../../config/rest_endpoints.json";

const Container = styled.div.attrs({
    className: `flex flex-column pr6 pl6 justify-content-center`
})``

const HeaderRow = styled.div.attrs({
    className: `flex`
})``

const TitleContainer = styled.div.attrs({
    className: `pa3 mb2 w-50`
})``
  
const Title = styled.p.attrs({
    className: `f2 measure fw1 mt3 ml-5`
})``

const ReservationContainer = styled.div.attrs({
  className: `flex flex-column`
})``

const ReservationDiv = styled.div.attrs({
  className: `outline flex pa3 ma3`
})``

const ReservationText = styled.p.attrs({
  className: `f3 fw3`
})``

const NoReservationContainer = styled.div.attrs({
  className: ``
})``

const NoReservation = styled.p.attrs({
  className: `tc f2 fw3`
})``

const ReservationDetailDiv = styled.div.attrs({
  className: `w-25`
})``

const View = styled.p.attrs({
  className: `f3 dim pointer fw3`
})``


const ReservationDetails = ({ match }) => {

    const [reservations, setReservations] = useState([])
    const [reservationDetails, setReservationDetails] = useState(null);
  
    const url = "http://localhost:8080/reservations/9"

    useEffect(() => {
      fetch(url)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status} Error retrieving customer.`);
        })
        .then((res) => {
            console.log(res)
            const reservations = res.reservations
            setReservations(reservations)
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    return (
      <Container>
         <HeaderRow>
            <TitleContainer>
                <Title>Reservations</Title>
            </TitleContainer>
        </HeaderRow>
        <ReservationContainer>
          {
            reservations.length === 0 ? 
            <NoReservationContainer>
              <NoReservation>No Reservations</NoReservation>
            </NoReservationContainer> :
            reservations.map((reservation, key) => {
              return (
                <ReservationDiv key={key}>
                  <ReservationDetailDiv>
                    <ReservationText>
                      <b>Departure Time - </b>{reservation.flight.departureTime}
                    </ReservationText>
                  </ReservationDetailDiv>
                  <ReservationDetailDiv>
                    <ReservationText>
                      {reservation.flight.departureDate}
                    </ReservationText>
                  </ReservationDetailDiv>
                  <ReservationDetailDiv>
                    <ReservationText>
                      <b>Departure Airport - </b>{reservation.flight.departureAirport}
                    </ReservationText>
                  </ReservationDetailDiv>
                  <ReservationDetailDiv className="tr">
                    <ReservationText>
                      {reservation.flight.flightName}
                    </ReservationText>
                  </ReservationDetailDiv>
                  <ReservationDetailDiv className ="tr">
                    <ReservationText>
                      {reservation.reservationStatus}
                    </ReservationText>
                  </ReservationDetailDiv>
                  <ReservationDetailDiv className="tr">
                    <View>
                      View
                    </View>
                  </ReservationDetailDiv>
              </ReservationDiv>
              )
            })
          }
        </ReservationContainer>
      </Container>
    );
  };
  
  export default ReservationDetails;