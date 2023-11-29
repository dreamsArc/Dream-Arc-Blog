const mongoose = require("mongoose");

const PostShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "1699550038878butterbur-3469942_1280.jpg",
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", PostShema);
