var express = require("express");
var bodyParser = require("body-parser");
const _ = require("lodash");
var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
const bcrypt = require('bcryptjs')
const { ObjectID } = require("mongodb");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(doc => {
    res.status(200).send(doc);
  });
});
app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  Todo.findById(id).then(
    doc => {
      doc ? res.status(200).send(doc) : null;
    },
    e => {
      res.status(404).send();
    }
  );
});

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then(
    todo => {
      todo ? res.status(200).send(todo) : null;
    },
    e => {
      res.status(404).send();
    }
  );
});

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(
    todo => {
      todo ? res.status(200).send(todo) : null;
    },
    e => {
      res.status(404).send();
    }
  );
});

app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

var authenticate = (req, res, next) => {
  var token = req.header("x-auth");
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.send(401).send();
    });
};

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.post("/users/login", (req, res) => {

var userData = _.pick(req.body, ["email", "password"])
var user  = new User(userData)
  user.find({
      email: user.email,
    }).then((doc) => {
        bcrypt.compare(user.password, doc.password, (err, res) => {
            if (res) {
                res.send(user)
            }
        })
    })

});

app.listen(port, () => {
  console.log("started on port ", port);
});

module.exports.app = app;


