import { useEffect, useState } from 'react'

import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'



function App() {

  const [todos, setTodos] = useState([])

  useEffect(()=>{
      fetch("http://localhost:3000/todos")
    .then(async(res)=>{
      const json = await res.json();
      setTodos(json.todos)
    })
    },[])


  console.log(todos)
  return (
    <>
    <div >
    <CreateTodo/>
    <Todos todos={todos}/>
    </div>
    </>
  )
}

export default App
