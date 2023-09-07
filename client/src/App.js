import React, {useEffect, useState} from 'react';
import './app.css'
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

function App() {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');


    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get(`${API_URL}/get-messages`)
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const sendMessage = async () => {
        await axios.post(`${API_URL}/new-messages`, {
            message: value,
            id: Date.now()
        })
    }

  return (
      <div className="center">
          <div>
              <div className="form">
                  <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                  <button onClick={sendMessage}>Отправить</button>
              </div>
              <div className="messages">
                  {messages.map(mess =>
                      <div className="message" key={mess.id}>
                          {mess.message}
                      </div>
                  )}
              </div>
          </div>
      </div>
  )
}


export default App;
