const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "gamble",
});
app.post("/registration", (req, res) => {
  const userAccount = req.body.userAccount;

  db.query(
    "SELECT * FROM user_info WHERE address = ?",
    [userAccount],
    (err, result) => {
      if (result.length > 0) {
        return;
      } else {
        db.query(
          "INSERT INTO user_info (address,deposited_amount,coins) VALUES(?,?,?)",
          [userAccount, 0, 0],
          (err, result) => {
            if (result) {
              console.log("success");
            }
          }
        );
      }
    }
  );
});
app.listen(3001, () => {
  console.log("server is running");
});
