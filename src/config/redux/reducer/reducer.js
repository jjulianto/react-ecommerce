import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import cartReducer from "./cartReducer";

const reducer = combineReducers({
  homeReducer,
  cartReducer,
});

export default reducer;
