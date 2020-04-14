import React from "react";
import { Segment, Header } from "semantic-ui-react"
import ProjectTable from "./ProjectTable"

class ProjectView extends React.Component {
    state = { 
        suirChecked: false // why is it named this?
    }; // or should this object be seperated out into seperate lists

    projectDisplay = () => {
        if(this.state.suirChecked){
          //return <TileProjectTable projectList={this.props.projects}/>;
        }
        return <ProjectTable projectList={this.props.projects} />;
      }

    toggle = () =>
        this.setState(({ suirChecked }) => ({ suirChecked: !suirChecked })) //what does this mean - need explained

    render () {
    
        return (
            <div className="pageContentTEMP">
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
        )
    }
}

export default ProjectView;