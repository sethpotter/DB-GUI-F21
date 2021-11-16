import React from "react";
import "./styles.css";

export class NewData extends React.Component {
  state = {
    availableItems: [], // put available items here
    item: "",
    quantity: ""
  };
  saveItem = (event) => {
    this.setState({ item: event.target.value });
  };
  saveQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };
  toProp = (event) => {
    alert("Selected: " + this.state.item + " " + this.state.quantity);
    this.props.addNew(this.state.item, this.state.quantity);
  };
  test = (event) => {
    alert("Click worked");
  };

  render() {
    return (
      <>
        <h1>New Cart Item</h1>
        <form onSubmit={this.test}>
          <label htmlFor="item-select">Select Item to add. </label>
          <br />
          <select id="item-select" name="item-select" onChange={this.saveItem}>
            <option></option>
            <option value="TR-808">TR-808</option>
            <option value="TB-303">TB-303</option>
            <option value="SH-101">TB-303</option>
          </select>
          <br />
          <label htmlFor="item-select">Select quantity. </label>
          <br />
          <input
            type="text"
            id="item-select"
            onChange={this.saveQuantity}
            name="item-select"
          />
          <br />
          <input type="submit" value="Submit" class="submit-button" />
          <button onClick={this.toProp}>Test</button>
        </form>
      </>
    );
  }
}

export class FormComponent extends React.Component {
  state = {
    result: []
  };
  render() {
    //alert("Length: " + this.props.productName.length);
    for (let index in this.props.productName) {
      if (index < this.state.result.length) {
        continue;
      } else {
        this.state.result.push(
          <tr>
            <td>{this.props.productName[index]}</td>
            <td>
              <input type="text" value={this.props.quantity[index]} />
            </td>
          </tr>
        );
        this.setState(this.state.result);
        alert(
          "Product name: " +
            this.props.productName[index] +
            " Quantity: " +
            this.props.quantity[index]
        );
      }
    }
    return <>{this.state.result}</>;
  }
}

export class Form extends React.Component {
  state = {
    deliveryTo: "",
    submitted: false,
    items: [],
    quantities: []
  };

  newItem = () => {
    this.state.submitted = 1;
    this.setState({ submitted: 1 });
  };
  newItemAdded = (itemName, quantity) => {
    alert("State set?");
    this.state.items.push(itemName);
    this.state.quantities.push(quantity);
    this.setState(this.state.items);
    alert("State set.");
    this.setState(this.state.quantities);
    alert("State has been set!");
  };
  render() {
    let tag = "";
    if (this.state.submitted == true) {
      tag = (
        <NewData
          ok={this.state.submitted}
          addNew={(itemName, quantity) => {
            alert("State set?");
            this.state.items.push(itemName);
            this.state.quantities.push(quantity);
            this.setState(this.state.items);
            alert("State set.");
            this.setState(this.state.quantities);
            alert("State has been set!");
          }}
        />
      );
    }
    return (
      <>
        <h1>Shipment Details</h1>
        <h2>Delivery To (Insert Javascript Here)</h2>

        <form>
          <button>Clear Form</button>
          <br />
          <table>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
            <FormComponent
              productName={this.state.items}
              quantity={this.state.quantities}
            />
          </table>
          <button
            type="button"
            onClick={() => this.setState({ submitted: !this.state.submitted })}
          >
            Update Cart
          </button>
          <input type="submit" value="Finalize Shipment" />
          {tag}
        </form>
      </>
    );
  }
}
