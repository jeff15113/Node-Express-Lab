const express = require("express"); // importing a CommonJS module

const Router = require("./posts/posts-router");

const server = express();

server.use(express.json());

server.use("/api/posts", Router);

server.get("/", async (req, res) => {
  res.send(`
    <h2>Blog Posts API</h>
    <p>Welcome to blog posts API</p>
  `);
});

// export default server; ES2015 Modules
module.exports = server;
