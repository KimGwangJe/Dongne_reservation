const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "",
});

connection.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/user", (req, res) => {
  connection.query("SELECT * FROM user", function (err, rows, fields) {
    if (err) {
      res.send("실패");
    } else {
      res.send(rows);
    }
  });
});

app.get("/oner", (req, res) => {
  connection.query("SELECT * FROM oner", function (err, rows, fields) {
    if (err) {
      res.send("실패");
    } else {
      res.send(rows);
    }
  });
});
app.get("/onerRestaurant", (req, res) => {
  connection.query(
    "select oner.num, oner.inform, oner.id, oner.pw, oner.addressx, oner.addressy, restaurant.name, restaurant.dong, restaurant.foodform, restaurant.tablenum, restaurant.loving,restaurant.rating from oner LEFT join restaurant on oner.addressx = restaurant.addressx and oner.addressy = restaurant.addressy order by restaurant.loving DESC",
    function (err, rows, fields) {
      if (err) {
        res.send("실패");
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/map", (req, res) => {
  connection.query(
    "select oner.num,oner.addressx, oner.addressy,restaurant.name,restaurant.dong,restaurant.foodform,restaurant.tablenum,restaurant.loving,restaurant.rating from oner LEFT join restaurant on oner.addressx = restaurant.addressx and oner.addressy = restaurant.addressy",
    function (err, rows, fields) {
      if (err) {
        res.send("실패");
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/card", (req, res) => {
  connection.query(
    "SELECT card.id, card.bank, card.cardname, card.username, card.balance FROM card",
    function (err, rows, fields) {
      if (err) {
        res.send("실패");
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/createuser", (req, res) => {
  const information = req.body.information;
  const id = req.body.id;
  const pw = req.body.pw;
  const name = req.body.name;
  const point = req.body.point;
  const reservation = req.body.reservation;
  const lovinglist = null;

  connection.query(
    "INSERT INTO user (inform, id,pw,name,point,reservation,lovinglist) values (?,?,?,?,?,?,?)",
    [information, id, pw, name, point, reservation, lovinglist],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.post("/createoner", (req, res) => {
  const information = req.body.information;
  const id = req.body.id;
  const pw = req.body.pw;
  const addressx = req.body.addressx;
  const addressy = req.body.addressy;
  connection.query(
    "INSERT INTO oner (inform, id,pw,addressx,addressy) values (?,?,?,?,?)",
    [information, id, pw, addressx, addressy],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.post("/createrestaurant", (req, res) => {
  const addressx = req.body.addressx;
  const name = req.body.name;
  const dong = req.body.dong;
  const foodform = req.body.foodform;
  const loving = 0;
  const table = req.body.table;
  const addressy = req.body.addressy;
  const rating = 0;
  connection.query(
    "INSERT INTO restaurant (addressx,name,dong,foodform,loving,tablenum,addressy,rating) values (?,?,?,?,?,?,?,?)",
    [addressx, name, dong, foodform, loving, table, addressy, rating],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.post("/createcard", (req, res) => {
  const bank = req.body.bank;
  const cardname = req.body.cardname;
  const username = req.body.username;
  const cardnum = req.body.cardnum;
  const password = req.body.password;
  const cvc = req.body.cvc;
  const balance = req.body.balance;

  connection.query(
    "INSERT INTO card (cardname, bank, username,cardnum,password,cvc,balance) values (?,?,?,?,?,?,?)",
    [cardname, bank, username, cardnum, password, cvc, balance],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.put("/updatelovinglist", (req, res) => {
  const name = req.body.name;
  const dong = req.body.dong;
  const rename = `$."${name}"`;
  const num = req.body.num;
  connection.query(
    "update user set lovinglist = json_insert(`lovinglist`, ?, ?) where num = ?",
    [rename, dong, num],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});
app.put("/deletelovinglist", (req, res) => {
  const name = req.body.name;
  const rename = `$."${name}"`;
  const num = req.body.num;
  connection.query(
    "update user set lovinglist = json_remove(`lovinglist`, ?) where num = ?",
    [rename, num],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});
app.put("/updateloving", (req, res) => {
  const name = req.body.name;
  const dong = req.body.dong;
  const loving = req.body.loving;
  connection.query(
    "UPDATE restaurant SET loving = ? WHERE name = ? && dong = ?",
    [loving, name, dong],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.put("/updatereservation", (req, res) => {
  const reservation = req.body.reservation;
  const id = req.body.id;
  connection.query(
    "UPDATE user SET reservation = ? WHERE id = ?",
    [reservation, id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.put("/updatetablenum", (req, res) => {
  const tablenum = req.body.tablenum;
  const name = req.body.name;
  const dong = req.body.dong;
  connection.query(
    "UPDATE restaurant SET tablenum = ? WHERE name = ? && dong = ?",
    [tablenum, name, dong],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.put("/delreser", (req, res) => {
  const reservation = "";
  const id = req.body.id;
  connection.query(
    "UPDATE user SET reservation = ? WHERE id = ?",
    [reservation, id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("성공");
      }
    }
  );
});

app.delete("/deletecard", (req, res) => {
  const id = req.body.id;
  connection.query(
    "DELETE FROM card WHERE id = ?",
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log(id);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
