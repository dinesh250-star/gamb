import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [userAcc, setUserAcc] = useState("");
  const [bool, setBool] = useState(false);
  const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const getAcc = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const a = await provider.send("eth_requestAccounts", []);
    setUserAcc(a);
    setBool(true);
  };
  const connect = async () => {
    getAcc();
  };
  // useEffect(() => {
  //   getAcc();
  // }, [userAcc]);
  const saveUsername = (e) => {
    setUsername(e.target.value);
  };
  const submitData = async (e) => {
    e.preventDefault();

    if (userAcc != "" && bool === true) {
      Axios.post("http://localhost:3001/registration", {
        username: username,
        useraccount: userAcc,
      });
      console.log("submitted form");
      // } else {
      //   getAcc();
      //   Axios.post("http://localhost:3001/registration", {
      //     username: username,
      //     useraccount: userAcc,
      //   });
      //   Axios.get("http://localhost:3001/registration").then((response) => {
      //     console.log(response.data);
      //   });
      //   console.log("submitted form");
    } else {
      alert("connect your wallet");
    }
  };
  return (
    <div>
      <button onClick={connect}>Connect</button>
      <form onSubmit={submitData}>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={saveUsername}
          required
        ></input>
        <button>Connect Metamask</button>
      </form>
      <h1>{userAcc}</h1>
    </div>
  );
};
export default Register;
