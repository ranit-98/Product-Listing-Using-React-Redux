import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchCategoryProducts,
  selectCategoryProducts,
  selectCategoryStatus,
  STATUSES,
} from "../Redux/CategoryProductSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Category from "./Category";
import { addToCart } from "../Redux/CartSlice";

const CategoryProducts = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const categoryProducts = useSelector(selectCategoryProducts) || {};
  const status = useSelector(selectCategoryStatus);

  useEffect(() => {
    dispatch(fetchCategoryProducts(category));
  }, [dispatch, category]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading products...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong. Please try again later.</h2>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        style={{ marginTop: "2rem", marginLeft: "1rem" }}
      >
        <Grid xs={9}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              {categoryProducts?.map((product) => (
                <Grid xs={4} key={product.id}>
                  <Card sx={{ maxWidth: 300, height: "29rem" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="180"
                        image={product.thumbnail}
                        alt={product.title}
                        style={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          color="text.secondary"
                        >
                          ${product.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description?.slice(0, 100)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link to={`/product-details/${product?.id}`}>
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
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={3}>
          <Category />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryProducts;
