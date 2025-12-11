/**
 * @swagger
 * components:
 *  schemas:
 *   AuthRegister:
 *    type: object
 *    required:
 *     - full_name
 *     - email
 *     - password
 *    properties:
 *      full_name:
 *       type: string
 *       description: full name of the user, must be between 8 and 32 chars
 *      email:
 *       type: string
 *       description: email of the user, must be valid email format
 *      password:
 *       type: string
 *       description: password of the user, must be between 8 and 32 chars, contain at least one letter and one number
 *    example:
 *      full_name: john doe
 *      email: johnDoe@gmail.com
 *      password: Aa12345678     
 */ 

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: johnDoe@gmail.com
 *         password:
 *           type: string
 *           example: Aa12345678
 */


/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "user created successfully."
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             example:
 *               message: "Password is required"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *         description: login successful
 *         content:
 *           application/json:
 *             example:
 *               message: "login successful."
 *       400:
 *         description: Validation error or invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid email or password"
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             example:
 *               message: "internal server error"
 */

/**
 * @swagger
 * /api/auth/logout:
 *  get:
 *    summary: Logout the user
 *    tags: [Auth]
 *    responses:
 *      200:
 *       description: Logout successful
 *       content:
 *         application/json:
 *          example:
 *           message: "logout successful."
 *      500:
 *       description: server error
 *       content:
 *         application/json:
 *          example:
 *           message: "internal server error"
 */