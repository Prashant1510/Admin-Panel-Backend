import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    
},{timestamps: true});

const Admin = mongoose.model("Admin",adminSchema);
export default Admin;