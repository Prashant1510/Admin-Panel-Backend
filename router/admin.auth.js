import express from "express";
import { admin_login, admin_logout, admin_signup } from "../controller/admin.auth.controller";
const router = express.Router();


router.post("/adminSignup", admin_signup,);
router.post("/adminLogin", admin_login);
router.post("/adminLogout", admin_logout);

export default router;

