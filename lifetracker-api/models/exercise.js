const bcrypt = require("bcrypt");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");
const db = require("/Users/abdul.karim/vaccineHubLab/db");

class Exercise {
  static async createNewExercisePost({ user, exercisePost }) {
    const requiredFields = [
      "category",
      "duration",
      "intensity",
      "exercise_name",
    ];
    requiredFields.forEach((field) => {
      if (!exercisePost.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });
    const result = await db.query(
      `
        INSERT INTO exercise (
          "category",
          "duration",
          "intensity",
          "exercise_name",
          "user_id"
        )
        VALUES  ($1, $2, $3, $4, (select id from users where email = $5) )
        RETURNING user_id, category, duration, intensity, exercise_name;
        
        
        
        `,
      [
        exercisePost.category,
        exercisePost.duration,
        exercisePost.intensity,
        exercisePost.exercise_name,
        user.email,
      ]
    );

    return result.rows[0];
  }

  static async fetchExercisePostById(postId) {

    postId = parseInt(postId)
    const results = await db.query(
      `select user_id, 
      category, 
      intensity, 
      duration, 
      exercise_name, 
      email
      from exercise
      join users on users.id = exercise.user_id
      where users.id = $1`,
      [postId]
    );

    const exercisePost = results.rows;
    console.log("posts?", exercisePost)

    if (!exercisePost) {
      throw new NotFoundError();
    }

    return exercisePost;
  }

  static async listExercisePosts() {
    const results = await db.query(
      `select user_id, category, intensity, duration, exercise_name from exercise
      join users on users.id = exercise.user_id;`
    );

    return results.rows;
  }

  static async editExercisePost() {}
}

module.exports = Exercise;
