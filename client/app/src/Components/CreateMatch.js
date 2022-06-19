import { useState } from "react";
import Match from "./Match";
const CreateMatch = () => {
  const [coin, setCoin] = useState("Heads");
  const [bet, setBet] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(coin, bet);
  };
  const coinValue = (e) => {
    setCoin(e.target.value);
  };
  const amount = (e) => {
    setBet(e.target.value);
  };
  const create = () => {
    setShowMatch(true);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <select name="Coin" required onChange={coinValue}>
          <option value="Heads">Heads</option>
          <option value="Tails">Tails</option>
        </select>
        <input
          type="number"
          placeholder="Enter your bet"
          required
          onChange={amount}
        ></input>
        <button onClick={create}>Create a Game</button>
      </form>
      {showMatch && <Match coin={coin} amount={bet} />}
    </div>
  );
};
export default CreateMatch;
