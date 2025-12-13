/**
 * @swagger
 * components:
 *  schemas:
 *   AddToCart:
 *    type: object
 *    required:
 *       - item_id
 *       - quantity
 *    properties:
 *      item_id: 
 *          type: string
 *          desciption: a valid item id
 *      qauntity:
 *          type: interger
 *          description: must be a positive integer
 *    example:
 *      item_id: i1
 *      quantity: 2
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      deleteFromCart:
 *          type: object
 *          required:
 *              - item_id
 *          properties:
 *              item_id: 
 *                  type: string
 *                  desciption: a valid item id
 *          example:
 *              item_id: i1
 */

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: cart routes
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: adds an item to user cart (Needs login)
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCart'
 *     responses:
 *       200:
 *         description: item added or updated in cart
 *         content:
 *           application/json:
 *             example:
 *               message: ایتم به سبد خرید اضافه شد
 *       400:
 *         description: fields not sent
 *         content:
 *           application/json:
 *             example:
 *               message: فیلد های مورد نیاز ارسال نشده اند
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: منقضی شده لطفا دوباره وارد شوید
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             example:
 *               message: internal server error
 */
     
/**
 * @swagger
 * /api/cart/delete:
 *   delete:
 *     summary: deletes an item from user cart (Needs login)
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteFromCart'
 *     responses:
 *       200:
 *         description: item deleted from cart
 *         content:
 *           application/json:
 *             example:
 *               message: آیتم از سبد خرید حذف شد
 *       400:
 *         description: fields not sent
 *         content:
 *           application/json:
 *             example:
 *               message: فیلد های مورد نیاز ارسال نشده اند
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: لطفا وارد شوید
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             example:
 *               message: internal server error
 */
