import { toast } from "react-toastify"
import axios from "axios";

const axiosInstance=axios.create({
    //configuration, basURL:process.env.REACT_APP_API_URL while using npm,
    baseURL: import.meta.env.VITE_API_URL,
    timeout:30000, // fe le kati time samma wait 
    responseType:"json", //server le dine response
    timeOutErrorMessage: "Server timed out", 
    headers:{
        "content-Type":"application/json" //front end paxi server ma pathaune
    }
})

//request
axiosInstance.interceptors.response.use(
   (response)=>{
    //http_status_code===>2x
    return response.data
   },
   (exception)=>{
    //except ===>2x
    //console.log(exception.response.status)
    //===datatype match gareko  string cha arko number cha bhayo bhane match bhayena 
    //==value compare string bhayepani number cha bhane autai bhayo bhane match hunxa
    //= bhanexi value assign

    if(exception.response.status === 401) {
        //api call login you are logged in
        // login gara
        //TODO: cleanup
        console.log("i am the generator")
        document.location.href="/login"
    }
    else if(exception.response.status === 404)
    {
        console.log("404",exception.response.data)
        toast.error("Resource not found")
    }else if(exception.response.status === 403)
    {
        console.log("403",exception.response.data)
        toast.error("You do not have permission")
    }
    else {
        throw exception?.response?.data
    }
        
        // throw exception?.response)
   }
)
//response  



export default axiosInstance;