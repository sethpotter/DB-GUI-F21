import React from "react";

export const ChangeStatus = (props) => { // Select from 3 statuses with select menu
  return(
    <form>
      <select>
        <option value="scheduled">Scheduled</option>
        <option value="inProgress">In Progress</option>
        <option value="delivered">Delivered</option>
      </select>
    </form>
  );
}
export class DeliveryComponent extends React.Component{
  //TO-DO: find way to expand/contract based on index
  //Have option to change status (IN PROGRESS)
  //Once status changes notify the supplier
  //Integrate adding shipments
  state ={
    button: "▼",
    rowHeight: "1em",
    status: <>{this.props.status}</>
  };

  editStatus = () => {
    this.setState({status : <ChangeStatus 
    id={this.props.id} 
    index={this.props.index} 
    status={this.props.status}
    />});
  }
  switchArrow = () => {
    if(this.state.button == "▼"){
      this.setState({button: "▲"});
    }else{
      this.setState({button: "▼"});
    }
  }
  render() {
    let status = <></>;
    return(
      <tr>
          <td>{this.props.id}</td>
          <td>{this.props.item} <button type="button" className="expand" onCLick={this.switchArrow}>{this.state.button}</button></td>
          <td>{this.state.status} <button type="button" onClick={this.editStatus}>Edit Status</button></td>
      </tr>
    );
  }
}
export class Deliveries extends React.Component {
  // TO DO:
  // Statuses set to 3 options
  state = {
    // shipment stuff, all the same length
    ids : [3809080, 1083159],
    items: ["Blue Dream, Lucky Charms, Strawberry Sugar", "D8 Bulk"],
    statuses: ["Gucci", "Also Gucci"],
    // rows to be printed
    rows: []
  };

  // This is a separate thing, the Deliveries thing
  render() {
    let displayShipments = <></>;
    if(this.state.ids.length == 0){
      displayShipments=<h1>Add some shipments first!</h1>
    }else{
      for(let index in this.state.ids){
        this.state.rows.push(<DeliveryComponent id={this.state.ids[index]} 
        item ={this.state.items[index]}
        status={this.state.statuses[index]}
        index={index}
        />)
      }
      displayShipments = 
      <table>
          <tr>
            <th>Shipment ID</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
          {this.state.rows}
        </table>;
    }
    //this.getShipments();
    return (
      <>
        <h1>Deliveries</h1>
        <p>Track your deliveries.</p>
        {displayShipments}
        {this.state.changeStatus}
      </>
    );
  }
}
