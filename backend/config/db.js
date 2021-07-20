// const mongoose = require("mongoose")

// const db = async () => {
//   try {
//     const server = await mongoose.connect('mongodb://localhost:27017/userDetails', {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     })
//     console.log('db connected')
//   } catch (error) {
//     console.error(`Error: ${error.message}`)
//   }
// }

// export default db

const mongoose = require('mongoose');

const server = mongoose.connect('mongodb://localhost:27017/userDetails',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')
});

module.exports = server;

