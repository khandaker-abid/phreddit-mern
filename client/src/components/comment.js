
import { Timestamp } from "./timestamp";

export function CommentThread(props) {  //{post object, list of comments model}
  function recursiveComment(comment, iter, postID, comments) { //{comment in subject, iter(iterative index), postID of comment, list of comments in model}
    console.log(comment)
    let replies = ""
    if (comment.commentIDs.length>0) {
        for(const id of comment.commentIDs) {
          replies = (<>{replies}
          <div id={id._id}></div>
          {recursiveComment(getComment(id._id, comments), iter+1,postID, comments)}</>)
        }
      }
    return(
        <div>
            <pre><h4>{"\t".repeat(iter)+comment.commentedBy+" | "}<Timestamp time={comment.commentedDate}></Timestamp></h4></pre>
            <pre><h4>{"\t".repeat(iter)+"| " + comment.content}</h4></pre>
            <pre>{"\t".repeat(iter)}<button type='button' onClick={()=>props.pageNewComment(postID,comment._id,props.post,props.community,props.comments)}>Reply</button></pre>
            {replies}
        </div>
    )
  }

  let comms = [];
  loop:
  for(const comment of props.comments) {
    for(const id of props.post.commentIDs) {
        let x;
        if(typeof id == "string") x = id;
        else x = id._id
        if(comment._id === x) {
            comms.push(comment)
            continue loop;
        }
    }
  }
  console.log(comms)
  let y = ""
  for(const comment of comms) {
      y = (<>{y}
      <div id={comment._id}>{recursiveComment(comment,0,props.post._id, props.comments)}</div></>
      )
  }
  return(
      <div id='comments'>
          {y}
      </div>
  )
}



function getComment(id, comments) { //{id for comment in search, list of comments in model}
    console.log(id)
    for(const comment of comments) {
        if(comment._id===id) {
          return comment;
        }
      }
      return null;
}

export function num_comments(comments, post) { 
    console.log(post)
    function recursiveComments(comments, commentID) {
        let i = 0;
        for(const comment of comments) {
            if(commentID===comment._id) {
                console.log(comment.commentIDs)
                i += 1
                for(const reply of comment.commentIDs) {
                    i += recursiveComments(comments, reply._id)
                } 
            }
        }
        return i;
    }
    let n = 0;
    for(const id of post.commentIDs) {
        if(typeof id == "string") {
            n += recursiveComments(comments, id)
        } else {
            console.log(typeof id)
            n += recursiveComments(comments, id._id)
        }
    }
    return n
}

export function latest_comment_time(comments, post) { //{list of commentIDs for post}
    function recursiveComments(comments, commentID) {
        let i = new Date(0);
        for(const comment of comments) {
            if(commentID===comment._id) {
                console.log(comment)
                if(new Date(comment.commentedDate)>i) {
                    i = new Date(comment.commentedDate);
                }
                for(const reply of comment.commentIDs) {
                    let replyDate = recursiveComments(comments, reply._id)
                    if(replyDate>i) {
                        i = replyDate
                    }
                } 
            }
        }
        return i;
    }
    let n = new Date(post.postedDate);
    for(const id of post.commentIDs) {
        let commentDate = recursiveComments(comments, id._id)
        if(commentDate>n) {
            n = commentDate
        }
    }
    return n
}