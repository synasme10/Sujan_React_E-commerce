import { useEffect, useState } from "react";
import LoadingComponent from "../component/common/loading/loading.component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authsvc from "../pages/auth/auth.service";

const CheckPermission = ({ accessBy, children }) => {
    const [loading, setLoading] = useState(true)
    const navigate=useNavigate();

    const getLoggedInUser=async()=>{
        try{
            const userDetail=await authsvc.getLoggedInUserDetail()
            if(!userDetail){
                localStorage.removeItem("_au")
                localStorage.removeItem("_ud")
                toast.error("Invalid Token")
                navigate('/login')
            }else{
                localStorage.setItem("_ud",JSON.stringify({userId:userDetail.result._id,name:userDetail.result.name,role:userDetail.result.role}))
                if(userDetail.result.role===accessBy){
                    setLoading(false)
                    console.log(userDetail)
                }else{
                    toast.warning("You do not have previlage to access this panel")
                    navigate("/"+userDetail.result.role)
                }
            }
        }
        catch(exception){
        console.log(exception)
        toast.error("Something went wrong")
        navigate('/')
    }
   
}

    useEffect(() => {
       
        const token=localStorage.getItem("_au") || null
        if(token){
            getLoggedInUser();      
            
        }
        else{
            navigate('/login')
            toast.error("Login to get access")
        }
        
    }, [])
    return (
        <>
            {
                loading ? <LoadingComponent /> : children
            }
        </>
    )
}

export default CheckPermission;