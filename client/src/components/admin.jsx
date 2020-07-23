import React, {Component} from 'react';
import {Button, Card, CardActions, TextField} from "@material-ui/core";
import {doInstallation, unInstall} from "../actions/api";

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state ={
            adminActive : false,
            password : ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value],
        });
    };


    submitHandler = (e) => {
        e.preventDefault();
        if (e.target.id === "login"){
            console.log("Trying to Login")
            if(this.state.password.toString() === "4242@Admin"){
                console.log("Logged in");
                sessionStorage.setItem('UID_',"hagdgshdsghsgadh");
                window.location.pathname = '/admin';
                window.reload();
            }
        }else if (e.target.id === "install"){
            console.log("running installation")
            doInstallation().then((res) =>{
                console.log(res);
            });
        }else if (e.target.id === "delete"){
            console.log("uninstalling")
            unInstall().then((res) =>{
                console.log(res);
            });
        }
    };

    passwordSection() {
        return (
            <div className="row">
                <div className="col-12 text-center">
                    <TextField
                        className="col-12"
                        name="password"
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={(e) => this.onChange(e)}
                        required
                        autoComplete="current-password"
                    />
                </div>
            </div>
        );
    }

    Login(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto pt-5 mt-5">
                            <Card
                                className="card m-5 p-5 mx-auto col-10 form"
                                variant="outlined"
                            >
                                <form id={'login'} onSubmit={this.submitHandler}>
                                    <hr className="mb-2 ml-5 mr-5"></hr>
                                    <div className="grey-text">

                                        {/* Password Section */}
                                        {this.passwordSection()}
                                    </div>
                                    <div className="text-center p-3">
                                        <Button variant="outlined" color="primary" type="submit">
                                            Login
                                        </Button>
                                    </div>
                                </form>
                                <hr />
                                <CardActions className="bg-gray">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        href="/"
                                    >
                                        Home
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    Dashboard(){
        return(
            <div>
                <div className="container mt-5">
                    <div className="row">
                        <form id={'install'} onSubmit={this.submitHandler}>
                            <Button
                                className={'m-1'}
                                variant="outlined"
                                color="primary"
                                size="small"
                                type="submit"
                            >
                                Install DATA
                            </Button>
                        </form>
                        <form id={'delete'} onSubmit={this.submitHandler}>
                            <Button
                                className={'m-1'}
                                variant="outlined"
                                color="secondary"
                                size="small"
                                type="submit"
                            >
                                DELETE DATA
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {sessionStorage.getItem('UID_') === "hagdgshdsghsgadh" ? this.Dashboard() : this.Login()}
            </div>
        );
    }
}

export default Admin;