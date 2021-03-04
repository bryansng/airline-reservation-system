import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import { FaUser, FaPlane, FaCreditCard } from "react-icons/fa";
import { IconContext } from "react-icons";

import PersonalDetails from "./PersonalDetails/PersonalDetails";
import ReservationDetails from "./Reservations/ReservationDetails";
import CreditCards from "./CreditCard/CreditCards";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

const Container = styled.div.attrs({
  className: `flex flex-column pr6 pl6`
})``

const TitleContainer = styled.div.attrs({
  className: `pa3 mb5`
})``

const Title = styled.p.attrs({
  className: `f1 measure lh-title fw1 mt3 ml6`
})``

const IconContainer = styled.div.attrs({
  className: `pa3 flex`
})``

const Icon = styled.div.attrs({
  className: `ma4`
})``

const IconTitleDiv = styled.div.attrs({
  className: `mt3`
})``

const IconTitle = styled.p.attrs({
  className: `f4`
})``


// https://reactrouter.com/web/api/match
const Profile = ({ match }) => {
  // get user id from match.params.id and GET user data.
  const testUserId = { 
    id: "1",
    firstName: "Braddy",
    lastName: "Yeoh",
    email: "braddy.yeoh@ucdconnect.ie"
  };

  const icons = [
    {
      icon:  <FaUser/>,
      title: "Personal Details",
      suburl: "personaldetails"
    },
    {
      icon: <FaPlane/>,
      title: "Reservations",
      suburl: "reservations"
    },
    {
      icon: <FaCreditCard/>,
      title: "Card Details",
      suburl: "carddetails"
    }
  ]

  let { path, url } = useRouteMatch();

  return (
    <Container>
      <TitleContainer>
        <Title>Welcome, {testUserId.firstName}</Title>
      </TitleContainer>
      <IconContainer>
        {
          icons.map(icon => {
            return (
              <Link style={{ color: 'dimgray' }} class="ba b--silver br4 w-33 tc ma4 grow pointer dim" to={`${url}/${icon.suburl}`}>
                  <IconContext.Provider value={{size: "15em"}}>
                    <Icon>
                      {icon.icon}
                    </Icon>
                    <IconTitleDiv>
                      <IconTitle>
                      {icon.title}
                      </IconTitle>
                    </IconTitleDiv>
                </IconContext.Provider>
            </Link>
            )
          })
        }
      </IconContainer>
      <Switch>
        <Route path={`${path}/personaldetails`}>
          <PersonalDetails />
        </Route>
        <Route path={`${path}/reservations`}>
          <ReservationDetails />
        </Route>
        <Route path={`${path}/carddetails`}>
          <CreditCards />
        </Route>
      </Switch>
    </Container>
    
  );
};

export default Profile;
