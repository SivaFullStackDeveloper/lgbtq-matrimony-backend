// src/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LGBTQ+ Matrimony API',
      version: '1.0.0',
      description: 'API for LGBTQ+ Matrimony platform including OTP, Auth, User, Match, and Chat services',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./src/routes/*.js'],// Point to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
