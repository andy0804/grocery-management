import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addItem } from "./actions/groceryItem";
import "./AddItem.css";
import { useHistory } from "react-router";

const initalState = {
  name: "",
  quantity: "",
  date: "",
  stock: "",
};

const AddItem = () => {
  const history = useHistory();

  const [formData, setFormData] = useState(initalState);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addItem({ ...formData, date: Date.now() }));
    history.push({
      pathname: "/",
    });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2> Add Items</h2>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label htmlFor="namedInput">Name:</label>

          <input onChange={onChange} type="text" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="namedInput">Quantity:</label>

          <input onChange={onChange} type="text" name="quantity" />
        </div>
        <div className="form-group">
          <label htmlFor="namedInput">Stock duration (days):</label>

          <input onChange={onChange} type="number" name="stock" />
        </div>
        <input type="submit" value="Add" className="btn btn-primary" />
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
      </form>
    </div>
  );
};

export default AddItem;
