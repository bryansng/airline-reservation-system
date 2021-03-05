import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AppLogo = styled.h1.attrs({
  className: `avenir fw6 ma0`,
})``;

const LinkBody = styled.div.attrs({
  className: `pointer near-black dim`,
})`
  text-decoration: none;
  :hover {
    text-decoration: none;
    color: #111;
  }
`;
function Logo() {
  return (
    <Link to="/">
      <LinkBody>
        <AppLogo>ARS</AppLogo>
      </LinkBody>
    </Link>
  );
}
export default Logo;
