/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         social_code:
 *           type: string
 *           description: Iranian national code (10 digits)
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *         phone_number:
 *           type: string
 *         image_url:
 *           type: string
 *       example:
 *         social_code: "1234567890"
 *         full_name: "Ali Rezaei"
 *         email: "ali@test.com"
 *         phone_number: "09123456789"
 *         image_url: "/public/uploads/1710000000.png"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeForm:
 *       type: object
 *       required:
 *         - social_code
 *         - full_name
 *         - email
 *         - phone_number
 *         - image
 *       properties:
 *         social_code:
 *           type: string
 *           description: Iranian national code (10 digits)
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *         phone_number:
 *           type: string
 *         image:
 *           type: string
 *           format: binary
 */
/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee management (Admin only)
 */
/**
 * @swagger
 * /api/employee:
 *   post:
 *     summary: Create or update employee (Admin only)
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeForm'
 *     responses:
 *       200:
 *         description: Employee created or updated
 *         content:
 *           application/json:
 *             example:
 *               message: کارمند با موفقیت ذخیره شد
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: اطلاعات نامعتبر است
 *       401:
 *         description: Unauthorized / not admin
 *         content:
 *           application/json:
 *             example:
 *               message: شما به این بخش دسترسی ندارید
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/employee:
 *   get:
 *     summary: Get all employees (Admin only)
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Employees list
 *         content:
 *           application/json:
 *             example:
 *               message: کارمندان دریافت شدند
 *               data:
 *                 - social_code: "1234567890"
 *                   full_name: "Ali Rezaei"
 *                   email: "ali@test.com"
 *                   phone_number: "09123456789"
 *                   image_url: "/public/uploads/1710000000.png"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Get employee by social code (Admin only)
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee social code
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             example:
 *               message: کارمند دریافت شد
 *               data:
 *                 social_code: "1234567890"
 *                 full_name: "Ali Rezaei"
 *                 email: "ali@test.com"
 *                 phone_number: "09123456789"
 *                 image_url: "/public/uploads/1710000000.png"
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Delete employee (Admin only)
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee social code
 *     responses:
 *       200:
 *         description: Employee deleted
 *         content:
 *           application/json:
 *             example:
 *               message: کارمند با موفقیت حذف شد
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
