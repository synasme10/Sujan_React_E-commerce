import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user.reducer";
import cartReducer from "./reducer/cart.reducer";


//central store, auta parameter linxa tyo ho reducer
//mero app ma kun chai data common share garna parne ho teslai loggedinprofile
const store = configureStore({
    reducer:{
        //later
        User:userReducer,
        Cart:cartReducer
        
    }
})


export default store;