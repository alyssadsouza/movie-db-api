const express = require("express");

const app = express();

var movies = [
    { id: 1, title: 'Titanic', release_date: '1997' },
    { id: 2, title: 'Harry Potter and the Philosopher\'s Stone', release_date: '2001' },
    { id: 3, title: 'Home Alone', release_date: '1990' },
]

app.get("/movies", (req, res) => {
    res.send(movies);
});

app.post("/movies", (req, res) => {

    const newEntry = {
        id: movies.length()+1,
        title: req.query.title,
        release_date: req.query.release_date
    };
    console.log("Added");
    
    movies.push(newEntry);
    res.send({
        message: "Movie added."
    })
})

app.delete("/movies", (req, res) => {

    movies.clear();
    res.send({
        message: "DB cleared."
    })
})

app.get("/movies/:movieid", (req, res) => {

    const id = Number(req.params.movieid);
    const movie = movies.find(movie => movie.id === id);
    
    res.send(movie);
})

app.delete("/movies/:movieid", (req, res) => {

    const id = Number(req.params.movieid);
    movies = movies.filter(movie => movie.id !== id);
    
    res.send({
        message: "Deleted movie."
    });
})

app.put("/movies/:movieid", (req, res) => {

    const updated = {
        id: Number(req.params.movieid),
        title: req.query.title,
        release_date: req.query.release_date
    };
    movies = movies.map(movie => {
        if (movie.id === updated.id) {
            return updated;
        } else {
            return movie;
        }
    });
    
    res.send({
        message: "Updated movie."
    });
})

app.patch("/movies/:movieid", (req, res) => {

    const id = Number(req.params.movieid);

    movies = movies.map(movie => {
        if (movie.id === updated.id) {
            const toUpdate = Object.keys(req.query);
            toUpdate.forEach(key => {
                movie[key] = req.query[key] 
            });
        }
        return movie;
    });
    
    res.send({
        message: "Updated movie."
    });
})

app.listen(3000, () => console.log("Server is listening to port 3000..."));