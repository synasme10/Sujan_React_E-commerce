import HttpService from "../../config/http.service";

//inherit
class AuthService extends HttpService{
    login=async(data)=>{
        try{
            const loginResponse=await this.postRequest(
                // '/v1/auth/login',
                '/auth/login',
                data
            )
            return loginResponse
        }
        catch(exception){
            throw exception;
        }
    }

}

//authservice ko object
const authsvc=new AuthService();
export default authsvc;