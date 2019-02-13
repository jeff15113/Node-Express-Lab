const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

router.post("/", (req, res) => {
  const { title, contents, created_at, updated_at } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
    return;
  }
  db.insert({
    title,
    contents,
    created_at,
    updated_at
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
      return;
    });
});

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.json({ posts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
      return;
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
<<<<<<< HEAD
    .then(posts => {
      if (posts.length === 0) {
=======
    .then(post => {
      if (post.length === 0) {
>>>>>>> fb73a808597b056bfe009d47e209167da85a360c
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
        return;
      }
      res.json({ posts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
      return;
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => {
      if (response === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
        return;
      }
      res.json({ success: `post ${id} removed.` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
      return;
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
    return;
  }
  db.update(id, { name, bio })
    .then(response => {
      if (response == 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
        return;
      }
      db.findById(id)
        .then(post => {
          if (post.length === 0) {
            res.status(404).json({
              errorMessage: "The post with the specified ID does not exist."
            });
            return;
          }
          res.json(post);
        })
        .catch(error => {
          console.log(error);
          res
            .status(500)
            .jason({ error: "The post information could not be modified." });
        });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
      return;
    });
});

module.exports = router;
