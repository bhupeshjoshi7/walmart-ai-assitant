import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Widget from "./Widget"

const App = () => {
    const bot = { name: "EPAX", url: "https://cdn.discordapp.com/avatars/630686815736692746/89a1377032b7030586ba964485ca23fc.webp?size=1024", profile: "Walmart's Assistan" }
  const [messages, setMessages] = useState([])
  const handleMessages = (newmessages, newmassage = null) => {
    const f = [...newmessages]
    setMessages(newmessages)
    BotMsg(f)
  }

  const BotMsg = async (messages) => {
    const message = messages[0].message
    fetch(`https://epaxbot.herokuapp.com/chat/${message}/?format=json`)
      .then(response => response.json())
      .then(data => {
        setMessages([{ message: data.response, url: bot.url }, ...messages]);
        console.log(data.tag);
      });
  }
  return (
    <div>
      <CssBaseline />
      <div className="h-screen bg-gray-200 relative">
        <div className=" absolute flex bottom-2 right-2 sm:bottom-6 sm:right-6">
          <Widget className="bottom-0"
            style={{ height: '80vh', width: "370px", backgroundColor: "red" }}
            bot={bot}
            setMessages={handleMessages}
            messages={messages}
          />
        </div>
      </div>
    </div>
  )
}

export default App;