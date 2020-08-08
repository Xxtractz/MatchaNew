import React, {Component} from 'react';
import {
    getActive,
    getUserGenderPreference, getUserId,
    getUsername
} from "../../actions/user";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Layout from "../Layout/layout";
import {getNotification, getUsers} from "../../actions/api";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import {Button,Paper} from "@material-ui/core";


class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state={
            notificationCard :[],
            cards:[]
        }
    }

    componentDidMount() {
        getNotification(getUsername()).then(res => {
            this.setState({ notificationCard : [...res.data]});
        });
        getUsers(
            getUserId(),
            (getUserGenderPreference()=== "Both" ? "Other":getUserGenderPreference()),
            18,
            70
        ).then((res)=>{
            this.setState({ cards : [...res.data]});
        });
    }

    filterUser = (username) => {
        const {cards}  =this.state;
        return cards.filter(item => {
            return item.username === username;});
    }

    displayNotifications(){
        const {notificationCard}  = this.state;
        return (
            <div>

                {notificationCard.map((notify,index) =>

                    <List key={index} className={'container'} >
                        <ListItem  alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={
                                    this.filterUser(notify.sender)[0] ? JSON.parse(JSON.stringify(this.filterUser(notify.sender)[0])).profileImage:''
                                } />
                            </ListItemAvatar>
                            {}

                            <ListItemText
                                primary={notify.sender}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            // className={classes.inline}
                                            color="textPrimary"
                                        >{notify.message}
                                        </Typography>
                                        <Button variant="outlined" color="secondary" aria-label="comments" href={this.filterUser(notify.sender)[0] ? "/user/view#"+JSON.parse(JSON.stringify(this.filterUser(notify.sender)[0])).userid:''}>
                                            View Profile
                                        </Button>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                )}
            </div>
        )
    }

    notificationView(){
        return (
            <div>
                <Paper className="container p-2 mt-4 col-12" variant="outlined">
                    <Paper className="col-12 mt-2 p-1 text-center" variant="outlined">
                        <h1>Notifications</h1>
                    </Paper>
                    <div className="p-2 mt-4 col-8 mx-auto">
                        <br />
                        {this.displayNotifications()}
                    </div>
                </Paper>
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

export default Notifications;