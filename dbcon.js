const mongoose = require('mongoose');
require('dotenv').config();

//local configration url

//const mongourl = 'mongodb://localhost:27017/dbcon';

//globly configration with using mongodb atlas(cluster)

// const mongourl = (process.env.clustorurl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
const mongourl = process.env.clustorurl || 'mongodb://localhost:27017/dbcon'



mongoose.connect(mongourl);

//create connection  handeller
const dbcon = mongoose.connection;
dbcon.on('connected', () => {
    console.log('database server is start..');
});
dbcon.on('disconnected', () => {
    console.log('database is disconnected..');
});
dbcon.on('err', (err) => {
    console.log('internal database server error..', err);
});

//export handeller
module.exports = dbcon;