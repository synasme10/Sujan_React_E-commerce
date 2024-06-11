
import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import brandSvc from "../cms/brand/brand.service";
import { Container,Row,Col } from "react-bootstrap";
import ProductGridList from "../../component/common/product/product-grid.component";

const BrandDetailPage=()=>{
 
    const params=useParams()
    const [products,setProducts]=useState()
  

    const getBrandDetail=useCallback(async()=>{
        const detail=await brandSvc.getBrandDetail(params.slug)
        setProducts(detail.result)
    },[params])



    useEffect(()=>{
        getBrandDetail()
    },[params])
    return(
        <>
         <Container fluid className="ps-5 my-4 ">
        <Row>
            <Col>
            <h5 style={{textTransform:"capitalize",textDecoration:"none"}}><a className="link-product" href={"/brand/"+params.slug}>{params.slug}</a></h5>
            </Col>
        </Row>
        <Row >
            {
                products && products.length>0 ?<>
                    <ProductGridList products={products} />
                </>:<>
                   <p className="text-danger">No Product Founds</p>
                </>
            }
        </Row>
    </Container>
        </>
    )
}

export default BrandDetailPage;