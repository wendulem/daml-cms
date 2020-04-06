import React from "react";
import { Segment, Header, Checkbox } from "semantic-ui-react";
import axios from "axios";
import MemberTable from "./MemberTable";
import TileMemberTable from "./TileMemberTable";
import SidebarMenu from "./SidebarMenu";
import WebpageHeader from "./WebpageHeader";

class App extends React.Component {
  state = { 
    members: [], 
    suirChecked: false // why is it named this?
  }; // or should this object be seperated out into seperate lists

  componentDidMount() {
    this.getMemberData();
    console.log(this.state.members)
  }

  getMemberData = async () => {
    const response = await axios.get('https://dukeappml.herokuapp.com/users')
    this.setState({ members: response.data });
  }

  memberDisplay = () => {
    if(this.state.suirChecked){
      return <TileMemberTable memberList={this.state.members}/>;
    }
    return <MemberTable memberList={this.state.members} />;
  }

  // Why outside the render and not a const inside?
  toggle = () =>
    this.setState(({ suirChecked }) => ({ suirChecked: !suirChecked })) //what does this mean - need explained
  
  render() {
    // Shift div styling to css and shift to components
    // <Dimmer active /> dimmer shifts around elements, what's best practice
    return (
      <div>

        <WebpageHeader />

        <SidebarMenu />        

        <div className="pageContentTEMP">
          <Checkbox onChange={this.toggle} label="Tile Mode" toggle style={{float: "right", "padding-right": "150px", "padding-top": '40px'}} />
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


      </div>
    );
  }
}

export default App;
