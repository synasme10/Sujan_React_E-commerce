import HttpService from "../../config/http.service";

//inherit
class AuthService extends HttpService{
    login=async(data)=>{
        try{
            const loginResponse=await this.postRequest(
                '/auth/login',
                // '/v1/auth/login',
                data
            )
            return loginResponse
        }
        catch(exception){
            throw exception;
        }
    }

    register=async(data)=>{
        try{
            let registerResponse=await this.postRequest(
                    '/v1/auth/register',
                    data,
                    {file:true}
            )
            return registerResponse;
        }
        catch(exception){
            throw exception
        }
    }

    verifyToken=async(token)=>{
        try{
            const response=await this.getRequest(
                '/v1/auth/verify/'+token       
            )
            return response;
           
            
        } catch(exception){
            throw exception
        }
    }

    setActivation=async(data,token)=>{
        try{
            const response=await this.postRequest(
                '/v1/auth/activation/'+token,
                data       
            )
            return response;
           
        }catch(exception){
            throw exception
        }
    }

}
//authservice ko object
const authsvc=new AuthService();
export default authsvc;