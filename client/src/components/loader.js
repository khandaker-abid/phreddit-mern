import axios from "axios";
import Phreddit from "./phreddit";
import { useState, useEffect } from "react";
export default function Loader() {
    const [db, setDB] = useState(null);
    async function getDb() {
        setDB(null)
        try {
            await axios.get("http://127.0.0.1:8000/db").then((res) => {
                setDB(res)
            })
        } catch(err) {
            console.log("DB load failed")
        } finally {
        }
    }

    async function post(post) {
        try {
            await axios.post("http://127.0.0.1:8000/newPost",post).then((res) => {
                setDB(res)
            })
        } catch(err) {
            console.log("DB load failed")
        } finally {
        }
    }

    async function comment(comment) {
        try {
            await axios.post("http://127.0.0.1:8000/newComment",comment).then((res) => {
                setDB(res)
            })
        } catch(err) {
            console.log("DB load failed")
        } finally {
        }
    }

    async function community(community) {
        try {
            await axios.post("http://127.0.0.1:8000/newCommunity",community).then((res) => {
                setDB(res)
            })
        } catch(err) {
            console.log("DB load failed")
        } finally {
        }
    }
    
    useEffect(() => {
        getDb()
    }, [])
    // useEffect(() => {
    //     let x = setInterval(getDb(), 1000)
    //     return () => clearInterval(x)
    // }, [])
    if(!db) return <div>loading...</div>
    //setDb={setDB}
    console.log(db)
    return(
        <div>
         {db!==null? <Phreddit initDb = {db}  getDb = {getDb} newpost={post} newcomment={comment}  newcommunity={community} />:''}
         </div>)
}

// import axios from "axios";
// import Phreddit from "./phreddit";
// import { useState } from "react";
// export default function Loader() {
//     const [db, setDB] = useState(null);
//     (async() => {
//         try {
//             await axios.get("http://127.0.0.1:8000/db").then((res) => {
//                 setDB(res)
//             })
//         } catch(err) {
//             console.log("DB load failed")
//         }
//     })()
//     if(!db) return <div>loading...</div>
//     return <Phreddit initDb = {db}/>
// }