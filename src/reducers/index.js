import { counterReducer } from "./counter";
import { isLoggedInReducer } from "./loggedIn";
import { combineReducers } from "redux";
import { gamesReducer } from "./games";
import { PanelReducer } from "./panel";

export const allReducers = combineReducers({
  counter: counterReducer,
  login: isLoggedInReducer,
  games: gamesReducer,
  leftSidePanel: PanelReducer,
});
