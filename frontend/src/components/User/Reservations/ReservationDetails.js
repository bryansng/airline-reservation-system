import React from "react";
import styled from "styled-components";

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

const ReservationDetailDiv = styled.div.attrs({
  className: `w-25`
})``

const View = styled.p.attrs({
  className: `f3 dim pointer fw3`
})``


const ReservationDetails = ({ match }) => {
    // get user id from match.params.id and GET user data.
    const testUserId = { 
      id: "1",
      timeFrom: "00:00",
      timeTo: "01:00",
      date: "Fri, Mar 19",
      flightName: "MH1337",
      origin: "DUB",
      destination: "KLIA"
    };
  
    const testUserId2 = { 
      id: "2",
      timeFrom: "00:00",
      timeTo: "01:00",
      date: "Fri, Mar 19",
      flightName: "MH1337",
      origin: "DUB",
      destination: "KLIA"
    };
  
    const reservations = [testUserId, testUserId2]

    return (
      <Container>
         <HeaderRow>
            <TitleContainer>
                <Title>Reservations</Title>
            </TitleContainer>
        </HeaderRow>
        <ReservationContainer>
          {
            reservations.map(reservation => {
              return (
                <ReservationDiv>
                <ReservationDetailDiv>
                  <ReservationText>
                    {testUserId.timeFrom} - {testUserId.timeTo}
                  </ReservationText>
                </ReservationDetailDiv>
                <ReservationDetailDiv>
                  <ReservationText>
                    {testUserId.date}
                  </ReservationText>
                </ReservationDetailDiv>
                <ReservationDetailDiv className="tr">
                  <ReservationText>
                    {testUserId.flightName} - {testUserId.origin} - {testUserId.destination}
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