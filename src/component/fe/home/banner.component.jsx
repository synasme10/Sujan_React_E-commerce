import { Container,Col, Row, CarouselItem,Carousel } from "react-bootstrap";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";

const BannerComponent =()=>{
    return (
        <>
        
        <Container fluid>
            <Row>
                <Col sm={12} md={12}>
                <Carousel  >
      <CarouselItem>
        <img src={banner1} className='d-block w-100' alt='...' />
      </CarouselItem>
      <CarouselItem>
        <img src={banner2} className='d-block w-100' alt='...' />
      </CarouselItem>
      <CarouselItem>
        <img src={banner3} className='d-block w-100' alt='...' />
      </CarouselItem>
    </Carousel>
                </Col>
            </Row>

        </Container>
        
        </>
    )
}

export default BannerComponent;