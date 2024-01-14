/**
 * @swagger
 * components:
 *   schemas:
 *     CheckOTP:
 *       type: object
 *       required:
 *         - phone
 *         - code
 *       properties:
 *         phone:
 *           type: string
 *         code:
 *           type: string
 */

/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: check otp code we sent to the user in this endpoint
 *     tags:
 *       - Authorization
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/CheckOTP"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CheckOTP"
 *     responses:
 *       200:
 *         description: success
 */
