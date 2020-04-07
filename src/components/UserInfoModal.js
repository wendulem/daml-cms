import React from 'react'
import { Button, Header, Icon, Modal, Image, Form, Popup, TextArea, Input } from 'semantic-ui-react'
import axios from 'axios'

class UserInfoModal extends React.Component {

  state = { 
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
    photoString: ""
    //submittedFirstName: null, 
    //submittedLastName: null 
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    //const { firstName, lastName } = this.state
    //this.setState({ submittedFirstName: firstName, submittedLastName: lastName }, () => console.log(this.state.submittedFirstName))
    this.editMember()
  }

  editMember =  async () => {
    //this.setState({buttontext: "Loading..."});
    //let photoLink = await this.imageUpload(event);

    var mem = this.state
    console.log(mem);
    let URL = 'https://dukeappml.herokuapp.com//user/' + this.props.userInfo.uid;
    console.log(URL)
    let response = await axios.put(URL, mem)
    console.log(response)

    window.location.reload(); // might just make these exit the modal and reload elsewhere? who knows
  }

  deleteMember = async () => {
    let URL = 'https://dukeappml.herokuapp.com//user/' + this.props.userInfo.uid;
    let response = await axios.delete(URL);
    
    console.log(response)

    window.location.reload();
  }

  // Fix this for axios, etc.
  tempImageUpload = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'damlImages')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dndwfzjzr/image/upload', 
      {
        method: 'POST',
        body: data
      }
    ) 

    const file = await res.json()
    console.log(file);
    this.setState({photoString: "https://res.cloudinary.com/dndwfzjzr/" + file.public_id});
  }

  
  /*
       <Input onChange = {this.handleFile} type="file">
            Upload Photo
            <Icon name='cloud upload' />
          </Input>
  */

  render() {
    return(
      <Modal trigger={this.props.trigger} closeIcon>
        <Header icon='user circle' content='Detailed User View' />

        <Modal.Content>

          <Image wrapped size='medium' centered src={this.props.userInfo.photoString} />
          
          <br/>
          
          <Modal.Description>
            <Header textAlign='center'>{this.props.userInfo.firstName} {this.props.userInfo.lastName}</Header>
          </Modal.Description>
          
          <br />

          <Button icon onClick={this.tempImageUpload} style={{display: "block", "margin-left": "auto", "margin-right": "auto"}} labelPosition='left'>
            Upload Photo
            <Icon name='cloud upload' />
          </Button>

          <Form>
              <Form.Field>
                <label>First Name</label>
                <Form.Input name='firstName' onChange={this.handleChange} placeholder='First name' defaultValue={this.props.userInfo.firstName} />
              </Form.Field>

              <Form.Field>
                <label>Last Name</label>
                <Form.Input name='lastName' onChange={this.handleChange} placeholder='Last Name' defaultValue={this.props.userInfo.lastName} />
              </Form.Field>

              <Form.Field>
                <label>NetID</label>
                <Form.Input name='netID' onChange={this.handleChange} placeholder='NetID' defaultValue={this.props.userInfo.netID} />
              </Form.Field>

              <Form.Field>
                <label>School</label>
                <Form.Input name='school' onChange={this.handleChange} placeholder='School' defaultValue={this.props.userInfo.school} />
              </Form.Field>

              <Form.Field>
                <label>Discipline</label>
                <Form.Input name='major' onChange={this.handleChange} placeholder='Discipline' defaultValue={this.props.userInfo.major} />
              </Form.Field>

              <Form.Field>
                <label>LinkedIn <a href={this.state.linkedIn} rel='noreferrer noopener' target="_blank"><Icon name="external alternate" size="small" /></a> </label>
                <Form.Input name='linkedIn' onChange={this.handleChange} placeholder='LinkedIn' defaultValue={this.props.userInfo.linkedIn} />
              </Form.Field>

              <Form.Field>
                <label>GitHub <a href={this.state.githubLink} rel='noreferrer noopener' target="_blank"><Icon name="external alternate" size="small" /></a> </label>
                <Form.Input name='githubLink' onChange={this.handleChange} placeholder='GitHub' defaultValue={this.props.userInfo.githubLink} />
              </Form.Field>

              <TextArea name='biography' onChange={this.handleChange} placeholder='Tell us about yourself...' defaultValue={this.props.userInfo.biography} />

            </Form>

        </Modal.Content>

        <Modal.Actions>   
          
          <Button onClick={this.handleSubmit} color='green'>
            <Icon name='save' /> Save Changes       
          </Button>

          <Popup
            trigger={
              <Button color='red'>
                <Icon name='delete' /> Delete User
              </Button>
            }
            content={<Button color='red' content='Confirm user deletion?' onClick={this.deleteMember} />}
            on='click'
            position='top right'
          />
        </Modal.Actions>

      </Modal>
    )
  }
}

export default UserInfoModal