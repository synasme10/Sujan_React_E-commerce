import HttpService from "../../../config/http.service";

class ProductService extends HttpService{
    listAllProducts=async({page=1,limit=15,search=null})=>{
        try{
            let queryString=`page=${page}&limit=${limit}`;
            if(search){
                //+=concatinate
                queryString+='&search='+search
            }
            const response=await this.getRequest(
                '/v1/product?'+queryString,
                {auth:true} 
                
            )
            return response;
        }catch(exception){
            throw exception
        }
    }

    postProducts=async(data)=>{
        try{
            const response=await this.postRequest(
                '/v1/product',
                data,
                {auth:true,file:true}
            )
            return response
        }catch(exception){
            throw exception
        }
    }

    deleteById=async(id)=>{
        try{
            const response=await this.deleteRequest('/v1/product/'+id,{auth:true})
            return response;
        }
        catch(exception){
            throw exception
        }
    }

    getProductById=async(id)=>{
        try{
            const response=await this.getRequest('/v1/product/'+id,{auth:true})
            return response;
        }
        catch(exception){
            throw exception
        }
    }

    updateProductsbyID=async(id,data)=>{
        try{
            const response=await this.putRequest(
                '/v1/product/'+id,
                data,
                {auth:true,file:true}
            )
            return response
        }catch(exception){
            throw exception
        }
    }

    getProductForHomePage=async()=>{
        try{
            const response=await this.getRequest(
                '/v1/product/home'
            );
            return response;
        }catch(exception){
            throw exception
        }
    }

   getProductBySlug=async(slug)=>{
    try{
        const response=await this.getRequest(
            '/v1/product/'+slug+'/bySlug'
        )
        return response;
    }catch(exception){
        throw exception
    }
   }
}

const productSvc=new ProductService()
export default productSvc;
