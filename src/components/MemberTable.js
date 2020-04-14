import React from "react";
import {
  Button,
  Icon,
  Table,
  Header,
  Pagination,
  Input,
} from "semantic-ui-react";
import axios from "axios";
import UserInfoModal from "./UserInfoModal";

// Why did I make this a class?
class MemberTable extends React.Component {
  state = {
    activePage: 1,
    memberTotal: this.props.memberList.length,
    adding: false,
    name: null,
    netID: null,
    school: null,
    major: null,
  };

  toggleAdding = () => {
    this.setState({ adding: !this.state.adding }, () =>
      console.log(this.state.adding)
    );
  };

  addUser = async () => {
    var mem = {
      firstName: this.state.name.substring(0, this.state.name.indexOf(" ")),
      lastName: this.state.name.substring(
        this.state.name.indexOf(" ") + 1,
        this.state.name.length
      ),
      netID: this.state.netID,
      password: "",
      team: "",
      major: this.state.major,
      biography: "",
      graduationYear: "",
      school: this.state.school,
      githubLink: "",
      linkedIn: "",
      photoString: "",
    };

    let response = await axios.post(
      "https://dukeappml.herokuapp.com//user/new",
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
            onClick={this.addUser}
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
              name="name"
              onChange={this.handleChange}
              focus
              placeholder="Full Name"
            />
          </Table.Cell>

          <Table.Cell>
            <Input
              size="mini"
              name="netID"
              onChange={this.handleChange}
              focus
              placeholder="NetID"
            />
          </Table.Cell>

          <Table.Cell>
            <Input
              size="mini"
              name="school"
              onChange={this.handleChange}
              focus
              placeholder="School"
            />
          </Table.Cell>

          <Table.Cell>
            <Input
              size="mini"
              name="major"
              onChange={this.handleChange}
              focus
              placeholder="Discipline"
            />
          </Table.Cell>
        </Table.Row>
      );
    }
  };

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  rowCreation = () =>
    this.props.memberList.map((member) => {
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
        <UserInfoModal
          trigger={
            <Table.Row key={member.uid}>
              <Table.Cell>
                {member.firstName} {member.lastName}
              </Table.Cell>
              <Table.Cell>
                {member.netID ? member.netID : "Please fill, no information"}
              </Table.Cell>

              <Table.Cell>
                {member.school ? (
                  member.school
                ) : (
                  <Header as="h5" color="red">
                    <Icon name="arrow circle up" />
                    <Header.Content>
                      Please Update: No information
                    </Header.Content>
                  </Header>
                )}
              </Table.Cell>

              <Table.Cell>{member.major}</Table.Cell>
            </Table.Row>
          }
          userInfo={member}
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
            <Table.HeaderCell width={5}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>NetID</Table.HeaderCell>
            <Table.HeaderCell width={5}>School</Table.HeaderCell>
            <Table.HeaderCell width={5}>Discipline</Table.HeaderCell>
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
                totalPages={Math.ceil(this.props.memberList.length / 10)}
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

export default MemberTable;
