import React from "react";
import "./styles.css";

export const NewData = (props) => {
  let comeThru;
  if (props.ok > 0) {
    comeThru = (
      <>
        <h1>New Cart Item</h1>
        <label htmlFor="item-select">Select Item to add. </label>
        <br />
        <select id="item-select" name="item-select"></select>
        <br />
        <label htmlFor="item-select">Select quantity. </label>
        <br />
        <input type="text" id="item-select" name="item-select" />
        <br />
      </>
    );
  } else {
    comeThru = <></>;
  }
  return <>{comeThru}</>;
};

export class FormComponent extends React.Component {
  state = {
    result: []
  };
  render() {
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
      }
    }
    return <>{this.state.result}</>;
  }
}

export class Form extends React.Component {
  state = {
    deliveryTo: "",
    submitted: 0
  };

  newItem = () => {
    this.setState({ submitted: 1 });
  };
  render() {
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
            <FormComponent productName={[]} quantity={[]} />
          </table>
          <button onClick={this.newItem}>Update Cart</button>
          <input type="submit" value="Finalize Shipment" />
          <NewData ok={this.state.submitted} />
        </form>
      </>
    );
  }
}
