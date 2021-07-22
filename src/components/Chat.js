import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "./SidebarChat";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from 'firebase'
function Chat() {
  const { roomId } = useParams();
  const [roomName, setroomName] = useState("");
  const [input, setinput] = useState("");
  const [message, setMessages] = useState([]);
  const [{user},dispatch]=useStateValue();

  console.log("chat", roomId);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName(snapshot.data().name));
    }
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return () => {};
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("your feed", input);

    db.collection('rooms').doc(roomId).collection('messages').add({
      message:input,
      name:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
     

    setinput("");
  };
  return (
    <div className="chat">
      <div className="chart__header">
        <div className="chart__headerLeft">
          <SidebarChat id={roomId} name={roomName}></SidebarChat>
        </div>
        <div className="chart__headerRight">
          <SearchIcon></SearchIcon>
          <AttachFileIcon></AttachFileIcon>
          <MoreVertIcon></MoreVertIcon>
        </div>
      </div>
      <div className="chart__body">
          {message.map(message=> (
                   
                  <p className={`chat__text ${message.name==user.displayName && "chat__reciver"} `}>
                 
                  <span className="chat__name">
                     {message.name}
                  </span> {message.message}
                  <span className="chat__time">
                    { new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>

          ))}
      
      </div>
      <div className="chart__footer">
        <EmojiEmotionsIcon></EmojiEmotionsIcon>

        <form className="chart__footer__left">
          <input
            type="text"
            placeholder="type a message"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          ></input>
          <button type="submit" onClick={sendMessage}>
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
