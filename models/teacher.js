const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    joining_date: {
        type: Number,
        require: true
    },
    qualification: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    }

});

//crete a model for schema
const teacher = mongoose.model('teacher', studentSchema);
module.exports = teacher;