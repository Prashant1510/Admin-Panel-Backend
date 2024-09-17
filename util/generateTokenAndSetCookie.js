import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,userType, res) => {
 
  const token = jwt.sign({ userId,userType }, process.env.JWT_SECRET, {
    expiresIn: "15d"
  });
  res.cookie("jwt",token,{
    maxAge: 15*24*60*60*1000,
    httpOnly:true,           // prevent cross-site scripting attacks
    sameSite:"None",
  })
};

export default generateTokenAndSetCookie;
