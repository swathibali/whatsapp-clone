import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import "./SidebarChat.css";
function SidebarChat({ id, name ,addNewChat}) {
  const [seed, setseed] = useState("");
  const [lastMessage, setlastMessage] = useState("")

  useEffect(() => {
    setseed(Math.floor(Math.random() * 200));
    return () => {};
  }, []);

  useEffect( ()=> {
       if(id){
          db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(sanpshot=>(
            setlastMessage(sanpshot.docs.map(doc=>doc.data()))
          ))
       }
      }
    ,[id])
    
    const createChat =() =>{
      const roomName = prompt('Please enter room name for group chat')
      if(roomName){
        db.collection('rooms').add({
          name: roomName
        })
      }
    }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        ></Avatar>
        <div className="sidebarchat__info">
          <h2>{name}</h2>
          <p>{lastMessage[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : <div onClick ={createChat} className='sidebarchat'>
         <h2>Add New Chat</h2>
      </div>;;
}

export default SidebarChat;
