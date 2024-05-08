import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectStatus,
  STATUSES,
} from "../Redux/ProductSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Category from "./Category";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Margin } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { addToCart } from "../Redux/CartSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const status = useSelector(selectStatus);

  console.log(products, status);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading data...</h2>;
  }

  if (status === STATUSES.ERROR) {
     return <h2>Something went wrong. Please check your API connection!</h2>;
    
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          style={{ marginTop: "2rem", marginLeft: "1rem" }}
        >
          <Grid xs={9}>
            <Item>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                      <Grid xs={4}>
                        <Card
                          sx={{ maxWidth: 300 }}
                          style={{ height: "29rem" }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="180"
                              image={product.thumbnail}
                              alt={product.title}
                              style={{ objectFit: "fill" }}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {product.title}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                ${product.price}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {product.description}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Link to={`product-details/${product?.id}`}>
                              <Button
                                size="small"
                                color="success"
                                variant="contained"
                                style={{ marginLeft: "3rem" }}
                              >
                                Details
                              </Button>
                            </Link>
                            <Button
                              size="small"
                              color="primary"
                              variant="contained"
                              onClick={() => handleAddToCart(product)}
                       
                            >
                              Add to Cart
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <p>No products available.</p>
                  )}
                </Grid>
              </Box>
            </Item>
          </Grid>
          <Grid xs={3}>
            <Category />
          </Grid>
        </Grid>
      </Box>
      {/* Render products here */}
    </>
  );
};

export default Products;
