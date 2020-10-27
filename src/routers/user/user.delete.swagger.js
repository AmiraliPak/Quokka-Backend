//delete

/**
 * @swagger
 * /user/delete:
 *  delete:
 *    description: Used for user deletion
 *    consumes:
 *       - application/json
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *
 *    responses:
 *      '200':
 *        description: User is deleted :)
 *      '503':
 *        description: Database error :)
 *      '400':
 *        description: Error :)
 *        schema:
 *          type: object
 *          properties:
 *              err:
 *                  type: object
 */