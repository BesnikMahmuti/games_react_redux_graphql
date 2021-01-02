import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";
import { allReducers } from "./reducers";
import { AnotherComponent } from "./components/anotherComponent";
import axios from "axios";
import { LeftSidePanel } from "./components/LeftSidePanel";
import "regenerator-runtime/runtime";
import GameList from "./components/GameList";
import { list_games } from "./queries";
import { post } from "./http/http";
import { Header } from "./components/Header";
import "./styles/style.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const listGames = ({ games, gamespagination, offset }) => {
  return {
    type: "LISTGAMES",
    payload: { games, gamespagination, offset },
  };
};

const App = () => {
  const dispatch = useDispatch();
  let { offset = 0 } = useSelector((state) => state.games);
  console.log("main offseeeet", offset);

  useEffect(() => {
    const getGames = async () => {
      const { data = {} } = await post(
        "http://localhost:5000/graphql",
        list_games(3, offset || 0),
        {
          "Content-Type": "application/json",
        }
      );
      console.log({ data });
      dispatch(
        listGames({
          games: data.games,
          gamespagination: data.gamespagination,
          offset: offset || 0,
        })
      );
    };
    getGames();
  }, [offset]);

  return (
    <div>
      <Header />
      <GameList />
      <LeftSidePanel />
    </div>
  );
};
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
