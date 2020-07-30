import React, {Component} from 'react';
import io from 'socket.io-client';
import ChatContainer from "./chat";
import Notification from "./notification";


const serverUrl = "http://localhost:4000";
// const serverUrl = "http://192.168.8.104:4000";
class Sockets extends Component {

    constructor(props) {
        super(props);

        this.state={
            socket:null,
        }
    }
    componentDidMount() {
        const socket = io(serverUrl)
        this.setState({ socket })
        this.initSocket(socket)
    }

    initSocket = (socket) => {
        socket.emit("user_connected", "mesa");

        socket.on("user_connected", username => {
            console.log("Username =>", username);
        });
    }

    render() {
        const {socket} = this.state;
        return (
            <div>
                {window.location.hash === "#chat" ? <ChatContainer socket={socket}/> : ''}
                {window.location.hash === "#notifications" ? <Notification socket={socket}/> : ''}
            </div>
        );
    }
}

export default Sockets;