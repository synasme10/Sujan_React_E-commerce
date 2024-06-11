import HttpService from "../../../config/http.service";

class CategoryService extends HttpService{
    listAllCategorys=async({page=1,limit=15,search=null})=>{
        try{
            let queryString=`page=${page}&limit=${limit}`;
            if(search){
         
                queryString+='&search='+search
            }
            const response=await this.getRequest(
                '/v1/category?'+queryString,
                {auth:true} 
                
            )
            return response;
        }catch(exception){
            throw exception
        }
    }

    postCategorys=async(data)=>{
        try{
            const response=await this.postRequest(
                '/v1/category',
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
            const response=await this.deleteRequest('/v1/category/'+id,{auth:true})
            return response;
        }
        catch(exception){
            throw exception
        }
    }

    getCategoryById=async(id)=>{
        try{
            const response=await this.getRequest('/v1/category/'+id,{auth:true})
            return response;
        }
        catch(exception){
            throw exception
        }
    }

    updateCategorysbyID=async(id,data)=>{
        try{
            const response=await this.putRequest(
                '/v1/category/'+id,
                data,
                {auth:true,file:true}
            )
            return response
        }catch(exception){
            throw exception
        }
    }

    getCategoryForHomePage=async()=>{
        try{
            const response=await this.getRequest(
                '/v1/category/home'
            );
            return response;
        }catch(exception){
            throw exception
        }
    }

    getCategoryDetail=async(slug)=>{
        try{
            const response=await this.getRequest(
                "/v1/product/"+slug+"/bycategory"
            )
            return response;
        }catch(exception){
            throw exception
        }
    }
}

const categorySvc=new CategoryService()
export default categorySvc;
