import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../Common/ErrorMessage";
import passwordValidator from "password-validator";
import { Link } from "react-router-dom";

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
  className: `b--gray ma0 br2 ba hover-bg-light-gray ml1 mr1`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
`;

const Container = styled.div.attrs({ className: `ma0 pa0` })``;

const ShowCheckOrCrossBox = ({ isCheck }) => {
  const defaultSize = "10px";
  const defaultStyle = {
    display: "inline-block",
    height: defaultSize,
    width: defaultSize,
  };
  return (
    <>
      {isCheck ? (
        <div style={{ ...defaultStyle, backgroundColor: "#19a974" }}></div>
      ) : (
        <div style={{ ...defaultStyle, backgroundColor: "#ff4136" }}></div>
      )}
      {/* {isCheck ? (
        <span style={{ color: "transparent", textShadow: "0 0 0 #19a974" }}>
          &#9745;
        </span>
      ) : (
        <span style={{ color: "transparent", textShadow: "0 0 0 #ff4136" }}>
          &#9746;
        </span>
      )} */}
    </>
  );
};

function SignInModal({ show, onHide, toggleBetweenSignInRegister, signIn }) {
  const [hasFormError, setHasFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitError = (msg) => {
    setErrorMessage(msg);
    setHasFormError(true);
  };

  const onSubmitSuccess = (msg) => {
    onHide();
    setHasFormError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.formSignInEmail.value;
    const password = e.target.formSignInPassword.value;
    signIn(email, password, onSubmitError, onSubmitSuccess);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <h2>Welcome back!</h2>
      </Modal.Header>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Body>
          <Form.Group controlId="formSignInEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="johndoe@gmail.com"
              // defaultValue="hong.sng@ucdconnect.ie"
              required
            />
          </Form.Group>
          <Form.Group controlId="formSignInPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              // defaultValue="root"
              required
            />
          </Form.Group>
          {hasFormError && <ErrorMessage error>{errorMessage}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={toggleBetweenSignInRegister}>
            New user? Register
          </Button>
          <Button type="submit">Sign in</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function RegisterModal({
  show,
  onHide,
  toggleBetweenSignInRegister,
  register,
}) {
  const [hasFormError, setHasFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const onSubmitError = (msg) => {
    setErrorMessage(msg);
    setHasFormError(true);
  };

  const onSubmitSuccess = (msg) => {
    onHide();
    setHasFormError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.formRegisterFirstName.value;
    const lastName = e.target.formRegisterLastName.value;
    const email = e.target.formRegisterEmail.value;
    const password = e.target.formRegisterPassword.value;
    const confirmPassword = e.target.formRegisterConfirmPassword.value;
    const address = e.target.formRegisterAddress.value;
    const phoneNum = e.target.formRegisterPhoneNum.value;

    if (password !== confirmPassword || failedRules.length !== 0) {
      setIsPasswordsValid(false);
    } else {
      register(
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNum,
        onSubmitError,
        onSubmitSuccess
      );
      setIsPasswordsValid(true);
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
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <h2>Welcome!</h2>
      </Modal.Header>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Body>
          <Form.Group controlId="formRegisterFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              required
              // defaultValue="pog"
            />
          </Form.Group>
          <Form.Group controlId="formRegisterLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doe"
              required
              // defaultValue="pog"
            />
          </Form.Group>
          <Form.Group controlId="formRegisterAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="University College Dublin"
              required
              // defaultValue="pog address"
            />
          </Form.Group>
          <Form.Group controlId="formRegisterPhoneNum">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="12341234"
              required
              // defaultValue="42069"
            />
          </Form.Group>

          <Form.Group controlId="formRegisterEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="johndoe@gmail.com"
              required
              // defaultValue="pog@pog.com"
            />
          </Form.Group>
          <Form.Group controlId="formRegisterPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              required
              // defaultValue="test"
              // isInvalid={!isPasswordsValid}
              onChange={(evt) => updatePasswordStrength(evt)}
            />
            <Form.Text id="passwordHelpBlock" muted>
              <div>
                <ShowCheckOrCrossBox isCheck={!failedRules.includes("min")} />{" "}
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
            {/* <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group controlId="formRegisterConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              required
              // defaultValue="test"
              // isInvalid={!isPasswordsValid}
              onChange={(evt) => setConfirmPassword(evt.target.value)}
            />
            {/* <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback> */}
            <Form.Text id="passwordHelpBlock" muted>
              <div>
                <ShowCheckOrCrossBox
                  isCheck={password !== "" && password === confirmPassword}
                />{" "}
                Password matches.
              </div>
            </Form.Text>
          </Form.Group>
          {hasFormError && <ErrorMessage error>{errorMessage}</ErrorMessage>}
          {!isPasswordsValid && (
            <ErrorMessage error>
              Error: Please ensure password requirements are met.
            </ErrorMessage>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={toggleBetweenSignInRegister}>
            Existing user? Sign in
          </Button>
          <Button type="submit">Register</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function Account({ user, signIn, register, logOut, isAuthenticated }) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <Container>
      {!isAuthenticated ? (
        <>
          <Button type="button" onClick={() => setShowSignIn(true)}>
            Sign in
          </Button>
          <Button type="button" onClick={() => setShowRegister(true)}>
            Register
          </Button>
          <SignInModal
            show={showSignIn}
            toggleBetweenSignInRegister={() => {
              setShowSignIn(false);
              setShowRegister(true);
            }}
            onHide={() => setShowSignIn(false)}
            signIn={signIn}
          />
          <RegisterModal
            show={showRegister}
            toggleBetweenSignInRegister={() => {
              setShowRegister(false);
              setShowSignIn(true);
            }}
            onHide={() => setShowRegister(false)}
            register={register}
          />
        </>
      ) : (
        <>
          <Link
            to={{
              pathname: `/user/profile`,
            }}
          >
            <Button type="button">Profile</Button>
          </Link>
          <Link to="/">
            <Button type="button" onClick={() => logOut()}>
              Logout
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
}

export default Account;
