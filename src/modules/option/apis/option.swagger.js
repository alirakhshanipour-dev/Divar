/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option Module Routers
 * 
*/


/**
 *  @swagger
 *  components:
 *     schemas:
 *         CreateOption:
 *             type: object
 *             required:
 *                 -   title
 *                 -   key
 *                 -   category
 *                 -   type
 *             properties:
 *                 title:
 *                     type: string
 *                 key:
 *                     type: string
 *                 category:
 *                     type: string
 *                 type:
 *                     type: enum
 *                     enum:
 *                          -   number
 *                          -   string
 *                          -   array
 *                          -   boolean
 *                 guide:
 *                     type: string
 *                 enum:
 *                     type: array
 *                     items:
 *                          type: string
*/

/**
 * @swagger
 * /option/create:
 *  post:
 *      summary: create option in this endpoint
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateOption"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateOption"
 *      responses:
 *          200:
 *              description: success
 *
*/


/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: get options by category id in this endpoint
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200:
 *              description: success
 *
*/


/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get option by id in this endpoint
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 *
*/


/**
 * @swagger
 * /option:
 *  get:
 *      summary: get all options in this endpoint
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: success
 *
*/