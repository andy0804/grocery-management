import { combineReducers } from "redux";
import groceryItems from "./groceryItem";
import auth from "./auth";
import alert from "./alert";
export default combineReducers({ auth, groceryItems, alert });
