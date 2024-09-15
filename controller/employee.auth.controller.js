import express from "express";
import Employee from "../models/employee.model";
export const employee_Create = async (req, res) => {
  try {
    const {
      profilePic,
      name,
      email,
      phoneNumber,
      designation,
      course,
      password,
      confirmPassword,
      gender,
    } = req.body; // inputs taken form body

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const employee = await User.findOne({ email }); // to find the user in the User database

    if (employee) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Function to generate a random 6-digit number
    const generateRandomId = () => {
      return Math.floor(100000 + Math.random() * 900000); 
    };

    let randomId;
    let isUnique = false;

    
    while (!isUnique) {
      randomId = generateRandomId();
      const existingEmployee = await Employee.findOne({ id: randomId });

      if (!existingEmployee) {
        isUnique = true; // Exit loop if the ID is unique
      }
    }

    // Hashing the password for authentication and adding the profile picture
    const salt = await bcrypt.genSalt(10); // for creating salt
    const hashedpassword = await bcrypt.hash(password, salt); // for creating hash password with salt

    const newEmployee = new Employee({
      // creating the newUser instance form Employee model schema
      id: randomId,
      profilePic,
      name,
      gender,
      phoneNumber,
      designation,
      course,
      email,
      password: hashedpassword,
    });

    if (newEmployee) {
      generateTokenAndSetCookie(newUser._id, res); // for generating authentication token and save in browser cookie
      await newEmployee.save(); // for saving the newUser into to the database

      return res.status(201).json({
        // for sending the success status and json data to browser
        _id: newEmployee._id,
        name: newEmployee.fullName,
        profilePic: newEmployee.profilePic,
        gender: newEmployee.gender,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup,", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
