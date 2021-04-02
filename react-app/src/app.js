import React from "react";

import axios from "axios";

import Form from "./components/add-item.js";
import Items from "./components/items.js";
import { Container, Navbar } from "react-bootstrap";

// const API_SERVER = process.env.REACT_APP_API;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  addItem = async (item) => {
    await axios.post(`http://localhost:3001/items`, item);
    this.getItems();
  };

  deleteItem = async (id) => {
    await axios.delete(`http://localhost:3001/items/${id}`);
    this.getItems();
  };

  updateItem = async (item) => {
    await axios.put(`http://localhost:3001//items/${item._id}`, item);
    this.getItems();
  };

  getItems = async () => {
    const response = await axios.get(`http://localhost:3001/items`);
    const items = response.data;
    this.setState({ items });
  };

  async componentDidMount() {
    await this.getItems();
  }

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand href="#">Our Items</Navbar.Brand>
          </Container>
        </Navbar>
        <Form handleAddItem={this.addItem} />
        <hr />
        <Items
          handleDelete={this.deleteItem}
          itemsList={this.state.items}
          handleUpdate={this.updateItem} //added
        />
      </div>
    );
  }
}

export default App;
