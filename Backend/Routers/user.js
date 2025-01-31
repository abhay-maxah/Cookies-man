const express = require("express");
const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const router = new express.Router();
const { setauth, auth } = require("../middleware/auth");

//create a user
router.post("/user", async (req, res) => {
  try {
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
  try {
    const { email, passsword } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Email or password is incorrect." });
    }
    const validPassword = await bcrypt.compare(passsword, user.passsword);

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

module.exports = router;
