const mongoose = require('mongoose');
const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    enroll_no: {
        type: String,
        required: true
    }

});
//create a model for the schema
const College = mongoose.model('College', collegeSchema);
module.exports = College;