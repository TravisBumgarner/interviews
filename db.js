const mongoose = require('mongoose');

function connect(){
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/sol').then((m)=>{
    console.log('Connection Opened');
  }).catch((e)=>{
    console.log(e);
  });
}

function disconnect(){
  mongoose.connection.close();
  console.log('Connection Closed');
}

module.exports.connect = connect;
module.exports.disconnect = disconnect;

