import {Router} from "express"
import { checkAdmin } from "../../common/middlewares/checkAdmin.middleware.js"
import {uploadFile} from "../../config/multer.config.js"
import { deleteEmployee, getAllEmployees, getEmployeeById, upsertEmployee } from "./employee.service.js"
import { validate } from "express-validation"
import { EmployeeSchema } from "./employee.validation.js"
const EmployeeRouter = Router()

EmployeeRouter.get("",checkAdmin,getAllEmployees)
EmployeeRouter.get("/:id",checkAdmin,getEmployeeById)
EmployeeRouter.post("",checkAdmin,uploadFile.single("image"),validate(EmployeeSchema),upsertEmployee)
EmployeeRouter.delete("/:id",checkAdmin,deleteEmployee)

export {EmployeeRouter}