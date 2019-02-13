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
    name,
    bio,
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
    .then(users => {
      res.json({ users });
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
    .then(users => {
      if (user.length === 0) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
        return;
      }
      res.json({ users });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The users information could not be retrieved."
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
          message: "The user with the specified ID does not exist."
        });
        return;
      }
      res.json({ success: `User ${id} removed.` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The user could not be removed"
      });
      return;
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
    return;
  }
  db.update(id, { name, bio })
    .then(response => {
      if (response == 0) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
        return;
      }
      db.findById(id)
        .then(user => {
          if (user.length === 0) {
            res.status(404).json({
              errorMessage: "The user with the specified ID does not exist."
            });
            return;
          }
          res.json(user);
        })
        .catch(error => {
          console.log(error);
          res
            .status(500)
            .jason({ error: "The user information could not be modified." });
        });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
      return;
    });
});

module.exports = router;
