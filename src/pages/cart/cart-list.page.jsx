import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cartSvc from "../cms/cart/cart.service";
import { Container,Row,Col, Table, Image, Button } from "react-bootstrap";
import LoadingComponent from "../../component/common/loading/loading.component";
import { useDispatch } from "react-redux";
import { getCartDetail as getMyCartDetail } from "../../reducer/cart.reducer";


const CartPage = () => {

    const [cartDetail, setCartDetail] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch=useDispatch();

    let [cartIds,setCartIds]=useState([]);

    const addCartIds=(e,id)=>{
        const {checked}=e.target;
        const ids=[...cartIds] || []
        if(checked){
            ids.push(id)
        }else{
            //unchecked gareko hataunxa parxa, indexOf fucntion le k dinxa bhane id pass garxa bhane yo id kun index ma cha yo arrey ko bhanne kura ko bhanne return garxa
            const indexOf=ids.indexOf(id)
            ids.splice(indexOf,1);
        }
        setCartIds(ids)
        // console.log({ids})
    }

    const checkOutOrder=async()=>{
        try{
            const result=await cartSvc.checkoutCart(cartIds)
            toast.success(result.message)
            //TODO: you have to integrate payment gateway
            // 
        }catch(exception){
            console.log(exception)
            toast.error("Sorry, can't Checkout at the moment")
        }
    }

    const getCartDetail = useCallback(async () => {
        try {
            let token=localStorage.getItem("_au")||null
            if(token){
                const response = await cartSvc.getMyCart();
                setCartDetail(response.result)
            }
        } catch (exception) {
            toast.error("Cart Detail unable to fetch at the moment")
            console.log(exception)
            navigate('/')
        }finally{
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getCartDetail()
    }, [])

    const updateCart=async(productId,qty)=>{
            try{
                setLoading(true)
                const response=await cartSvc.addToCart({productId,quantity:qty})
                await getCartDetail()
                dispatch(getMyCartDetail())
                toast.success("cart Updated Successfully")
                
            }catch(exception){
                console.log(exception)
                toast.error("Quantity cannot be Change at the momment")
            }finally{
                setLoading(false)
            }
    }

    const deleteCart=async(id)=>{
        try{
            setLoading(true)
            
            const response=await cartSvc.removeFromCart(id)
            await getCartDetail()
            dispatch(getMyCartDetail())
            toast.success("cart Deleted Successfully")
            
        }catch(exception){
            console.log(exception)
            toast.error("Cart cannot be deleted at the moment")
        }finally{
            setLoading(false)
        }
    }
    return (<>

        <Container className="my-5">
            {
                loading ? <LoadingComponent /> : <>
                    <Row>
                        <Col sm={12}>
                        <h2 className="text-center">Cart Detail</h2>    
                        </Col>  
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm={12}>
                            <Table striped bordered hover size="sm">
                                <thead className="table-dark">
                                    <tr>
                                        <th style={{width:"50px"}} >#</th>
                                        <th style={{width:"40%"}}>Title</th>
                                        {/* <th>Thumb</th> */}
                                        <th>Price</th>
                                        <th className="text-center">Quantity</th>
                                        <th>Amount</th>
                                        <th className="text-center">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartDetail && cartDetail.map((item,ind)=>(
                                            <tr key={ind}>
                                                <td className="text-center">
                                                    <input 
                                                        type="checkbox"
                                                        onChange={(e)=>{
                                                            addCartIds(e,item._id)
                                                        }}
                                                    />
                                                </td>
                                                <td>{item.productId.title}</td>
                                                {/* <td>
                                                    <Image fluid sizes="sm" style={{maxWidth:"75px"}} src={import.meta.env.VITE_IMAGE_URL+"/"+item.productId.images[0]}></Image>
                                                </td> */}
                                                <td>
                                                    Rs. {item.price}
                                                </td>
                                                <td className="text-center">
                                                    <Button onClick={(e)=>{
                                                        updateCart(item.productId._id,+item.quantity-1)
                                                    }} size="sm" variant="warning" type="button" className="me-3">
                                                        <i className="fa fa-minus"></i>
                                                    </Button>
                                                    {item.quantity}
                                                    <Button onClick={(e)=>{
                                                        updateCart(item.productId._id,+item.quantity+1)}} size="sm" variant="warning" type="button" className="ms-3" >
                                                        <i className="fa fa-plus"></i>
                                                    </Button>
                                                </td>
                                                <td>
                                                    Rs. {item.price*item.quantity}
                                                </td>
                                                <td className="text-center">
                                                <Button onClick={(e)=>{
                                                       deleteCart(item._id)}} size="sm" variant="danger" type="button" className="ms-2" >
                                                        <i className="fa fa-trash"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <Button variant="warning" size="sm" onClick={checkOutOrder}>
                                Checkout
                            </Button>
                        </Col>

                    </Row>
                </>
            }
        </Container>

    </>)
}

export default CartPage;