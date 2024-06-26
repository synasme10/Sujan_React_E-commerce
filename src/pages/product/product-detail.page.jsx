import { useCallback, useEffect, useState } from "react";
import { Container, Col, Row, Carousel, Image, Badge, Form, Button } from "react-bootstrap";
import LoadingComponent from "../../component/common/loading/loading.component";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productSvc from "../cms/product/product.service";
import { SingleProduct } from "../../component/common/product/single-product.component";
import cartSvc from "../cms/cart/cart.service";
import { useDispatch } from "react-redux";
import { getCartDetail } from "../../reducer/cart.reducer";

const ProductDetailpage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState();
    const [related, setRelated] = useState();
    const [qty, setQty]=useState(0);
    const [qtyErr, setErr] = useState()
    const params = useParams();

    const dispatch=useDispatch();

   

    const productDetailBySlug = useCallback(async () => {
        try {
            // const response=await productSvc.getProductBySlug(params.id)
            const response = await productSvc.getProductById(params.id)
            setDetail(response.result)
            // setDetail(response.result.detail)
            setRelated(response.result.related)
        } catch (exception) {
            console.log(exception)
            toast.error("product not found")
        } finally {
            setLoading(false)
        }
    }, [params])

    useEffect(() => {
        productDetailBySlug()
    }, [params]);

    

    const showError = (e) => {
        e.target.src = "https://placehold.co/300x250?text=No+Image+Found"
    }

    const addToCart = async(e) => {
        try {
            e.preventDefault()
            const token = localStorage.getItem("_au");
            if (!token) {
                localStorage.setItem("_redirectUrl", '/product/' + detail.slug)
                toast.warning("Please login first to add item in cart")
                dispatch(getCartDetail())
                navigate('/login')
            } else {
                const cartItem = {
                    productId: detail._id,
                    quantity: +qty //number conversion
                }
                const response = await cartSvc.addToCart(cartItem)
                toast.success("Your Item has been successfully added in the cart")

            }
        } catch (exception) {
            toast.error("Item cannot be added in cart")
            console.log(exception)
        }
    }
    return (<>
        <Container className="my-5 py-5">

            {
                loading ? <LoadingComponent /> : (
                    detail ? <>
                        <Row>
                            <Col sm={12} md={6}>
                                <Carousel >
                                    {
                                        detail.images && detail.images.map((img, ind) => (
                                            <Carousel.Item key={ind}>
                                                <Image thumbnail fluid onError={showError} src={import.meta.env.VITE_IMAGE_URL + "/" + img} />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                            </Col>
                            <Col sm={12} md={6}>
                                <h4 className="mb-3">{detail?.title}</h4>
                                <Row className="mb-3">
                                    <Col sm={3}>
                                        <strong>Brand:</strong>
                                    </Col>
                                    <Col sm={9}>{detail?.brand?.title ?? "No Brand"}</Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>
                                        <strong>Category:</strong>
                                    </Col>
                                    <Col sm={9} className="mb-3">
                                        {
                                            detail.category && detail.category.map((cat, index) => (
                                                <Badge key={index} bg="info">
                                                    {cat.title}
                                                </Badge>
                                            ))
                                        }
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={3}>
                                        <strong>Price:</strong>
                                    </Col>
                                    <Col sm={9}>
                                        <strong className="me-3"> Rs. {detail.afterDiscount}</strong>
                                        {
                                            detail.discount > 0 ? <>
                                                <del className="text-danger">{detail.price}</del><span className="text-danger">&nbsp;({detail.discount}% Off)</span>
                                            </> : <></>
                                        }

                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                   
                                    <Col sm={12} className="mb-2">
                                       
                                        { 
                                            detail.attributes && detail.attributes.map((attr, ind) => (
                                                <Row className="mb-3" key={ind}>
                                                   
                                                    <Col sm={3}>
                                                        <strong>{attr.name}:</strong>
                                                    </Col>
                                                    <Col sm={9}>
                                                        {
                                                            attr.value && attr.value.map((val, ind) => (
                                                                <span key={ind}>
                                                                    {val}&nbsp;
                                                                </span>
                                                            ))
                                                        }
                                                    </Col>


                                                </Row>
                                            ))
                                        }

                                    </Col>
                                    <Row className="mb-3">
                                        <Col sm={3}>
                                            <Form.Control
                                                type="number"
                                                size="sm"
                                                onChange={(e) => {
                                                    const quantity = e.target.value;
                                                    if (quantity <= 0) {
                                                        setErr("Quantity should be greater than or equals to 0")
                                                    } else if (quantity > 10) {
                                                        setErr("Quantity should not be greater than 10")
                                                    } else {
                                                        setErr(null)
                                                    }
                                                    setQty(e.target.value)
                                                }}
                                                placeholder="0"
                                                min={0}
                                                max={10}
                                            />
                                            <span className="text-danger">{qtyErr}</span>
                                        </Col>
                                        <Col sm={9}>
                                            <Button onClick={addToCart} disabled={qtyErr ? true : false} variant="warning" type="button" size="sm">Add to Cart</Button>
                                        </Col>
                                    </Row>
                                </Row>

                            </Col>
                        </Row>
                        <Row className="mt-5">

                            <Col sm={12} md={9}><strong>Description: </strong><span>{detail.description}</span></Col>

                        </Row>
                        <Row className="mt-5">
                            {
                                related && related.map((singleRel, ind) => (
                                    <Col sm={12} md={4} className="mb-3" key={ind}>
                                        <SingleProduct product={singleRel} />
                                    </Col>
                                ))
                            }
                        </Row>

                    </> : <><p className="text-danger text=center">Product not found</p></>
                )
            }


        </Container>
    </>)
}

export default ProductDetailpage;