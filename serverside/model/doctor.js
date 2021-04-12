const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const doctorSchema = new mongoose.Schema({
    firstName:  { type: String, required: true},
    lastName:  { type: String, required: true},
    gender:  { type: String, required: true},
    specialty: { type: String, required: true},
    education: { type: String, required: true},
    emailid: { type: String, required: true},
    contactno: { type: String, required: true},
    bio: { type: String, required: true},
    hospitalname: { type: String, required: true},
    street: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    zipcode: { type: String, required: true},
    availabletime: {type: String, required: true},
    website: { type: String, required: true}

});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Doctor', doctorSchema,'doctors');
//note capital S in the collection name