import React from 'react';
import { Segment, Header } from "semantic-ui-react";

export default () => { 

    return (
    <Segment
        style={{ background: "#1E2C3A", width: "100%", height: "120px" }}
    >
        <a href="/" style={{ float: "left" }}>
          <img
            alt="DAML Logo"
            src={require("../whitedaml.png")}
            style={{ width: "150px", height: "100px" }}
          />
        </a>

        <Header as="h1" floated="left" style={{ 
            color: "#f2f4f5",
            "padding-top": "30px", 
            "font-style": "normal",
            "font-weight": 400,
            "font-size": "30px",
            "line-height": "35px",
            "text-align": "center" 
          }}>

          Duke Applied Machine Learning
        </Header>

      </Segment>
    );
};