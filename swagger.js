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
  apis: [`./swagger.js`, `./routes/*.js`],
  //   apis: ["./swagger.js"],
});

module.exports = swaggerSpec;
