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
  database: "testnode",
});
app.get("/", (req, res) => {
  res.send("hello world!");
});
app.post("/create", (req, res) => {
  const rollNo = req.body.rno;
  db.query("INSERT INTO hi (rno) VALUES(?)", [rollNo], (err, result) => {
    if (err) {
      console.log("error");
    } else {
      res.send("values inserted");
    }
  });
});
app.listen(3001, () => {
  console.log("server is runnindddg");
});
