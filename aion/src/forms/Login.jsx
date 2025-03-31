import React, { useContext, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import config from "../.config";

function Login() {
  const { initializeUser } = useContext(UserContext);
  const [formType, setFormType] = useState("login");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const register = async (event) => {
    event.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    };

    try {
      const req = await fetch(
        `${config.apiUrl}/api/auth/local/register`,
        reqOptions
      );
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        setIsLoading(false);
        return;
      }

      if (res.jwt && res.user) {
        setMessage("Successful Registration.");
        await initializeUser(jsonData.email, jsonData.password);
        navigate(from, { replace: true });
      }
    } catch (error) {
      alert("Request failed:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    };

    try {
      const req = await fetch(`${config.apiUrl}/api/auth/local`, reqOptions);
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        setIsLoading(false);
        return;
      }

      if (res.jwt && res.user) {
        setMessage("Successful Login.");
        await initializeUser(jsonData.identifier, jsonData.password);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "login" ? "register" : "login"));
    setMessage(null);
  };

  return (
    <div className="form">
      <form
        onSubmit={formType === "login" ? login : register}
        className="formLogin"
      >
        <h1>{formType === "login" ? "Login" : "Register"}</h1>
        {formType === "register" && (
          <>
            <TextInput
              label="Username"
              placeholder="Your username"
              name="username"
              className="textInput"
            />
          </>
        )}
        <TextInput
          type="email"
          label="Email"
          placeholder="your@email.com"
          name={formType === "login" ? "identifier" : "email"}
          className="textInput"
        />
        <br />
        <TextInput
          type="password"
          label="Password"
          placeholder="Your password"
          name="password"
          className="textInput"
        />
        <br />
        <div className="group1">
          <Button type="submit" disabled={isLoading}>
            {formType === "login" ? "Login" : "Register"}
          </Button>
          <Button variant="light" onClick={toggleFormType} disabled={isLoading}>
            {formType === "login" ? "Register" : "Login"}
          </Button>
        </div>
        {isLoading && (
          <div className="spinner" />
        )}
        {message && <p className="errorMessage">{message}</p>}
      </form>
    </div>
  );
}

export default Login;