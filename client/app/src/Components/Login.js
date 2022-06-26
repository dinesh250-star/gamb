import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Axios from "axios";
import { dbActions } from "../store/dbSlice";
const Login = () => {
  const [userAccount, setUserAccount] = useState("");
  const [boolLogin, setBoolLogin] = useState(false);
  const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  async function requestAccount() {
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAccount(accounts[0]);
        setBoolLogin(true);
        Axios.post("http://localhost:3001/registration", {
          userAccount: accounts[0],
        });
        // store in db or dont
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }
  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
    }
  };
  return (
    <div>
      <button onClick={connectMetamask}>Connect To Metamask</button>
      <h1>Connected Wallet: {userAccount}</h1>
    </div>
  );
};
export default Login;
