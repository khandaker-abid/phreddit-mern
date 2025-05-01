// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import Phreddit from './components/phreddit.js'
import axios from 'axios';
import Loader from './components/loader.js'

// let db = null
// await axios.get("http://127.0.0.1:8000/db")
// .then((res) => {
//     console.log(res.data)
//     setDB(res);
//     setPosts(res.data.posts);
// })
// .catch((err) => {
//     console.log("Request failed");
// });

function App() {
  return (
    <section className="phreddit">
      <Loader />
    </section>
  );
}

export default App;
