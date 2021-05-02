import {
  ADD_GROCERY_ITEMS_FAILURE,
  ADD_GROCERY_ITEMS_REQUEST,
  ADD_GROCERY_ITEMS_SUCCESS,
  DELETE_GROCERY_ITEMS_FAILURE,
  DELETE_GROCERY_ITEMS_REQUEST,
  DELETE_GROCERY_ITEMS_SUCCESS,
  GET_GROCERY_ITEMS_FAILURE,
  GET_GROCERY_ITEMS_REQUEST,
  GET_GROCERY_ITEMS_SUCCESS,
} from "../types/groceryItems";
import api from "../utils/api";

export const addItem = (formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    dispatch({ type: ADD_GROCERY_ITEMS_REQUEST });
    const response = await api.post(`/grocery`, formData, config);

    dispatch({ type: ADD_GROCERY_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_GROCERY_ITEMS_FAILURE, payload: error.error });
  }
};

export const getItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_GROCERY_ITEMS_REQUEST });
    const response = await api.get(`/grocery/${id}`);
    dispatch({ type: GET_GROCERY_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_GROCERY_ITEMS_FAILURE, payload: error.error });
  }
};
export const deleteItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_GROCERY_ITEMS_REQUEST });
    const response = await api.delete(`/grocery/${id}`);
    dispatch({ type: DELETE_GROCERY_ITEMS_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({ type: DELETE_GROCERY_ITEMS_FAILURE, payload: error.error });
  }
};
