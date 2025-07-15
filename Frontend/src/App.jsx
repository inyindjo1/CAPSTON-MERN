
import { useEffect } from 'react'
import './App.css'

function App() {
 
  useEffect(() => {
    async function getData(){
       const response = await fetch('http://localhost:8080')
       const data = await response.json()
       console.log(data)
    }
    getData()
  },{
    
  })

  return (
    <>
      Hello (from frontend )
    </>
  )
}

export default App
