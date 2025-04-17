// src/server.js

const app = require("./app");
const connectDB = require("./libs/db");

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.clear();
    console.log(`🟢 Server running on http://0.0.0.0:${PORT}`);
  });
})();
