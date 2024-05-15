import HttpService from "../../config/http.service";

//inherit
class AuthService extends HttpService{
    login=async(data)=>{
        try{
            const loginResponse=await this.postRequest(
                // '/auth/login',
                '/v1/auth/login',
                data
            )
            if(loginResponse){
                //valid login ho bhane
                localStorage.setItem("_au",loginResponse.result.token)
                localStorage.setItem("_ud",JSON.stringify(loginResponse.result.userDetail))
            }
            return loginResponse
        }
        catch(exception){
            throw exception;
        }
    }

    register=async(data)=>{
        try{
            const registerResponse=await this.postRequest(
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

    getLoggedInUserDetail=async()=>{
        try{
            const userDetail=await this.getRequest('/v1/auth/me',{auth:true})
            return userDetail
        }catch(exception){
            throw exception
        }
    }

    forgotpassword=async(data)=>{
        try{
            const forgotpasswordEmail=await this.postRequest(
                '/v1/auth/forget-password',
                data
            )
            return forgotpasswordEmail;
        }catch(exception){
            throw exception
        }
    }

    
    verifyForgotpwLink= async(token)=>{
        try{
            const response=await this.getRequest(
                '/v1/auth/verify-password-token/'+token       
            )
            return response;
           
            
        } catch(exception){
            throw exception
        }
    }

    setForgotpw=async(data,token)=>{
        try{
            const response=await this.postRequest(
                '/v1/auth/set-password/'+token,
                data,
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