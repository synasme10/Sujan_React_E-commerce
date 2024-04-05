import { Col, Container, Row } from "react-bootstrap";

const AboutusComponent=()=>
{
    return(<>

    <Container fluid className="bg-body-tertiary" bg="warning">
        <Row>
       
            <Col sm={12} className="bg-body-tertiary" bg="dark">
                <h1 className="text-center">About Us</h1>
            </Col>
        </Row>

    </Container>
    </>)
}

export default AboutusComponent;