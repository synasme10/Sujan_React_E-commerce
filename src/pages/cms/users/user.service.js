import HttpService from "../../../config/http.service";

class UserService extends HttpService{
    listAllUsers=async({role="customer"})=>{
        try{
            let roles=`role=${role}`
            
            const response=await this.getRequest(
                '/v1/auth/user?'+roles,
                {auth:true} 
                
            )
            return response;
        }catch(exception){
            throw exception
        }
    }

  
}

const userSvc=new UserService()
export default userSvc;
