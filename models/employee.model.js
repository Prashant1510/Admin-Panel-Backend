import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        required: true,
        default: ""
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    designation:{
        type: String,
        required: true,
    },
    course:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    
},{timestamps: true});

const Employee = mongoose.model("Employee",employeeSchema);
export default Employee;