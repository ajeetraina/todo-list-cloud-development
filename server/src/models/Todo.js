// const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   tags: {
//     type: [String],
//     default: []
//   },
//   image: {
//     type: String,
//     default: null
//   },
//   files: {
//     type: [String],
//     default: []
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Todo', todoSchema);





const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String },
  files: { type: [String] }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

