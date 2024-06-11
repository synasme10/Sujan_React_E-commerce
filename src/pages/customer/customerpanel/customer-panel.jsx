import { useCallback, useEffect, useState } from "react";
import productSvc from "../../cms/product/product.service";
import ProductGridList from "../../../component/common/product/product-grid.component";
import { Container,Row,Col } from "react-bootstrap";

const CustomerPanel=()=>{

    const [productList,setProductList]=useState();
    const getProductList=useCallback(async()=>{
        try{
            const response=await productSvc.getProductForHomePage();
            setProductList(response.result);
           
        }catch(exception){
            console.log(exception)
        }
    },[])

    useEffect(()=>{
        getProductList()
    },[])

return(<>
            <Container fluid style={{backgroundColor:"#ffffff"}}className="products-list ps-5" >
          <Row>
            <Col>
              
            </Col>
          </Row>
          <Row >
            <ProductGridList products={productList}/>
          </Row>
        </Container>
</>)
}

export default CustomerPanel;