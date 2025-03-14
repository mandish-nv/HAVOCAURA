const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const ComputerPart = require("./models/parts");
const Laptop = require("./models/laptop");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();
const port = 5000;

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

const URL = "mongodb://localhost:27017/HAVOCAURA";
app.use(express.json());
app.use(cors());

// Session configuration
app.use(
  session({
    secret: "havocaura-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

mongoose
  .connect(URL)
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Mongo Connected");
    });

    app.post("/api/computer-parts", async (req, res) => {
      try {
        const newPart = new ComputerPart(req.body);
        await newPart.save();
        res.status(201).json(newPart);
      } catch (error) {
        res.status(500).json({ message: "Error saving part", error });
      }
    });

    app.post("/api/laptops", async (req, res) => {
      try {
        const newLaptop = new Laptop(req.body);
        await newLaptop.save();
        res.status(201).send("Laptop added successfully");
      } catch (err) {
        res.status(500).send("Error: " + err.message);
      }
    });

    app.post("/register", async (req, res) => {
      try {
        const {
          fullName,
          userName,
          gender,
          dob,
          email,
          password,
          profilePicture,
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
          $or: [{ userName }, { email }],
        });

        if (existingUser) {
          return res
            .status(400)
            .send(
              existingUser.email === email
                ? "Email already exists"
                : "Username already exists"
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
          fullName,
          userName,
          gender,
          dob,
          email,
          password: hashedPassword,
          profilePicture,
        });

        await newUser.save();
        res.status(201).send("User registered successfully!");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
      }
    });

    app.post("/login", async (req, res) => {
      try {
        const { identifier, password } = req.body; // Can be email or username

        const user = await User.findOne({
          $or: [{ email: identifier }, { userName: identifier }],
        });

        if (!user) return res.status(401).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid password");

        // Store user in session
        req.session.user = {
          id: user._id,
          userName: user.userName,
          email: user.email,
        };

        res.status(200).send("Login successful!");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
      }
    });

    app.get("/logout", (req, res) => {
      req.session.destroy();
      res.send("Logged out successfully");
    });

    // app.post("/find", async (req, res) => {
    //   //login pachi userdata tanne
    //   const userName = req.body.userName;
    //   const userData = await User.findOne({ userName: userName });
    //   res.send(userData);
    // });

    // // user profile display
    // app.get("/profile/:id", async (req, res) => {
    //   try {
    //     const userId = req.params.id; // Use `id` instead of `slug`

    //     // Validate MongoDB ObjectId (to prevent errors)
    //     if (!mongoose.Types.ObjectId.isValid(userId)) {
    //       return res.status(400).json({ message: "Invalid user ID format" });
    //     }

    //     const user = await User.findById(userId); // Use `findById` for efficiency

    //     if (user) {
    //       res.status(200).json(user);
    //     } else {
    //       res.status(404).json({ message: "User not found" });
    //     }
    //   } catch (error) {
    //     console.error("Error retrieving user profile:", error);
    //     res
    //       .status(500)
    //       .json({ message: "An error occurred while retrieving data." });
    //   }
    // });

    app.listen(port, () => {
      console.log("Server Connected");
    });
  })
  .catch((err) => console.log(err));
