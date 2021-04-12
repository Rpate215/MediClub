const express = require('express');
const bodyParser  = require('body-parser');
const app = express();

const mongoose = require('mongoose');
//specify where to find the schema
const Doctor = require('./model/doctor');

//connect and display the status 
mongoose.connect('mongodb://localhost:27017/Mediclub', { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

//in the app.get() method below we add a path for the students API 
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested. 

app.get('/doctors', (req, res, next) => {
    console.log('here')
//call mongoose method find (MongoDB db.Doctors.find())
Doctor.find() 
//if data is returned, send data as a response 
.then(data => res.status(200).json(data))
//if error, send internal server error
.catch(err => {
console.log('Error: ${err}');
res.status(500).json(err);
});

});

//find a student based on the id
app.get('/doctors/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Students.findOne())
    Doctor.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});


//serve incoming post requests to /students
app.post('/doctors', (req, res, next) => {
    // create a new student variable and save request’s fields
    console.log('HII',req.body) 
const doctor = new Doctor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    specialty: req.body.specialty,
    education: req.body.education,
    emailid: req.body.emailid,
    contactno: req.body.contactno,
    bio: req.body.bio,
    hospitalname: req.body.hospitalname,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    availabletime: req.body.availabletime,
    website: req.body.website

});
//send the document to the database 
doctor.save()
    //in case of success
    .then(() => { console.log('Success');})
    //if error
    .catch(err => {console.log('Error:' + err);});
    const doctors = req.body;
    console.log(doctor.firstName + " " + doctor.lastName);
    //sent an acknowledgment back to caller 
    res.status(201).json('Post successful');
});

//serve incoming put requests to /students 
app.put('/doctors/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Doctor.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                firstName : req.body.firstName, 
                lastName : req.body.lastName,
                gender: req.body.gender,
                specialty: req.body.specialty,
                education: req.body.education,
                emailid: req.body.emailid,
                contactno: req.body.contactno,
                bio: req.body.bio,
                hospitalname: req.body.hospitalname,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                availabletime: req.body.availabletime,
                website: req.body.website
            }}, 
            {new:true} 
        ) 
        .then((doctor) => { 
            if (doctor) { //what was updated 
                console.log(doctor); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/doctors/:id", (req, res, next) => {
    doctor.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//to use this middleware in other parts of the application
// module.exports=app;
app.listen(8000);