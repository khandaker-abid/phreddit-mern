import {useState, useEffect} from 'react';

import axios from 'axios';
import { Header } from './header.js';
import { NavBar } from './nav_bar.js';
import { Home } from './home.js';
import { Community } from './community.js';

import { NewComment } from './new_comment.js';
import { Search } from './search_page.js';
import { NewPost } from './new_post.js';
import { NewCommunity } from './new_community_page.js';
import { Post } from './post_page.js';

export default function Phreddit({initDb, getDb}) {
  
  //db state object
  const [db, setDB] = useState(initDb)
  const [posts,setPosts]=useState(initDb.data.posts)
  //current page display
  const [page,setPage]=useState(<Home 
    headerText="Home"
    db={db}
    homeClick = {pageHome}
    postClick = {pagePost}
    ></Home>);
  //end page

  //page boolean values
  const [home,setHome]=useState(true)
  const [newPost,setNewPost]=useState(false)
  const [newCommunity,setNewCommunity]=useState(false)
  const [community,setCommunity]=useState('')
  //end page bool values

  //page functions
  
  function pageHome(){
    getDb()
    setHome(true)
    setNewPost(false)
    setNewCommunity(false)
    setCommunity('')
    console.log(db)
    setPage(<Home db={db} 
      headerText="Home"
      sortButtons= {true}
      postClick = {pagePost}
      ></Home>)//we can use methods following this scheme to change the page
    setPosts(db.data.posts)
  }
  async function pageCommunity(community){
    
    setCommunity(community.id)
    setHome(false)
    setNewPost(false)
    setNewCommunity(false)
    setPage(<Community key={community._id} setPosts={changePosts} community={community} posts={db.posts} db={db} postClick = {pagePost}></Community>)

  }
  
  function pageNewComment(postid,commid, post, comm_name, comments){
    console.log(postid)
    setHome(false)
    setNewPost(false)
    setNewCommunity(false)
    setPage(<NewComment pagePost={pagePost} postid={postid} commid={commid} db={db} post={post} community={comm_name} comments={comments} getDb={getDb}></NewComment>)
  }

  async function pagePost(post, comm_name, comments){
    setHome(false)
    setNewPost(false)
    setNewCommunity(false)
    setPage(<Post post={post} community={comm_name} comments={comments} db={db} pageNewComment={pageNewComment}></Post>)
  }
  function pageSearch(search){
    setHome(false)
    setNewPost(false)
    setNewCommunity(false)
    setPage(<Search key={search} db={db} search={search} posts={posts} postClick={pagePost}></Search>)
  }
  function pageNewPost(){
    setHome(false)
    setNewPost(true)
    setNewCommunity(false)
    setCommunity('')
    setPage(<NewPost  db={db} pageHome={pageHome} getDb={getDb}></NewPost>)
  }
  function pageNewCommunity(appendCommunity){
    setHome(false)
    setNewPost(false)
    setNewCommunity(true)
    setCommunity('')
    setPage(<NewCommunity db={db} appendCommunity={appendCommunity} pageCommunity={pageCommunity} getDb={getDb}></NewCommunity>)
  }  
  function changePosts(post){
    setPosts(post)
  }
  //page functions
  return (
    <div id="App">
      <Header  newPost={newPost} pageHome={pageHome} pageNewPost={pageNewPost} pageSearch={pageSearch}></Header>
      <NavBar home={home} comm={community} newCommunity={newCommunity} pageHome={pageHome} pageCommunity={pageCommunity} pageNewCommunity={pageNewCommunity} db={db}> </NavBar>
      {page}
    </div>
  );
}
