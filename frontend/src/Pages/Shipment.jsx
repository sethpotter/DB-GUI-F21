import React from "react";

export const NewData = (props) => {
  return (
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
    submitted: false
  };

  newItem = () => {
    this.state.submitted = 1;
    this.setState({ submitted: 1 });
  };
  render() {
    let tag = "";
    if (this.state.submitted == true) {
      tag = <NewData ok={this.state.submitted} />;
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
            <FormComponent productName={[]} quantity={[]} />
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
