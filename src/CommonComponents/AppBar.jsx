import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, IconButton, Badge, Drawer, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "../Components/Cart"; 

const Navbar = () => {
    const [cartOpen, setCartOpen] = useState(false);

    const cart = useSelector((state) => state.cart);

    const handleToggleCart = () => {
        setCartOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Store
                    </Typography>

                    <IconButton color="inherit" onClick={handleToggleCart}>
                        <Badge badgeContent={cart.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={cartOpen} onClose={handleToggleCart}>
                <Cart />
            </Drawer>
        </>
    );
};

export default Navbar;
