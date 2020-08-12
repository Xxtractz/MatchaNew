import React, {Component} from 'react';
import Layout from "../Layout/layout";
import { MessageBox} from "react-chat-elements";
import io from "socket.io-client";
import {getUserId, getUsername} from "../../actions/user";
import 'react-chat-elements/dist/main.css';
import '../../assets/styles/component/chatbox.scss';
import MatchedUsers from "./matchedUsers";
import { store } from 'react-notifications-component';
import {getMyMatches} from "../../actions/api";

const socket = io.connect("http://localhost:4000");

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            chat: [],
            matchedUser:[],
            cards: [],
            nickname: getUsername(),
            receiver:'' };
    }

    componentDidMount() {
        this.getMatchedState();
        socket.on("chat message", ({ nickname,receiver, msg }) => {
            this.setState({
                chat: [...this.state.chat, { nickname,receiver, msg }]

            });
            if(getUsername() !== nickname){
            store.addNotification({
                title: "New Message From "+nickname ,
                message: msg,
                type: "info",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                dismiss: {
                    duration: 5000,
                }
            });}
        });
    }

    getMatchedState(){
        getMyMatches(getUserId()).then(res => {
            if(res.status === 200){
                res.data.filter(matches =>
                {
                    if (matches.user_1 === getUserId() ){
                        this.setState({ matchedUser: [...this.state.matchedUser,matches.user_2]})
                    }else if (matches.user_2 === getUserId() ) {
                        this.setState({ matchedUser: [...this.state.matchedUser,matches.user_1]})
                    }
                });
                const users = JSON.parse(localStorage.getItem("users"));
                const filteredData = users.filter(res => this.state.matchedUser.includes(res.userid));
                if (filteredData){
                    this.setState({cards : [...filteredData]})
                }
            }
        });
    }

    onTextChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onMessageSubmit = () => {
        const { nickname,receiver, msg } = this.state;
        socket.emit("chat message", { nickname,receiver, msg });
        this.setState({ msg: "" });
    };

    renderChat() {
        const { chat } = this.state;
        return chat.map(({ nickname, receiver, msg }, idx) => (
            <div key={idx}>
                    {nickname === getUsername() ?
                        <MessageBox
                            position={'left'}
                            title={nickname}
                            type={'text'}
                            text={msg}
                            dateString={" "}
                        /> :
                        <MessageBox
                            position={'right'}
                            title={nickname}
                            type={'text'}
                            text={msg}
                            dateString={" "}
                        />}
                </div>
        ));
    }

    displayChatBox(username){
        const {cards} = this.state;
        if (cards.find(user => (user.username === username)))
            return(
                <section className="msger">

                    <main className="msger-chat">
                        <div>{this.renderChat()}</div>
                    </main>

                    <div className="msger-inputarea">
                        <input
                            name="msg"
                            onChange={e => this.onTextChange(e)}
                            value={this.state.msg}
                        />
                        <button onClick={this.onMessageSubmit}>Send</button>
                    </div>
                </section>
            )
    }

    render() {
        const {cards} = this.state;
        return (
            <div>
                <Layout>
                    <div className={'row'}>
                        <div className={'col-4'}>
                            <MatchedUsers></MatchedUsers>
                        </div>
                        <div className={'col-7'}>
                            {
                                window.location.hash ? this.displayChatBox(window.location.hash.substr(1)):''
                            }

                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}

export default Chat;