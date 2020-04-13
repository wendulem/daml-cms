import React from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Image,
  Form,
  Popup,
  TextArea,
  Grid,
  Loader,
} from "semantic-ui-react";
import axios from "axios";

class UserInfoModal extends React.Component {
  state = {
    uploadStatus: null,
    file: "",
    fileName: "",

    firstName: this.props.userInfo.firstName,
    lastName: this.props.userInfo.lastName,
    netID: this.props.userInfo.netID,
    password: "",
    team: "",
    major: this.props.userInfo.major,
    biography: this.props.userInfo.biography,
    graduationYear: "",
    school: this.props.userInfo.school,
    githubLink: this.props.userInfo.githubLink,
    linkedIn: this.props.userInfo.linkedIn,
    photoString: this.props.userInfo.photoString,
  };

  checkButtonText = () => {
    if (this.state.uploadStatus === "uploaded") {
      return this.fileName;
    }
    if (this.state.uploadStatus === "loading") {
      return <Loader content="Loading" />;
    }
    return "Upload Photo";
  };

  imageUpload = async () => {

    console.log("imageUpload");
    
    this.setState({ uploadStatus: "loading" });

    var fd = new FormData();
    fd.append('file', this.state.file);
    fd.append('upload_preset', 'owcbovwd');
    
    //Why doesn't any of this work...

    /*const res = await fetch(
      ' https://api.cloudinary.com/v1_1/dfitae3co/image/upload',
      {
        method: 'POST',
        body: fd
      }
    )

    const file = await res.json()

    console.log(file.secure_url)*/
    

    axios({
      url:'https://api.cloudinary.com/v1_1/dfitae3co/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: fd
    }).then( (res) => {
      console.log(res)
    }).catch( (err) => {
      console.error(err)
    })
  };

  handleInfoChange = (e, { name, value }) => this.setState({ [name]: value });

  handleFileSubmit = () => {
    //const { firstName, lastName } = this.state
    //this.setState({ submittedFirstName: firstName, submittedLastName: lastName }, () => console.log(this.state.submittedFirstName))
    this.editMember();
  };

  fileChange = (e) => {
    console.log("fileChange");
    this.setState(
      { file: e.target.files[0], fileName: e.target.files[0].name },
      () => {
        console.log(
          "File chosen --->",
          this.state.file,
          console.log("File name  --->", this.state.fileName)
        );
      }
    );

    this.imageUpload();
  };

  editMember = async () => {
    //this.setState({buttontext: "Loading..."});
    //let photoLink = await this.imageUpload(event);

    var mem = this.state;
    console.log(mem);
    let URL =
      "https://dukeappml.herokuapp.com//user/" + this.props.userInfo.uid;
    console.log(URL);
    let response = await axios.put(URL, mem);
    console.log(response);

    window.location.reload(); // might just make these exit the modal and reload elsewhere? who knows
  };

  deleteMember = async () => {
    let URL =
      "https://dukeappml.herokuapp.com//user/" + this.props.userInfo.uid;
    let response = await axios.delete(URL);

    console.log(response);

    window.location.reload();
  };

  render() {
    return (
      <Modal trigger={this.props.trigger} closeIcon>
        <Header icon="user circle" content="Detailed User View" />

        <Modal.Content>
          <Image wrapped size="medium" centered src={this.state.photoString} />

          <br />

          <Modal.Description>
            <Header textAlign="center">
              {this.props.userInfo.firstName} {this.props.userInfo.lastName}
            </Header>
          </Modal.Description>

          <br />

          <Grid>
            <Grid.Column textAlign="center">
              <Button icon as="label" htmlFor="file" labelPosition="left">
                {this.checkButtonText()}
                <Icon name="cloud upload" />
              </Button>
            </Grid.Column>
          </Grid>

          <input type="file" id="file" hidden onChange={this.fileChange} />

          <Form>
            <Form.Field>
              <label>First Name</label>
              <Form.Input
                name="firstName"
                onChange={this.handleInfoChange}
                placeholder="First name"
                defaultValue={this.props.userInfo.firstName}
              />
            </Form.Field>

            <Form.Field>
              <label>Last Name</label>
              <Form.Input
                name="lastName"
                onChange={this.handleInfoChange}
                placeholder="Last Name"
                defaultValue={this.props.userInfo.lastName}
              />
            </Form.Field>

            <Form.Field>
              <label>NetID</label>
              <Form.Input
                name="netID"
                onChange={this.handleInfoChange}
                placeholder="NetID"
                defaultValue={this.props.userInfo.netID}
              />
            </Form.Field>

            <Form.Field>
              <label>School</label>
              <Form.Input
                name="school"
                onChange={this.handleInfoChange}
                placeholder="School"
                defaultValue={this.props.userInfo.school}
              />
            </Form.Field>

            <Form.Field>
              <label>Discipline</label>
              <Form.Input
                name="major"
                onChange={this.handleInfoChange}
                placeholder="Discipline"
                defaultValue={this.props.userInfo.major}
              />
            </Form.Field>

            <Form.Field>
              <label>
                LinkedIn{" "}
                <a
                  href={this.state.linkedIn}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Icon name="external alternate" size="small" />
                </a>{" "}
              </label>
              <Form.Input
                name="linkedIn"
                onChange={this.handleInfoChange}
                placeholder="LinkedIn"
                defaultValue={this.props.userInfo.linkedIn}
              />
            </Form.Field>

            <Form.Field>
              <label>
                GitHub{" "}
                <a
                  href={this.state.githubLink}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Icon name="external alternate" size="small" />
                </a>{" "}
              </label>
              <Form.Input
                name="githubLink"
                onChange={this.handleInfoChange}
                placeholder="GitHub"
                defaultValue={this.props.userInfo.githubLink}
              />
            </Form.Field>

            <TextArea
              name="biography"
              onChange={this.handleInfoChange}
              placeholder="Tell us about yourself..."
              defaultValue={this.props.userInfo.biography}
            />
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={this.handleFileSubmit} color="green">
            <Icon name="save" /> Save Changes
          </Button>

          <Popup
            trigger={
              <Button color="red">
                <Icon name="delete" /> Delete User
              </Button>
            }
            content={
              <Button
                color="red"
                content="Confirm user deletion?"
                onClick={this.deleteMember}
              />
            }
            on="click"
            position="top right"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default UserInfoModal;
