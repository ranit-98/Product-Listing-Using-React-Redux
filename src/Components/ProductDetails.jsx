

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductDetails,
  selectProductDetails,
  selectProductStatus,
  STATUSES,
} from "../Redux/ProductDetailsSlice";
import { addToCart } from "../Redux/CartSlice"; // Import the addToCart action from your cart slice

import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"; // Import Button component from MUI
import CategoriesComponent from "./Category";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector(selectProductDetails);
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (status === STATUSES.LOADING) {
    return <h2>Loading product details...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong. Please try again later.</h2>;
  }

  // Event handler function for adding an item to the cart
  const handleAddToCart = () => {
    //console.log(productDetails);
    if (productDetails) {
      dispatch(addToCart(productDetails));
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ padding: "2rem" }}>
            <Carousel autoPlay={true}>
              {productDetails?.images?.map((image, index) => (
                <Box key={index}>
                  <CardMedia
                    component="img"
                    alt={productDetails?.title}
                    image={image}
                    style={{
                      width: "100%",
                      height: "30rem",
                      objectFit: "fill",
                    }}
                  />
                </Box>
              ))}
            </Carousel>
            <CardContent>
              <Typography variant="h4" component="h2">
                {productDetails?.title}
              </Typography>
              <Typography variant="h5" component="h3">
                Price: ${productDetails?.price}
              </Typography>
              <Typography variant="body1" component="p">
                Discount Percentage: {productDetails?.discountPercentage}%
              </Typography>
              <Typography variant="body1" component="p">
                Brand: {productDetails?.brand}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Description: {productDetails?.description}
              </Typography>
              <Box sx={{ marginTop: "1rem" }}>
                <Typography variant="body2">
                  Rating: {productDetails?.rating}
                </Typography>
                <Typography variant="body2">
                  Stock: {productDetails?.stock}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                style={{margin:"2rem"}}
              >
                Add to Cart
              </Button>
              {productDetails?.images?.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    class="img-fluid"
                    alt=""
                    style={{ width: "100%", objectFit: "contain" }}
                  />
                );
              })}
              <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
              <p>
                Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro
                amet nostrum. In assumenda quia quae a id praesentium. Quos
                deleniti libero sed occaecati aut porro autem. Consectetur sed
                excepturi sint non placeat quia repellat incidunt labore. Autem
                facilis hic dolorum dolores vel. Consectetur quasi id et optio
                praesentium aut asperiores eaque aut. Explicabo omnis quibusdam
                esse. Ex libero illum iusto totam et ut aut blanditiis.
                Veritatis numquam ut illum ut a quam vitae.
              </p>
              <p>
                Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim
                omnis ipsa voluptas incidunt. Nulla sit eaque mollitia nisi
                asperiores est veniam.
              </p>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <CategoriesComponent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
