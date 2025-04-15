// const swaggerJsDoc = require("swagger-jsdoc");

// /**
//  * @swagger
//  * components:
//  *    schemas:
//  *      Book:
//  *         type: object
//  *           required:
//  *             - title
//  *             - author_id
//  *             - published_year
//  *      properties:
//  *          title:
//  *             type: string
//  *              description: Title of the book
//  *           author_id:
//  *              type: number
//  *               description: Name of the author of the book
//  *           published_year:
//  *              type: string
//  *              description: if the book is published or not
//  *           example:
//  *            title: A great book!
//  *            author_id: 2
//  *            published_year: 1963-12-31T18:00:00.000Z
//  *      BookUpstring:
//  *            type: object
//  *            optianal:
//  *              title
//  *              author_id
//  *              published_year
//  *            properties:
//  *              title:
//  *                 type: string
//  *                 description: This is a title of the book
//  *              author_id:
//  *                  type: number
//  *                  decription: This is a id of the author of the book
//  *              published_year:
//  *                     type: string
//  *                     description: This is a book's published year!
//  *              example:
//  *                  title: This a title of the abook
//  *                  author_id: 1
//  *                  published_year: 1963-12-31T18:00:00.000Z
//  *
//  *  @swagger
//  * tags:
//  *  name: Books
//  *
//  *  **/

// const swaggerSpec = swaggerJsDoc({
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Books api!",
//       version: "1.0.0",
//       description: "This is a book management api!",
//     },
//     components: {
//       schemas: {
//         Books: {
//           type: "object",
//           properties: {
//             title: {
//               type: "string",
//             },
//             author_id: {
//               type: "string",
//             },
//             published_year: {
//               type: "string",
//             },
//           },
//         },
//       },
//     },
//   },

//   apis: [`${__dirname}/routes/*.js`, `${__dirname}/swagger.ts`],
// });

// module.exports = swaggerSpec;

const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books API",
      version: "1.0.0",
      description: "This is a book management API",
    },
    components: {
      schemas: {
        Book: {
          type: "object",
          required: ["title", "author_id", "published_year"],
          properties: {
            title: {
              type: "string",
              description: "Title of the book",
            },
            author_id: {
              type: "string",
              description: "ID of the author",
            },
            published_year: {
              type: "string",
              description: "Published year of the book",
            },
          },
          example: {
            title: "A Great Book!",
            author_id: "2",
            published_year: "1963-12-31T18:00:00.000Z",
          },
        },
        BookUpdate: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the book",
            },
            author_id: {
              type: "number",
              description: "Author ID",
            },
            published_year: {
              type: "string",
              description: "Published year of the book",
            },
          },
          example: {
            title: "Updated Book Title",
            author_id: 1,
            published_year: "1963-12-31T18:00:00.000Z",
          },
        },
      },
    },
    tags: [
      {
        name: "Books",
        description: "Everything about books",
      },
    ],
  },
  //   apis: [`${__dirname}/routes/*.js`, `${__dirname}/swagger.js`],
  apis: ["./swagger.js"],
});

module.exports = swaggerSpec;
