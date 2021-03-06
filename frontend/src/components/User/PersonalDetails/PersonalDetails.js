import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

import { Link, useHistory } from "react-router-dom";

import rest_endpoints from "../../../config/rest_endpoints.json";

const customerEndpoint = rest_endpoints.rest_endpoints.user.customer_profile;

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

// const Container = styled.div.attrs({
//   className: `flex flex-column pr6 pl6`,
// })``;

// const HeaderRow = styled.div.attrs({
//   className: `flex`,
// })``;

// const TitleContainer = styled.div.attrs({
//   className: `pa3 mb2 w-50`,
// })``;

// const Title = styled.p.attrs({
//   className: `f2 measure fw1 mt3 ml-5`,
// })``;

// const Btn = styled.div.attrs({
//   className: `w-25 mt2 mb5 mr4`,
// })``;

// const Update = styled.p.attrs({
//   className: `f3 measure fw1 mt5 blue pointer dim tr`,
// })``;

// const Delete = styled.p.attrs({
//   className: `f3 measure fw1 mt5 dark-red pointer dim tl`,
// })``;

// const BodyRow = styled.div.attrs({
//   className: `flex flex-column items-center`,
// })``;

// const BodyDiv = styled.div.attrs({
//   className: `w-25`,
// })``;

// const FieldDiv = styled.div.attrs({
//   className: ``,
// })``;

// const FieldText = styled.p.attrs({
//   className: `f3  gray`,
// })``;

// const DataDiv = styled.div.attrs({
//   className: `mb5`,
// })``;

// const DataText = styled.p.attrs({
//   className: `f4 dark-gray fw3`,
// })``;

// https://reactrouter.com/web/api/match
const PersonalDetails = ({ location }) => {
  let history = useHistory();

  // get user id from match.params.id and GET user data.
  const [userId] = useState(location.state.user.id);
  const [customer, setCustomer] = useState(location.state.user);
  const [isDelete, setIsDelete] = useState(false);

  const url = customerEndpoint + "/" + userId;

  function handleDelete() {
    setIsDelete(true);
  }

  // useEffect(() => {
  //     fetch(url)
  //       .then((resp) => {
  //         if (resp.ok) {
  //           return resp.json();
  //         }
  //         throw new Error(`${resp.status} Error retrieving customer.`);
  //       })
  //       .then((res) => {
  //         const cus = res.customer;
  //         setCustomer({
  //           email: cus.email,
  //           address: cus.address,
  //           firstName: cus.firstName,
  //           lastName: cus.lastName,
  //           phoneNum: cus.phoneNum,
  //         });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, [url]);

  useEffect(() => {
    if (isDelete) {
      // DELETE request using fetch with error handling
      fetch(url, { method: "DELETE" })
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      history.push("/");
    }
  }, [history, isDelete, url]);

  return (
    <>
      <div>
        <div className="flex justify-between flex-wrap">
          <h2>Personal Details</h2>
          <div className="flex justify-end">
            {/* <div className="mr1">
              <Link
                to={{
                  pathname: "/user/profile/" + userId + "/personaldetails/edit",
                  state: {
                    customer: customer,
                  },
                }}
              >
                Update Account
              </Link>
            </div> */}
            {/* <div className="mr1">
              <Button onClick={handleDelete}>Delete Account</Button>
            </div> */}
          </div>
        </div>
      </div>
      <Card>
        {/* <Card.Header>Personal Details</Card.Header> */}
        <Card.Body>
          <div className="mv2">
            <div className="gray f5">First name</div>
            <div className="lh-copy">
              {customer == null ? "n/a" : customer.firstName}
            </div>
          </div>
          <div className="mv2">
            <div className="gray f5">Surname</div>
            <div className="lh-copy">
              {customer == null ? "n/a" : customer.surname}
            </div>
          </div>
          <div className="mv2">
            <div className="gray f5">Email address</div>
            <div className="lh-copy">
              {customer == null ? "n/a" : customer.email}
            </div>
          </div>
          <div className="mv2">
            <div className="gray f5">Mobile Number</div>
            <div className="lh-copy">
              {customer == null ? "n/a" : customer.mobileNumber}
            </div>
          </div>
          <div className="mv2">
            <div className="gray f5">Address</div>
            <div className="lh-copy">
              {customer == null ? "n/a" : customer.address}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* <Container>
        <HeaderRow>
          <TitleContainer>
            <Title>Personal Details</Title>
          </TitleContainer>
          <Btn>
            <Update>
              <Link
                to={{
                  pathname:
                    "/user/profile/" +
                    match.params.id +
                    "/personaldetails/edit",
                  state: {
                    customer: customer,
                  },
                }}
              >
                Update Account
              </Link>
            </Update>
          </Btn>
          <Btn>
            <Delete onClick={handleDelete}>Delete Account</Delete>
          </Btn>
        </HeaderRow>
        <BodyRow>
          <BodyDiv>
            <FieldDiv>
              <FieldText>First Name</FieldText>
            </FieldDiv>
            <DataDiv>
              <DataText>{customer == null ? "" : customer.firstName}</DataText>
            </DataDiv>
          </BodyDiv>
          <BodyDiv>
            <FieldDiv>
              <FieldText>Last Name</FieldText>
            </FieldDiv>
            <DataDiv>
              <DataText>{customer == null ? "" : customer.lastName}</DataText>
            </DataDiv>
          </BodyDiv>
          <BodyDiv>
            <FieldDiv>
              <FieldText>Address</FieldText>
            </FieldDiv>
            <DataDiv>
              <DataText>{customer == null ? "" : customer.address}</DataText>
            </DataDiv>
          </BodyDiv>
          <BodyDiv>
            <FieldDiv>
              <FieldText>Phone Number</FieldText>
            </FieldDiv>
            <DataDiv>
              <DataText>{customer == null ? "" : customer.phoneNum}</DataText>
            </DataDiv>
          </BodyDiv>
          <BodyDiv>
            <FieldDiv>
              <FieldText>Email Address</FieldText>
            </FieldDiv>
            <DataDiv>
              <DataText>{customer == null ? "" : customer.email}</DataText>
            </DataDiv>
          </BodyDiv>
        </BodyRow>
      </Container> */}
    </>
  );
};

export default PersonalDetails;
