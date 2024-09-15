import jwt from "jsonwebtoken";

const adminProtectRoute =  async (req,res,next) =>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided"})
        }
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid Token"})
        }
        const type = decoded.userType;
        if(type === "admin"){
            next();
        }else{
            return res.status(401).json({error:"Unauthorize access, You are not allowed"})
        }



    } catch (error) {
        console.log("Error in adminProtectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

export default adminProtectRoute;