
import { useState } from "react";

export function Header(props){
    const [search,setSearch] = useState('')

    function updateSearch(event){
        setSearch(() => event.target.value)
    }
    function handleSearch(event){
        event.preventDefault()
        props.pageSearch(search)
    }


    return(
        <div id="header" className="header">
            <button onClick={() =>props.pageHome()} className="logo">phreddit</button>
            <form onSubmit={handleSearch}>
                <input type="text" id="search_bar"
                placeholder="Search PHreddit..."
                value={search}
                onChange={updateSearch}
                >
                </input>
            </form>
            <button style ={props.newPost===true ?{backgroundColor: "orangered"}:{}}  id="create_post_button" className="header_buttons" onClick={() =>props.pageNewPost()} >create post</button>
        </div>
    );
}