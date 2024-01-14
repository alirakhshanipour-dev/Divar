/**
 *  @swagger
 *  components:
 *     schemas:
 *         SendOTP:
 *             type: object
 *             required:
 *                 -   phone
 *             properties:
 *                 phone:
 *                     type: string
*/

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary: send otp code to the user in this endpoint
 *      tags:
 *          -   Authorization
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *      responses:
 *          200:
 *              description: success
 *                      
*/