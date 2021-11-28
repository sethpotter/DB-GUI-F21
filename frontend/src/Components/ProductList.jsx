import React, { useState } from 'react';
import Popup from '../Components/Popup'
import { Card, CardActions, CardContent,CardMedia, Button,
   Typography, Container, Grid, Modal} from '@material-ui/core';

export const ProductList = props => {

    const [item, setItem] = useState(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const productArray = props.inventory.items.map(item => (
        <Grid item xs={2} sm={4} md={4}>
            <Card style={{flex: 1, width:'24rem', margin:'1rem', float:true}}>
                <CardMedia
                component="img"
                height="200rem"
                image={item.product.image}
                alt="ProductImage"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {item.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {item.product.description}
                </Typography>
            </CardContent>
            <CardActions className="">
                <Button size="small" onClick={() => {togglePopup(); setItem(item);}} >More Details</Button>
            </CardActions>
            </Card>
        </Grid>
    ));

    return (
    <div className="">
      {isOpen && <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={isOpen}
        onClose={togglePopup}
      >
        <Popup item={item}/>
      </Modal>
      }
        <Container>
            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {productArray}
            </Grid>
        </Container>
    </div>
    );

};
