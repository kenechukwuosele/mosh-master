import { useState, useEffect } from 'react';
import './App.css';
import { Button } from './components/ui/button';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <p className="font-bold p-4 text-3xl">Message from server: {message}</p>
      <Button>Click Me</Button>
    </div>
  );
}

export default App;
