import React, { useState } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { Loading } from "../layout/Loading";
export const Login = () => {
  let { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }));
  };
  return (
    <>
      {loading && <Loading />}
      <h1 className="large text-primary banner">Sign in </h1>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="login-"
        action="create-profile.html"
      >
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
          <input type="submit" className="btn btn-primary" value="Sign in" />
        </div>
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};
