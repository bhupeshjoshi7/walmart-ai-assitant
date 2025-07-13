import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./page/Router";
import CssBaseline from "@mui/material/CssBaseline";
import Widget from "./Widget";
import { DataContext } from "./Components/dataprovider/DataProvider";
// import { auth } from "./utility/firebase"; // Uncomment if Firebase auth is needed

function App() {
  const [, dispatch] = useContext(DataContext); // Get dispatch from context

  // Optional: Firebase user listener
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     dispatch({
  //       type: 'SET_USER',
  //       user: authUser || null,
  //     });
  //   });
  //   return unsubscribe;
  // }, [dispatch]);

  const bot = {
    name: "Wali",
    url: "https://cdn.discordapp.com/avatars/630686815736692746/89a1377032b7030586ba964485ca23fc.webp?size=1024",
    profile: "Walmart's Assistan",
  };

  const [messages, setMessages] = useState([]);

  const handleMessages = (newMessages) => {
    const f = [...newMessages];
    setMessages(newMessages);
    BotMsg(f);
  };

  const BotMsg = async (messages) => {
    const message = messages[0].message;
    try {
      const response = await fetch(
        `https://epaxbot.herokuapp.com/chat/${message}/?format=json`
      );
      const data = await response.json();
      setMessages([{ message: data.response, url: bot.url }, ...messages]);
      console.log(data.tag);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  return (
    <Router>
      <CssBaseline />
      <Routing />
      <div className="h-screen relative">
        <div className="absolute flex bottom-2 right-2 sm:bottom-6 sm:right-6 z-50">
          <Widget
            className="bottom-0"
            style={{ height: "80vh", width: "370px", backgroundColor: "red" }}
            bot={bot}
            setMessages={handleMessages}
            messages={messages}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
