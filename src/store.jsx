import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user.reducer";
import cartReducer from "./reducer/cart.reducer";



const store = configureStore({
    reducer:{
  
        User:userReducer,
        Cart:cartReducer
        
    }
})


export default store;