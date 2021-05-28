import React, { useState, useEffect } from "react";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { auth: auth_apis } = rest_endpoints;

// function useAuthentication({
//   // isAuthenticated,
//   // token,
//   // user,
//   // setAppIsAuthenticated: setIsAuthenticated,
//   // setAppToken: setToken,
//   // setAppUser: setUser,
// }) {
function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(window.sessionStorage.getItem("token"));
  // // const [token, setToken] = useState("");
  const userInitialState = {
    id: "",
    email: "",
  };
  const [user, setUser] = useState(userInitialState);

  useEffect(() => {
    // open first time.
    // if (isAuthenticated) {
    //   logOut();
    // }
    if (!isAuthenticated) {
      // signIn("hong.sng@ucdconnect.ie", "root");
      // signIn("first@last.com", "test");
      // signIn("pog@pog.com", "test");
      // register("pog@pog.com", "test", "pog", "pog", "pog address", "42069");
    }

    // open after previously logged in.
    if (!isLoading && token && !user.id) {
      setIsLoading(true);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: `${token}`,
        }),
      };
      // console.log(`token: ${token}`);

      fetch(auth_apis.get_user_by_token, requestOptions)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(
            `Error: Token expired. Requires another signin by user.`
          );
        })
        .then((res) => {
          // console.log(res);
          setIsAuthenticated(true);
          setUser({ ...user, ...res.customer });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          logOut();
        });
    }
  }, [isAuthenticated, isLoading, token, user]);

  const logOut = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(userInitialState);
    console.log("User logged out successfully.");
  };

  const register = (
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNum,
    onErrorCallback = () => {},
    onSuccessCallback = () => {}
  ) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        address: address,
        phoneNum: phoneNum,
      }),
    };

    fetch(auth_apis.register, requestOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`Error: Username or email already exists.`);
        // throw new Error(`${resp.status}: Username or email already exists.`);
      })
      .then((res) => {
        console.log(res);
        setUser({ ...user, ...res.customer });
        setToken(res.token);
        window.sessionStorage.setItem("token", res.token);
        setIsAuthenticated(true);
        onSuccessCallback();
        console.log("User registered successfully.");
      })
      .catch((error) => {
        onErrorCallback(error.message);
        console.error(error);
      });
  };

  const signIn = (
    email,
    password,
    onErrorCallback = () => {},
    onSuccessCallback = () => {}
  ) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(auth_apis.login, requestOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`Error: Unexpected error during request.`);
        // throw new Error(`${resp.status}: User Credentials incorrect.`);
      })
      .then((res) => {
        console.log(res);
        console.log(res.customer);
        if (res.statusCode !== "200" || res.customer == null) {
          onErrorCallback(`Error: ${res.message}`);
        } else {
          setToken(res.token);
          window.sessionStorage.setItem("token", res.token);
          setIsAuthenticated(true);
          setUser({ ...user, ...res.customer });
          onSuccessCallback();
          console.log("User signed in successfully.");
        }
      })
      .catch((error) => {
        onErrorCallback(error.message);
        console.error(error);
      });
  };

  return {
    isAuthenticated,
    token,
    user,
    setUser,
    signIn,
    logOut,
    register,
    authComponent: (
      <div>
        {/* token: {token}
        <br />
        id: {user && user.id}
        <br />
        email: {user && user.email}
        <br />
        username: {user && user.username}
        <br />
        isAuthenticated: {`${isAuthenticated}`}
        <br /> */}
        {JSON.stringify(user)}
      </div>
    ),
  };
}

export default useAuthentication;
