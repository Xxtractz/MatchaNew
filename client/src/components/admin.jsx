import React, {Component} from 'react';
import {Button, ButtonBase, Card, CardActions, TextField} from "@material-ui/core";

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
            if(this.state.password === "4242@Admin"){
                this.setState({adminActive : true});
            }
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

            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.adminActive ? this.Dashboard() : this.Login()}
            </div>
        );
    }
}

export default Admin;