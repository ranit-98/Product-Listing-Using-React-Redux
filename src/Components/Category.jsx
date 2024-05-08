import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategories, selectCategoryStatus, STATUSES } from "../Redux/CategorySlice";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper'
const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };
const CategoriesComponent = () => {
    const dispatch = useDispatch();

    // Use the memoized selectors to get the categories data and status
    const categories = useSelector((state) => selectCategories(state) || []); // Default to an empty array if undefined
    const status = useSelector(selectCategoryStatus);

    console.log(categories, status);

    // Fetch categories when the component mounts
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Render based on the current status
    if (status === STATUSES.LOADING) {
        return <h2>Loading categories...</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong. Please check your API connection!</h2>;
    }

    return (
        <div>
            {/* Render the list of categories */}
            <Paper elevation={3} style={{width:"20rem"}} >
            <List sx={style}>
                <h1 style={{color:"green"}}>Categories</h1>
                <ListItem >
                       <Link to="/" style={{textDecoration:"none",color:"black"}}><ListItemText primary="All Category" /></Link> 
                      </ListItem>
            {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category, index) => (
                      <ListItem key={index}>
                       <Link to={`/category/${category}`} style={{textDecoration:"none",color:"black"}}><ListItemText primary={category} /></Link> 
                      </ListItem>
                ))
            ) : (
                <p>No categories available.</p>
            )}
            </List>
            </Paper>
        </div>
    );
};

export default CategoriesComponent;
