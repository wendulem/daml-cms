import React from 'react';
import { Menu, Icon, Sidebar } from "semantic-ui-react";

export default () => { 

        return (
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
          <Menu.Item as="a">
            <Icon name="user outline" />
            Members
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="folder open outline" />
            Projects
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="file alternate outline" />
            Papers
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="newspaper outline" />
            News
          </Menu.Item>
        </Sidebar>
        );
};
