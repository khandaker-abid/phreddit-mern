
import { Timestamp } from "./timestamp";
import { LinkFlair } from "./flair";
import { findCommunity } from "./community";
import { num_comments } from "./comment";

export function PostInList(props){ //Params - {post object, community name (CAN BE NULL), model object}
    console.log(props.db.data.comments)
    let head = null;
    if(props.community != null) {
        head = props.community + " | " + props.post.postedBy + " | "
    } else {
        head = props.post.postedBy + " | " 
    }
    console.log(props.post)
    return(
        <div className="post" onClick={()=>props.postClick(props.post,props.community,props.db.data.comments)}>
            <h4>{head}<Timestamp time={props.post.postedDate}></Timestamp></h4>
            <h1>{props.post.title}</h1>
            <LinkFlair id={props.post.linkFlairID} flairs={props.db.data.linkFlairs}></LinkFlair>
            <h2><p dangerouslySetInnerHTML={{__html: props.post.content.slice(0,80)+(props.post.content.length>80?"...":"")}}></p></h2>
            <h4>{"Views: "+props.post.views+" Comments: "+num_comments(props.db.data.comments,props.post)}</h4>
        </div>
    );
}

export function PostInView(props){ //{post object, community name, model object}
    const head = props.community + " | " 
    console.log(props.post._id)
    //props.db.incrementViews(props.post.postID)
    return(
            <div className="post">
                <h4>{head}<Timestamp time={props.post.postedDate}></Timestamp></h4>
                <h4>{props.post.postedBy}</h4>
                <h1>{props.post.title}</h1>
                <LinkFlair id={props.post.linkFlairID} flairs={props.db.data.linkFlairs}></LinkFlair>
                <h4><p dangerouslySetInnerHTML={{__html: props.post.content}}></p></h4>

                <h4>{"Views: "+props.post.views+" Comments: "+num_comments(props.db.data.comments,props.post)}</h4>
                <button type='button' onClick={()=>props.pageNewComment(props.post._id, 'no',props.post,props.community,props.comments)}>Add a comment</button>

            </div>
    );
}

export function PostList(props){ //{list of post objects, model}
    let posts = props.posts 
    console.log(posts)
    const list = [];
    console.log("in")
    console.log(posts)
    for(let i= 0;i<posts.length;i++) {
        console.log(posts[i])
        list[i] = <PostInList post={posts[i]} db={props.db} community ={findCommunity(posts[i]._id, props.db.data.communities).name} postClick={props.postClick} key={posts[i]._id}></PostInList>
    }
    return(
        <div id="post_display">
            {list}
        </div>
    );
}