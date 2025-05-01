
import { PostList } from "./post";
import { Timestamp } from "./timestamp";
import { sortActive, sortNewest, sortOldest } from "./sort";

export function HomeHeader(props) {
    const sortList = (mode, l) => {
        let newList = []
        switch(mode) {
            case 0: newList=sortNewest(l); break;
            case 1: newList=sortOldest(l); break;
            case 2: newList=sortActive(l, props.db.data.comments); break;
        }
        props.setSort(<PostList posts={newList} db={props.db} postClick={props.postClick}></PostList>)
    }

    return(
        <div className="header" id="home_header">
            <div id="blurb">
            <h1 className="logo" id="title">{props.headerText}</h1> 
            {props.extraInfo ?
            <div id='extra_info'>
                <p dangerouslySetInnerHTML={{__html: props.description}}></p>
                <p id='time'>Created <Timestamp time={props.startDate}></Timestamp></p>
            </div>   : <div></div>
            } 
            </div>
            {props.sortButtons ?
            <div className="button_group">
                <button onClick={()=>sortList(0, props.list)} className="header_buttons" id='new'>Newest</button>
                <button onClick={()=>sortList(1, props.list)} className="header_buttons" id='old'>Oldest</button>
                <button onClick={()=>sortList(2, props.list)} className="header_buttons" id='active'>Active</button>
            </div>  : <div></div>
            }
        </div>
    );
}