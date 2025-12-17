/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: o1
 *         quantity:
 *           type: integer
 *           example: 2
 *         price_at_purchase:
 *           type: number
 *           example: 300000
 *         Item:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: i1
 *             name:
 *               type: string
 *               example: Margherita Pizza
 *             price:
 *               type: number
 *               example: 300000
 *         Order:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: o1
 *             status:
 *               type: string
 *               example: pending
 *             amount:
 *               type: number
 *               example: 540000
 *             order_type:
 *               type: string
 *               example: delivery
 *             phone_number:
 *               type: string
 *               example: 09123456789
 *             address:
 *               type: string
 *               example: کوچه علی چپ
 *
 *     CreateOrder:
 *       type: object
 *       required:
 *         - type
 *         - phone_number
 *       properties:
 *         type:
 *           type: string
 *           enum: [pickUp, delivery]
 *           example: delivery
 *         phone_number:
 *           type: string
 *           example: 09115678901
 *         address:
 *           type: string
 *           example: کوچه علی چپ
 *         discount:
 *           type: string
 *           example: testDiscount
 */
/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order & checkout operations
 */
/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create a new order from cart (checkout)
 *     tags: [Order]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *           example:
 *             type: delivery
 *             phone_number: "09115678901"
 *             address: کوچه علی چپ
 *             discount: testDiscount
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: سفارش ایجاد شد
 *               order_id: o123
 *               total_amount: 540000
 *       400:
 *         description: Invalid request or empty cart
 *         content:
 *           application/json:
 *             example:
 *               message: سبد خرید خالی است
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: لطفا وارد شوید
 *       404:
 *         description: Discount not found
 *         content:
 *           application/json:
 *             example:
 *               message: کد تخفیف یافت نشد
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Get all orders of logged-in user
 *     tags: [Order]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: سفارشات دریافت شد
 *               data:
 *                 - id: oi1
 *                   quantity: 2
 *                   price_at_purchase: 300000
 *                   Item:
 *                     id: i1
 *                     name: Margherita Pizza
 *                     price: 300000
 *                   Order:
 *                     id: o123
 *                     status: pending
 *                     amount: 540000
 *                     order_type: delivery
 *                     phone_number: 09115678901
 *                     address: کوچه علی چپ
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/order/{order_id}:
 *   get:
 *     summary: Get single order by ID
 *     tags: [Order]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         example: o123
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: سفارش دریافت شد
 *               data:
 *                 - id: o1
 *                   quantity: 1
 *                   price_at_purchase: 200000
 *                   Item:
 *                     id: i3
 *                     name: Garlic Bread
 *                     price: 200000
 *                   Order:
 *                     id: o123
 *                     status: pending
 *                     amount: 540000
 *                     order_type: delivery
 *                     phone_number: 09115678901
 *                     address: کوچه علی چپ
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               message: سفارش موردنظر یافت نشد
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
