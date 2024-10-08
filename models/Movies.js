const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    director: {
        type: String,
        required: [true, "Director is required"]
    },
    year: {
        type: Number,
        required: [true, "Year is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    genre: {
        type: String,
        required: [true, "Genre is required"]
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

movieSchema.pre('find', function() {
    this.populate('comments');
});

movieSchema.pre('findOne', function() {
    this.populate('comments');
});

module.exports = mongoose.model("Movie", movieSchema);