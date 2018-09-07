const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/TodoApp",  { useNewUrlParser: true }, (err, client) => {
    if (err) {
     return console.log("Unable to connect to mongodb server");
    }
    var db = client.db('TodoApp');
    console.log('connected to mongodb server')
    db.collection('Todos').insertOne({
        text: 'something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('unable to insert todo', err)

        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    })

    var db = client.db('Users')
    db.collection('Users').insertOne({
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'
    }, (err, result) => {
        if (err) {
            return console.log('unable to create collection', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2))      
    })

    client.close(); 
});
