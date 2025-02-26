const express = require("express");
const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const router = new express.Router();
const { setauth, auth } = require("../middleware/auth");

//create a user
router.post("/user", async (req, res) => {
  try {
    console.log("call")
    const { name, email, password } = req.body;
    const passsword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passsword },
    });
    //create a auth token
    const token = setauth(user);
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Email or username already exists." });
    } else {
      res.status(500).json({ error: "Server error." });
    }
  }
});
//get user profile
router.get("/user/profile/:id", auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const UserDetail = await prisma.user.findFirst({ where: { id } });
    res.status(200).json(UserDetail);
  } catch (error) {
    console.error("errro", error);
    res.status(404).json(error);
  }
});

//login User
router.post("/login", async (req, res) => {
  console.log("login1")
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Email or password is incorrect." });
    }
    const validPassword = await bcrypt.compare(password, user.passsword);

    if (!validPassword) {
      return res.status(400).json({ error: "Email or password is incorrect." });
    }
    const token = setauth(user);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

//get all users
router.get("/user", auth, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

//delete a user
router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete user
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

//update user profile
router.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ error: "No data provided to update" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: name || user.name,
        email: email || user.email
      },
    });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
