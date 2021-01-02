import React from "react";
import { useSelector } from "react-redux";

export const AnotherComponent = () => {
  const counter = useSelector((state) => state.counter);
  const gamesList = useSelector((state) => state.games);
  return (
    <div>
      <h1>Another comp: {JSON.stringify(gamesList)}</h1>
    </div>
  );
};
