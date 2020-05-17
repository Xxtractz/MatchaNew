import React, { Component } from "react";
import { Paper, InputLabel } from "@material-ui/core";
import { Button, TextField, Select } from "@material-ui/core";
import {
  getUserFirstName,
  getUserLastName,
  getUserBio,
  getUserGender,
  getUserGenderPreference,
  getUserInterest,
} from "../../../actions/user";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import { disabledFormInput } from "../../Form/form";

class CompleteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        firstname: getUserFirstName(),
        lastname: getUserLastName(),
        gender: getUserGender(),
        genderPreference: getUserGenderPreference(),
        interest: getUserInterest(),
      },
      tags: [],
      temptag: "",
      isopen: true,
      photoUrl: "",
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
  };

  onChange = (e) => {
    console.log(e.target.name + ":" + e.target.value);

    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  photoUpload(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        photoUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  firstImageSection() {
    return (
      <div className="photo-container">
        <label htmlFor="image-upload">
          <div className="image-upload-container" style={{}}>
            <img src={this.state.photoUrl} alt="" />
            <input
              id="image-upload"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => this.photoUpload(e)}
            />
          </div>
        </label>
      </div>
    );
  }

  // Form Sections
  nameSection() {
    return (
      <div className="row mb-3">
        {disabledFormInput(
          "First Name",
          "col-12",
          "text",
          "firstname",
          this.state.profile.firstname
        )}
        {disabledFormInput(
          "Last Name",
          "col-12",
          "text",
          "lastname",
          this.state.profile.lastname
        )}
      </div>
    );
  }

  genderSection() {
    return (
      <div className="row mb-3">
       
        <div className="col-6 ">
          <InputLabel>Preferred Gender</InputLabel>
          <Select
            native
            // value={getUserGenderPreference()}
            // onChange={handleChange}
            // inputProps={{
            //   name: "age",
            //   id: "age-native-simple",
            // }}
          >
            <option value={"Male"}>Male</option>
            <option value={"Both"}>Both</option>
            <option value={"Female"}>Female</option>
          </Select>
        </div>
      </div>
    );
  }

  bioSection() {
    return (
      <div className="row mb-3">
        <div className="col-12">
          <InputLabel>Bio</InputLabel>
          {/* <TextField
            className="col-12"
            type="text"
            name="fname"
            // placeholder={getUserFirstName()}
            // helperText={this.state.fname_err_helperText}
            // error={this.state.fname_err ? true : false}
            // value={this.state.fname}
            // 
            required
          /> */}
          <textarea
            className="w-100 "
            style={{ background: "inherit" }}
            aria-label="empty textarea"
            name="bio"
            defaultValue={getUserBio()}
            onChange={(e) => this.onChange(e)}
          ></textarea>
        </div>
      </div>
    );
  }

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
        <div className="col-12">{this.nameSection()}</div>
        <div className="col-12">{this.genderSection()}</div>
        <div className="col-12">{this.bioSection()}</div>
        <div className="col-12">{this.interestSection()}</div>
      </div>
    );
  }

  render() {
    return (
      <Paper
        className="container p-2  bg-transparent col-12"
        variant="outlined"
        square
      >
        <Paper
          className="col-12 mt-2 p-1 text-center bg-transparent"
          variant="outlined"
        >
          <h1>Complete Profile</h1>
          <small> Please Complete you Profile</small>
        </Paper>

        <form onSubmit={this.submitHandler}>
          {this.firstImageSection()}
          <br />
          <br />
          {this.personalDetailsSection()}

          <div className="text-center p-3">
            <Button variant="contained" type="submit">
              Update
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default CompleteProfile;
