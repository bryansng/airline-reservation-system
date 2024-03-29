import React, { useState, useEffect } from "react";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { auth: auth_apis } = rest_endpoints;

function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // const [token, setToken] = useState("");
  const userInitialState = {
    id: "",
    email: "",
  };
  const [user, setUser] = useState(userInitialState);

  const logOut = () => {
    setToken("");
    window.localStorage.removeItem("token");
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
        throw new Error(`${resp.status}: Username or email already exists.`);
      })
      .then((res) => {
        console.log(res);
        setToken(res.token);
        window.localStorage.setItem("token", res.token);
        setIsAuthenticated(true);
        setUser({ ...user, ...res.user });
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
        throw new Error(`${resp.status}: User Credentials incorrect.`);
      })
      .then((res) => {
        console.log(res);
        console.log(res.customer);
        setToken(res.token);
        window.localStorage.setItem("token", res.token);
        setIsAuthenticated(true);
        setUser({ ...user, ...res.customer });
        onSuccessCallback();
        console.log("User signed in successfully.");
      })
      .catch((error) => {
        onErrorCallback(error.message);
        console.error(error);
      });
  };

  useEffect(() => {
    // open first time.
    // if (isAuthenticated) {
    //   logOut();
    // }
    if (!token && !isAuthenticated) {
      signIn("pog@pog.com", "test");
      // register("pog@pog.com", "test", "pog", "pog", "pog address", "42069");
    }

    // open after previously logged in.
    if (token && !user.id) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          token: `${token}`,
        }),
      };

      fetch(auth_apis.get_by_token, requestOptions)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(
            `${resp.status} Unauthorized: Token expired. Requires another signin by user.`
          );
        })
        .then((res) => {
          console.log(res);
          setIsAuthenticated(true);
          setUser({ ...user, ...res.customer });
        })
        .catch((error) => {
          console.error(error);
          logOut();
        });
    }
  });

  return {
    isAuthenticated,
    token,
    user,
    signIn,
    logOut,
    register,
    authComponent: (
      <div>
        token: {token}
        <br />
        id: {user.id}
        <br />
        email: {user.email}
        <br />
        username: {user.username}
        <br />
        isAuthenticated: {`${isAuthenticated}`}
        <br />
      </div>
    ),
  };
}

export default useAuthentication;
