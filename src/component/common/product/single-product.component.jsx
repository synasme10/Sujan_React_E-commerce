import { Col, Card, Badge } from "react-bootstrap"
import img1 from '../../../assets/images/dummy-images/1.jpg'
import { NavLink } from "react-router-dom"

export const SingleProduct=({product})=>{
    const showError = (e) => {
        e.target.src = "https://placehold.co/300x250?text=No+Image+Found"
    }
    return(<>
    <Card className="productlist-design mt-4 ms-4" style={{width:"270px"}}>
                <Card.Img onError={showError} variant="top" src={import.meta.env.VITE_IMAGE_URL + "/" + product.images[0]} />
                <Card.Body>
                    <Card.Title as={'h6'} >
                        <NavLink className="link-product" to={`/product/`+product._id} ><span className="product-title">{product.title}</span></NavLink>
                    </Card.Title>
                    <Card.Text>
                        <span className="me-3">Rs. {product.afterDiscount}</span>

                        {
                            product.discount > 0 ? <> <del className="text-danger"> Npr.{product.price} </del></> : <></>
                        }

                    </Card.Text>
                    <Card.Text>
                        {
                            product.category && product.category.map((cat, ind) => (
                                <Badge bg="primary" key={ind} className="me-3">
                                    {
                                        cat.title
                                    }
                                </Badge>
                            ))
                        }
                        
                            <NavLink to={"/brand/"+product?.brand?.slug}><Badge>{product?.brand?.title}</Badge></NavLink>
                    </Card.Text>

                </Card.Body>
                <Card.Footer className="bg-light text-end" >
                <NavLink to={`/product/`+product.slug} className={'btn btn-link'}><i className="fa fa-shopping-cart" aria-hidden="true"></i></NavLink>
                </Card.Footer>
            </Card>
    </>)
}
const SingleProductItem = ({product}) => {
  
    return (<>
      <Col className="mb-3 me-2">
            <SingleProduct product={product}></SingleProduct>
        </Col>
    </>)
}

export default SingleProductItem;

