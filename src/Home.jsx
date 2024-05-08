import { Link } from "react-router-dom"
import './home.css'
 const Home = ({data,setSearch,search}) => {
 
  return (
    <div>
      <input type="text" name="" id="" placeholder="Search...."
      value={search}
      onChange={(e)=> setSearch(e.target.value)} />
      <ul>
    
        {data.filter((val)=>{
          return search.toLowerCase() === "" ? val: val.title.toLowerCase().includes(search);
        }).map((val)=>(
          
            <Link key={val.id} to={`/${val.id}`}>
          <li >
            <h2>{val.title}</h2>
            <p>{val.blog.slice(0,200)}.....<span style={{color:'blue'}}>read more</span></p>
            <small>{val.time}</small>
          </li>
            </Link>
          
        ))}
      </ul>
    </div>
  )
}

export default Home
