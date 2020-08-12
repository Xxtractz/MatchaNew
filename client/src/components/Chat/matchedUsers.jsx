import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {getMyMatches } from "../../actions/api";
import { getUserId} from "../../actions/user";
import {Button} from "@material-ui/core";

class MatchedUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matchedUser:[],
            cards: [],
        }
    }

    componentDidMount() {
        this.getMatchedState();
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
                    return matches;
                });
                const users = JSON.parse(localStorage.getItem("users"));
                const filteredData = users.filter(res => this.state.matchedUser.includes(res.userid));
                if (filteredData){
                    this.setState({cards : [...filteredData]})
                }
            }
        });
    }

    render() {
        const {cards} = this.state;
        return (
            <div>
                {cards.map((notify,index) =>

                    <List key={index} className={'container'} >
                        <ListItem  alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={notify.profileImage
                                } />
                            </ListItemAvatar>
                            {}

                            <ListItemText
                                primary={notify.username}
                                secondary={
                                    <React.Fragment>
                                        <Button variant="outlined" color="secondary" aria-label="comments" href={"#"+notify.username}>
                                            select
                                        </Button>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                )}
            </div>);
    }
}

export default MatchedUsers;