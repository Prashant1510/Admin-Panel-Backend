import express from "express";
import { employee_Create, employee_Delete, employee_fetchAll, employee_Update } from "../controller/employee.auth.controller.js";
import adminProtectRoute from "../middleware/AdminProtectRoute.js";
const router = express.Router();


router.post("/employeeCreate",adminProtectRoute, employee_Create);
router.delete("/employeeDelete/:id",adminProtectRoute, employee_Delete);
router.get("/fetchallemploye",adminProtectRoute, employee_fetchAll);
router.post("/employeeUpdate/:id",adminProtectRoute, employee_Update);


export default router;

