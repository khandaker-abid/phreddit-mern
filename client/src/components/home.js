import { useState } from "react"
import { PostList } from "./post"
import { HomeHeader } from "./home_header"
import { sortNewest } from "./sort";

export function Home(props){
    console.log(props.db.data.communities);
    let list =[]
    for(let i=0;i<props.db.data.posts.length;i++){
        console.log(i)
        list.push(props.db.data.posts[i]);
    }
    list = sortNewest(list)
    const [sort,setSort]= useState(<PostList posts={list} db={props.db} postClick={props.postClick}></PostList>)

    return(
        //<PostList posts={props.db.data.posts} db={props.db}></PostList>
        <div className="page">
            <HomeHeader 
            headerText="All Posts"
            sortButtons= {true}
            postClick={props.postClick}
            db={props.db}
            list = {list}
            setSort={setSort}
            ></HomeHeader>
            <h2 id="post_count">
                {props.db.data.posts.length} {props.db.data.posts.length===1?"Post":"Posts"}
            </h2>
            <div id="display">
                {sort}
            </div>
        </div>
    )
}