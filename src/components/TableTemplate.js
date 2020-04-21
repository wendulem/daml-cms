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
import { startCase} from "lodash";
import ModalTemplate from "./ModalTemplate";

// Why did I make this a class?
class TableTemplate extends React.Component {
  constructor(props) {
    super(props);

    let addingInput = {};
    for (const key in this.props.tableColumns) {
      addingInput[key] = "";
    }

    this.state = {
      activePage: 1,
      adding: false,
      addingInput,
    };
  }

  toggleAdding = () => {
    this.setState({ adding: !this.state.adding });
  };

  handleChange = (e, { name, value }) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.addingInput[name] = value;
    console.log(stateCopy);
    this.setState(stateCopy);
  };

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  addElement = async () => {
    let mem = this.props.addObject;
    //switch to a mapping?
    //maybe redo using a better columnNames structure

    for (const key in this.state.addingInput) {
      if (this.props.endpoint === "user" && key === "name") {
        let names = this.state.addingInput["name"].split(" ");
        mem["firstName"] = names[0];
        mem["lastName"] = names[1];
      } else {
        mem[key] = this.state.addingInput[key];
      }
    }
    console.log(mem);
    let response = await axios.post(
      "https://dukeappml.herokuapp.com//" + this.props.endpoint + "/new",
      mem
    );
    console.log(response);

    window.location.reload();
  };

  addingCells = () => {
    let addingCells = [];
    // map with this too?
    // make addFields and columnNames.length one thing probably
    for (const inputType in this.props.tableColumns) {
      addingCells.push(
        <Table.Cell>
          <Input
            name={inputType}
            onChange={this.handleChange}
            focus
            placeholder={startCase(inputType)}
          />
        </Table.Cell>
      );
    }
    return addingCells;
  };

  contentCells = (item) => {
    let rowCells = [];

    for (const key in this.props.tableColumns) {
      console.log(key);
      if (this.props.endpoint === "user" && key === "name") {
        // should I replace the not null operation with something more robust?
        rowCells.push(
          <Table.Cell>
            {item["firstName"] != null && item["lastName"] != null ? (
              item["firstName"] + " " + item["lastName"]
            ) : (
              <Header as="h5" color="red">
                <Header.Content>Please Update: No information</Header.Content>
              </Header>
            )}
          </Table.Cell>
        );
      } else {
        rowCells.push(
          <Table.Cell>
            {item[key] && 0 !== item[key].length ? (
              item[key]
            ) : (
              <Header as="h5" color="red">
                <Header.Content>Please Update: No information</Header.Content>
              </Header>
            )}
          </Table.Cell>
        );
      }
    }

    return rowCells;
  };

  headerCells = () => {
    let headerCells = [];
    let columnWidth = 7;

    for (const key in this.props.tableColumns) {
      headerCells.push(
        <Table.HeaderCell width={columnWidth}>
          {startCase(key)}
        </Table.HeaderCell>
      );
    }

    return headerCells;
  };

  rowCreation = () =>
    this.props.itemList.map((item) => {
      return (
        <ModalTemplate
          trigger={
            <Table.Row key={item.uid}>{this.contentCells(item)}</Table.Row>
          }
          modalFields={this.props.modalFields}
          item={item}
          endpoint={this.props.endpoint}
        />
      );
    });

  addingUserBlock = () => {
    if (this.state.adding) {
      return <Table.Row key="adding">{this.addingCells()}</Table.Row>;
    }
  };

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
            onClick={this.addElement}
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
        <Icon name="add circle" />
        Add
      </Button>
    );
  };

  render() {
    return (
      <Table celled fixed selectable>
        <Table.Header>
          <Table.Row>{this.headerCells()}</Table.Row>
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
                totalPages={Math.ceil(this.props.itemList.length / 10)}
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

export default TableTemplate;
