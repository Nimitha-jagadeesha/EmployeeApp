const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { request } = require("express");
const password = "02PxfNajTgbDPjwa";
const mongoUrl = `mongodb+srv://Nimitha:${password}@cluster0.qwtvb.mongodb.net/<dbname>?retryWrites=true&w=majority`;
require("./Employee");

app.use(bodyParser.json());

const Employee = mongoose.model("employee");
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("conected to mongo");
});
mongoose.connection.on("error", (error) => {
  console.log("error", error);
});

app.get("/", (req, res) => {
  Employee.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post("/send-data", (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    picture: req.body.pic,
    salary: req.body.salary,
    position: req.body.position,
    phone: req.body.phone,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(error);
    });
});

app.post("/delete", (req, res) => {
  Employee.findByIdAndRemove(req.body.id)
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});
app.post("/update", (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    picture: req.body.pic,
    salary: req.body.salary,
    position: req.body.position,
    phone: req.body.phone,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(error);
    });
});
app.listen(3000, () => {
  console.log("server running");
});
