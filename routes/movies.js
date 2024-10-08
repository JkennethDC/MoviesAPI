const express = require("express");
const movieController = require("../controllers/movies");
const commentController = require("../controllers/comments");

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

// Movies
router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);

router.get("/getMovies", verify, movieController.getAllMovies);

router.get("/getMovie/:_id", verify, movieController.getMovie)

router.patch("/updateMovie/:_id", verify, verifyAdmin, movieController.updateMovie);

router.delete("/deleteMovie/:_id", verify, verifyAdmin, movieController.deleteMovie);

// Comments
router.patch("/addComment/:_id", verify, commentController.addComment);

router.get("/getComments/:_id", verify, commentController.getComment);

module.exports = router;