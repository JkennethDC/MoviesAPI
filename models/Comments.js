const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Comment", commentSchema);
