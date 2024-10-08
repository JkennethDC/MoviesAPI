const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movies");

const cors = require("cors");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

// Mongo DB
mongoose.connect("mongodb+srv://admin:admin1234@cluster0.ortzbja.mongodb.net/movieApp?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};