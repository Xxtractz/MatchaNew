import React, {Component} from 'react';
import {getActive, getUserId, getUsername} from "../../actions/user";
import Layout from "../Layout/layout";
import {
    getLikeBack,
    getMyLikes, getMyMatches,
    getUser,
    likeAndDislike,
    notification,
    update
} from "../../actions/api";
import {Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import {red} from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

class ViewUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            id: '',
            likes: [],
            matched:false
        };
    }

    componentDidMount() {
        this.setLikeBack();
        this.getLikesState();
        this.getMatchedState();
        this.setState({id: window.location.hash.substr(1)})
        getUser(window.location.hash.substr(1))
            .then((res) => {
                this.setState({cards: [res.data]});
            });
    }
    setLikeBack(){
        getLikeBack(getUserId(),parseInt(window.location.hash.substr(1))).then();
    }

    getMatchedState(){
        getMyMatches(getUserId()).then(res => {
                if(res.status == 200){
                    const uid =  parseInt(window.location.hash.substr(1));
                    let opt1 = 0;
                    let opt2 = 0;

                    const matched = res.data.filter(matches =>
                    {
                         if (matches.user_1 === getUserId() && matches.user_2 === uid){
                             opt1 = 1;
                         }else if (matches.user_2 === getUserId() && matches.user_1 === uid) {
                             opt2 = 1;
                         }
                    });
                    console.log(matched);
                    if (opt1 === 1 && opt2 ===1){
                        this.setState({matched:true});
                    }

                }
            });
    }

    getLikesState() {
        getMyLikes(getUserId()).then((res) => {
            if (res) {
                this.setState({likes: [...res.data]});
            }
        });
    }

    like = (username, userid, popularity) => {
        update(userid, {popularity: popularity + 3})
            .then((response) => {
                // console.log(response);
            })
            .catch((error) => {
                // console.log(error);
            });
        notification({sender: getUsername(), receiver: username, message: " Likes you."}).then();
        likeAndDislike({
            type: "like",
            sender: getUserId(),
            receiver: userid,
        }).then(
            res => {
                if (res.status === 200){
                    this.getLikesState();
                    this.getMatchedState();
                }
            }
        );
    };

    dislike = (username, userid) => {
        notification({sender: getUsername(), receiver: username, message: " dislikes you."}).then();
        likeAndDislike({
            type: "dislike",
            sender: getUserId(),
            receiver: userid,
        }).then(res => {
            if (res.status === 200){
                this.getLikesState();
                this.getMatchedState();
            }
        });
    };

    showImage(image, width, height) {
        return (<Avatar alt="Remy Sharp" src={image ? image : ''} style={{width: width, height: height}}
                        className={'m-2'}/>)
    }

    likeButton(username, id, popularity) {
        return (
            <IconButton
                aria-label="Like"
                onClick={(e) => {
                    this.like(username, id, popularity);
                }}
            >
                <FavoriteTwoToneIcon fontSize="large" style={{color: red[500]}}/> <small> Like</small>
            </IconButton>
        )
    }

    unLikeButton(username, id) {
        return (
            <IconButton
                aria-label="dislike"
                onClick={() => {
                    this.dislike(username, id);
                }}
            >
                <ThumbDownIcon className={'m-1'} fontSize="large" style={{color: red[500]}}/> <small> dislike</small>
            </IconButton>
        )
    }

    showMatched() {
        return (
            <Paper className={'m-3 p-1 '} elevation={0} square>
                <strong className="text-black-50">Matched</strong>
            </Paper>
        )
    }

    displayUser(user) {
        const {id, likes,matched} = this.state;
        return (
            <Paper className="container p-2 mt-4 " variant="outlined">
                {this.showImage(user.profileImage, "250px", "250px")}

                <br/>
                <div className={'row mx-auto'}>
                    {user.image_1 ? this.showImage(user.image_1, "170px", "170px") : ''}
                    {user.image_2 ? this.showImage(user.image_2, "170px", "170px") : ''}
                    {user.image_3 ? this.showImage(user.image_3, "170px", "170px") : ''}
                    {user.image_4 ? this.showImage(user.image_4, "170px", "170px") : ''}
                </div>

                <Divider/>

                <Grid container style={{flexGrow: '1'}}>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square>
                            <strong className="text-black-50">Status </strong>:
                            {(user.lastseen === 'online')
                                ? <small className={"text-success"}>{"\n " + user.lastseen}</small>
                                : <small className={"text-secondary"}>{"\n \t lastseen : \n " + user.lastseen}</small>}
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        {
                            likes.includes(parseInt(id))
                                ? this.unLikeButton(user.username, id)
                                : this.likeButton(user.username, id, user.popularity)
                        }

                    </Grid>
                    <Grid item xs>
                        {
                            matched
                                ? this.showMatched()
                                : ""
                        }

                    </Grid>
                </Grid>

                <Grid container style={{flexGrow: '1'}}>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square><strong>Name </strong>: {user.firstname}
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square><strong>Lastname </strong>: {user.lastname}
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square><strong>Age </strong>: {user.age}</Paper>
                    </Grid>
                </Grid>

                <Grid container style={{flexGrow: '1'}}>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square><strong>Gender </strong>: {user.gender}
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square><strong>Gender
                            Preference </strong>: {user.genderPreference}</Paper>
                    </Grid>
                    <Grid item xs>
                        {/*<Paper className={'m-3 p-1 '} elevation={0} square ><strong>Age </strong>: {user.age}</Paper>*/}
                    </Grid>
                </Grid>
                <Grid container style={{flexGrow: '1'}}>
                    <Grid item>
                        <Avatar className={'p-1 mt-2'}>Bio</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Paper className={'p-1'} elevation={0} square>{user.bio}</Paper>
                    </Grid>
                </Grid>

                <Divider/>
            </Paper>
        )
    }

    userView() {
        const {cards} = this.state;
        return (
            <div className='mt-5'>
                {window.location.hash ? this.displayUser(cards[0] ? cards[0].User : '') : "this.displayProfile()"}
            </div>
        );
    }

    render() {
        return (
            <div>
                {getActive() === 1 ? (
                    <Layout>{this.userView()}</Layout>
                ) : (
                    this.props.history.push(`/user`)
                )}
            </div>
        );
    }
}

export default ViewUser;