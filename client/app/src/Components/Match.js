import { useState } from "react";
import HeadsTails from "./HeadsTails";

const Match = (props) => {
  const [disable, setDisable] = useState(true);
  const joinGame = (result) => {
    if (result === props.coin) {
      console.log("player 1 wins");
    } else {
      console.log("player 2 wins");
    }
  };
  return (
    <div>
      <h1>coin - {props.coin}</h1>
      <h1>Address</h1>
      <h1>Amount - {props.amount}</h1>
      <h1>VS</h1>
      <HeadsTails onJoin={joinGame} />
    </div>
  );
};
export default Match;
