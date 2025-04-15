require("dotenv").config();
const app = require("./middleware/app");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on: ", process.env.PORT || 300);
});
