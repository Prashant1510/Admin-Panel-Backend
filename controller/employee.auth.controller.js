import express from "express";
import Employee from "../models/employee.model.js";

export const employee_Create = async (req, res) => {
  try {
    const {
      profilePic,
      name,
      email,
      phoneNumber,
      designation,
      course,
      gender,
    } = req.body; // inputs taken form body

    const employee = await Employee.findOne({ email }); // to find the user in the User database

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
    });

    if (newEmployee) {
      await newEmployee.save(); // for saving the newUser into to the database

      return res.status(201).json("Created Employee Successfully");
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in creating employee,", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const employee_fetchAll = async (req,res) =>{
    try {
        const Employees = await Employee.find(); // Fetch all jobs from the database
        res.status(200).json(Employees);
    } catch (error) {
        console.log("Error in fetching Employee List,",error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}


export const employee_Delete = async(req,res) =>{
    try {
    const success = await Employee.findOneAndDelete(req.params.id);
    if(success){
        res.status(200).json("Deleeted Employee successfully");
    }
    } catch (error) {
        console.log("Error in deleting Employee,",error.message);
        res.status(500).json({error: "Internal Server Error"}) 
    }
}



export const employee_Update = async(req,res)=>{
  try {
    const { profilePic, name, email, phoneNumber, designation, course, gender } = req.body;
    const updatedEmployeeData = {};

    // Update only the required fields 
    if (profilePic) updatedEmployeeData.profilePic = profilePic;
    if (name) updatedEmployeeData.name = name;
    if (email) updatedEmployeeData.email = email;
    if (phoneNumber) updatedEmployeeData.phoneNumber = phoneNumber;
    if (designation) updatedEmployeeData.designation = designation;
    if (course) updatedEmployeeData.course = course;
    if (gender) updatedEmployeeData.gender = gender;

    let employee = await Employee.findOne({ id: req.params.id });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    //update with new data
    employee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      { $set: updatedEmployeeData },
      { new: true, runValidators: true }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
}