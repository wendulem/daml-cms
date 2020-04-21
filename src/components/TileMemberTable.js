import React from "react";
import { Icon, Card, Image, Grid, GridColumn } from "semantic-ui-react";
import ModalTemplate from "./ModalTemplate";

// Why did I make this a class?
class TileMemberTable extends React.Component {

    // Have a table class, columns as prop
    render() {
      const memberCards= this.props.memberList.map(member => {
        // is there a way to map the object to the cells faster?
        // iterate through object
        return (
          <GridColumn>
            <Card>
                <Image src={member.photoString} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{member.firstName} {member.lastName}</Card.Header>
                  <Card.Meta>
                    <span className='date'>NetID: {member.netID}</span>
                  </Card.Meta>
                </Card.Content>

                <Card.Content extra>
                  <ModalTemplate trigger={
                  <a>
                    <Icon name='edit' />
                    Edit
                  </a>
                  }
                  userInfo = {member}
                  /> 
                </Card.Content>
            </Card>
          </GridColumn>
        );
      });

    // The grid elements are out of line vertically
    return (
      <div>
        <Grid columns={4}>
          {memberCards}
        </Grid>
      </div>
    );
  }
}

export default TileMemberTable;
