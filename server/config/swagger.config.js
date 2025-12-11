import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title : "planet pizza API documentation",
            version: "1.0.0",
            description: "API documentation for Planet Pizza application"
        },
        servers:[
            {url: "http://localhost:3000", description: "Local server"}
        ]
    },
    apis : ["server/modules/.**/*.js"]
}

export const specs = swaggerJSDoc(options)
