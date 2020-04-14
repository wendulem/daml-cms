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
  Dropdown
} from "semantic-ui-react";
import axios from "axios";

class UserInfoModal extends React.Component {

  state = {
    //uploadStatus: null,
    //file: null,
    //fileName: null,

    firstName: null,
    lastName: null,
    netID: null,
    password: null,
    team: null,
    major: null,
    biography: null,
    graduationYear: null,
    school: null,
    githubLink: null,
    linkedIn: null,
    photoString: null
  }
  
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

  handleInfoChange = (e, { name, value }) => {
    console.log(name)
    console.log(value)
    this.setState({ [name]: value });
  }

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

    // This needs to change to not be hardcoded
    var mem = {
      firstName: this.state.firstName != null ? this.state.firstName : this.props.userInfo.firstName,
      lastName: this.state.lastName != null ? this.state.lastName : this.props.userInfo.lastName,
      netID: this.state.netID != null ? this.state.netID : this.props.userInfo.netID,
      password: this.state.password != null ? this.state.password : this.props.userInfo.password,
      team: this.state.team != null ? this.state.team : this.props.userInfo.team,
      major: this.state.major != null ? this.state.major : this.props.userInfo.major,
      biography: this.state.biography != null ? this.state.biography : this.props.userInfo.biography,
      graduationYear: this.state.graduationYear != null ? this.state.graduationYear : this.props.userInfo.graduationYear,
      school: this.state.school != null ? this.state.school : this.props.userInfo.school,
      githubLink: this.state.githubLink != null ? this.state.githubLink : this.props.userInfo.githubLink,
      linkedIn: this.state.linkedIn != null ? this.state.linkedIn : this.props.userInfo.linkedIn,
      photoString: this.state.photoString != null ? this.state.photoString : this.props.userInfo.photoString
    }

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
    console.log(this.props.userInfo.firstName)
    console.log(this.state.firstName)
    
    /*const schoolOpts = [
      { key: 'trinity', text: 'Trinity College of Arts & Sciences', value: 'Trinity College of Arts & Sciences' },
      { key: 'law', text: 'School of Law', value: 'School of Law'},
      { key: 'grad', text: 'Graduate School', value: 'Graduate School' },
      { key: 'divinity', text: 'Divinity School', value: 'Divinity School' },
      { key: 'medicine', text: 'School of Medicine', value: 'School of Medicine' },
      { key: 'nursing', text: 'School of Nursing', value: 'School of Nursing' },
      { key: 'fuqua', text: 'Fuqua School of Business', value: 'Fuqua School of Business' },
      { key: 'pratt', text: 'Pratt School of Engineering', value: 'Pratt School of Engineering' },
      { key: 'nicholas', text: 'Nicholas School of the Environment', value: 'Nicholas School of the Environment' },
      { key: 'sanford', text: 'Sanford School of Public Policy', value: 'Sanford School of Public Policy' }
    ]

    <Dropdown
                placeholder='School'
                defaultValue={ schoolOpts[0] }
                name="school"
                onChange={this.handleInfoChange}
                fluid
                multiple
                search
                selection
                options={schoolOpts}
              />*/
    
    //const major = this.props.userInfo.major.trim().split(",")
    //const majorFixed = array1.map(x => x * 2);

    //console.log(major)

    const teamOps = [
      { key: 'DS', text: 'Data Science', value: 'DS' },
      { key: 'CRM', text: 'Business Team', value: 'CRM'},
      { key: 'PS', text: 'Implementation Team', value: 'PS'}
    ]
    
    return (
      // Why can't the photostring be state based?
      <Modal trigger={this.props.trigger} closeIcon>
        <Header icon="user circle" content="Detailed User View" />

        <Modal.Content>
          <Image wrapped size="medium" centered src={this.props.userInfo.photoString} />

          <br />

          <Modal.Description>
            <Header textAlign="center">
              {this.props.userInfo.firstName} {this.props.userInfo.lastName}
            </Header>
          </Modal.Description>

          <br />

          <Grid>
            <Grid.Column textAlign="center">
              <Button disabled icon as="label" htmlFor="file" labelPosition="left">
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

            <Form.Field name='team'>
              <label>Team</label>
              <Dropdown
                placeholder='Team'
                name='team'
                defaultValue={this.props.userInfo.team}
                onChange={this.handleInfoChange}
                fluid
                search
                selection
                options={teamOps}
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
                  href={this.state.linkedIn != null ? this.state.linkedIn : this.props.userInfo.linkedIn}
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
                  href={this.state.githubLink != null ? this.state.githubLink : this.props.userInfo.githubLink}
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
