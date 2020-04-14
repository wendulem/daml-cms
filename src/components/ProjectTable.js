import React from "react";
import {
  Button,
  Icon,
  Table,
  Pagination,
  Input,
  Modal
} from "semantic-ui-react";
import axios from "axios";
//import UserInfoModal from "./ProjectInfoModal";

// Why did I make this a class?
class ProjectTable extends React.Component {
  state = {
    activePage: 1,
    projectTotal: this.props.projectList.length,
    adding: false,
    title: '',
    team: '',
    email: '',
    imageLink: ''
  };

  toggleAdding = () => {
    this.setState({ adding: !this.state.adding }, () =>
      console.log(this.state.adding)
    );
  };

  addPaper = async () => {
    var mem = {
        title: this.state.title, 
        description: '', 
        submitter: this.state.team,
        submitterEmail: this.state.email,
        imageLink: '',
        abstract: ''
    };

    let response = await axios.post(
      "https://dukeappml.herokuapp.com/project/new",
      mem
    );
    console.log(response);

    window.location.reload();
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  addSaveButton = () => {
    if (this.state.adding) {
      return (
        <Button.Group>
  
          <Button
            floated="left"
            icon
            labelPosition="left"
            size="small"
            color="green"
            onClick={this.addPaper}
          >
            <Icon name="save" />
            Save Changes
          </Button>

          <Button.Or />

          <Button
            floated="left"
            icon
            labelPosition="left"
            size="small"
            color="red"
            onClick={this.toggleAdding}
            >
              <Icon name="cancel" />
              Cancel
          </Button>

        </Button.Group>
      );
    }
    return (
      <Button
        floated="left"
        icon
        labelPosition="left"
        primary
        size="small"
        onClick={this.toggleAdding}
      >
        <Icon name="add user" />
        Add User
      </Button>
    );
  };

  addingUserBlock = () => {
    if (this.state.adding) {
      return (
        <Table.Row key="adding">
          <Table.Cell>
            <Input
              size="mini"
              name="title"
              onChange={this.handleChange}
              focus
              placeholder="Title"
            />
          </Table.Cell>

          <Table.Cell>
            <Input
              size="mini"
              name="team"
              onChange={this.handleChange}
              focus
              placeholder="Team"
            />
          </Table.Cell>

          <Table.Cell>
            <Input
              size="mini"
              name="email"
              onChange={this.handleChange}
              focus
              placeholder="Email"
            />
          </Table.Cell>
        </Table.Row>
      );
    }
  };

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  rowCreation = () =>
    this.props.projectList.map((project) => {
      // is there a way to map the object to the cells faster?
      // iterate through object
      // HOW TO PUT THIS AS THE LAST ROW EVEN WHEN NULL
      // <Table.Cell><Button active>{member.headshotLink.substring(member.headshotLink.lastIndexOf("/") + 1, member.headshotLink.length)}</Button></Table.Cell>
      // <Button active>N/A</Button>

      /*
        <Table.Cell>
            <a href={member.githubLink} rel='noreferrer noopener' target="_blank"><Button icon><Icon name="github" size="large" /></Button></a>
            <a href={member.linkedIn} rel='noreferrer noopener' target="_blank"><Button icon><Icon name="linkedin" size="large" /></Button></a>
          </Table.Cell>
        */

      /*
          <Button.Group floated="right">
                  <Button primary>Save</Button>
                  <Button.Or />
                  <Button>Cancel</Button>
                </Button.Group>
        */

      return (
        <Modal
          trigger={
            <Table.Row key={project.uid}>
              <Table.Cell>
                {project.title}
              </Table.Cell>
              <Table.Cell>
                {project.submitter}
              </Table.Cell>

              <Table.Cell>
                {project.submitterEmail}
              </Table.Cell>
            </Table.Row>
          }
          projectInfo={project}
        />
      );
    });

  // Have a table class, columns as prop
  render() {
    //conditional

    return (
      <Table celled fixed selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={7}>Title</Table.HeaderCell>
            <Table.HeaderCell width={7}>Team</Table.HeaderCell>
            <Table.HeaderCell width={7}>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.rowCreation().slice(
            10 * (this.state.activePage - 1),
            10 * this.state.activePage
          )}
          {this.addingUserBlock()}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="9">
              {this.addSaveButton()}
              <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={Math.ceil(this.props.projectList.length / 10)}
                floated="right"
                onPageChange={this.handlePaginationChange}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default ProjectTable;
