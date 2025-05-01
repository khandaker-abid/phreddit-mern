import { CommentThread } from "./comment";
import { PostInView } from "./post";

export function Post(props) { //{post object, community name, list of comments in model object, model}
    return(
        <div id="post_page" className="page">
            <PostInView pageNewComment={props.pageNewComment} post={props.post} community={props.community} comments={props.comments} db={props.db}></PostInView>
            <CommentThread post={props.post} comments={props.comments} community={props.community} pageNewComment={props.pageNewComment}></CommentThread>
        </div>
    )
}