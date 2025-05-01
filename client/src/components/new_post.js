import { HomeHeader } from "./home_header";
import { useState } from "react";
import { findHyperlink } from "./hyperlink";
import axios from 'axios';

export function NewPost(props){

  const selectComm = []
  for(let i=0; i<props.db.data.communities.length;i++){
      selectComm.push(<option key={i} value={i}>{props.db.data.communities[i].name}</option>);
  }
  const selectFlair = []
  selectFlair.push(<option key={0} value='no flair'>no flair</option>);
  for(let i=0; i<props.db.data.linkFlairs.length;i++){
      selectFlair.push(<option key={i+1} value={i}>{props.db.data.linkFlairs[i].content}</option>);
  }

  const [communityError,setCommunityError] =useState('');
  const [titleError,setTitleError] =useState('');
  const [flairError,setFlairError] =useState('');
  const [contentError,setContentError] =useState('');
  const [userError,setUserError] =useState('');

    //post submission
    async function handleSubmit(e){
        //onsole.log("yay")    
        e.preventDefault();

        const form = e.target;
        const fd = new FormData(form)
        const data = Object.fromEntries(fd.entries());

        console.log(parseInt(data.community))
        let com = parseInt(data.community)
        let fl=parseInt(data.flair)

        const community = props.db.data.communities[com];
        let flair = 'no flair'
        if(data.flair!=='no flair')  flair = props.db.data.linkFlairs[fl];

        

        let linkedPost = findHyperlink(data.content,setContentError)

        
        if(validatePost(community,data.title,flair,data.cflair,data.content,data.user)& linkedPost!=null){
          //console.log(document.getElementById("comment").value)
          let post={
            title: data.title,
            content: linkedPost,
            linkFlair: flair,
            linkFlairContent:data.cflair,
            user: data.user,
            postedDate:new Date(),
            commentIDs:[],
            views:0,
            communityID:community._id
          }
          //remember to add this post to the postIDs array of the associated community! otherwise the db write is incomplete
          //and home render goes bad
          await axios.post('http://127.0.0.1:8000/newPost',post)
          props.getDb()
          props.pageHome()
        }
    }//end submit post
    
    //validation for new post
    function validatePost(community,title,flair,cflair,content,user){
        let ret=true;
        if(community===''){
          console.log("0")
          ret=false;
          setCommunityError('Must Not Be Blank')
        }
        if(title===''){
          console.log("1")
          ret=false;
          setTitleError('Must Not Be Blank')
        }
        if(content===''){
          console.log("2")
          ret=false;
          setContentError('Must Not Be Blank')
        }
        if(flair==='no flair'&&cflair===''){
          console.log("3")
          ret=false;
          setFlairError('Must Not Both Be Blank')
        }
        if(user===''){
          console.log("4")
          ret=false;
          setUserError('Must Not Be Blank')
        }
        return ret;
    }//end validate post
    console.log(props.db.data)


    return(
        <div id="home_page">
            <HomeHeader 
            headerText="Add a Post"
            sortButtons= {false}
            ></HomeHeader>
            <div id="display">
              <form method='post' onSubmit={handleSubmit}>
                <label htmlFor="community">Select Community (required)</label>
                <select name="community" defaultValue='0'>
                    {selectComm}
                </select>
                <h3 style={{color:"red"}} id="alert0">{communityError}</h3>
                <label htmlFor="newtitle">Post Title (required, Max 100 Charachters)</label><br></br>
                <input type="text" id="newtitle" name="title" maxLength="100" ></input>
                <h3 style={{color:"red"}} id="alert1">{titleError}</h3>
                <label htmlFor="flair" >Select a Flair</label>
                <select id="flair" name="flair" defaultValue='no flair'>
                    {selectFlair}
                </select>
                <label htmlFor="cflair" >or Create a New Flair(optional, max 30 characters)</label><br></br>
                <input type="text" id="cflair" name="cflair" maxLength="30" ></input>
                <h3 style={{color:"red"}} id="alert2">{flairError}</h3>
                <label htmlFor="content">Content (required)</label><br></br>
                <input type="text" id="content" name="content" ></input>
                <h3 style={{color:"red"}} id="alert3">{contentError}</h3>
                <label htmlFor="username">Username (required)</label><br></br>
                <input type="text" id="username" name="user" ></input>
                <h3 style={{color:"red"}} id="alert4">{userError}</h3>
                <button type='submit'>Submit Post</button>
                </form>
            </div>
        </div>
    )
}