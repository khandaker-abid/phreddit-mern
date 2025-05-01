import { HomeHeader } from "./home_header";
import { useState } from "react";
import { findHyperlink } from "./hyperlink";
import axios from 'axios';

export function NewComment(props){
    const [comment,setComment] = useState('')
    const [user,setUser] = useState('')

    const [commentError,setCommentError] = useState('')
    const [userError,setUserError] = useState('')

    function submitComment(postid,commid,database){
        //onsole.log("yay")
        setCommentError('')
        setUserError('')

        let linkedComment = findHyperlink(comment,setCommentError)
      
        if(validateComment(comment,user) & linkedComment!=null){
          console.log(props.postid)

          axios.post('http://127.0.0.1:8000/newComment',{
            content: linkedComment,
            commentedBy:user,
            postID: postid,
            commentID: commid
          })
          props.getDb()
          props.pagePost(props.post,props.community,props.comments);
        }
    }

    function validateComment(comment,user){
        let ret=true;
        if(comment===''){
          ret=false;
          setCommentError('Must Not Be Blank')
        }
        if(user===''){
          ret=false;
          setUserError('Must Not Be Blank')
        }
        return ret;
    }

    const handleComment = (event) => {
        setComment(event.target.value);
    };
    const handleUser = (event) => {
        setUser(event.target.value);
    };

    return(
        <div id="home_page">
            <HomeHeader 
            headerText="Add a Comment"
            sortButtons= {false}
            ></HomeHeader>
            <div id="display">
                <label for="comment">Comment (required, Max 500 Charachters)</label><br></br>
                <input type="text" id="comment" name="comment" maxlength="500" value={comment} onChange={handleComment}></input>
                <h3 style={{color: "red"}} id="alert0">{commentError}</h3>
                <label for="username">Username (required)</label><br></br>
                <input type="text" id="username" name="username" value={user} onChange={handleUser}></input>
                <h3 style={{color: "red"}} id="alert1">{userError}</h3>
                <button onClick={()=>submitComment(props.postid,props.commid,props.db)}>Submit Comment</button>
            </div>
        </div>
    )
}


  
  

  function findComment(id,database){
    for(let i=0; i<database.data.comments.length;i++){
      if(database.data.comments[i].commentID===id)return database.data.comments[i];
    }
    return 0;
  }

  function findIndex(id,database){
    for(let i = 0; i < database.data.posts.length; i++) {
      if(database.data.posts[i].postID===id) {
        return i;
      }
    }
    return null;
  }