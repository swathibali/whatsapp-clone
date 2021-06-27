import React,{ useEffect, useState } from 'react';
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Pusher from 'pusher-js'
import axios from './axios'
import Login from './Login'
import RegisterForm from './Register'

function App() {
  const [messages,setMessages] = useState([])
  const [loggedIn,setLoggedIn] = useState(false)
  useEffect(() => {
    axios.get("/messages/sync")
      .then(response => {
        setMessages(response.data);
      }).catch(error =>{
        console.log(error);
      })
  }, [])

  useEffect(() => {
    var pusher = new Pusher('0058431b7087ec48754f', {
      cluster: 'eu'
    });
    var channel = pusher.subscribe('messages')
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages,newMessage])
    });

    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  function getAuthStatus (authStatus){
    setLoggedIn(authStatus)
  }
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/"><Login isSignedIn ={getAuthStatus} /></Route>
          <Route exact path ='/register' component = {RegisterForm}></Route>
          <Route exact path ='/app'>
          <div className="app__body">
                <Sidebar />
                <Chat messages={messages}/>
              </div>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
