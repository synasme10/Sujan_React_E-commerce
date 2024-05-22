
import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import brandSvc from "../cms/brand/brand.service";
import { Container,Row,Col } from "react-bootstrap";
import ProductGridList from "../../component/common/product/product-grid.component";

const BrandDetailPage=()=>{
    // params
    const params=useParams()
    const [products,setProducts]=useState()
    // const [query,setQuery]=useSearchParams();
    // console.log(query.get('q'))

    const getBrandDetail=useCallback(async()=>{
        const detail=await brandSvc.getBrandDetail(params.slug)
        setProducts(detail.result)
    },[params])



    useEffect(()=>{
        getBrandDetail()
    },[params])
    return(
        <>
         <Container className="my-5 py-5">
        <Row>
            <Col>Category Detail:
            </Col>
        </Row>
        <Row className="my-3">
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