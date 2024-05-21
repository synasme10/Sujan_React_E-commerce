import { Container,Row, Col } from "react-bootstrap";

const Error404=({goBackUrl,name})=>{
    return(<>
        <Container className="my-5">
            <Row className="bg-danger-subtle p-3 mx-3">
                <Col sm={12} md={{offset:2, span:8}} className="p-3 text-center text-danger">
                    OOps! The page/resource you loking is unavailable at the moment
                    <p>Go Back to</p>
                    <a href={goBackUrl} className="btn btn-link">
                        {
                            name
                        }
                    </a>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Error404;