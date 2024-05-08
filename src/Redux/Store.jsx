import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from './ProductSlice'
import  categorySlice  from './CategorySlice'
import CategoryProductSlice from './CategoryProductSlice';
import ProductDetailsSlice from './ProductDetailsSlice';
import CartSlice from './CartSlice';

const store = configureStore({
    reducer: {
      products: ProductSlice, 
      categories: categorySlice, 
      categoryProducts: CategoryProductSlice,
      productDetails:ProductDetailsSlice,
      cart:CartSlice
    },
    
  });
  

export default store