require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const app = express();
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Node JS API Project for Mongodb",
            version: "1.0.0"
        },
        servers: [
            {
                url:'http://localhost:7000/'
            }
        ]
    },
    apis: ['./server.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use(express.json());
app.use(morgan('dev'));

const Connectdb = require('./config/dbConfig');
const userRouter = require('./routes/userRouter')

Connectdb();

/**
 * @swagger
 *  components:
 *      schemas:
 *          userModel:
 *              type: object
 *              properties: 
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: integer
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: This api is used to get all the users
 *      description: This api is used to get all the users
 *      responses:
 *          200:
 *              description: This api is used to fetch data from mongodb
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/userModel'
 */

/**
 * @swagger
 * /users:
 *  post:
 *      summary: This api is used to add user
 *      description: This api is used to add user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/userModel'
 *      responses:
 *          200:
 *              description: Added Successfully
 */

/**
 * @swagger
 * /users/{id}:
 *  put:
 *      summary: This api is used to update user
 *      description: This api is used to update user
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id is required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/userModel'
 *      responses:
 *          200:
 *              description: Updated Successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/userModel'
 */

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: This api is used to delete user
 *      description: This api is used to delete user
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id is required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Deleted successfully
 */



app.use('/', userRouter);

app.listen(process.env.PORT, () => {
    console.log('Server Started')
})