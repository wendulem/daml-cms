import React from "react";
import { Segment, Header, Checkbox } from "semantic-ui-react";
import TableTemplate from "./TableTemplate";
//import TileMemberTable from "./TileMemberTable";

class NewsView extends React.Component {
  state = {
    suirChecked: false, // why is it named this?
  }; // or should this object be seperated out into seperate lists

  newsDisplay = () => {
    if (this.state.suirChecked) {
      //return <TileMemberTable memberList={this.props.memberList} />;
    }
    return (
      <TableTemplate
        itemList={this.props.news}
        addObject={{
          title: "",
          subtitle: "",
          publicationDate: "",
          description: "",
          body: "",
          authorFirstName: "",
          authorLastName: "",
          creationTime: "",
          imageLink: ""
        }}
        tableColumns={{
          title: "",
          subtitle: "",
          publicationDate: ""
        }}
        endpoint="newsentry"
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
          icon="newspaper"
          content="News"
        />

        <div
          style={{
            "padding-top": "30px",
            "padding-right": "10px",
            "padding-left": "165px",
          }}
        >
          <Segment padded="very" className="focus-segment">
            {this.newsDisplay()}
          </Segment>
        </div>
      </div>
    );
  }
}

export default NewsView;
