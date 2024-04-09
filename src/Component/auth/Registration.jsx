import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../utils/ApiFunction";
import Header from "../common/Header";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    // const form = e.currentTarget;

    // if (form.checkValidity() === false) {
    //   setIsValidated(true);
    //   return;
    // }

    console.log("Registration Data:", registration);
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error: ${error.message}`);
    }

    setIsValidated(true);

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <section className="container col-6 mt-5 mb-5 card p-4 shadow-lg">
       <Header title={"Registration Form"}/>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && <p className="alert alert-success">{successMessage}</p>}

      <h2>Register</h2>
      <form noValidate validated={isValidated} onSubmit={handleRegistration} className="mt-3">
        <div className="mb-3 row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-10">
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={`form-control ${isValidated && !registration.firstName && "is-invalid"}`}
              value={registration.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              required
            />
            <div className="invalid-feedback">Please enter your first name.</div>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={`form-control ${isValidated && !registration.lastName && "is-invalid"}`}
              value={registration.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              required
            />
            <div className="invalid-feedback">Please enter your last name.</div>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${isValidated && !registration.email && "is-invalid"}`}
              value={registration.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
            <div className="invalid-feedback">Please enter a valid email address.</div>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className={`form-control ${isValidated && !registration.password && "is-invalid"}`}
              id="password"
              name="password"
              value={registration.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              minLength="6"
            />
            <div className="invalid-feedback">Enter your password.</div>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
            Register
          </button>
          <span style={{ marginLeft: "10px" }}>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Registration;
