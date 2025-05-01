import { PostList } from "./post";
import { useState } from "react";
import { sortNewest} from "./sort";
import { HomeHeader } from "./home_header";

export function Search(props) { //{search: search prompt, list of posts, list of comments, model}
    let queries = getQueries(props.search, props.posts, props.db.data.comments)
    const [sort,setSort]= useState(<PostList posts={queries} db={props.db} postClick={props.postClick}></PostList>)
    // const sortList = (mode, l) => {
    //         switch(mode) {
    //             case 0: queries=sortNewest(l); break;
    //             case 1: queries=sortOldest(l); break;
    //             case 2: queries=sortActive(l); break;
    //         }
    //         setSort(<PostList posts={queries} db={props.db} postClick={props.postClick}></PostList>)
    // }
    queries=sortNewest(queries)
    let empty = (<h2 id="post_display">
    {"No results for: " + props.search}
            </h2>)
    return (
        <div id="home_page" className="page">
          <HomeHeader
          headerText={"Results for:" + props.search}
          sortButtons={true}
          extraInfo={false}
          list={queries}
          db={props.db}
          postClick={props.postClick}
          setSort={setSort}
          ></HomeHeader>
          <div id="display">
              <h2 id='post_count'>{queries.length} {queries.length===1?"Post":"Posts"}</h2>
              {queries.length!==0 ? sort : empty}
          </div>
        </div>
    )
}

function getQueries(search, posts, comments) {
    let searchList = []
    console.log(posts)
    let list = search.split(" ");
    loop:
    for(const post of posts) {
      for(const word of list) {
        let w = word.toLowerCase();
        if(post.title.toLowerCase().includes(w) || post.content.toLowerCase().includes(w)) {
          searchList.push(post)
          continue loop;
        }
      }
      let IDs = post.commentIDs
      for(const comment of comments) {
          if(IDs.includes(comment.commentID)) {
            for(const word of list) {
              if(comment.content.includes(word)) {
                searchList.push(post)
                continue loop;
              }
            }
          }
      }
    }
    return searchList;
}