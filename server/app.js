const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

// add your code here

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const router = express.Router();
app.use("/", router);

let mockData = [
  {
    todoItemId: 0,
    name: "an item",
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: "another item",
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: "a done item",
    priority: 1,
    completed: true
  }
];

router.route("/").get(function(req, res) {
  res.status(200).send({ status: "ok" });
});

router.route("/api/TodoItems/").get(function(req, res) {
  res.status(200).send(mockData);
});

router.route("/api/TodoItems/:number").get(function(req, res) {
    let result = mockData.filter(item => item.todoItemId == req.params.number)
  res.status(200).send(result[0]);
});

router.route("/api/TodoItems").post(function(req, res) {
  console.log(req.body);
  let isUpdate = false;
  for (let i = 0; i < mockData.length; i++) {
    if (req.body.todoItemId == mockData[i].todoItemId) {
      mockData[i] = req.body;
      isUpdate = true;
      break;
    }
  }

  if (!isUpdate) {
    mockData.push(req.body);
  }

  res.status(201).send(req.body);
});

router.route("/api/TodoItems/:number").delete(function(req, res) {
  let deletedItem;
  for (let i = 0; i < mockData.length; i++) {
    if (req.params.number == mockData[i].todoItemId) {
      deletedItem = mockData.splice(i, i+1);
      break;
    }
  }

  res.status(200).send(deletedItem[0]);
});

module.exports = app;
