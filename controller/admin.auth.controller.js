import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../util/generateTokenAndSetCookie.js"

// this is for singup as new admin user
export const admin_signup = async (req, res) => {
  try {
    const {
      profilePic,
      name,
      email,
      password,
      confirmPassword,
      gender,
    } = req.body; // inputs taken form body

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const admin = await Admin.findOne({ email }); // to find the admin in the admin database

    if (admin) {
      return res.status(400).json({ error: "admin already exists" });
    }

    // Function to generate a random 6-digit number
    const generateRandomId = () => {
      return Math.floor(100000 + Math.random() * 900000); 
    };

    let randomId;
    let isUnique = false;

    
    while (!isUnique) {
      randomId = generateRandomId();
      const existingadmin = await Admin.findOne({ id: randomId });

      if (!existingadmin) {
        isUnique = true; // Exit loop if the ID is unique
      }
    }

    // Hashing the password for authentication and adding the profile picture
    const salt = await bcrypt.genSalt(10); // for creating salt
    const hashedpassword = await bcrypt.hash(password, salt); // for creating hash password with salt

    const newAdmin = new Admin({
      // creating the newadmin instance form Admin model schema
      id: randomId,
      profilePic,
      name,
      gender,
      email,
      password: hashedpassword,
    });

    if (newAdmin) {
      generateTokenAndSetCookie(newAdmin._id,"admin", res); // for generating authentication token and save in browser cookie
      await newAdmin.save(); // for saving the newadmin into to the database

      return res.status(201).json({
        // for sending the success status and json data to browser
        id: newAdmin.id,
        name: newAdmin.name,
        profilePic: newAdmin.profilePic,
        gender: newAdmin.gender,
      });
    } else{
      return res.status(400).json({ error: "Invalid admin data" });
    }
  } catch (error) {
    console.log("Error in signup,", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// this is to login for admin
export const admin_login = async (req,res) =>{
    try {
      const { email, password } = req.body;                // taking input from browser
      const admin = await Admin.findOne({ email });           // find the admin in the admin database
      const isPasswordCorrect = await bcrypt.compare(
        password,
        admin?.password || ""
      );
      if (!admin || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      generateTokenAndSetCookie(admin._id,"admin", res);         //generating the jwt token with adminID and store into cookie and send res to browser 
      return res.status(200).json({
        _id: admin._id,
        name: admin.name,
        profilePic: admin.profilePic,
        gender: admin.gender,
      }); 
    } catch (error) {
      console.log("Error in login,", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

// this is for logout
export const admin_logout = async (req,res) =>{
    try {
      res.cookie("jwt","",{maxAge: 0});       //reset the jwt cookie to null
      res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
      console.log("Error in logout,", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
}