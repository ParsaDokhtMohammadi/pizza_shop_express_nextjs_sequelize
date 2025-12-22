import createHttpError from "http-errors";
import { employeeModel } from "./employee.model.js";
import fs from "fs";
import path from "path";


export const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await employeeModel.findAll({ raw: true });

        res.status(200).json({
            message: "کارمندان دریافت شدند",
            data: employees
        });
    } catch (err) {
        next(err);
    }
};

export const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const employee = await employeeModel.findByPk(id, { raw: true });
        if (!employee) throw createHttpError(404, "کارمند یافت نشد");

        res.status(200).json({
            message: "کارمند دریافت شد",
            data: employee
        });
    } catch (err) {
        next(err);
    }
};


export const upsertEmployee = async (req, res, next) => {
    try {
        const { social_code, full_name, email, phone_number } = req.body;
        const image_url = req.file
            ? `/public/uploads/${req.file.filename}`
            : null;

        const employee = await employeeModel.findByPk(social_code);


        if (!employee) {
            if (!image_url) {
                throw createHttpError(400, "تصویر کارمند الزامی است");
            }

            await employeeModel.create({
                social_code,
                full_name,
                email,
                phone_number,
                image_url
            });

            return res.status(200).json({
                message: "کارمند ایجاد شد"
            });
        }


        if (image_url && employee.image_url) {
            const oldPath = path.join(process.cwd(), employee.image_url);
            fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
        }

        employee.full_name = full_name ?? employee.full_name;
        employee.email = email ?? employee.email;
        employee.phone_number = phone_number ?? employee.phone_number;
        employee.image_url = image_url ?? employee.image_url;
        await employee.save();

        res.status(200).json({
            message: "کارمند بروزرسانی شد"
        });

    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return next(createHttpError(409, "ایمیل یا شماره تماس تکراری است"));
        }
        next(err);
    }
};

export const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;

        const employee = await employeeModel.findByPk(id);
        if (!employee) throw createHttpError(404, "کارمند یافت نشد");


        if (employee.image_url) {
            const imgPath = path.join(process.cwd(), employee.image_url);
            fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
        }

        await employee.destroy();

        res.status(200).json({
            message: "کارمند حذف شد"
        });
    } catch (err) {
        next(err);
    }
};
