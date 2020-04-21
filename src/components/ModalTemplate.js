import React from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Image,
  Form,
  Popup,
  Grid,
  Loader,
  Dropdown,
} from "semantic-ui-react";
import { startCase, upperFirst } from "lodash";
import axios from "axios";

class UserInfoModal extends React.Component {
  constructor(props) {
    super(props);

    let editFields = {};
    for (const key in this.props.modalFields) {
      editFields[key] = "";
    }
    this.state = {
      uploadStatus: null,
      file: null,
      fileName: null,

      editFields,
    };
  }

  handleInfoChange = (e, { name, value }) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.editFields[name] = value;
    console.log(stateCopy);
    this.setState(stateCopy);
  };

  handleFormSubmit = () => {
    // is there a way to just make this one function
    this.editItem();
  };

  imageUpload = async () => {
    console.log("imageUpload");

    this.setState({ uploadStatus: "loading" });

    var fd = new FormData();
    fd.append("image", this.state.file);

    //Why doesn't any of this work...

    /*const res = await fetch(
      ' https://api.cloudinary.com/v1_1/dfitae3co/image/upload',
      {
        method: 'POST',
        body: fd
      }
    )

    const file = await res.json()

    console.log(file.secure_url)*/

    axios({
      url: "https://api.imgur.com/3/image",
      method: "POST",
      headers: {
        Authorization: "Client-ID 895c6bd0f17127d",
      },
      data: fd,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  fileChange = (e) => {
    console.log("fileChange");
    this.setState(
      { file: e.target.files[0], fileName: e.target.files[0].name },
      () => {
        console.log(
          "File chosen --->",
          this.state.file,
          console.log("File name  --->", this.state.fileName)
        );
      }
    );

    this.imageUpload();
  };

  editItem = async () => {
    //this.setState({buttontext: "Loading..."});
    //let photoLink = await this.imageUpload(event);

    // This needs to change to not be hardcoded
    var newItem = {};
    for (const key in this.props.item) {
      var stateForKey = this.state.editFields[key];
      newItem[key] =
        stateForKey && 0 !== stateForKey.length
          ? stateForKey
          : this.props.item[key];
    }

    //get rid of this
    if (this.props.endpoint === "paper") {
      Object.defineProperty(
        newItem,
        "authorLastName",
        Object.getOwnPropertyDescriptor(newItem, "authorlastName")
      );
      delete newItem["authorlastName"];
    }

    console.log("Edit Member Item:", newItem);

    let URL =
      "https://dukeappml.herokuapp.com//" +
      this.props.endpoint +
      "/" +
      this.props.item.uid;
    console.log(URL);
    let response = await axios.put(URL, newItem);
    console.log(response);

    window.location.reload(); // might just make these exit the modal and reload elsewhere? who knows
  };

  deleteItem = async () => {
    // does endpoint translate here? do it w edit user too
    let URL =
      "https://dukeappml.herokuapp.com//" +
      this.props.endpoint +
      "/" +
      this.props.item.uid;
    let response = await axios.delete(URL);

    console.log(response);

    window.location.reload();
  };

  checkButtonText = () => {
    if (this.state.uploadStatus === "uploaded") {
      return this.fileName;
    }
    if (this.state.uploadStatus === "loading") {
      return <Loader content="Loading" />;
    }
    return "Upload Photo";
  };

  modalHeader = () => {
    if (this.props.endpoint === "user") {
      return (
        <div>
          <Image
            wrapped
            size="medium"
            centered
            src={this.props.item.photoString}
          />

          <br />
          <br />

          <Modal.Description>
            <Header textAlign="center">
              {this.props.item.firstName} {this.props.item.lastName}
            </Header>
          </Modal.Description>
        </div>
      );
    }
    if (this.props.endpoint === "paper") {
      return (
        <Modal.Description>
          <Header textAlign="center">{this.props.item.title}</Header>
        </Modal.Description>
      );
    }

    return (
      <div>
        <Image wrapped size="medium" centered src={this.props.item.imageLink} />

        <br />

        <Modal.Description>
          <Header textAlign="center">{this.props.item.title}</Header>
        </Modal.Description>
      </div>
    );
  };

  modalForm = () => {
    let formFields = [];
    console.log(this.props.item);
    // have an else case for text? how does ordering of cases tend to work
    for (const key in this.props.modalFields) {
      console.log(key);
      console.log(this.props.item[key]);
      if (this.props.modalFields[key].format === "textField") {
        formFields.push(
          <Form.Field>
            <label>{startCase(key)}</label>
            <Form.Input
              name={key}
              onChange={this.handleInfoChange}
              placeholder={startCase(key)}
              defaultValue={this.props.item[key]}
            />
          </Form.Field>
        );
      } else if (this.props.modalFields[key].format === "optionField") {
        formFields.push(
          <Form.Field name="team">
            <label>{startCase(key)}</label>
            <Dropdown
              placeholder={startCase(key)}
              name={key}
              defaultValue={this.props.item[key]}
              onChange={this.handleInfoChange}
              fluid
              search
              selection
              options={this.props.modalFields[key].ops}
            />
          </Form.Field>
        );
      } else if (this.props.modalFields[key].format === "textArea") {
        formFields.push(
          <Form.Field>
            <label>{startCase(key)}</label>
            <Form.TextArea
              placeholder={"Tell us some more..."}
              name={key}
              defaultValue={this.props.item[key]}
              onChange={this.handleInfoChange}
            ></Form.TextArea>
          </Form.Field>
        );
      } else if (this.props.modalFields[key].format === "linkPreview") {
        formFields.push(
          <Form.Field>
            <label>
              {upperFirst(key)}{" "}
              <a
                href={
                  this.state.editFields[key] &&
                  0 !== this.state.editFields[key].length
                    ? this.state.editFields[key]
                    : this.props.item[key]
                }
                rel="noreferrer noopener"
                target="_blank"
              >
                <Icon name="external alternate" size="small" />
              </a>{" "}
            </label>
            <Form.Input
              name={key}
              onChange={this.handleInfoChange}
              placeholder={upperFirst(key)}
              defaultValue={this.props.item[key]}
            />
          </Form.Field>
        );
      }
    }

    return formFields;
  };

  render() {
    return (
      // Why can't the photostring be state based?
      <Modal trigger={this.props.trigger} closeIcon>
        <Header icon="user circle" content="Detailed Edit View" />

        <Modal.Content>
          <div style={{ padding: "0px", "text-align": "center" }}>
            {this.modalHeader()}
          </div>

          <br />

          <Grid>
            <Grid.Column textAlign="center">
              <Button
                disabled
                icon
                as="label"
                htmlFor="file"
                labelPosition="left"
              >
                {this.checkButtonText()}
                <Icon name="cloud upload" />
              </Button>
            </Grid.Column>
          </Grid>

          <input type="file" id="file" hidden onChange={this.fileChange} />
          <Form>{this.modalForm()}</Form>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={this.handleFormSubmit} color="green">
            <Icon name="save" /> Save Changes
          </Button>

          <Popup
            trigger={
              <Button color="red">
                <Icon name="delete" /> Delete Item
              </Button>
            }
            content={
              <Button
                color="red"
                content="Confirm deletion?"
                onClick={this.deleteItem}
              />
            }
            on="click"
            position="top right"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default UserInfoModal;
