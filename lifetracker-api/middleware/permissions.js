const Exercise = require("../models/exercise")
const {BadRequestError, ForbiddenError} = require("../utils/errors")
// ensure authenticated user is owner of post
// if they aren't, throw an error
// otherwise, nothing else to do

const authedUserOwnsPost = async (req, res, next) => {


    try{

        const {user} = res.locals

        const {postId} = req.params

        const exercisePost = await Exercise.fetchExercisePostById(postId)

        if (exercisePost.email !== user.email){
            throw new ForbiddenError(`User is not allowed to access other user's posts`)
        }

        res.locals.post = exercisePost


        return next()



    } catch(err){

        return next(err)

    }
}

module.exports = {
    authedUserOwnsPost
}