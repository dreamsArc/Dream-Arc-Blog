const router = require("express").Router();
const User = require("../models/Users");

const Post = require("../models/Post");

// Create

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json("Le post a été modifier avec succès!");
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Vous ne pouvez modifier que votre post!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("post not found");
  }
});

//Delete

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(post._id);

        res.status(200).json("Le post a été supprimer avec succès!");
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Vous ne pouvez supprimer que votre post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Post

router.get("/:id", async (req, res) => {
  try {
    const currentPost = await Post.findById(req.params.id);
    res.status(200).json(currentPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get All Post

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
