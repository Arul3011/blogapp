import { useState } from 'react'
import { Routes,Route,Link } from 'react-router-dom'
import Home from "./Home";
import Add from "./Add";
import User from "./User";

import Header from './Header'
import './App.css'
import Blog from './Blog';
import Editpost from './Editpost';
import Editpage from './Editpage';

function App() {
  const [editid,setEditid] = useState(0)
  const[search,setSearch]=useState("")
  const date = new Date()
  const [data,setData] = useState([
    {
      id:1,
      title : "test1",
      time: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
      blog:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnam",
    
    },
    {
      id:2,
      title : "test2",
      time: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
      blog:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnam"
    },
  {
    id:3,
    title : "test3",
    time: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
    blog:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnamLorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero commodi aspernatur eligendi nam illum aperiam at qui autem inventore ea, dolorem magni quas quasi obcaecati facilis odio necessitatibus magnam"
  }
  ])
  const [count, setCount] = useState(0)

  return (
    <div className='cointainer'>
    <Header className='header'/>
    <Routes>
      <Route path="/" element={<Home 
        search={search}
        setSearch={setSearch}
        data={data} />}/>
      <Route path="/add" element={<Add 
        data={data}
        setData={setData}
       />}/>
      <Route path="/uplode" element={<User
        data={data}
        setData={setData}
      />} >
     </Route>
      <Route path="/:id" element={<Blog data={data}/>}/>
      <Route path="/uplode/:id" element={<Editpost data={data}
       setEditid={setEditid}
       editid={editid}
      />}>
      </Route>
      <Route path="/uplode/id/Editpage" 
      element={<Editpage data={data} 
        editid={editid}
        setData={setData}
        />}/>
      
      
      <Route>

      </Route>
    </Routes>
    </ div>
  )
}

export default App
