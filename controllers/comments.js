const Movie = require("../models/Movies")
const Comment = require("../models/Comments");

module.exports.addComment = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params._id);

        if (!movie) {
            return res.status(404).send({ error: "Movie not found" });
        }

        const newComment = new Comment({
            userId: req.user._id || req.user.id, 
            comments: req.body.comment 
        });

        const savedComment = await newComment.save();

        movie.comments.push(savedComment._id);

        const updatedMovie = await movie.save();

        const populatedMovie = await Movie.findById(updatedMovie._id).populate({
            path: 'comments',
            select: 'userId comments _id',
            model: 'Comment'
        });

        return res.status(201).send({ message: "Comment added successfully", updatedMovie: populatedMovie });

    } catch (error) {
        console.error("Error adding comment: ", error);
        return res.status(500).send({ error: "Error adding comment" });
    }
};

module.exports.getComment = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;

        const userComments = await Comment.find({ userId: userId });

        if (!userComments || userComments.length === 0) {
            return res.status(404).send({ message: "No comments found for this user." });
        }

        return res.status(200).send({comments: userComments});
    } catch (error) {
        console.error("Error retrieving comments: ", error);
        return res.status(500).send({ error: "Error retrieving comments" });
    }
};