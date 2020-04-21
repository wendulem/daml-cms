import React from "react";
import { Segment, Header, Checkbox } from "semantic-ui-react";
import TableTemplate from "./TableTemplate";
import TileTableTemplate from "./TileTableTemplate";

class MemberView extends React.Component {
  state = {
    suirChecked: false, // why is it named this?
  }; // or should this object be seperated out into seperate lists

  // how do I keep this from fully repeating?
  memberDisplay = () => {
    if (this.state.suirChecked) {
      return (
        <TileTableTemplate
          itemList={this.props.members}
          addObject={{
            firstName: "",
            lastName: "",
            netID: "",
            school: "",
            major: "",
            password: "",
            team: "",
            biography: "",
            graduationYear: "",
            githubLink: "",
            linkedIn: "",
            photoString: "",
          }}
          tableColumns={{
            name: "",
            netID: "",
            school: "",
            major: "",
          }}
          modalFields={{
            firstName: {
              format: "textField",
              ops: null,
            },
            lastName: {
              format: "textField",
              ops: null,
            },
            netID: {
              format: "textField",
              ops: null,
            },
            school: {
              format: "textField",
              ops: null,
            },
            major: {
              format: "textField",
              ops: null,
            },
            team: {
              format: "optionField",
              ops: [
                { key: "DS", text: "Data Science", value: "DS" },
                { key: "CRM", text: "Business Team", value: "CRM" },
                { key: "PS", text: "Implementation Team", value: "PS" },
              ],
            },
            githubLink: {
              format: "linkPreview",
              ops: null,
            },
            linkedIn: {
              format: "linkPreview",
              ops: null,
            },
            biography: {
              format: "textArea",
              ops: null,
            },
          }}
          endpoint="user"
        />
      );
    }
    return (
      <TableTemplate
        itemList={this.props.members}
        addObject={{
          firstName: "",
          lastName: "",
          netID: "",
          school: "",
          major: "",
          password: "",
          team: "",
          biography: "",
          graduationYear: "",
          githubLink: "",
          linkedIn: "",
          photoString: "",
        }}
        tableColumns={{
          name: "",
          netID: "",
          school: "",
          major: "",
        }}
        modalFields={{
          firstName: {
            format: "textField",
            ops: null,
          },
          lastName: {
            format: "textField",
            ops: null,
          },
          netID: {
            format: "textField",
            ops: null,
          },
          school: {
            format: "textField",
            ops: null,
          },
          major: {
            format: "textField",
            ops: null,
          },
          team: {
            format: "optionField",
            ops: [
              { key: "DS", text: "Data Science", value: "DS" },
              { key: "CRM", text: "Business Team", value: "CRM" },
              { key: "PS", text: "Implementation Team", value: "PS" },
            ],
          },
          githubLink: {
            format: "linkPreview",
            ops: null,
          },
          linkedIn: {
            format: "linkPreview",
            ops: null,
          },
          biography: {
            format: "textArea",
            ops: null,
          },
        }}
        endpoint="user"
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
          icon="user"
          content="Members"
        />

        <div
          style={{
            "padding-top": "30px",
            "padding-right": "10px",
            "padding-left": "165px",
          }}
        >
          <Segment padded="very" className="focus-segment">
            {this.memberDisplay()}
          </Segment>
        </div>
      </div>
    );
  }
}

export default MemberView;
