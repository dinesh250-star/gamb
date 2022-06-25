import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { dbActions } from "../../store/dbSlice";
const Register = () => {
  const fetchedData = useSelector((state) => state.db.users);
  const count = useSelector((state) => state.db.count);
  const z = useSelector((state) => state.db.users);
  const dispatch = useDispatch();
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
    // const fetch = async() => {

    // }
  };
  const fetchUsers = async () => {
    let r;
    const result = await Axios.get("http://localhost:3001/all-users").then(
      (response) => {
        r = response.data;
      }
    );

    r.map((data) => {
      // const id = data.id;
      // const address = data.address;
      // const deposited_amount = data.deposited_amount;
      // const coins = data.coins;
      // const user_name = data.user_name;

      dispatch(
        dbActions.fetchUserData({
          id: data.id,
          address: data.address,
          deposited_amount: data.deposited_amount,
          coins: data.coins,
          user_name: data.user_name,
        })
      );
    });

    dispatch(dbActions.increment());
  };
  const submitData1 = async (e) => {
    e.preventDefault();
    if (userAcc != "" && bool === true) {
      await fetchUsers();
      dispatch(dbActions.authentication(userAcc));
      Axios.post("http://localhost:3001/registration", {
        username: username,
        useraccount: userAcc,
      });
    } else {
      alert("Connect to Metamask");
    }
  };

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={fetchUsers}>Fetch</button>
      <button onClick={connect} required>
        Connect
      </button>
      <form onSubmit={submitData1}>
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
