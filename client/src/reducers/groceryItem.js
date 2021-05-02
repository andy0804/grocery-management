/**
 *  [
    {
      name: "Dhara oil",
      quantity: "500ml",
      date: new Date("04/27/2021"),
      stock: "30",
    },
    {
      name: "Rice",
      quantity: "2kg",
      date: new Date("04/25/2021"),
      stock: "30",
    },
    {
      name: "Milk",
      quantity: "2l",
      date: new Date("04/30/2021"),
      stock: "3",
    },
    {
      name: "Bread",
      quantity: "2l",
      date: new Date("04/30/2021"),
      stock: "2",
    },
    {
      name: "Rai",
      quantity: "2l",
      date: new Date("04/30/2021"),
      stock: "5",
    },
  ],
 */
import {
  ADD_GROCERY_ITEMS_FAILURE,
  ADD_GROCERY_ITEMS_REQUEST,
  ADD_GROCERY_ITEMS_SUCCESS,
  CLEAR_GROCERY_ITEMS_REQUEST,
  DELETE_GROCERY_ITEMS_REQUEST,
  DELETE_GROCERY_ITEMS_SUCCESS,
  GET_GROCERY_ITEMS_FAILURE,
  GET_GROCERY_ITEMS_REQUEST,
  GET_GROCERY_ITEMS_SUCCESS,
} from "../types/groceryItems";

const initialState = {
  groceryItems: [],
  loading: false,
  error: {},
};

const groceryItems = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_GROCERY_ITEMS_REQUEST:
      return { ...state, groceryItems: [] };

    case ADD_GROCERY_ITEMS_REQUEST:
    case GET_GROCERY_ITEMS_REQUEST:
    case DELETE_GROCERY_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_GROCERY_ITEMS_SUCCESS:
      return {
        ...state,
        groceryItems: [payload, ...state.groceryItems],
        loading: false,
      };
    case GET_GROCERY_ITEMS_SUCCESS:
      return { ...state, groceryItems: payload, loading: false };

    case DELETE_GROCERY_ITEMS_SUCCESS:
      const del = state.groceryItems.filter((item) => item._id !== payload.id);
      console.log(del);
      console.log("in state", state.groceryItems);
      console.log("after delete");

      return {
        ...state,
        groceryItems: state.groceryItems.filter(
          (item) => item._id !== payload.id
        ),
        loading: false,
      };

    case GET_GROCERY_ITEMS_FAILURE:
    case ADD_GROCERY_ITEMS_FAILURE:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default groceryItems;
