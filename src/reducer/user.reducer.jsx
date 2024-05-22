import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authsvc from "../pages/auth/auth.service";

//saga ra thunk middleware cha in redux , tara thunk is more usefull
//reducer bhitra async use garna paudaina 
//slicer/function lekhna parxa thunk bhitra
//eslai reducer ma bind garna mildaina ,extrareducer function/key ma bind garne 
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

//createSlice method banaune
const UserSlicer= createSlice({
    name:"User",
    initialState:{
     user:null
    },
    reducers:{
        //sayhello function, parameter state ra action, state variable le user point gareko data
        sayHello:(state,action)=>{
            console.log(state.user)
            console.log(action)
            //action => object variable=>{type:"",payload:"HELLO WORLD"} duita chij function ma pathako j value cha tyo payload ma aunxa

            //state=slicer state

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

//sayhello method lai bind garera pathaunxu, value kasari pathauxau bhane userslicer le point gareko actions bata pathaunxau
//store bhnya auta bag ani reduccer or slicer bhane ko different types of books

export const {sayHello,setLoggedInuser}= UserSlicer.actions;
export default UserSlicer.reducer;