/**
 * @swagger
 * /class/join:
 *  post:
 *    description: Joins a class
 *    consumes:
 *       - application/json
 *    tags: 
 *       - class
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *       - in: body
 *         schema:
 *          type: object
 *          required:
 *            - classId 
 *            - password 
 *          properties:
 *           classId:
 *            type: string
 *           password:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: User joined the class
 *        schema:
 *          type: object
 *          properties:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  classId:
 *                      type: string
 *                  owner:
 *                      type: string
 *                  image:
 *                      type: string
 *        
 */