import React from 'react';
import { Card, CardActions, CardContent,CardMedia, Button, Typography, Container, Grid} from '@material-ui/core';

export const ProductList = props => {

    const productArray = props.products.map( product => (
        <Grid item xs={2} sm={4} md={4}>
            <Card style={{flex: 1, width:'24rem', margin:'1rem', float:true}}>
                <CardMedia
                component="img"
                height="200rem"
                image={product.image}
                alt="ProductImage"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">More Details</Button>
            </CardActions>
            </Card>
        </Grid>
    ));

    return (
    <div className="float-left .ml-3">
        <Container>
            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {productArray}
            </Grid>
        </Container>
    </div>
    );

};