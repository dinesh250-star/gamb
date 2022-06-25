const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { retry } = require("statuses");
const { application } = require("express");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "gamble",
});
app.get("/d", (req, res) => {
  res.send("hello world!");
});
app.get("/all-users", (req, res) => {
  db.query("SELECT * FROM user_info", (err, result) => {
    if (result) {
      res.send(result);
    } else {
      console.log("Error querying");
    }
  });
});
app.post("/registration", (req, res) => {
  const userAccount = req.body.useraccount;
  const userName = req.body.username;
  db.query(
    "SELECT * FROM user_info WHERE address = ?",
    [userAccount],
    (err, result) => {
      if (result.length > 0) {
        app.get("/registration", (req, res) => {
          res.send({ result: "true" });
        });

        return;
      }
      if (err) {
        return err;
      } else {
        db.query(
          "INSERT INTO user_info (address,deposited_amount,coins,user_name) VALUES(?,?,?,?)",
          [userAccount, 0, 0, userName],
          (err, result) => {
            if (err) {
              console.log("error2");
            }
          }
        );
      }
    }
  );
});
app.listen(3001, () => {
  console.log("server is runnindddg");
});
