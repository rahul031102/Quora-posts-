const express =require("express");
const app= express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require("uuid");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

let posts = [
  { id: uuidv4(), username: "rahul", content: "yo" },
  { id: uuidv4(), username: "kumar", content: "hi" },
  { id: uuidv4(), username: "grace", content: "he" }
];

// SHOW ALL POSTS
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// FORM TO CREATE NEW POST
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE POST
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  const id=uuidv4();
  //const id = Date.now().toString(); // unique id
  posts.push({ id, username, content });

  res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post = posts.find(p => p.id === id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find(p=>p.id===id);
    res.render("edit.ejs",{post});
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find(p=>p.id===id);
    res.render("see.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter(p=>p.id!==id);
    res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

