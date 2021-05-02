import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

export const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );
  const authenticatedLinks = (
    <>
      <li>
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            history.push({
              pathname: "/",
            });
          }}
        >
          <i className="fas fa-user" /> <span>Grocery Management</span>
        </Link>
      </li>
      <li>
        <Link
          to="/add"
          onClick={(e) => {
            e.preventDefault();
            history.push({
              pathname: "/add",
            });
          }}
        >
          <i className="fas fa-plus" /> <span>Add Item</span>
        </Link>
      </li>

      <li>
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
            history.push({
              pathname: "/",
            });
          }}
        >
          <span>Logout</span>
        </Link>
      </li>
    </>
  );

  const links = isAuthenticated ? authenticatedLinks : guestLinks;
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html">
          <i className="fas fa-shopping-cart"></i> Manage your groceries
        </a>
      </h1>
      <ul>{!loading && links}</ul>
    </nav>
  );
};
