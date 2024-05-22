import {Row } from "react-bootstrap"
import SingleProductItem from "./single-product.component"
import React from "react";

const ProductGridList=({products})=>{

    return(
        <>
        <Row className="my-10">
            {
                products && products.map((prod,ind)=>(
                    <React.Fragment key={ind}>
                    <SingleProductItem product={prod} />
                    </React.Fragment>
                ))
            }
        </Row>
        </>
    )
}

export default ProductGridList;