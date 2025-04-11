import React, { useContext, useState, useEffect } from "react";
import { Button, TextInput } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import config from "../.config";

function Login() {
  const { initializeUser, user, token, isLoading, logout } = useContext(UserContext);
  const [formType, setFormType] = useState("login");
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Redirect if user is authenticated
  useEffect(() => {
    if (user && token && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [user, token, isLoading, navigate, from]);

  const register = async (event) => {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    try {
      const response = await fetch(`${config.apiUrl}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      const res = await response.json();

      if (res.error) {
        setMessage(res.error.message || "Registration failed.");
        return;
      }

      if (res.jwt && res.user) {
        await initializeUser(jsonData.email, jsonData.password);
        setMessage("Successful Registration.");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    try {
      await initializeUser(jsonData.identifier, jsonData.password);
      setMessage("Successful Login.");
    } catch (error) {
      setMessage("Invalid credentials or server error. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "login" ? "register" : "login"));
    setMessage(null);
  };

  // Show loading state while initializing user context
  if (isLoading) {
    return (
      <div className="form">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="form">
      <form
        onSubmit={formType === "login" ? login : register}
        className="formLogin"
      >
        <h1>{formType === "login" ? "Login" : "Register"}</h1>
        {formType === "register" && (
          <TextInput
            label="Username"
            placeholder="Your username"
            name="username"
            className="textInput"
            required
          />
        )}
        <TextInput
          type="email"
          label="Email"
          placeholder="your@email.com"
          name={formType === "login" ? "identifier" : "email"}
          className="textInput"
          required
        />
        <br />
        <TextInput
          type="password"
          label="Password"
          placeholder="Your password"
          name="password"
          className="textInput"
          required
        />
        <br />
        <div className="group1">
          <Button type="submit" disabled={isSubmitting}>
            {formType === "login" ? "Login" : "Register"}
          </Button>
          <Button
            variant="light"
            onClick={toggleFormType}
            disabled={isSubmitting}
          >
            {formType === "login" ? "Register" : "Login"}
          </Button>
        </div>
        {/* {isSubmitting && <div className="spinner"></div>} */}
        {message && <p className="errorMessage">{message}</p>}
      </form>
    </div>
  );
}

export default Login;