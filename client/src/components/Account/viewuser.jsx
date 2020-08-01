import React, {Component} from 'react';
import {getActive} from "../../actions/user";
import Layout from "../Layout/layout";
import {getUser} from "../../actions/api";
import {Button, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

class ViewUser extends Component {
    constructor(props) {
        super(props);

        this.state={
            cards:[]
        };
    }
    
componentDidMount() {
        getUser(window.location.hash.substr(1))
    .then((res)=>{
        this.setState({ cards : [res.data]});
    });
}

showImage(image,width,height){
        return (<Avatar alt="Remy Sharp" src={image ? image:''} style={{width:width, height:height}} className={'m-2'}/>)
}
    displayUser(user){
        return(
            <Paper className="container p-2 mt-4 col-12" variant="outlined">
                {this.showImage(user.profileImage,"250px","250px")}
                { (user.lastseen === 'online')
                    ? <small className={"text-success"}>{ "\n "+user.lastseen}</small>
                    : <small className={"text-secondary"}>{ "\n \t lastseen : \n "+user.lastseen}</small>}
                <br/>
                <div className={'row mx-auto'}>
                    {user.image_1 ? this.showImage(user.image_1,"170px","170px"):''}
                    {user.image_2 ? this.showImage(user.image_2,"170px","170px"):''}
                    {user.image_3 ? this.showImage(user.image_3,"170px","170px"):''}
                    {user.image_4 ? this.showImage(user.image_4,"170px","170px"):''}
                </div>

                <Divider />

                <Grid container style={ {flexGrow: '1'}}>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square  ><strong>Name </strong>: {user.firstname}</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square  ><strong>Lastname </strong>: {user.lastname}</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square ><strong>Age </strong>: {user.age}</Paper>
                    </Grid>
                </Grid>

                <Grid container style={ {flexGrow: '1'}}>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square  ><strong>Gender </strong>: {user.gender}</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={'m-3 p-1 '} elevation={0} square  ><strong>Gender Preference </strong>: {user.genderPreference}</Paper>
                    </Grid>
                    <Grid item xs>
                        {/*<Paper className={'m-3 p-1 '} elevation={0} square ><strong>Age </strong>: {user.age}</Paper>*/}
                    </Grid>
                </Grid>
                <Grid container style={ {flexGrow: '1'}}>
                    <Grid item >
                        <Avatar className={'p-1 mt-2'}>Bio</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Paper className={'p-1'} elevation={0} square  >{user.bio}</Paper>
                    </Grid>
                </Grid>

                <Divider />
            </Paper>
        )
    }
    userView() {
        const {cards} = this.state;
        return (
            <div className='mt-5'>
                {window.location.hash ? this.displayUser(cards[0]?cards[0].User:''):   "this.displayProfile()"}
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