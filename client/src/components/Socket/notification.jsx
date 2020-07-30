import React, {Component} from 'react';
import {getActive} from "../../actions/user";
import Layout from "../Layout/layout";

class Notification extends Component {

    notificationView(){
        return (
            <div>
                Notification View
            </div>
        )
    }
    render() {
        return (
            <div>
                {getActive() === 1 ? (
                    <Layout>{this.notificationView()}</Layout>
                ) : (
                    this.props.history.push(`/user`)
                )}
            </div>
        );
    }
}

export default Notification;