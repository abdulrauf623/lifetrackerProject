const express = require("express");
const router = express.Router();
const User = require("../models/users")

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("Birds home page");
});
// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) =>{

  try {

    const user = await User.login(req.body);

    return res.status(200).json({user})
  }

  catch(error){
    next(error)
  }



})

module.exports = router;
