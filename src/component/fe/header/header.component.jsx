
import { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { NavLink, useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2'
import authsvc from "../../../pages/auth/auth.service";
import { ThemeContext } from "../../../config/theme.config";

const FeHeader = () => {

  const[loggedInUser,setLoggedInUser]=useState();
  const [query, setQuery] = useSearchParams();
  

  const {theme,toggleTheme}=useContext(ThemeContext)
  // const loggedInUser = JSON.parse(localStorage.getItem("_ud")) || null;
  //store data from one component that can be shared with other component- Redux ,alternative of Redux localStorage

  const getLoggedInUser=async()=>{
    try{
      const response=await authsvc.getLoggedInUserDetail()
      // console.log(response)
      setLoggedInUser(response.result)

    }catch(exception){

    }
  }
    
  useEffect(()=>{
    if(localStorage.getItem("_au")){
      getLoggedInUser()
    }
  },[])

  const logout=(e)=>{
    e.preventDefault()
    Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("_au")
            localStorage.removeItem("_ud")
            navigate('/')
        }
      });

}

// console.log(loggedInUser)
  return (
    <Navbar expand={"lg"} className="bg-body-tertiary" bg={theme} data-bs-theme={theme}>
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
          <Form className="d-flex" role="search" onSubmit={(e)=>{e.preventDefault()}}>
            <Form.Control
              type="search"
              className="me-2"
              placeholder="Search"
              name="q"
              onChange={(e) => {
                const type = e.target.value
                setQuery({ q: type })
              }}
            />
            {/* <Button variant="outline-success" type="submit">
        Search </Button> */ }
          </Form>
          
          <Nav>
        
            {
              loggedInUser ? <>
                <Nav.Item>
                  {/* html tag (jsx) bitra javascipt variable {} data dekhauna paryo bhane interpolet garna parxa {} */}
                  
                  <NavLink className="nav-link" to={`/` + loggedInUser?.role}>{loggedInUser?.name}</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink className="nav-link" to="/logout" onClick={logout}>Logout</NavLink>
                </Nav.Item>
              </> : <>
                <Nav.Item>
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink className="nav-link" to="register">Register</NavLink>
                </Nav.Item>
              </>
            }
          
          </Nav>
          <Button onClick={toggleTheme}  size="sm" variant='link' className={`text-${theme === 'light'? 'dark':'light'}`}>
                <i className='fas fa-moon'></i>
            </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default FeHeader;