import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUser, FaPlane, FaCreditCard } from "react-icons/fa";
import { IconContext } from "react-icons";

import { Link } from "react-router-dom";

const Container = styled.div.attrs({
  className: `flex flex-column pr6 pl6`,
})``;

const TitleContainer = styled.div.attrs({
  className: `pa3 mb5`,
})``;

const Title = styled.p.attrs({
  className: `f1 measure lh-title fw1 mt3 ml6`,
})``;

const IconContainer = styled.div.attrs({
  className: `pa3 flex`,
})``;

const Icon = styled.div.attrs({
  className: `ma4`,
})``;

const IconTitleDiv = styled.div.attrs({
  className: `mt3`,
})``;

const IconTitle = styled.p.attrs({
  className: `f4`,
})``;

// https://reactrouter.com/web/api/match
const Profile = ({ match }) => {
  const icons = [
    {
      icon: <FaUser />,
      title: "Personal Details",
      suburl: "personaldetails",
    },
    {
      icon: <FaPlane />,
      title: "Reservations",
      suburl: "reservations",
    },
    {
      icon: <FaCreditCard />,
      title: "Card Details",
      suburl: "creditcards",
    },
  ];

  return (
    <Container>
      <TitleContainer>
        <Title>Welcome</Title>
      </TitleContainer>
      <IconContainer>
        {
          icons.map((icon, key) => {
            return (
              <Link
                key={key}
                style={{ color: 'dimgray' }} 
                className="ba b--silver br4 w-33 tc ma4 grow pointer dim" 
                to={`/user/profile/` + match.params.id + "/" + icon.suburl}>
                  <IconContext.Provider value={{size: "15em"}}>
                    <Icon>
                      {icon.icon}
                    </Icon>
                    <IconTitleDiv>
                      <IconTitle>{icon.title}</IconTitle>
                    </IconTitleDiv>
                  </IconContext.Provider>
                </Link>
              );
            })}
          </IconContainer>
        </>
      ) : (
        <div>
          Error displaying user profile. Detected user is {JSON.stringify(user)}
          .
        </div>
      )}
    </Container>
  );
};

export default Profile;
