// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose')

const app = express();
app.use(cors());
app.use(express.json());

const CommunityModel = require('./models/communities');
const PostModel = require('./models/posts');
const CommentModel = require('./models/comments');
const LinkFlairModel = require('./models/linkflairs');

const mongoDB = 'mongodb://127.0.0.1:27017/phreddit';
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//all 
app.get("/db", async (req,res) => {
   
        const communities = await CommunityModel.find().populate('postIDs').exec()
        const posts = await PostModel.find().populate('commentIDs').exec()
        const comments = await CommentModel.find().populate('commentIDs').exec()
        const linkFlairs = await LinkFlairModel.find().exec()
        const resp = {
            communities: communities,
            posts: posts,
            comments: comments,
            linkFlairs: linkFlairs
        }
        const x = {
            data: resp
        }
        //console.log(resp)
        res.send(resp)
})
app.get("/db/communities", async (req, res) => {

    let comm = await CommunityModel.find({}).exec();
    //console.log(posts)
    res.send(comm);
});
app.get("/db/posts", async (req, res) => {

    let posts = await PostModel.find({}).exec();
    //console.log(posts)
    res.send(posts);
});
app.get("/db/comments", async (req, res) => {

    let comm = await CommentModel.find({}).exec();
    //console.log(posts)
    res.send(comm);
});
app.get("/db/flairs", async (req, res) => {

    let flairs = await LinkFlairModel.find({}).exec();
    //console.log(posts)
    res.send(flairs);
});

//home page
app.get("/home/new", async (req, res) => {

    let posts = await PostModel.find({}).sort({postedDate: -1}).exec();
    //console.log(posts)
    res.send(posts);
});

app.get("/home/old", async (req, res) => {
    let posts = await PostModel.find({}).sort({postedDate: 1}).exec();
    //console.log(posts)
    res.send(posts);
});

app.get("/home/active", async (req, res) => {
    let posts = await PostModel.find({}).populate({path:'commentIDs', options: {sort: {commentedDate: -1}}}).exec();
    console.log(posts)
    res.send(posts);
});
//end home page


//community page
app.get("/community/new/:id", async (req, res) => {
    let posts = await CommunityModel.findById(req.params['id']).populate({path:'postIDs', options: {sort: {postedDate: -1}}}).exec();
    console.log(posts.postIDs);
    res.send(posts.postIDs);
});

app.get("/community/old/:id", async (req, res) => {
    let posts = await CommunityModel.findById(req.params['id']).populate({path:'postIDs', options: {sort: {postedDate: 1}}}).exec();
    console.log(posts.postIDs);
    res.send(posts.postIDs);
});

app.get("/community/active/:id", async (req, res) => {
    let posts = await CommunityModel.findById(req.params['id']).populate({path:'postIDs',populate:{path:'commentIDs', options: {sort: {commentDate: -1}}}}).exec();
    console.log(posts.postIDs);
    res.send(posts.postIDs);
});
//end community page

//post page
app.get("/post/:id", async (req, res) => {
    let post = await PostModel.findById(res.params.id).populate('commentIds').exec();
    res.send(post);
});
//end postpage

//search page
app.get("/search/new/:search", async (req, res) => {
    const regex = RegExp(req.params['search'], 'i')
    let posts = await PostModel.aggregate({"$lookup":
        {
          "from": CommentModel.collection.name,
          'as': 'commentIDs'
        }},
        {'unwind':'commentIDs'},
        {'match': {'$or':[{'commentIDs.content':regex, 'content':regex,'title':regex}]}}
    ).exec();
    res.send(posts);
});
//end search page


//new pages post methods
app.post("/newComment", async (req, res) => {
    let newComment = new CommentModel({
        content:req.body.content,
        commentIDs:[],
        commentedBy:req.body.content,
        commentedDate:new Date()
    });
    let savedComment = await newComment.save();

    console.log(req.body.postID)

    
    if(req.body.commentID!=='no') await CommentModel.updateOne({_id:req.body.commentID},{$push:{'commentIDs':savedComment._id}})
    else await PostModel.updateOne({_id:req.body.postID},{$push:{'commentIDs':savedComment._id}})

    res.send(savedComment);
});

app.post("/newPost", async (req, res) => {
    if(req.body.linkFlair==='no flair'){
        let newLF = new LinkFlairModel({content:req.body.linkFlairContent})
        req.body.linkFlair= await newLF.save();
    }

    let newPost = new PostModel({
        title: req.body.title,
        content: req.body.content,
        linkFlairID: req.body.linkFlair._id,
        postedBy:req.body.user,
        postedDate:new Date(),
        commentIDs:[],
        views:0
    });
    let savedPost = await newPost.save();

    console.log(req.body.communityID)

    await CommunityModel.updateOne({_id:req.body.communityID},{$push:{'postIDs':savedPost._id}})

    res.send(newPost)
});

app.post("/newCommunity", async (req, res) => {
    let newCommunity = new CommunityModel({
        name:req.body.name,
        description:req.body.description,
        postIDs:[],
        startDtate:new Date(),
        members:req.body.members,
    });
    let savedCommunity = await newCommunity.save();

    res.send(savedCommunity);
});
//end new pages


app.listen(8000, () => {console.log("Server listening on port 8000...");});
