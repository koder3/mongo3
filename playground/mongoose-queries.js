const {mongoose} = require('../server/db/mongoose')
const {ObjectID} = require('mongodb')
const {Todo} = require('../server/models/todo')

// var id = '5b915db4a6c457147068b5311'

// if (!ObjectID.isValid(id)) {
//     console.log('id not valid')
// }
//  Todo.find({
//      _id: id
//  }).then((todos) => {
//      console.log('Todos', todos)
//  });

//  Todo.findOne({
//      _id: id
//  }).then((todo) => {
//      console.log('Todos', todo)
//  })

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log('Todos', todo)
// }, (e) => {
//     console.log(e)
// })