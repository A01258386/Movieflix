/*
 Authors:Gokce Gokmen
 Your name and student id:A01258386
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let movieList = ['Inception','Spiderman','The Dark Knight','Tenet']

//create avariable that contains your name, and then replace John with your name
var name = "Gokce";
// app.get("/", (req, res) => res.render("pages/index", { name: name }));
app.get("/", (req, res) => res.render("pages/index", { movieList,name}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  let arr = req.body.text.split(",");
  movieList = arr;
  res.redirect("/");
});



app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  //http://localhost:3000/myListQueryString?movie1=The%20Incredibles&movie2=Transformers
  let { movie1, movie2 } = req.query;
  movieList = [movie1, movie2];
  res.redirect("/");
  //let movie1 = req.query.movie1;
  //let movie2 = req.query.movie2;
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  //let movieName = req.params.movieName;
  let { movieName } = req.params;
  fs.readFile("movieDescriptions.txt",(err,data)=>{
    if(err) {console.log(err); return}
    let movies = data.toString().split("\n");
    movies = movies.map(movie => {
      // let title = movie.split(":")[0];
      // let description = movie.split(":")[1];
      let [title, description] = movie.split(":");
      return { title, description };
    })
    let result = movies.filter(movie => movie.title.toLowerCase() == (movieName.toLowerCase()))[0];
    if(!result) res.render("pages/searchResult",{title:"Movie could not be found",description:""} );
    else res.render("pages/searchResult",result );
  });


});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});