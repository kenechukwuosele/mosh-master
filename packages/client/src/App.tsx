import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
    
  }, [])
  
  return <p className='font-bold p-4 text-3xl'>
    Message from server: {message}
  </p>
}

export default App
