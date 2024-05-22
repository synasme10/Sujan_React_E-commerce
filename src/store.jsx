import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user.reducer";


//central store, auta parameter linxa tyo ho reducer
//mero app ma kun chai data common share garna parne ho teslai loggedinprofile
const store = configureStore({
    reducer:{
        //later
        User:userReducer
        
    }
})


export default store;