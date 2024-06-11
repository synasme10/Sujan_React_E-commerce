import { Container,Col, Row, CarouselItem,Carousel } from "react-bootstrap";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";
import { useEffect, useState } from "react";
import bannerSvc from "../../../pages/cms/banner/banner.service";



const BannerComponent =()=>{

  const [bannerData, setBannerData]=useState();
  const getBannerDetail=async()=>{
    try{
      const response=await bannerSvc.getBannerForHomePage();
      setBannerData(response.result)
      // console.log(response)
    }catch(exception){
      console.log(exception)
    }
  }
  
  useEffect(()=>{
    getBannerDetail()
  },[])

  const showPlaceholder=(e)=>{
    e.target.src="https://placehold.co/2000x500"
}
    return (
        <>
        
        
            <Row>
                <Col sm={12} md={12}>
             <Carousel>
                <CarouselItem>
                  <img onError={showPlaceholder} src={banner1} className='d-block w-100' alt='...' />
                </CarouselItem>
                <CarouselItem>
                  <img onError={showPlaceholder} src={banner2} className='d-block w-100' alt='...' />
                </CarouselItem>
                <CarouselItem>
                  <img onError={showPlaceholder} src={banner3} className='d-block w-100' alt='...' />
                </CarouselItem>
                </Carousel>

           {
              // bannerData?<>
              //   <Carousel  >
            
              //   {
              //   bannerData.map((banner,ind)=>(
              //     <CarouselItem key={ind}>
              //       <a target="_banner" href={banner.url}> 
              //     {/* <img onError={showPlaceholder} src={import.meta.env.VITE_IMAGE_URL+'/'+banner.image} className='d-block w-100' alt='...' /> */}
              //     <img onError={showPlaceholder} src={banner1} className='d-block w-100' alt='...' />
              //     </a>
              //   </CarouselItem>
              //   ))
              // }
              // </Carousel>
              // </>:<></>
           }
     
    
                </Col>
            </Row>

        
        
        </>
    )
}

export default BannerComponent;