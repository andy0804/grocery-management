import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import Progress from "./Progress";
import { deleteItem } from "./actions/groceryItem";
import "./ListItem.css";
const ListItem = () => {
  const dispatch = useDispatch();
  const calculatePercentage = (groceryItems) => {
    const { name, quantity, stock, date } = groceryItems;
    const expiryDate = moment(date).add(stock, "days");
    const todaysDate = moment();
    const daysLeft = expiryDate.diff(todaysDate, "days") + 1;
    console.log(daysLeft, "DAYS ;EFT");
    console.log("stock", stock);
    const percent = (daysLeft / +stock) * 100;
    return percent;
  };
  let { groceryItems, loading } = useSelector((state) => state.groceryItems);
  console.log(groceryItems, "groceryItems in List");

  const grocerySorted = groceryItems.sort((a, b) => {
    return calculatePercentage(a) > calculatePercentage(b) ? 1 : -1;
  });

  const groceryDetails = groceryItems.map((grocery, index) => {
    const { name, quantity, stock, date, _id } = grocery;
    const todaysDate = moment();
    const expiryDate = moment(date).add(stock, "days");
    const daysLeft = expiryDate.diff(todaysDate, "days") + 1;

    return (
      <tr key={index}>
        <td data-title="Name">{name}</td>
        <td data-title="Quantity">{quantity}</td>
        <td data-title="Stock">{stock}</td>
        <td  data-title="Added on">
          <Moment format="DD/MM/YYYY">{date}</Moment>
        </td>
        <td  data-title="Expires on">
          <Moment format="DD/MM/YYYY">{expiryDate}</Moment>
        </td>
        <td className="expiry"  data-title="Days left">{daysLeft}</td>
        <td>
          <button
            onClick={() => {
              dispatch(deleteItem(_id));
              window.scrollTo(0, 0);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      {!loading && groceryItems.length === 0 && (
        <div className="noItem">Please add an item</div>
      )}
      {!loading && groceryItems && groceryItems.length > 0 && (
        <>
          <h2 className="my-2">Groceries Status</h2>
          {grocerySorted.map((grocery, index) => {
            return (
              <>
                <h3>{grocery.name}</h3>
                <Progress
                  key={index}
                  bgcolor="#ef6c00"
                  completed={() => calculatePercentage(grocery).toFixed(0)}
                />
              </>
            );
          })}

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Stock duration</th>
                <th> Date Added</th>
                <th> Date of Exhaustion</th>
                <th> Days left</th>

                <th />
              </tr>
            </thead>
            <tbody>{groceryDetails}</tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListItem;
