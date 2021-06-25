import React,{ useState }from 'react'
import './Chat.css'
import { IconButton, Avatar } from  '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import axios from './axios'

function Chat({ messages }) {
    const [input, setInput] = useState('')

    const sendMessage =(e) =>{
        e.preventDefault()
        axios.post('/messages/new',{
            message:input,
            name:"swathi",
            timestamp:"just now",
            recieved:false
        })
        setInput('')
    }
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
            <div className="chat__body">
                {messages.map((message,msgIndex) =>(
                    <p 
                        key ={msgIndex} 
                        className={message.received ?'chat__message':'chat__message chat__reciever'}
                    >
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type a message'
                        type='text'
                    />
                    <button 
                        onClick={sendMessage}
                        type='sumbit'
                    >
                        Send a Message
                    </button>
                </form>
                <KeyboardVoiceIcon />
            </div>
        </div>
    )
}

export default Chat
