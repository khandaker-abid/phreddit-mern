import { useState } from "react";
import { PostList } from "./post";
import {  sortNewest } from "./sort";
import { HomeHeader } from "./home_header";


export function Community(props) { //{community object, list of posts in model, model itself}
    //need to modify community page header here
    console.log(props.community)
    let list = props.community.postIDs
    list=sortNewest(list)
    props.setPosts(list)
    const [sort,setSort]= useState(<PostList posts={list} db={props.db} postClick={props.postClick}></PostList>)

    return (
    <div id="community_page" className="page">
        <HomeHeader
        description={props.community.description}
        startDate={props.community.startDate}
        headerText={props.community.name}
        sortButtons={true}
        extraInfo={true}
        list={list}
        db={props.db}
        postClick={props.postClick}
        setSort={setSort}
        ></HomeHeader>
        
        <div id="display">
            <h2 id='post_count'>{props.community.postIDs.length} {props.community.postIDs.length===1?"Post":"Posts"} {"        "}{props.community.members.length} {props.community.memberCount===1?"Member":"Members"}</h2>
            {sort}
        </div>
    </div>
    )
}
function postsForComm(comm, posts) {
    let y = []
    loop:
    for(const id of comm.postIDs) {
        for(const post of posts) {
          if(post.postID === id) {
            y.push(post)
            continue loop;
          }
        }
    }
    return y;
}

export function findCommunity(postID, communities) {
    for(const i of communities) {
        for(let j=0;j<i.postIDs.length;j++) {
            if(i.postIDs[j]._id===postID) {
                return i
            }
        }
    }
    console.log('uh oh')
    return null
}