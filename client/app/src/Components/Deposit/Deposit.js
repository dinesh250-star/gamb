import { useState } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
//a
import Gamble from "../../artifacts/contracts/Gamble.sol/Gamble.json";
const Deposit = () => {
  const acc = useSelector((state) => state.db.userAcc);
  const [matic, setMatic] = useState(1);
  const [hi,setHi] = useState("");
  const [getUBalance, setGetUBalance] = useState(0);
  const logInState = useSelector((state) => state.db.loggedIn);
  const gambleAddress = "0x45c301cb797BfAbC889a61e3aE4f22519fE7A324";
  const storeMatic = async (e) => {
    setMatic(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    DepositHandler();
  };
  if (logInState) {
    document.getElementById("button1").disabled = false;
  }

  const getUserBalance = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(gambleAddress, Gamble.abi, provider);
      try {
        const data = await contract.getUserBalance(acc);
        const dataa = data.toString();
        console.log("datau: ", dataa);
        setGetUBalance(dataa);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  const DepositHandler = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(gambleAddress, Gamble.abi, signer);
      const transaction = await contract.deposit(acc, {
        value: ethers.utils.parseEther(matic.toString()),
      });
      await transaction.wait();
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          placeholder="Enter the matic"
          onChange={storeMatic}
          value={matic}
        ></input>
        <button type="submit" id="button1" disabled>
          Deposit
        </button>
      </form>
      <button onClick={getUserBalance}>Get balance of the User</button>
      <h1>{getUBalance}</h1>
      <h1>{acc}</h1>
    </div>
  );
};
export default Deposit;
