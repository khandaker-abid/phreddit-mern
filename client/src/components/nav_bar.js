import { useEffect, useState } from "react";

export function NavBar(props){
    const [communityList, setCommunityList] = useState([])
    useEffect(() => {
        const l = props.db.data.communities.map((community,i)=> (<li style ={props.comm===props.db.data.communities[i].communityID ?{color: "orangered"}:{color: "black"}} key={i} onClick={() =>props.pageCommunity(props.db.data.communities[i])}>{props.db.data.communities[i].name}</li>));
        setCommunityList(l)
    }, [props.db.data.communities])
    function appendCommunity(community, i) {
        setCommunityList(communityList => [...communityList, (<li style ={props.comm===community.communityID ?{color: "orangered"}:{color: "black"}} key={i} onClick={() =>props.pageCommunity(community)}>{community.name}</li>)])
    }
    return(
        <div id="nav_bar">
            <button style ={props.home===true ?{backgroundColor: "orangered"}:{}} id="home_button" onClick={() =>props.pageHome()}>Home</button> 
            <h1></h1>
            <h2>Communities</h2>
            <button style ={props.newCommunity===true ?{backgroundColor: "orangered"}:{}} id="create_community_button" onClick={() =>props.pageNewCommunity(appendCommunity, props.pageCommunity)} >Create Community</button>
            <ul id="community_list">
                {/* {communityList} */}
                {communityList}
            </ul>
        </div>
    );
}