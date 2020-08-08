import React, { Component } from "react";
import Layout from "../Layout/layout";
import {getActive} from "../../actions/user";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats:[],
      activeChat:null
    };
  }


  setActiveChat = (activeChat) => {
    this.setState({activeChat})
  }

  chatView(){
    // const { activeChat, chats ,user} = this.state
    return (
        <div>
        </div>
    )
  }

  render() {
    return (
      <div>
        {getActive() === 1 ? (
          <Layout>{this.chatView()}</Layout>
        ) : (
          this.props.history.push(`/user`)
        )}
      </div>
    );
  }
}

export default ChatContainer;
