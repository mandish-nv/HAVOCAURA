const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const ComputerPart = require("./models/parts");
const Laptop = require("./models/laptop");
const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const port = 5000;

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

const URL = "mongodb://localhost:27017/HAVOCAURA";
app.use(express.json());
app.use(cors());

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
        res.status(200).json(newPart);
      } catch (error) {
        res.status(500).json({ message: "Error saving part", error });
      }
    });

    // app.post("/register", async (req, res) => {
    //   try {
    //     const saltRounds = 10;

    //     // const user = new User(req.body);

    //     //validation logic
    //     const fullName = req.body.fullName;
    //     const userName = req.body.userName;
    //     const gender = req.body.gender;
    //     const dob = req.body.dob;
    //     const email = req.body.email;
    //     const password = await bcrypt.hash(req.body.password, saltRounds);
    //     const profilePicture = req.body.profilePicture;
    //     const user = new User({
    //       fullName: fullName,
    //       userName: userName,
    //       gender: gender,
    //       dob: dob,
    //       email: email,
    //       password: password,
    //       profilePicture: profilePicture,
    //     });

    //     const userNameSearch = await User.findOne({ userName }); //returns whole object
    //     const emailSearch = await User.findOne({ email });

    //     if (userNameSearch && emailSearch) {
    //       res.send("3");
    //     } else if (userNameSearch) {
    //       res.send("4");
    //     } else if (emailSearch) {
    //       res.send("5");
    //     } else {
    //       await user.save();
    //       res.send("6");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).send("An error occurred while saving data.");
    //   }
    // });

    // app.post("/login", async (req, res) => {
    //   try {
    //     // const user = new User(req.body);

    //     //validation logic
    //     const userName = req.body.userName;
    //     const password = req.body.password;

    //     const userNameSearch = await User.findOne({ userName: userName });
    //     // const passwordMatch = userNameSearch ? userNameSearch.password : "";
    //     const passwordMatch = userNameSearch
    //       ? await bcrypt.compare(password, userNameSearch.password)
    //       : false;

    //     if (!userNameSearch) {
    //       res.send("1");
    //     } else if (!passwordMatch) {
    //       res.send("2");
    //     } else if (passwordMatch) {
    //       res.send("7");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).send("An error occurred while saving data.");
    //   }
    // });

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
