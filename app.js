//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my blog";
const aboutContent = "This is a blog i created to practice on Web Developement. I used Node.js, with the extensions Express, Body Parser and EJS. ";
const contactContent = "https://github.com/Hroque1987";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){  
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  }); 
});


app.get("/posts/:postName", function(req,res){
  const requestedName = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const postTitle = _.lowerCase(post.title);
    if ( postTitle === requestedName ) {
      const title = posts
      res.render ("post" , {
        title:post.title ,
        content: post.content
      });
    };   
   });
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});


app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});


app.get("/compose", function(req, res) {
  res.render("compose");
});



app.post("/compose", function(req, res) {
  const blogPost = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(blogPost);
  res.redirect("/");    
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
