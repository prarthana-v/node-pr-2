const express = require("express");
const app = express();
const port = 8000;

let data = [];
app.use(express.urlencoded());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("table", {
    todolist: data,
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`server is started on port :- ${port}`);
});

app.get("/", (req, res) => {
  return res.render("table");
});

app.get("/add", (req, res) => {
  return res.render("form");
});

app.post("/insertRecord", (req, res) => {
  // console.log(req.body);
  const { task, date, time, status } = req.body;
  let obj = {
    id: Date.now(),
    task: task,
    date: date,
    time: time,
    status: status,
  };
  data.push(obj);
  console.log(data);
  return res.redirect("/");
});

app.get("/deleterecord", (req, res) => {
  let id = req.query.id;
  let deletedata = data.filter((val) => val.id != id);
  data = deletedata;
  console.log("user deleted");
  return res.redirect("/");
});

app.get("/editrecord", (req, res) => {
  // console.log(req.query.id);
  let id = req.query.id;
  let single = data.find((val) => val.id == id);
  console.log(single);
  return res.render("edit", {
    single,
  });
});

app.post("/UpdateRecord", (req, res) => {
  let id = req.body.editid;
  let name = req.body.username;
  let phone = req.body.userphone;
  console.log(id, name);

  let updatedData = data.map((val) => {
    if (val.id == id) {
      val.username = name;
      val.userphone = phone;
    }
    return val;
  });
  data = updatedData;
  console.log(data);

  console.log("User updated....!!!");
  return res.redirect("/");
});
