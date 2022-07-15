const express = require("express");
const exercise = express.Router();
const User = require("../models/users");
const { createUserJWT } = require("../utils/tokens");
const { requireAuthenticatedUser } = require("../middleware/security");
const Exercise = require("../models/exercise");
const { authedUserOwnsPost} = require("../middleware/permissions")

exercise.post("/", requireAuthenticatedUser, async (req, res, next) => {
  // create new exercise post
  try {
    const { user } = res.locals;
    const exercisePost = await Exercise.createNewExercisePost({
      user,
      exercisePost: req.body,
    });
    return res.status(201).json({ exercisePost });
  } catch (err) {
    next(err);
  }
});

exercise.get("/", async (req, res, next) => {
  // list all exercise posts
  try {
    const exercisePosts = await Exercise.listExercisePosts();
    return res.status(200).json({ exercisePosts });
  } catch (err) {
    next(err);
  }
});

exercise.get("/:postId", requireAuthenticatedUser, async (req, res, next) => {
  // fetch single exercise post
  try {
    const {postId} = req.params
    console.log("Post id", postId)
    const exercisePost = await Exercise.fetchExercisePostById(postId)
    console.log("Exercise post here?", exercisePost)
    res.status(200).json({exercisePost})
  } catch (err) {
    next(err);
  }
});

exercise.put("/",requireAuthenticatedUser, authedUserOwnsPost, async (req, res, next) => {
  // update exercicse post
  try {
    const {postId} = req.params
    const exercisePost = await Exercise.editExercisePost({postUpdate: req.body, postId})
    return res.status(200).json({exercisePost})
  } catch (err) {
    next(err);
  }
});

module.exports = exercise;
