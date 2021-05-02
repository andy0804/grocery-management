import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/action";
import { register } from "../actions/auth";
import { Loading } from "../layout/Loading";
import "./Login.css";
export const Register = () => {
  const dispatch = useDispatch();
  let { isAuthenticated, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      dispatch(setAlert("Passwords do not match", "danger"));
      return;
    } else {
      dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };
  return (
    <>
      {loading && <Loading />}

      <h1 className="large text-primary banner">Sign up </h1>
      <p className="lead m-2">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="form"
        action="create-profile.html"
      >
        <div className="block">
          <input
            className="input-res"
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className="block">
          <input
            className="input-res"
            required
            onChange={(e) => onChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <div className="block">
          <input
            className="input-res"
            required
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
        <div className="block">
          <input
            className="input-res"
            required
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <div className="block">
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </form>
      <p className="m-2">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};
