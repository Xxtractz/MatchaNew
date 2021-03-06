import React, {Component} from 'react';
import {Button, Paper} from "@material-ui/core";
import UpdateFullName from "./updatefullname";
import UpdateGender from "./updategender";
import UpdateBio from "./updatebio";
import UpdateInterests from "./updateinterests";
import UpdateImages from "./updateimages";
import UpdateUsername from "./updateusername";
import UpdateEmail from "./updateemail";
import UpdatePassword from "./updatepassword";
import UpdateNotification from "./updatenotifictaion";

class Update extends Component {

    updateProfile(){
        return (
            <div>
                <UpdateFullName/>
                <UpdateGender/>
                <UpdateBio/>
                <UpdateInterests/>
            </div>
        );
    }

    updateSetting(){
        return (
            <div>
                <UpdateNotification/>
            </div>
        )
    }

    updateAuthDetails(){
        return(
            <div>
                <UpdateUsername/>
                <UpdateEmail/>
                <UpdatePassword/>
            </div>
        )
    }

    updateImages(){
        return (
            <div>
               <UpdateImages/>
            </div>
        );
    }

    render() {
        return (
            <div className="container p-2  bg-transparent col-12">
                <Paper className="container p-2 mt-4 col-12" variant="outlined">
                <Paper className="col-12 mt-2 p-1 text-center" variant="outlined">
                    <h1>Details Update</h1>
                    <small> Please update your details below.</small>
                </Paper>
                    <div className="p-3">
                        <Button variant="outlined" color="primary" href='/user'>
                            {'<-'} Back
                        </Button>
                    </div>
                    <div className="p-3">
                        {window.location.hash === '#updateProfile'? this.updateProfile():''}
                        {window.location.hash === '#updateImages'? this.updateImages():''}
                        {window.location.hash === '#UpdateAuthDetails'? this.updateAuthDetails():''}
                        {window.location.hash === '#updateSettings'? this.updateSetting():''}
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Update;