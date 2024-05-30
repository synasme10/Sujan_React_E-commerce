import { Container, Row, Col, Image, Nav, Navbar } from "react-bootstrap";
import logo1 from "../../../assets/images/logo1.png"
import facebook from "../../../assets/images/social_media/facebook.png"
import instagram from "../../../assets/images/social_media/instagram.png"
import twitter from "../../../assets/images/social_media/twitter.png"
import youtube from "../../../assets/images/social_media/youtube.png"

import { useContext } from "react";
import { ThemeContext } from "../../../config/theme.config";
import { NavLink } from "react-router-dom";

const FeFooter = () => {


    const { theme } = useContext(ThemeContext)
    return (
        <>
       
        
            <Container fluid className="bg-body-tertiary mt-4" bg={theme} data-bs-theme={theme} >
                <Row className="py-5 px-5">
                    <Col className={`text-${theme === 'light' ? 'dark' : 'light'}`} >
                        <div className="mx-5">
                            <Image
                                src={logo1}
                                alt="logo"
                                rounded
                                width={200}
                                height={150}
                            />
                            <h2>Ranga Nepal</h2>
                            <p>Focused on quality shopping</p>
                        </div>
                    </Col>
                    <Col className="" >
                        <Nav className="flex-column fs-5 text-size-sm mx-5 px-5" bg={theme} data-bs-theme={theme}>

                            <Nav.Item>
                                <NavLink className="nav-links" to="/">Home</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className="nav-links" to="/">About Us</NavLink>
                            </Nav.Item>
                        </Nav>

                    </Col>
                    <Col className={`text-${theme === 'light' ? 'dark' : 'light'}`}>
                        <h4>Contact us!</h4>
                        <p>Sujanmaharjan8888@gmail.com</p>
                        <p>+977 9849248922</p>
                        <p>Copyright © All Rights Reserved, 2024</p>
                        <span>
                            <Row className="float-start mt-2">
                           
                                <Col > 
                                   <NavLink to="https://www.facebook.com/profile.php?id=100086681623265" target="_blank">
                                   <Image
                                        src={facebook}
                                        
                                        alt="facbook-logo"
                                        rounded
                                        width={30}
                                        height={30}
                                    />
                                    </NavLink> 
                                </Col>
                                
                                <Col > 
                                   <NavLink to="https://www.instagram.com/ranga_print/" target="_blank">
                                   <Image
                                        src={instagram}
                                        
                                        alt="instagram-logo"
                                        rounded
                                        width={30}
                                        height={30}
                                    />
                                    </NavLink> 
                                </Col>
                                <Col> 
                                   <NavLink to="https://x.com/" target="_blank">
                                   <Image
                                        src={twitter}
                                        
                                        alt="Twitter-logo"
                                        rounded
                                        width={30}
                                        height={30}
                                    />
                                    </NavLink> 
                                </Col>
                                <Col>
                                   <NavLink to="https://www.youtube.com/" target="_blank">
                                   <Image
                                        src={youtube}
                                        
                                        alt="youtube-logo"
                                        rounded
                                        width={30}
                                        height={30}
                                    />
                                    </NavLink> 
                                </Col>
                            </Row>

                        </span>
                    </Col>


                </Row>
            </Container>
           
            </>
    )
}

export default FeFooter;