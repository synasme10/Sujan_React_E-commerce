import { toast } from "react-toastify"
import axios from "axios";

const axiosInstance=axios.create({
    
    baseURL: import.meta.env.VITE_API_URL,
    timeout:30000,  
    responseType:"json", 
    timeOutErrorMessage: "Server timed out", 
    headers:{
        "content-Type":"application/json" 
    }
})


axiosInstance.interceptors.response.use(
   (response)=>{
    
    return response.data
   },
   (exception)=>{
  

    if(exception.response.status === 401) {
       
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
        throw exception?.response
    }
        
       
   }
)




export default axiosInstance;