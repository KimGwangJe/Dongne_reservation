const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "",
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
        console.log(rows);
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

// app.get("/select", (req, res) => {
//   connection.query("SELECT * FROM todo", function (err, rows, fields) {
//     if (err) {
//       console.log(err);
//       // console.log(err);
//     } else {
//       return res.send(rows);
//     }
//   });
// });

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
        console.log(reservation);
        console.log(id);
      } else {
        console.log("성공");
      }
    }
  );
});

// app.delete("/deletelovinglist", (req, res) => {
//   const num = req.body.num;
//   connection.query(
//     "DELETE FROM user WHERE num = ?",
//     [num],
//     function (err, rows, fields) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(num);
//       }
//     }
//   );
// });

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
