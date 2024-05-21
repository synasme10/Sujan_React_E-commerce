// import { useEffect, useState } from "react";




import { Container, Row, Col } from "react-bootstrap";
import BannerComponent from "../../component/fe/home/banner.component";
import ProductGridList from "../../component/common/product/product-grid.component";

import { useCallback, useEffect, useState } from "react"
import productSvc from "../cms/product/product.service";

const HomePage =({name}) =>{

    // const paraDesign={
    //     backgroundColor:"#dddddd",
    //     padding:"10px"
    // }

    // const [data,setData]=useState("Hello word")
    // const [loading, setLoading]=useState(false) 
    // const [user,setUser]=useState()

    // const getUserList =()=>{
    //     //TODO: API call get userlist fetch
    //     setUser([])
    // }

    // useEffect(()=>{
    //     //executes on any state change of this component
    //     console.log("I am always called")
    // })

    
    // useEffect(()=>{
    //     //this effect hook only calls once when the component renders for the first time
    //     console.log("I am only called in first render")
    //     setLoading(true)
    // },[])

    // useEffect(()=>{
    //     //this hook only calls when the data state is updated
    //     console.log("I am only called on when data gets updated")
    // },[data])

    const [productList,setProductList]=useState();

    
    const getProductList=useCallback(async()=>{
        try{
            const response=await productSvc.getProductForHomePage();
            setProductList(response.result);
            // console.log(response.result)
        }catch(exception){
            console.log(exception)
        }
    },[])

    useEffect(()=>{
        getProductList()
    },[])

    return(
        <>
        <BannerComponent/>
        <Container className="my-3">
          <Row>
            <Col>
              <h2>Product Lists</h2>
            </Col>
          </Row>
          <Row>
            <ProductGridList products={productList}/>
          </Row>
        </Container>
      </>
     
    
    )
}

export default HomePage;