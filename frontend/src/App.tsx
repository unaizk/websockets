import { useEffect, useState } from "react"

function App() {

  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState<string[]>([]);
  const [message, setMessage] = useState('')

  useEffect(() =>{
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () =>{
      console.log('Connected');
      setSocket(socket)
    }

    socket.onmessage = (message) =>{
      setLatestMessage((prevMessages) => [...prevMessages,message.data])
    };
    return () =>{
      socket.close()
    }

  },[])

  if(!socket){
    return (
      <div>
        ... Connecting
      </div>
    )
  }
  return (
    <>
    {console.log(latestMessage)
    }
    <div>
      <input type="text" placeholder="Chat" onChange={(e) =>{
        setMessage(e.target.value)
      }} />
      <button onClick={() =>{
        socket.send(message)
      }}>Send Message</button>
    </div>
    <div>
      {latestMessage}
    </div>
    </>
    
  )
}

export default App
