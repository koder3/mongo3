const {MongoClient, ObjectID} = require("mongodb");
MongoClient.connect("mongodb://localhost:27017/TodoApp",  { useNewUrlParser: true }, (err, client) => {
    if (err) {
     return console.log("Unable to connect to mongodb server");
    }
    // var db = client.db('TodoApp')
    // console.log("connected to mongodb server");
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Count ${count}`)
    // }, (err) => {
    //     console.log('unable to fetch todos')
    // })
    var db = client.db('Users')
    db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
     }, (err) => {
        console.log(err)
    }) 

    // client.close(); 
});
