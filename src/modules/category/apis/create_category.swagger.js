/**
 *  @swagger
 *  components:
 *     schemas:
 *         CreateCategory:
 *             type: object
 *             required:
 *                 -   name
 *                 -   icon
 *             properties:
 *                 name:
 *                     type: string
 *                 slug:
 *                     type: string
 *                 icon:
 *                     type: string
 *                 parent:
 *                     type: string
*/

/**
 * @swagger
 * /category/create:
 *  post:
 *      summary: create category in this endpoint
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *      responses:
 *          200:
 *              description: success
 *                      
*/