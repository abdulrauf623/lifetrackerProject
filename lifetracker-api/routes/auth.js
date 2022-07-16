const express = require("express");
const router = express.Router();
const User = require("../models/users")
const {createUserJWT} = require("../utils/tokens")
const {requireAuthenticatedUser} = require("../middleware/security")

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
    const user = await User.register({ ...req.body, isAdmin: false });
    const token = createUserJWT(user);
    console.log("headers", req.headers)
    return res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) =>{

  try {

    const user = await User.login(req.body);
    const token = createUserJWT(user);
    return res.status(200).json({ user, token });
  }

  catch(error){
    next(error)
  }



})

router.get("/me", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    
    const user = await User.fetchUserByEmail(email)
    const publicUser = User.makePublicUser(user)


    return res.status(200).json({user : publicUser})
  } catch (err) {
    next(err);
  }
});

module.exports = router;
