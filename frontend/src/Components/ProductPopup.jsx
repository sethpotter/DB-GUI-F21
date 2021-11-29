import React from "react";
import { makeStyles, CardMedia} from '@material-ui/core';

const ProductPopup = props => {
  function getModalStyle() {
      const top = 45 ;
      const left = 50 ;
      return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
      };
  }


  let background = (props.item.stock < props.item.minStock) ? '#FAA0A0': '#F0EAD6'

  const useStyles = makeStyles(theme => ({
      modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      },
      paper: {
          position: 'absolute',
          width: 450,
          backgroundColor: background,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
      },
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);



  return (
      <div style={modalStyle} className={classes.paper}>
          <div>
            <CardMedia
              component="img"
              image={props.item.product.image}
              alt="ProductImage"
              />
          </div>
          
          <br />
          <h2>Name: {props.item.product.name}</h2>
          <p>Id: {props.item.product.id}</p>
          <p>Description: {props.item.product.description}</p>
          <p>Current Stock: {props.item.stock}</p>
          <p className="round">Minimum Stock: {props.item.minStock}</p>
      </div>
  );
};

export default ProductPopup;
