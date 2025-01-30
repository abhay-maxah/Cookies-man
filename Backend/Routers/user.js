const express = require("express");
const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const router = new express.Router();
const {setauth,auth} = require('../middleware/auth')

//create a user
router.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passsword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passsword }
    });
    //create a auth token
    const token = setauth(user)
    res.status(201).json({user,token});
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Email or username already exists." });
    } else {
      res.status(500).json({ error: "Server error." });
    }
  }
});

//get all users
router.get("/user",auth, async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
