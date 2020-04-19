import React from "react";
import axios from "axios";
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import WebpageHeader from "./WebpageHeader";
import MemberView from "./MemberView";
import ProjectView from "./ProjectView";
import NewsView from "./NewsView";
import PaperView from "./PaperView";

class App extends React.Component {
  state = {
    activeView: "members",
    members: [],
    projects: [],
    papers: [],
    news: []
  }; // or should this object be seperated out into seperate lists

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const members = await axios.get("https://dukeappml.herokuapp.com/users");
    this.setState({ members: members.data });

    const projects = await axios.get(
      "https://dukeappml.herokuapp.com/projects"
    );
    this.setState({ projects: projects.data });

    const papers = await axios.get("https://dukeappml.herokuapp.com/papers");
    this.setState({ papers: papers.data });

    const news = await axios.get("https://dukeappml.herokuapp.com/newsentries");
    this.setState({ news: news.data });
  };

  members = () => {
    this.setState({
      activeView: "members",
    });
  };

  projects = () => {
    this.setState({
      activeView: "projects",
    });
  };

  papers = () => {
    this.setState({
      activeView: "papers",
    });
  };

  news = () => {
    this.setState({
      activeView: "news",
    });
  };

  setView = () => {
    console.log(this.state.activeView);
    if (this.state.activeView === "projects") {
      return <ProjectView projects={this.state.projects} />;
    }
    if (this.state.activeView === "papers") {
      return <PaperView papers={this.state.papers} />;
    }
    if (this.state.activeView === "news") {
      return <NewsView news={this.state.news} />;
    }

    return <MemberView members={this.state.members} />;
  };

  render() {
    // Shift div styling to css and shift to components
    // <Dimmer active /> dimmer shifts around elements, what's best practice
    return (
      <div>
        <WebpageHeader />

        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          vertical
          visible
          color="#1E2C3A"
          style={{ position: "absolute", top: "120px" }}
          width="thin"
        >
          <Menu.Item onClick={this.members} as="a">
            <Icon name="user outline" />
            Members
          </Menu.Item>
          <Menu.Item onClick={this.projects} as="a">
            <Icon name="folder open outline" />
            Projects
          </Menu.Item>
          <Menu.Item onClick={this.papers} as="a">
            <Icon name="file alternate outline" />
            Papers
          </Menu.Item>
          <Menu.Item onClick={this.news} as="a">
            <Icon name="newspaper outline" />
            News
          </Menu.Item>
        </Sidebar>

        {this.setView()}
      </div>
    );
  }
}

export default App;
