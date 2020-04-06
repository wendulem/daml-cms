import React from 'react'
import { Button, Header, Icon, Modal, Image, Form, Popup, TextArea } from 'semantic-ui-react'

class UserInfoModal extends React.Component {

  state = {
    currentStatus: null
  }

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

        <Form>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First name' defaultValue={this.props.userInfo.firstName} />
            </Form.Field>

            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' defaultValue={this.props.userInfo.lastName} />
            </Form.Field>

            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' defaultValue={this.props.userInfo.lastName} />
            </Form.Field>

            <Form.Field>
              <label>NetID</label>
              <input placeholder='NetID' defaultValue={this.props.userInfo.netID} />
            </Form.Field>

            <Form.Field>
              <label>School</label>
              <input placeholder='School' defaultValue={this.props.userInfo.school} />
            </Form.Field>

            <Form.Field>
              <label>Discipline</label>
              <input placeholder='Discipline' defaultValue={this.props.userInfo.major} />
            </Form.Field>

            <Form.Field>
              <label>LinkedIn <a href={this.props.userInfo.linkedIn} rel='noreferrer noopener' target="_blank"><Icon name="external alternate" size="small" /></a> </label>
              <input placeholder='LinkedIn' defaultValue={this.props.userInfo.linkedIn} />
            </Form.Field>

            <Form.Field>
              <label>GitHub <a href={this.props.userInfo.githubLink} rel='noreferrer noopener' target="_blank"><Icon name="external alternate" size="small" /></a> </label>
              <input placeholder='GitHub' defaultValue={this.props.userInfo.githubLink} />
            </Form.Field>

            <TextArea placeholder='Tell us about yourself...' defaultValue={this.props.userInfo.biography} />

          </Form>

        </Modal.Content>

        <Modal.Actions>   
          
          <Button color='green'>
            <Icon name='save' /> Save Changes       
          </Button>

          <Popup
            trigger={
              <Button color='red'>
                <Icon name='delete' /> Delete User
              </Button>
            }
            content={<Button color='red' content='Confirm user deletion?' />}
            on='click'
            position='top right'
          />
        </Modal.Actions>

      </Modal>
    )
  }
}

export default UserInfoModal