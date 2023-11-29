const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoute");
const postsRoute = require("./routes/postRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const lusca = require("lusca");
const session = require("express-session");

const app = express();
app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use("/images/", express.static(path.join(__dirname, "/images/")));
app.use(helmet());
app.use(lusca.csrf());

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

app.get("/csrf-token", (req, res) => {
  const csrfToken = req.csrfToken();
  console.log(csrfToken);
  res.status(200).send({ csrfToken: csrfToken });
});

app.listen(3000, () => {
  console.log("Backend server is running!");
});
