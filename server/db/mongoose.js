var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://reehab:bestintheworld1!@ds249092.mlab.com:49092/node-app' || "mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }
);
module.exports = {
  mongoose
};
