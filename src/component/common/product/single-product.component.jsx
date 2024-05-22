import { Col, Card, Badge } from "react-bootstrap"
import img1 from '../../../assets/images/dummy-images/1.jpg'
import { NavLink } from "react-router-dom"

export const SingleProduct=({product})=>{
    const showError = (e) => {
        e.target.src = "https://placehold.co/300x250?text=No+Image+Found"
    }
    return(<>
    <Card style={{ width: '18rem' }}>
                <Card.Img onError={showError} variant="top" src={import.meta.env.VITE_IMAGE_URL + "/" + product.images[0]} />
                <Card.Body>
                    <Card.Title as={'h6'} >
                        <NavLink to={`/product/`+product._id} style={{textDecoration:"none"}}>{product.title}</NavLink>
                    </Card.Title>
                    <Card.Text>
                        <span className="me-3">Npr.{product.afterDiscount}</span>

                        {
                            product.discount > 0 ? <> <del className="text-danger"> Npr.{product.price} </del></> : <></>
                        }

                    </Card.Text>
                    <Card.Text>
                        {
                            product.category && product.category.map((cat, ind) => (
                                <Badge bg="info" key={ind} className="me-3">
                                    {
                                        cat.title
                                    }
                                </Badge>
                            ))
                        }

                    </Card.Text>

                </Card.Body>
                <Card.Footer className="bg-warning text-end" >
                <NavLink to={`/product/`+product.slug} className={'btn btn-link'}><i className="fa fa-shopping-cart" aria-hidden="true"></i></NavLink>
                </Card.Footer>
            </Card>
    </>)
}
const SingleProductItem = ({product}) => {
   
    console.log(product)
    return (<>
      <Col sm={6} md={4} lg={3} className="mb-5">
            <SingleProduct product={product}></SingleProduct>
        </Col>
    </>)
}

export default SingleProductItem;

