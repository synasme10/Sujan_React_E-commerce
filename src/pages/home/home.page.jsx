// import { useEffect, useState } from "react";




import { Container, Row, Col, Button, Card } from "react-bootstrap";
import BannerComponent from "../../component/fe/home/banner.component";
import ProductGridList from "../../component/common/product/product-grid.component";

import { useCallback, useEffect, useState } from "react"
import productSvc from "../cms/product/product.service";
import samsung1 from "../../assets/images/samsung/samsung1.jpg"
import iphone15 from "../../assets/images/samsung/iphone15.png"
import huba from "../../assets/images/samsung/huba.png"
import { NavLink } from "react-router-dom";


const HomePage = ({ name }) => {

 

  const [productList, setProductList] = useState();


  const getProductList = useCallback(async () => {
    try {
      const response = await productSvc.getProductForHomePage();
      setProductList(response.result);

    } catch (exception) {
      console.log(exception)
    }
  }, [])

  useEffect(() => {
    getProductList()
  }, [])

  return (
    <>
      <BannerComponent />
      <Container fluid style={{ backgroundColor: "#ffffff" }} className="products-list ps-5" >
        <Row>
          <Col>
            <h2>Product Lists</h2>
          </Col>
        </Row>
        <Row >
          <ProductGridList products={productList} />
        </Row>
        <Row className="mb-5">
          <div className={"articles"}>
            <div className={"pictures"}>
              
              <img style={{width:"1350px",marginLeft:"30px"}} src={samsung1} alt="background" />
            </div>
            <span className={"headers"}>
            <h1 >Escape the ordinary</h1>
            <Button variant="light" style={{marginLeft:"40px"}} className="grey-button btn btn-lg">
            
              <NavLink className={"add-link"} to="http://localhost:5173/product/6654aa6b3c3ff768821f1997">Go To Galaxy S24 | S24+</NavLink>
            </Button>
            </span>
           
          </div>
        </Row>
        <Row className="mb-5">
          <Col sm={12} md={6}>
          <div className={"half-articles"}>
            <div className={"half-pictures"}>
              
              <img style={{marginLeft:"20px"}} src={iphone15} alt="background" />
            </div>
            <span className={"half-headers"}>
            <h2 >iPhone 15 </h2>
            <p style={{fontSize:"14px"}}>New Camera. New design</p>
            </span>
            <span className="half-headers-right">
            <Button  style={{marginLeft:"40px"}} className="pink-button btn btn-lg ">
            
              <NavLink className={"pink-link"} to="http://localhost:5173/product/6658a21aedd35da73e4c9e89"><span className="text-white">Buy</span></NavLink>
            </Button>
           
            </span>
          </div>
          </Col>
          <Col sm={12} md={6}>
              <h3 style={{width:"500px",textAlign:"center",paddingLeft:"5em",paddingTop:"8em"}}>The A16 Bionic GPU is up to 40% faster than the GPU in iPhone 12</h3>
          </Col>
         </Row>

         <Row className="mb-4 text-center">
         <Col sm={12} md={6}>
              <h2 style={{width:"500px",textAlign:"center",paddingLeft:"7.9em",paddingTop:"8em"}}>
                ACCESSORIES
              </h2>
              <Button variant="dark" style={{marginLeft:"40px"}} className="btn btn-lg">
            
              <NavLink className={"add-link"} to="http://localhost:5173/brand/huba"><span className="text-white">EXPLORE THE COLLECTION</span></NavLink>
            </Button>
          </Col>
          <Col sm={12} md={6}>
          <div className={"articles"}>
            <div className={"pictures"}>
              
              <img  style={{marginRight:"40px"}} src={huba} alt="background" />
            </div>
            <span className={"huba-headers"}>
            <h2 >HUBA Metro Pouch</h2>
            <Button variant="light" style={{marginLeft:"40px"}} className="grey-button btn btn-md">
            
              <NavLink className={"add-link"} to="http://localhost:5173/product/6658abf7f7b3fe3863847e21"><span className="">Go To Huba Metro Pouch</span></NavLink>
            </Button>
            </span>
           
          </div>
          </Col>
         </Row>
      </Container>
    </>


  )
}

export default HomePage;