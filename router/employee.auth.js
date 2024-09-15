import express from "express";
const router = express.Router();


router.post("/employeeCreate", employee_Create,);
router.post("/employeeDelete", employee_Delete);
router.post("/employeeUpdate", employee_Update);

export default router;

