const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoute");
const postsRoute = require("./routes/postRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const multer = require("multer");
const cors = require("cors");

app.use(cors());

app.use(express.json());
// Connect to

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connecté à MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Fichier a été téléchargé avec succès!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);

app.listen(3000, () => {
  console.log("Backend server is running!");
});
