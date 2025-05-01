import { latest_comment_time } from "./comment"

export function sortActive(list, comments){
    let l = list.sort((a,b) => {
        let a_comm_time = latest_comment_time(comments, a)
        let b_comm_time = latest_comment_time(comments, b)
        if(a_comm_time.getTime()!==b_comm_time.getTime()) {
            return b_comm_time-a_comm_time
        } else {
            return new Date(b.postedDate) - new Date(a.postedDate)
        }
    })
    return l
    // let order = new Array(posts.length);
    // for(let i=0; i<posts.length;i++){
    //     let j=i;
    //     order[j]=j;
    //     //console.log(database.data.posts[order[j-1]].commentIDS[1]);
    //     while(j>0&&
    //     findComment(posts[order[j-1]].commentIDs[0]).commentedDate>
    //     findComment(posts[order[j]].commentIDs[0]).commentedDate){
    //         let temp = order[j-1];
    //         order[j-1]= order[j];
    //         order[j]=temp;
    //         j--;
    //     }
    // }
    // for(let i=0; i<posts.length;i++){
    //     let temp = posts[i];
    //     posts[i]=posts[order[i]]
    //     posts[order[i]]
    // }
}
export function sortNewest(list) {
    console.log(list);
    let l = list.sort((a,b)=>new Date(b.postedDate) - new Date(a.postedDate))
    return l
}
export function sortOldest(list) {
    let l = list.sort((a,b)=>new Date(a.postedDate) - new Date(b.postedDate))
    return l
}