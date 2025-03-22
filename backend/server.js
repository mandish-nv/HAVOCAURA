const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const ComputerPart = require("./models/parts");
const Laptop = require("./models/laptop");
const Checkout = require("./models/order");
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

        res.status(200).send("Login successful!");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
      }
    });

    app.post("/findUser", async (req, res) => {
      const data = req.body.identifier;
      const user = await User.findOne({
        $or: [{ email: data }, { userName: data }],
      });
      res.send(user);
    });

    app.get("/all-laptops", async (req, res) => {
      try {
        const laptops = await Laptop.find({}, "brand model image price"); // Select only brand, model & image
        res.json(laptops);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching laptops");
      }
    });

    app.get("/all-parts", async (req, res) => {
      try {
        const category = req.query.category;

        const query = category && category !== "All" ? { category } : {};

        const parts = await ComputerPart.find(query);
        res.json(parts);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching parts");
      }
    });

    app.get("/retrieveById/:id", async (req, res) => {
      try {
        let part = await ComputerPart.findById(req.params.id);
        if (!part) {
          part = await Laptop.findById(req.params.id);
        }
        res.json(part);
      } catch (error) {
        res.status(500).send("Error fetching part details");
      }
    });

    app.get("/retrieveByCategory/:category", async (req, res) => {
      const { category } = req.params;
      try {
        const parts = await ComputerPart.find({ category });
        res.json(parts);
      } catch (error) {
        res.status(500).send("Error fetching parts");
      }
    });

    app.get("/landing-laptops", async (req, res) => {
      try {
        const laptops = await Laptop.find({}, "brand model image price").limit(
          12
        );
        res.json(laptops);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching laptops");
      }
    });

    // Add laptop to cart
    app.post("/add/laptop", async (req, res) => {
      try {
        const { userId, laptopId, price, quantity } = req.body;

        if (!userId) {
          return res.status(401).json({ message: "User not logged in" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.cart) user.cart = { laptops: [], parts: {} };

        // Check if laptop is already in cart
        const existingLaptop = user.cart.laptops.find(
          (item) => item.part.toString() === laptopId
        );
        if (existingLaptop) {
          existingLaptop.quantity += quantity;
        } else {
          user.cart.laptops.push({ part: laptopId, price, quantity });
        }

        await user.save();
        res.json({
          message: "Laptop added to cart successfully",
          cart: user.cart,
        });
      } catch (error) {
        console.error("Error adding laptop to cart:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // Add computer part to cart
    app.post("/add/part", async (req, res) => {
      try {
        const { userId, partId, category, price, quantity } = req.body;

        if (!userId) {
          return res.status(401).json({ message: "User not logged in" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.cart) user.cart = { laptops: [], parts: {} };
        if (!user.cart.parts[category]) user.cart.parts[category] = [];

        // Check if part is already in cart
        const existingPart = user.cart.parts[category].find(
          (item) => item.part.toString() === partId
        );
        if (existingPart) {
          existingPart.quantity += quantity;
        } else {
          user.cart.parts[category].push({ part: partId, price, quantity });
        }

        await user.save();
        res.json({
          message: "Part added to cart successfully",
          cart: user.cart,
        });
      } catch (error) {
        console.error("Error adding part to cart:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // 1. Get User's Cart
    app.get("/cart/:userId", async (req, res) => {
      try {
        const user = await User.findById(req.params.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
          cart: user.cart,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch cart" });
      }
    });

    // 2. Update Quantity in Cart (increase/decrease)
    app.post("/cart/update", async (req, res) => {
      const { userId, itemId, category, action, partCategory } = req.body;

      try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        let item;
        if (category === "laptop") {
          item = user.cart.laptops.find(
            (item) => item._id.toString() === itemId
          );
        } else if (category === "part") {
          item = user.cart.parts[partCategory].find(
            (item) => item._id.toString() === itemId
          );
        }

        if (!item) {
          return res.status(404).json({ message: "Item not found in cart" });
        }

        // Adjust quantity based on action
        if (action === "increase") {
          item.quantity += 1;
        } else if (action === "decrease" && item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return res.status(400).json({ message: "Invalid action" });
        }

        await user.save();
        res.status(200).json({ message: "Cart updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update cart" });
      }
    });

    // 3. Remove Item from Cart
    app.post("/cart/remove", async (req, res) => {
      const { userId, itemId, category, partCategory } = req.body;

      try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        if (category === "laptop") {
          user.cart.laptops = user.cart.laptops.filter(
            (item) => item._id.toString() !== itemId
          );
        } else if (category === "part") {
          user.cart.parts[partCategory] = user.cart.parts[partCategory].filter(
            (item) => item._id.toString() !== itemId
          );
        }

        await user.save();
        res.status(200).json({ message: "Item removed from cart" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to remove item from cart" });
      }
    });

    app.post("/checkout/create/cart", async (req, res) => {
      try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const cart = user.cart;
        if (
          !cart ||
          (cart.laptops.length === 0 &&
            Object.values(cart.parts).every((items) => items.length === 0))
        ) {
          return res.status(400).json({ message: "Cart is empty" });
        }

        let totalPrice = 0;
        const checkoutData = {
          user: userId,
          laptops: cart.laptops.map((item) => {
            totalPrice += item.price * item.quantity;
            return {
              part: item.part,
              price: item.price,
              quantity: item.quantity,
            };
          }),
          parts: {},
        };

        Object.keys(cart.parts).forEach((category) => {
          checkoutData.parts[category] = cart.parts[category].map((item) => {
            totalPrice += item.price * item.quantity;
            return {
              part: item.part,
              price: item.price,
              quantity: item.quantity,
            };
          });
        });

        // Calculate total price with tax and shipping
        const tax = 0.1;
        const shippingCost = 100;
        checkoutData.totalPrice = totalPrice;
        checkoutData.tax = tax;
        checkoutData.shippingCost = shippingCost;

        // Save Checkout Order
        const newCheckout = new Checkout(checkoutData);
        await newCheckout.save();

        // Clear user's cart after checkout
        user.cart = { laptops: [], parts: {} };
        await user.save();

        res.status(201).json({
          message: "Checkout created successfully",
          checkoutId: newCheckout._id,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to proceed to checkout" });
      }
    });

    app.post("/checkout/create/buildAPc", async (req, res) => {
      try {
        const { userId, formData } = req.body;
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        if (!formData || Object.keys(formData).length === 0) {
          return res.status(400).json({ message: "Form data is empty" });
        }

        let totalPrice = 0;
        const parts = [];

        await Promise.all(
          Object.keys(formData).map(async (key) => {
            const partId = formData[key];

            // Validate ObjectId format
            if (!mongoose.Types.ObjectId.isValid(partId)) {
              console.warn(`Skipping invalid part ID for ${key}: ${partId}`);
              return;
            }

            const part = await ComputerPart.findById(partId);
            if (!part) {
              return res
                .status(404)
                .json({ message: `Part not found: ${key}` });
            }
            totalPrice += part.price;
            parts.push({
              part: part._id, // Store the part's _id not key.
              details: part,
              category: part.category,
              price: part.price,
            });
          })
        );

        if (parts.length === 0) {
          return res
            .status(400)
            .json({ message: "No valid parts found in form data" });
        }

        // Calculate total price with tax and shipping
        const tax = 0.1;
        const shippingCost = 100;

        const checkoutData = {
          user: userId,
          parts: {},
          laptops: [],
          totalPrice: totalPrice,
          tax: tax,
          shippingCost: shippingCost,
        };

        parts.forEach((item) => {
          if (!checkoutData.parts[item.category]) {
            checkoutData.parts[item.category] = [];
          }
          checkoutData.parts[item.category].push({
            part: item.part,
            price: item.price,
            quantity: 1,
          });
        });

        // Save Checkout Order
        const newCheckout = new Checkout(checkoutData);
        await newCheckout.save();

        res.status(201).json({
          message: "Checkout created successfully",
          checkoutId: newCheckout._id,
        });
      } catch (error) {
        console.error("Error processing checkout:", error);
        res.status(500).json({ message: "Failed to proceed to checkout" });
      }
    });

    app.get("/checkout/:checkoutId", async (req, res) => {
      try {
        let checkout = await Checkout.findById(req.params.checkoutId);
        res.json(checkout);
      } catch (error) {
        res.status(500).send("Error fetching checkout details");
      }
    });

    app.get("/viewOrders/:userId", async (req, res) => {
      const userId = req.params.userId;

      try {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid user ID" });
        }

        const orders = await Checkout.find({ user: userId })
          .sort({ createdAt: -1 });

        if (orders.length === 0) {
          return res
            .status(404)
            .json({ message: "No orders found for this user." });
        }

        res.json(orders);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Failed to retrieve user orders" });
      }
    });

    app.listen(port, () => {
      console.log("Server Connected");
    });
  })
  .catch((err) => console.log(err));
