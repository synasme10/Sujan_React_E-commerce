import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authsvc from "../pages/auth/auth.service";


export const getLoggedInUser= createAsyncThunk(
    "User/getLoggedInUser",
    async(data,thunkAPI)=>{
        try{
            const loggedInUser=await authsvc.getLoggedInUserDetail()
            localStorage.setItem("_ud",JSON.stringify({userId:loggedInUser.result._id,name:loggedInUser.result.name,role:loggedInUser.result.role}))
            return loggedInUser.result;
        }catch(exception){
            console.log("I am error in redux thunk")
            throw exception;
        }   
    }
)

const UserSlicer= createSlice({
    name:"User",
    initialState:{
     user:null
    },
    reducers:{

        sayHello:(state,action)=>{
            console.log(state.user)
            console.log(action)
       
        },
        logouts:(state,action)=>{
            localStorage.removeItem("_au")
            localStorage.removeItem("_ud")
            state.user=null;
            console.log("logoutredux")
        },
        setLoggedInuser:(state,action)=>{
            state.user=action.payload;

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getLoggedInUser.fulfilled,(state,action)=>{
            state.user=action.payload
        })
        builder.addCase(getLoggedInUser.rejected),(state,action)=>{
            localStorage.removeItem("_au")
            localStorage.removeItem("_ud")
            state.user=null;
        }
    }
})


export const {sayHello,setLoggedInuser,logouts}= UserSlicer.actions;
export default UserSlicer.reducer;