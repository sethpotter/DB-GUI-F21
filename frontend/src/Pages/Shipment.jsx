import React from "react";

export class Form extends React.Component {
  state = {
    validOrders: [],
    customerList: [],
    shipment: "",
    customer: "",
    goodOrder: false,
    goodCustomer: false
  };

  changeShipment = (event) => {
    this.setState({ shipment: event.target.value });
  };
  changeCustomer = (event) => {
    this.setState({ customer: event.target.value });
  };

  check = (event) => {
    alert("Customer: " + this.state.customer);
    for (let validOrder of this.state.validOrders) {
      if (this.state.shipment == validOrder) {
        this.state.goodOrder = true;
      }
    }
    for (let validCustomer of this.state.customerList) {
      if (this.state.customer == validOrder) {
        this.state.goodCustomer = true;
      }
    }
    if (this.state.goodCustomer == false) {
      alert("No good customer!");
    }
    if (this.state.goodOrder == false) {
      alert("No good order!");
    }
  };

  render() {
    return (
      <>
        <h1>New Order</h1>
        <form onSubmit={this.check}>
          <label for="shipment">Shipment</label>
          <br />
          <select
            id="shipment"
            name="shipment"
            onChange={this.changeShipment}
          />
          <br />
          <label for="quantity">Quantity</label>
          <br />
          <input type="text" id="shipment" name="shipment" />
          <br />
          <label for="customer">Customer</label>
          <br />
          <input
            type="text"
            id="customer"
            name="customer"
            onChange={this.changeCustomer}
          />
          <br />
          <label for="carrier">Carrier:</label>
          <select id="carrier" name="carrier">
            <option value="usps">USPS</option>
            <option value="ups">UPS</option>
            <option value="fedex">FedEx</option>
          </select>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}
