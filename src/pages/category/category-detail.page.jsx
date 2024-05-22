import { useCallback, useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import categorySvc from "../cms/category/category.service";
import ProductGridList from "../../component/common/product/product-grid.component";

const CategoryDetailPage=()=>{
    const params=useParams()
    const [products,setProducts]=useState()

    const getCategoryDetail=useCallback(async()=>{
        try{
            const detail=await categorySvc.getCategoryDetail(params.slug)
            setProducts(detail.result)
        }catch(exception){

        }
    },[params])

    

    useEffect(()=>{
        getCategoryDetail()
    },[params])
    return(<>
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
    </>)
}

export default CategoryDetailPage;