import React from "react";
import { Segment, Header, Checkbox } from "semantic-ui-react";
import TableTemplate from "./TableTemplate";
import TileTableTemplate from "./TileTableTemplate";

class ProjectView extends React.Component {
  state = {
    suirChecked: false, // why is it named this?
  }; // or should this object be seperated out into seperate lists

  projectDisplay = () => {
    if (this.state.suirChecked) {
      return (
        <TileTableTemplate
          itemList={this.props.projects}
          addObject={{
            title: "",
            description: "",
            submitter: "",
            submitterEmail: "",
            approvalStatus: false,
            creationTime: "",
            abstract: "",
            imageLink: "",
          }}
          tableColumns={{
            title: "",
            description: "",
            submitter: "",
            submitterEmail: "",
          }}
          modalFields={{
            title: {
              format: "textField",
              ops: null,
            },
            description: {
              format: "textArea",
              ops: null,
            },
            submitter: {
              format: "textField",
              ops: null,
            },
            abstract: {
              format: "textField",
              ops: null,
            },
          }}
          endpoint="project"
        />
      );
    }
    console.log(this.props.projects);
    return (
      <TableTemplate
        itemList={this.props.projects}
        addObject={{
          title: "",
          description: "",
          submitter: "",
          submitterEmail: "",
          approvalStatus: false,
          creationTime: "",
          abstract: "",
          imageLink: "",
        }}
        tableColumns={{
          title: "",
          description: "",
          submitter: "",
          submitterEmail: "",
        }}
        modalFields={{
          title: {
            format: "textField",
            ops: null,
          },
          description: {
            format: "textArea",
            ops: null,
          },
          submitter: {
            format: "textField",
            ops: null,
          },
          abstract: {
            format: "textField",
            ops: null,
          },
        }}
        endpoint="project"
      />
    );
  };

  toggle = () =>
    this.setState(({ suirChecked }) => ({ suirChecked: !suirChecked })); //what does this mean - need explained

  render() {
    return (
      <div className="pageContentTEMP">
        <Checkbox
          onChange={this.toggle}
          label="Tile Mode"
          toggle
          style={{
            float: "right",
            "padding-right": "150px",
            "padding-top": "40px",
          }}
        />
        <Header
          style={{
            "padding-left": "175px",
            "padding-top": "20px",
            color: "#1E2C3A",
          }}
          as="h2"
          icon="folder open"
          content="Projects"
        />

        <div
          style={{
            "padding-top": "30px",
            "padding-right": "10px",
            "padding-left": "165px",
          }}
        >
          <Segment padded="very" className="focus-segment">
            {this.projectDisplay()}
          </Segment>
        </div>
      </div>
    );
  }
}

export default ProjectView;
