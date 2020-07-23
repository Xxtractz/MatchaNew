import React, { Component } from "react";
import {Card, CardHeader, CardMedia, CardActions, Button, Paper, FormControl, FormLabel} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import InfoIcon from "@material-ui/icons/Info";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { blue, red } from "@material-ui/core/colors";
import {
  getActive,
  getUserGenderPreference,
  getUserId,
  getUserLatitude,
  getUserLongitude
} from "../../../actions/user";
import {getInterests, getUsers, update} from "../../../actions/api";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as geolib from 'geolib';
import sortByDistance from 'sort-by-distance';
import Slider from "@material-ui/core/Slider";

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      cards: [],
      infoDialog:false,
      ageMin: 18,
      ageMax: 70,
      locationDistance: 0,
    };
  }

  componentDidMount() {
    this.getCardState();
    this.getInterestsState();
  }

  getInterestsState(){
    getInterests(getUserId()).then((res)=>{
      this.setState({ interests : [...res.data]});
    });
  }

  getCardState(){
    const opts = {
      yName: 'latitude',
      xName: 'longitude'
    }
    getUsers(
        getUserId(),
        (getUserGenderPreference()=== "Both" ? "Other":getUserGenderPreference()),
        this.state.ageMin,
        this.state.ageMax
    ).then((res)=>{
      const origin = { longitude: getUserLongitude(), latitude: getUserLatitude()}
      // console.log(sortByDistance(origin,res.data, opts))
      this.setState({ cards : [...sortByDistance(origin,res.data, opts)]});
    });
  }

  info = (userid,popularity)=>{
    if (userid){
    update(userid, {popularity : popularity + 1})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if(this.state.infoDialog){
      this.setState({ infoDialog : false});
    }else this.setState({ infoDialog : true});
  }

  like = (user,userid,popularity) => {
    update(userid, {popularity : popularity + 3})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(user + " Was Liked");
      this.remove();
  };

  dislike = (user) => {
    console.log(user + " Was disLiked");
    this.remove();
  };

  remove = () => {
    this.setState(({ cards }) => ({ cards: cards.slice(1, cards.length) }));
  };

  display(user) {
    console.log(geolib.getDistance({latitude : getUserLatitude(), longitude: getUserLongitude()},{latitude: user.latitude, longitude : user.longitude},1));
    return (
      <div>
        <Card variant="outlined" style={{ height: "620px", width: "320px" }}>
          <CardHeader title={user.firstname +' ' + user.lastname } subheader={user.age} />
          <CardMedia
            style={{ height: "75%", paddingTop: 0 }}
            image={user.profileImage ? user.profileImage : "https://source.unsplash.com/random/720x1080-1/?human"}
            title={user.firstname +' ' + user.lastname }
          />
          <CardActions className="pl-5">
            <IconButton
              aria-label="Like"
              onClick={() => {
                this.like(user.firstname,user.userid, user.popularity);
              }}
            >
              <FavoriteTwoToneIcon fontSize="large" style={{ color: red[500] }} />
            </IconButton>
            <IconButton aria-label="info"
                        onClick={() => {
                          this.info(user.userid, user.popularity);
                        }}>
              <InfoIcon fontSize="large" style={{ color: blue[300] }} />
            </IconButton>
            <IconButton
              aria-label="dislike"
              onClick={() => {
                this.dislike(user.firstname);
              }}
            >
              <ThumbDownIcon  fontSize="large" style={{ color: red[600] }} />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }

  handleResponse(type) {
    console.log(type);
  }

  displayEmpty() {
    return <div>There are no profile to display</div>;
  }

  displayImages(src){
    return(
        <div className={'col-md-3 p-1'}><Card variant="outlined" style={{ height: "320px", width: "250px" }}>
          <CardMedia
              style={{ height: "100%", paddingTop: 0 }}
              image={src}
          />
        </Card></div>
    )
  }

  viewUser(user){
    let interests = '';
    this.state.interests.filter(interest => interest.userid === user.userid).map(filteredInterest =>{
      interests = filteredInterest.interest.toString() + ',';
      return  0;
    });
    return(
        <div>
          <Dialog
              // fullWidth='320'
              maxWidth={'lg'}
              open={this.state.infoDialog}
              // onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">
              {user.firstname +' ' + user.lastname }
              <p className={'small'} >
                { user.gender === "Other" ? "Unknown":user.gender }
                { "\n "+user.age}
                { (user.lastseen === 'online')
                    ? <small className={"text-success"}>{ "\n "+user.lastseen}</small>
                    : <small className={"text-secondary"}>{ "\n \t lastseen : \n "+user.lastseen}</small>}
              </p>
            </DialogTitle>

            <DialogContent>
              <div className={'row'}>
                {this.displayImages(user.profileImage)}
                {user.image_1 ? this.displayImages(user.image_1): ''}
                {user.image_2 ? this.displayImages(user.image_2): ''}
                {user.image_3 ? this.displayImages(user.image_3): ''}
                {user.image_4 ? this.displayImages(user.image_4): ''}
              </div>
            </DialogContent>

            <DialogContent>
              <DialogContentText>
                {"Hi, I am attracted to "}
                {user.genderPreference === "Both" ? " Male and Female" : user.genderPreference}
              </DialogContentText>
              <p className={'lead'}>Bio</p>
              <DialogContentText>
                  {user.bio}
              </DialogContentText>
            </DialogContent>

            <DialogContent>
              <p className={'lead'}>Interests</p>
              <DialogContentText>
                {interests ? interests:' No interests were added'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                this.info();
              }} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
  }

  handleSearch = () => {
    this.setState({cards : []});
    this.getCardState();
  };

  handleChangeAge = (event, newValue) => {
    this.setState({ ageMin: newValue[0], ageMax: newValue[1] });
  };

  handleChangeGender = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeLocation = (event, number) => {
    this.setState({ locationDistance: number });
  };

  valuetext = (value) => {
    return value;
  };

  locationSection = () => {
    const marks = [
      {
        value: 5,
        label: "5km",
      },
      {
        value: 45,
        label: "45km",
      },
      {
        value: 100,
        label: "100km",
      },
      {
        value: 150,
        label: "150km",
      },
    ];
    return (
        <FormControl component="fieldset">
          <FormLabel>Location</FormLabel>
          <div style={{ width: 170 }}>
            <Slider
                max={170}
                value={this.state.locationDistance}
                onChange={this.handleChangeLocation}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={() => this.valuetext()}
                marks={marks}
            />
          </div>
        </FormControl>
    );
  };

  ageSection = () => {
    const marks = [
      {
        value: 18,
        label: "18",
      },
      {
        value: 35,
        label: "35",
      },
      {
        value: 50,
        label: "50",
      },
      {
        value: 70,
        label: "70",
      },
    ];

    return (
        <FormControl component="fieldset">
          <FormLabel>Age Range</FormLabel>
          <div style={{ width: 150 }}>
            <Slider
                min={18}
                max={70}
                value={[this.state.ageMin, this.state.ageMax]}
                onChange={this.handleChangeAge}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={() => this.valuetext()}
                marks={marks}
            />
          </div>
        </FormControl>
    );
  };

  displayFilter(){
    return (
        <div className="container mt-5 mb-4" style={{ marginTop: "10px" }}>
          <Paper className="text-center pt-3 pl-3 pr-3" variant="outlined" square>
            <div className="header text-center">
              {" "}
              <h3>Filter Search</h3>{" "}
              <Button className="primary  " variant={"outlined"} onClick={this.handleSearch}>
                Click here to Search/Filter
              </Button>
            </div>
            <hr />
            <div className="row">
              <div className="col text-center">{this.ageSection()}</div>
              <div className="col">{this.locationSection()}</div>
            </div>
          </Paper>
        </div>
    )
  }

  displayViewProfiles(){
    return (
        <div className="container mb-4">
          <div className="row">
            <div className="mx-auto">
              {this.state.cards.length > 0
                  ? this.display(this.state.cards[0])
                  : this.displayEmpty()}
              {this.state.cards.length > 0
                  ? this.viewUser(this.state.cards[0])
                  : ""}
            </div>
          </div>
        </div>
    )
  }

  render() {
    return (
        <div>
          {this.displayFilter()}
          {getActive() === 1 ? (
              this.displayViewProfiles()  ) : (
              <div className={'m-5'}>
                <h3>{"You need to complete your Profile, please navigate to account to complete you profile"}</h3>
              </div>

          )}
        </div>
    );
  }
}

export default Profiles;
