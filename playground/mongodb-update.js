const { MongoClient, ObjectID } = require("mongodb");
MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to mongodb server");
    }
    var db = client.db('TodoApp');
    db.collection('Users').findOneAndUpdate(
        {
          _id: new ObjectID('5b8fcce32017de34b897483d')
        },
        {
          $set: {
            name: 'jack'
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => {
        console.log(result);
      });

    // client.close();
  }
);
