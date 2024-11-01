const express = require('express');
const dbcon = require('./dbcon');
require('dotenv').config();
//import Schema

const teacher = require('./models/teacher');
const College = require('./models/college');

const bodyparser = require('body-parser');


const app = express();
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send("welcome back harsh");
});

// test api is working our not (https request)

app.get('/campus', (req, res) => {
    console.log('hello student welcome to college campus!');
});

//create post method for college
app.post('/college', async(req, res) => {
    try {
        const data = req.body; //hold all body data 
        const newStudent = new College(data);
        const response = await newStudent.save();
        console.log('data is saved..');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error..' });
    }
});

//create get method for college student

app.get('/college', async(req, res) => {
    try {

        const response = await College.find();
        console.log('data is finded..');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: '' })
    }
});



//create delete method for college

app.delete('/college/:id', async(req, res) => {
    try {
        const studentid = req.params.id; //select id data
        const response = await College.findByIdAndRemove(studentid);
        if (!response) {
            return res.status(404).json('student id is invalid please try again..');
        }
        console.log('student is deleted..');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error..' });
    }
});

//crete update method for update college student info or data
//use of patch || put
app.patch('/college/:id', async(req, res) => {
    try {
        const studentdata = req.body; //get the student id from url
        const studentid = req.params.id; //hget the updated data from the request body
        const response = await College.findByIdAndUpdate(studentid, studentdata, {
            new: true,
            RunValidator: true
        });
        if (!response) {
            return res.status(404).json({ msg: 'student is not founde....' });
        }
        console.log('data is updeted...');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error..' })
    }

});

//crete post method for teacher 

app.post('/teacher', async(req, res) => {
    try {
        const data = req.body;
        const newTeacher = new teacher(data);
        const response = await newTeacher.save();
        console.log('teacher info is saved...');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error..');
    }
});

//create get method for teachrer 

app.get('/teacher', async(req, res) => {
    try {
        const response = await teacher.find();
        console.log('data is find..');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error..' });
    }
});

//crete delete method for teacher

app.delete('/teacher/:id', async(req, res) => {
    try {
        const teacherid = req.params.id;

        if (!response) {
            return res.status(404).json('teacher id is invalid..');
        }
        const response = await teacher.findByIdAndRemove(teacherid);
        console.log('teacher is deleted..');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error..' });
    }
});

//crete update method for teacher
//with use of patch || put

app.patch('/teacher/:id', async(req, res) => {
    try {
        const teacherid = req.params.id;
        const teacherdata = req.body;
        const response = await teacher.findByIdAndUpdate(teacherid, teacherdata, {
            new: true,
            RunValidator: true
        })
        if (!response) {
            return res.status(404).json('Internal Server error');
        }
        console.log('teacher info or data is updated..');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error..' });
    }
});


//using .env and secure your senstiveinformation

const port = process.env.port;
app.listen(port, () => {
    console.log("server is started ...")
});