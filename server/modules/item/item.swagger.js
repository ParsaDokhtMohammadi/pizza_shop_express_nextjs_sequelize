/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: i1
 *         name:
 *           type: string
 *           example: Margherita Pizza
 *         category:
 *           type: string
 *           enum: [Pizza, side, drink]
 *           example: Pizza
 *         description:
 *           type: string
 *           example: Classic pizza with tomato sauce and mozzarella
 *         price:
 *           type: integer
 *           example: 300000
 *         image_url:
 *           type: string
 *           example: /public/uploads/1734512345678.png
 *
 *     CreateItem:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - image
 *       properties:
 *         name:
 *           type: string
 *         category:
 *           type: string
 *           enum: [Pizza, side, drink]
 *         description:
 *           type: string
 *         price:
 *           type: integer
 *         image:
 *           type: string
 *           format: binary
 *
 *     UpdateItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         category:
 *           type: string
 *           enum: [Pizza, side, drink]
 *         description:
 *           type: string
 *         price:
 *           type: integer
 *         image:
 *           type: string
 *           format: binary
 */
/**
 * @swagger
 * tags:
 *   name: Item
 *   description: Item / Product management
 */
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new item (Admin)
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateItem'
 *     responses:
 *       200:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: آیتم ساخته شد
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update an existing item (Admin)
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: i1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateItem'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: محصول با موفقیت بروزرسانی شد
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete an item (Admin)
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: i1
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: محصول با موفقیت حذف شد
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all items
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: Items fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: محصولات دریافت شدند
 *               data:
 *                 - id: i1
 *                   name: Margherita Pizza
 *                   category: Pizza
 *                   price: 300000
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: i1
 *     responses:
 *       200:
 *         description: Item fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: محصول دریافت شدند
 *               data:
 *                 id: i1
 *                 name: Margherita Pizza
 *                 category: Pizza
 *                 price: 300000
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
