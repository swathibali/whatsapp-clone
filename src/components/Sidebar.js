import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton, Input, InputBase } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import { Unsubscribe } from "@material-ui/icons";

function Sidebar() {
  const [rooms, setrooms] = useState([]);
  const [{user},dispatch]=useStateValue();
  console.log("sider bar",rooms)

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setrooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () =>{
      unsubscribe();
    }
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar  src={user?.photoURL}></Avatar>
        
        <div className="sidebar__hearderRight">
          <IconButton>
            <DonutLargeIcon></DonutLargeIcon>
          </IconButton>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <SearchIcon></SearchIcon>
        <input placeholder="Search or start new" type="text"></input>
      </div>

      <div className="sidebar_chats">
      <SidebarChat addNewChat/>
        {
          rooms.map(room=>(
            <SidebarChat key={room.id}  id={room.id} name={room.data.name}></SidebarChat>
          ))
        }
      </div>
    </div>
  );
}

export default Sidebar;
