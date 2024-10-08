const Movie = require("../models/Movies");

module.exports.addMovie = async (req, res) => {
    try {

        const existingMovie = await Movie.findOne({ title: req.body.title })

        if (existingMovie) {
            return res.status(409).send({ message: "Movie already exists "})
        }

        const newMovie = new Movie({
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            description: req.body.description,
            genre: req.body.genre
        });

        const result = await newMovie.save();
        return res.status(201).send(result);

    } catch (err) {
        console.error("Error in creating movie", err);
        return res.status(500).send({ error: "Error creating movie" });
    }
}

module.exports.getAllMovies = async (req, res) => {
    try {
        const result = await Movie.find({});

        if(result.length > 0) {
            return res.status(200).send(result);
        }else {
            return res.status(404).send({ message: "No Movies Found" });
        };

    } catch (err) {
        console.error("Error in retrieving all movies", err);
        return res.status(500).send({ error: "Error" });
    }
}

module.exports.getMovie = async (req, res) => {
    try {

        const movie = await Movie.findById(req.params._id)

        if (!movie) {
            return res.status(404).send({ message: "Movie not found" })
        } else {
            return res.status(200).send(movie);
        }

    } catch (err) {
        console.error("Error in retrieving all movies", err);
        return res.status(500).send({ error: "Error" });
    }
}

module.exports.updateMovie = async (req, res) => {
    try {

        const movie = await Movie.findById(req.params._id);

        if (!movie) {
            return res.status(404).send({ error: 'Movie not found' });
        }

        const updatedMovie = {
            title: req.body.title || movie.title,
            director: req.body.director || movie.director,
            year: req.body.year || movie.year,
            description: req.body.description || movie.description,
            genre: req.body.genre || movie.genre
        };

        const result = await Movie.findByIdAndUpdate(req.params._id, updatedMovie, { new: true });

        return res.status(200).send({ message: 'Movie updated successfully', updatedMovie: result });

    } catch (error) {
        console.error("Error updating movie: ", error);
        return res.status(500).send({ error: "Error updating movie" });
    }
};

module.exports.deleteMovie = async (req, res) => {
    try {

        const movie = await Movie.findById(req.params._id);

        if (!movie) {
            return res.status(404).send({ error: "Movie not found"});
        } 

        await Movie.findByIdAndDelete(req.params._id);

        return res.status(200).send({ message: "Movie deleted successfully"});

    } catch (error) {
        console.error("Error deleting movie: ", error);
        return res.status(500).send({ error: "Error deleting movie" });
    }
}