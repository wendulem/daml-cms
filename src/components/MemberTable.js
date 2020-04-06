import React from "react";
import { Button, Icon, Table, Header, Pagination} from "semantic-ui-react";
import UserInfoModal from "./UserInfoModal";

// Why did I make this a class?
class MemberTable extends React.Component {

    state = {
      activePage: 1,
      memberTotal: this.props.memberList.length
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    // Have a table class, columns as prop
    render() {

      const rowCreation = () => this.props.memberList.map(member => {
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
        
        console.log("test")
        
        const newTableRow = (<Table.Row key={member.uid}>
          <Table.Cell>{member.firstName ? member.firstName : "WARNING"} {member.lastName}</Table.Cell>
          <Table.Cell>{member.netID ? member.netID : "Please fill, no information"}</Table.Cell>
          
          <Table.Cell>{member.school ? member.school : 
          <Header as='h5' color='red'>
            <Icon name='arrow circle up' />
            <Header.Content>Please Update: No information</Header.Content>
          </Header>}
          </Table.Cell>
          
          <Table.Cell>{member.major}</Table.Cell>
        </Table.Row>)
  
        return (
          <UserInfoModal trigger={newTableRow} userInfo={member} />
        );
      });
    
      //conditional

      return (
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>NetID</Table.HeaderCell>
              <Table.HeaderCell>School</Table.HeaderCell>
              <Table.HeaderCell>Discipline</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rowCreation().slice(5 * (this.state.activePage - 1), 5 * (this.state.activePage))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="9">
                <Button
                  floated="left"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                >
                  <Icon name="add user" /> Add User
                </Button>
              
                <Pagination
                  boundaryRange={0}
                  defaultActivePage={1}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={Math.ceil(this.props.memberList.length / 5)}
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
