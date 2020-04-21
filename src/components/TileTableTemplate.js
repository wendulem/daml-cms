import React from "react";
import { Icon, Card, Image, Grid, GridColumn } from "semantic-ui-react";
import ModalTemplate from "./ModalTemplate";

// Why did I make this a class?
class TileMemberTable extends React.Component {
  // Have a table class, columns as prop
  populateImage = (item) => {
    if (this.props.endpoint === "user") {
      return <Image src={item.photoString} wrapped ui={false} />;
    }
    if (this.props.endpoint === "papers") {
      return "";
    }
    return <Image src={item.imageLink} wrapped ui={false} />;
  };
  populateCard = (item) => {
    if (this.props.endpoint === "user") {
      return (
        <Card.Content>
          <Card.Header>
            {item.firstName} {item.lastName}
          </Card.Header>
          <Card.Meta>
            <span className="date">NetID: {item.netID}</span>
          </Card.Meta>
        </Card.Content>
      );
    }
    if (this.props.endpoint === "papers") {
      return (
        <Card.Content>
          <Card.Header>{item.title}</Card.Header>
          <Card.Meta>
            <span className="date">{item.abstract}</span>
          </Card.Meta>
        </Card.Content>
      );
    }

    return (
      <Card.Content>
        <Card.Header>{item.title}</Card.Header>
        <Card.Meta>
          <span className="date">{item.description}</span>
        </Card.Meta>
      </Card.Content>
    );
  };

  render() {
    const itemCards = this.props.itemList.map((item) => {
      // is there a way to map the object to the cells faster?
      // iterate through object
      return (
        <GridColumn>
          <Card>
            {this.populateImage(item)}
            {this.populateCard(item)}
            <Card.Content extra>
              <ModalTemplate
                trigger={
                  <a>
                    <Icon name="edit" />
                    Edit
                  </a>
                }
                modalFields={this.props.modalFields}
                item={item}
                endpoint={this.props.endpoint}
              />
            </Card.Content>
          </Card>
        </GridColumn>
      );
    });

    // The grid elements are out of line vertically
    return (
      <div>
        <Grid columns={4}>{itemCards}</Grid>
      </div>
    );
  }
}

export default TileMemberTable;
