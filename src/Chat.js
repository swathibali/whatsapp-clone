import React from 'react'
import './Chat.css'
import { IconButton, Avatar } from  '@material-ui/core'
import { AttachFile,MoreVert,SearchOutlined} from '@material-ui/icons'

function Chat() {
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>last seen...</p>
                </div>
                <div className="chat__headerRght">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__bdy">
                <p>
                    <span className="chat__name">Swathi</span>
                    This is massage
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Chat
