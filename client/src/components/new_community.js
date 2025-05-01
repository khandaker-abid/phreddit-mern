import { useState } from "react";
import { findHyperlink } from "./hyperlink";
import axios from 'axios';

export function NewCommunityForm({db, appendCommunity, pageCommunity, getDb}) {
    const [community,setCommunity] = useState('')
    const [desc,setDesc] = useState('')
    const [user,setUser]= useState('')

    const [communityError,setCommunityError] = useState('')
    const [userError,setUserError]= useState('')
    const [descError,setDescError] = useState('')

    const handleCommunity = (event) => {
        setCommunity(event.target.value);
    };
    const handleDesc = (event) => {
        setDesc(event.target.value);
    };
    const handleUser = (event) => {
        setUser(event.target.value);
    };

    function submitCommunity(db) {
        setCommunityError('')
        setUserError('')
        setDescError('')
        
        let linkedDesc = findHyperlink(desc,setDescError)

        if(validateCommunity(community,user) & linkedDesc!=null) {
            let comm = {
                name: community,
                description: linkedDesc,
                postIDs:[],
                members: [user],
                startDate:new Date()
            }
            console.log('in')
            axios.post('http://127.0.0.1:8000/newCommunity',comm).then((res)=>{comm=res})



            //appendCommunity(comm, db.data.communities.length-1)
            getDb()
            pageCommunity(comm)
        }
        
        //document.getElementById("community_list").innerHTML += `<li onClick="displayCommunity(${db.data.communities.length-1})">`+db.data.communities[db.data.communities.length-1].name+"</li>";
        //work on moving view to community
        
    }

    function validateCommunity(community,user){
        let ret=true;
        if(community===''){
          ret=false;
          setCommunityError('Must Not Be Blank')
        }
        if(user===''){
          ret=false;
          setUserError('Must Not Be Blank')
        }
        return ret;
    }
    
    

    return(
        <div id="new_community_page">
        <h1 className = 'logo' id='title'>Create a Community</h1>
        
        <label htmlFor="community">Community Name(required, Max 100 Characters)</label><br></br>
        <input type="text" id="community" name="community" maxLength="100" value={community} onChange={handleCommunity}></input>
        <h3 style={{color:"red"}} id="alert0">{communityError}</h3>
        <label htmlFor="desc">Community Description (Max 500 Characters)</label><br></br>
        <input type="text" id="desc" name="description" value={desc} onChange={handleDesc} maxLength="500"></input>
        <h3 style={{color:"red"}} id="alert1">{descError}</h3>
        <label htmlFor="username">Username (required)</label><br></br>
        <input type="text" id="username" name="username" value={user} onChange={handleUser}></input>
        <h3 style={{color: "red"}} id="alert2">{userError}</h3>
        <button onClick={()=>submitCommunity(db)}>Engender Community</button>
        </div>
    )
}