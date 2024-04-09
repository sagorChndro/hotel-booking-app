import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { loginUser } from "../utils/ApiFunction";
import Header from "../common/Header";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [isValidated, setIsValidated] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const form = e.currentTarget;

    // if (form.checkValidity() === false) {
    //   setIsValidated(true);
    //   return;
    // }

    const success = await loginUser(login);
    console.log('success', success)
    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }

    setIsValidated(true);

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const success = await loginUser(login);
  //   if (success) {
  //     const token = success.token;
  //     auth.handleLogin(token);
  //     navigate(redirectUrl, { replace: true });
  //   } else {
  //     setErrorMessage("Invalid username or password. Please try again.");
  //   }
  //    setIsValidated(true);
  //   setTimeout(() => {
  //     setErrorMessage("");
  //   }, 4000);
  // };

  return (
    <section className="container col-6 mt-5 mb-5 card p-4 shadow-lg">
      <Header title={"Login Form"}/>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2>Login</h2>
      <form noValidate validated={isValidated} onSubmit={handleSubmit} className="mt-3">
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${isValidated && !login.email && "is-invalid"}`}
              value={login.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              id="password"
              name="password"
              type="password"
              className={`form-control ${isValidated && !login.password && "is-invalid"}`}
              value={login.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              minLength="6"
            />
            <div className="invalid-feedback">
              Enter your valid password.
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-hotel"
            style={{ marginRight: "10px" }}
          >
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don't have an account yet?<Link to={"/register"}> Register</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
