import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;


const CarSchema = new mongoose.Schema({
   owner: { type: ObjectId, ref: 'User' },
    brand : {type: String,require: true},
    model : {type: String,require: true},
    image : {type: String,require: true},
    year : {type: Number,require: true},
    category : {type: String,require: true},
    seating_capacity : {type: Number,require: true},
    fuel_type : {type: String,require: true},
    transmission : {type: String,require: true},
    pricePerDay : {type: Number,require: true},
    location : {type: String,require: true},
    description : {type: String,require: true},
    isAvailable : {type: Boolean,default: true},
},{timestamps:true});

const Car = mongoose.model('Car',CarSchema)

export default Car