import React, { Component } from "react";
import { Paper, InputLabel } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  getUserFirstName,
  getUserLastName,
  getUserId, getUserStatus
} from "../../../../actions/user";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import { selecFormInput, textAreaFormInput } from "../../../Form/form";
import {update} from "../../../../actions/api";
import UploadImages from "./uploadImages";

class CompleteProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: getUserFirstName(),
      lastname: getUserLastName(),
      gender: "",
      genderPreference: "",
      bio: "",
      tags: [],
      tags_err: "",
      tags_err_helperText: "",
      temptag: "",
      isopen: true,
      stepOne: true,
      longitude : 0,
      latitude : 0
    };
  }

  getGeolocation(){
    window.navigator.geolocation.getCurrentPosition(
        success => this.setState({ latitude: success.coords.latitude, longitude: success.coords.longitude })
        ,err => fetch("https://ipinfo.io/?token=eba87c568e8798")
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              sessionStorage.setItem('latitude',res.loc.toString().split(',')[0]);
              sessionStorage.setItem('longitude',res.loc.toString().split(',')[1]);
            })
    );
  }

  componentDidMount() {
    this.getGeolocation()
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.updateProfile();
  };

  updateProfile() {
    let interestToString = [];

    for (let i = 0; i < this.state.tags.length; i++) {
      interestToString = interestToString.concat(this.state.tags[i]);
    }
    const user = {
        type : 'profile',
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        gender: this.state.gender.toString(),
        genderPreference: this.state.genderPreference.toString(),
        bio: this.state.bio.toString(),
        status: '2',
        interests: interestToString,
        longitude: this.state.longitude,
        latitude: this.state.latitude
    };

    console.log(user);

    update(getUserId(), user)
      .then((response) => {
        if (response.status === 200) {
          window.location.pathname = "/";
          sessionStorage.clear();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });

    if (this.state.longitude === 0){
      this.setState({ latitude: sessionStorage.getItem('latitude'), longitude: sessionStorage.getItem('longitude') })
    }
  };

  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  };

  addTag = () => {
    const val = this.state.temptag;
    this.tagInput.value = null;
    if (val === "") {
      return;
    }
    if (
      this.state.tags.find(
        (tag) => tag.toString().toLowerCase() === val.toString().toLowerCase()
      )
    ) {
      return;
    }
    this.setState({ tags: [...this.state.tags, this.state.temptag] });
  };

  tagInputChange = (e) => {
    this.setState({
      temptag: [e.target.value],
    });
  };

  displayHearderText() {
    return (
      <div className="mb-4">
        <strong>
          {getUserFirstName()} {getUserLastName()}
        </strong>
        {`, Please complete your profile to have full access of the application. Thanks`}
      </div>
    );
  }

  genderSection() {
    return (
      <div className="row mb-3">
        {selecFormInput("col-6", "Gender", "gender", (e) => this.onChange(e), [
          "",
          "Male",
          "Female",
          "Both",
        ])}
        {selecFormInput(
          "col-6",
          "Preferred Gender",
          "genderPreference",
          (e) => this.onChange(e),
          ["", "Male", "Female", "Both"]
        )}
      </div>
    );
  }

  bioSection() {
    return (
      <div className="row mb-3">
        {textAreaFormInput("col-12", "Bio", "w-100", "inherit", "bio", (e) =>
          this.onChange(e)
        )}
      </div>
    );
  }

  interestSection() {
    const { tags } = this.state;
    return (
      <div className=" row mb-3">
        <div className="col-10    ">
          <InputLabel>Interests</InputLabel>
          <div className="input-tag">
            <ul className="input-tag__tags">
              {tags.map((tag, i) => (
                <li key={tag}>
                  {tag}
                  <IconButton
                    fontSize="small"
                    style={{ padding: "5px" }}
                    type="button"
                    onClick={() => {
                      this.removeTag(i);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
              <li className="input-tag__tags__input">
                <input
                  type="text"
                  onChange={this.tagInputChange}
                  ref={(c) => {
                    this.tagInput = c;
                  }}
                />
              </li>
            </ul>
          </div>
          <code>
            {this.state.tags_err ? this.state.tags_err_helperText : ""}
          </code>
        </div>
        <div className="col-2 pt-3">
          <IconButton type="button" onClick={this.addTag} fontSize="large">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    );
  }

  personalDetailsSection() {
    return (
      <div className="container p-2">
        <div className="col-12">{this.displayHearderText()}</div>
        <div className="col-12">{this.genderSection()}</div>
        <div className="col-12">{this.bioSection()}</div>
        <div className="col-12">{this.interestSection()}</div>
      </div>
    );
  }

  displayDetailsform() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.personalDetailsSection()}

        <div className="text-center p-3">
          <Button variant="outlined" color="primary" type="submit">
            Next ->
          </Button>
        </div>
      </form>
    );
  }

  displayImageSection() {
    return (
      <div className="container p-2  bg-transparent col-12">
        <UploadImages/>
      </div>
    );
  }

  render() {
    return (
      <div
        className="container p-2  bg-transparent col-12"
        // variant="outlined"
        // square
      >
        <Paper
          className="col-12 m-2  text-center bg-transparent"
          variant="outlined"
        >
          <h1>Complete Profile</h1>
          <small> Please Complete you Profile</small>
        </Paper>
        {getUserStatus() === "1"
          ? this.displayDetailsform()
          : this.displayImageSection()}
      </div>
    );
  }
}

export default CompleteProfile;
