import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  CardMedia,
} from "@mui/material";
import { removeCartItem } from "../Redux/CartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  return (
    <Card
      sx={{ Width: 2000, margin: "auto", marginTop: "2rem", padding: "1rem" }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Shopping Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="body1" component="p">
            Your cart is empty.
          </Typography>
        ) : (
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} divider>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Link
                    to={`/product-details/${item?.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <CardMedia
                      component="img"
                      image={item.thumbnail}
                      alt={item.title}
                      style={{ objectFit: "fill" }}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "4px",
                        marginRight: "1rem",
                      }}
                    />
                    <ListItemText
                      primary={item.title}
                      secondary={`Price: $${item.price}`}
                      style={{ marginLeft: "1rem" }}
                    />
                  </Link>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                    style={{ marginLeft: "1rem" }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Typography variant="h6" component="p">
          Total: $
          {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Cart;

