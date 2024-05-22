import HttpService from "../../../config/http.service";

class CartService extends HttpService{
    addToCart=async(data)=>{
        try{
            const response=await this.postRequest('/v1/cart/create',data,{auth:true})
            return response;
        }catch(exception){
            throw exception;
        }
    }

    getMyCart=async()=>{
        try{
            const response=await this.getRequest('/v1/cart/list',{auth:true})
            return response;
        }catch(exception){
            throw exception
        }
    }

    removeFromCart=async(id)=>{
        try{
            const response=await this.deleteRequest('/v1/cart/'+id,{auth:true})
            return response;
        }catch(exception){
            throw exception;
        }
    }
}

//object cart service ko banako
const cartSvc=new CartService();
export default cartSvc;

