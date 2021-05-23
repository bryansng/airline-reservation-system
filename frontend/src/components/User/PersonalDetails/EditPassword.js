import React, { useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ShowCheckOrCrossBox from "../../Common/ShowCheckOrCrossBox";
import ErrorMessage from "../../Common/ErrorMessage";
import passwordValidator from "password-validator";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import rest_endpoints from "../../../config/rest_endpoints.json";
const customerEndpoint = rest_endpoints.rest_endpoints.user.change_password;

// create schema and add password requirements.
var schema = new passwordValidator();
schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .symbols(1)
  .has()
  .not()
  .spaces();

const Button = styled.button.attrs({
  className: `ma0 relative w-100 b--gray center br2 ba hover-bg-light-gray tc`,
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

const EditPassword = ({ location, setUser }) => {
  const user =
    location.state && location.state.user ? location.state.user : null;
  const [hasFormError, setHasFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isSave, setIsSave] = useState(null);

  const [isPasswordsValid, setIsPasswordsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [failedRules, setFailedRules] = useState([
    "min",
    "lowercase",
    "uppercase",
    "digits",
    "symbols",
    "spaces",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword || failedRules.length !== 0) {
      setIsPasswordsValid(false);
    } else {
      setIsPasswordsValid(true);

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          oldPassword: e.target.formOldPassword.value,
          newPassword: e.target.formNewPassword.value,
        }),
      };
      // console.log(requestOptions);

      fetch(`${customerEndpoint}/${user.id}`, requestOptions)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(
            `Error: Failed to update customer password. Current password do not match.`
          );
        })
        .then((res) => {
          // console.log(res);
          setHasFormError(false);
          setIsSave(true);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setHasFormError(true);
          console.error(error);
        });
    }
  };

  const updatePasswordStrength = (e) => {
    e.preventDefault();
    const password = e.target.value;
    const failedRules = schema.validate(password, { list: true });
    setFailedRules(failedRules);
    setPassword(password);
  };

  return (
    <>
      {!user && (
        <Redirect
          push
          to={{
            pathname: `/`,
          }}
        />
      )}
      {!isSave && (
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Card className="mv3">
            <Card.Header>Change password</Card.Header>
            {user && (
              <Card.Body>
                <Form.Group className="mh1" controlId={`formOldPassword`}>
                  <Form.Label className="dark-gray f5">
                    Current Password
                  </Form.Label>
                  <Form.Control type="password" required />
                </Form.Group>
                <Form.Group className="mh1" controlId={`formNewPassword`}>
                  <Form.Label className="dark-gray f5">New Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(evt) => updatePasswordStrength(evt)}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    <div>
                      <ShowCheckOrCrossBox
                        isCheck={!failedRules.includes("min")}
                      />{" "}
                      Password is at least 8 characters long.
                    </div>
                    <div>
                      <ShowCheckOrCrossBox
                        isCheck={!failedRules.includes("lowercase")}
                      />{" "}
                      Password has lowercase letters.
                    </div>
                    <div>
                      <ShowCheckOrCrossBox
                        isCheck={!failedRules.includes("uppercase")}
                      />{" "}
                      Password has uppercase letters.
                    </div>
                    <div>
                      <ShowCheckOrCrossBox
                        isCheck={!failedRules.includes("digits")}
                      />{" "}
                      Password has at least 2 numbers.
                    </div>
                    <div>
                      <ShowCheckOrCrossBox
                        isCheck={!failedRules.includes("symbols")}
                      />{" "}
                      Password has at least 1 symbol, !@#$%^&*)(+_.
                    </div>
                    <div>
                      <ShowCheckOrCrossBox
                        isCheck={!failedRules.includes("spaces")}
                      />{" "}
                      Password has no spaces.
                    </div>
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  className="mh1"
                  controlId={`formConfirmNewPassword`}
                >
                  <Form.Label className="dark-gray f5">
                    Confirm New Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(evt) => setConfirmPassword(evt.target.value)}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    <div>
                      <ShowCheckOrCrossBox
                        isCheck={
                          password !== "" && password === confirmPassword
                        }
                      />{" "}
                      Password matches.
                    </div>
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            )}
          </Card>
          {hasFormError && <ErrorMessage error>{errorMessage}</ErrorMessage>}
          {!isPasswordsValid && (
            <ErrorMessage error>
              Error: Please ensure password requirements are met.
            </ErrorMessage>
          )}
          <div className="flex justify-end">
            <div className="mr1">
              <Link
                to={{
                  pathname: `/user/profile/personaldetails`,
                  state: { user: user },
                }}
              >
                <Button type="button">Cancel</Button>
              </Link>
            </div>
            <div className="ml1">
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </Form>
      )}
      {isSave && (
        <Redirect
          push
          to={{
            pathname: `/user/profile/personaldetails`,
            state: { user: user },
          }}
        />
      )}
    </>
  );
};

export default EditPassword;
