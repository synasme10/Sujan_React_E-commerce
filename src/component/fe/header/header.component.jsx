
import { Navbar, Container, Nav ,NavDropdown, Form, Button} from "react-bootstrap";
import { NavLink, useSearchParams } from "react-router-dom";

const FeHeader=()=>{

  const [query,setQuery]=useSearchParams();
    return(
      <Navbar expand={"lg"} className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand >
        <NavLink className="nav-link" to="/">MyShop </NavLink> 
        </Navbar.Brand>
        <Navbar.Toggle
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#menu">
        </Navbar.Toggle>
    <Navbar.Collapse id="menu">
    <Nav className="me-auto mb-2 mb-lg-0">
      <Nav.Item>
        <NavLink className="nav-link" to="/">Home</NavLink>
     </Nav.Item>
     <Nav.Item>
       <NavLink className="nav-link" to="/about-us">About Us</NavLink>
      </Nav.Item>
      <NavDropdown title="Brand" id="brand-dropdown">
        <NavLink className={"dropdown-item"} to="/brand/apple">Apple</NavLink>
        <NavLink className={"dropdown-item"} to="/brand/lg">LG</NavLink>
        <NavLink className={"dropdown-item"} to="/brand/samsung">Samsung</NavLink>
        
   
      </NavDropdown>
        {/* <Nav.Item>
        <NavLink className="nav-link" to="#">Disabled</NavLink>
        </Nav.Item> */}
      </Nav>
        <Form className="d-flex" role="search">
        <Form.Control
          type="search"
          className="me-2" 
          placeholder="Search"
          name="q"
          onChange={(e)=>{
            const type=  e.target.value
            setQuery({q:type})
          }}
          />
        {/* <Button variant="outline-success" type="submit">
        Search </Button> */}
        </Form>
        <Nav>
          <Nav.Item>
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="register">Register</NavLink>
         </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      </Container>
   </Navbar> 
    )
}

export default FeHeader;