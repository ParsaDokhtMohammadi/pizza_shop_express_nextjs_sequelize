/**
 * @swagger
 * components:
 *  schemas:
 *   AddDiscount:
 *    type: object
 *    required:
 *      - name
 *      - code
 *      - percentage
 *    properties:
 *      name:
 *        type: string
 *        description: discount name
 *        minLength: 4
 *        maxLength: 30
 *      code:
 *        type: string
 *        description: unique discount code
 *        minLength: 3
 *        maxLength: 20
 *      percentage:
 *        type: number
 *        description: discount percentage (1 - 100)
 *        minimum: 1
 *        maximum: 100
 *      limit:
 *        type: number
 *        description: usage limit
 *        minimum: 1
 *      start_date:
 *        type: string
 *        format: date-time
 *        description: discount start date
 *      expiration_date:
 *        type: string
 *        format: date-time
 *        description: discount expiration date
 *    example:
 *      name: Yalda 1404
 *      code: yalda404
 *      percentage: 30
 *      limit: 10
 */

/**
 * @swagger
 * tags:
 *  name: Discount
 *  description: discount routes (Admin only)
 */

/**
 * @swagger
 * /api/discount:
 *   post:
 *     summary: Create a new discount code (Admin only)
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddDiscount'
 *     responses:
 *       200:
 *         description: discount created
 *         content:
 *           application/json:
 *             example:
 *               message: کد تخفیف ایجاد شد
 *       400:
 *         description: validation error
 *         content:
 *           application/json:
 *             example:
 *               message: درصد تخفیف الزامی است
 *       409:
 *         description: duplicate discount code
 *         content:
 *           application/json:
 *             example:
 *               message: یک تخفیف دیگر با این کد وجود دارد
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: لطفا وارد شوید
 */

/**
 * @swagger
 * /api/discount:
 *   get:
 *     summary: Get all discount codes (Admin only)
 *     tags: [Discount]
 *     responses:
 *       200:
 *         description: discounts fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: کدهای تخفیف دریافت شدند
 *               data:
 *                 - id: abc123
 *                   name: Yalda 1404
 *                   code: yalda404
 *                   percentage: 30
 *                   limit: 10
 *                   start_date: 2024-12-01T00:00:00.000Z
 *                   expiration_date: 2024-12-08T00:00:00.000Z
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: لطفا وارد شوید
 */

/**
 * @swagger
 * /api/discount/{id}:
 *   delete:
 *     summary: Delete a discount by id (Admin only)
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: discount id
 *     responses:
 *       200:
 *         description: discount deleted
 *         content:
 *           application/json:
 *             example:
 *               message: کد تخفیف با موفقیت حذف شد
 *       404:
 *         description: discount not found
 *         content:
 *           application/json:
 *             example:
 *               message: کد تخفیف یافت نشد
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: لطفا وارد شوید
 */
/**
 * @swagger
 * /api/discount/{code}:
 *   get:
 *     summary: Check if a discount code is valid
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount code to validate
 *     responses:
 *       200:
 *         description: Discount code is valid
 *         content:
 *           application/json:
 *             example:
 *               message: کد تخفیف معتبر است
 *       400:
 *         description: Invalid or expired discount
 *         content:
 *           application/json:
 *             examples:
 *               expired:
 *                 value:
 *                   message: کد تخفیف منقضی شده است
 *               limit:
 *                 value:
 *                   message: ظرفیت کد تخفیف تمام شده است
 *               missing:
 *                 value:
 *                   message: کد تخفیف ارسال نشده است
 *       404:
 *         description: Discount code not found
 *         content:
 *           application/json:
 *             example:
 *               message: کد تخفیف یافت نشد
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: internal server error
 */