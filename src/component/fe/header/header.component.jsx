
import { useCallback, useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2'
import authsvc from "../../../pages/auth/auth.service";
import { ThemeContext } from "../../../config/theme.config";
import { useSelector } from "react-redux";
import cartSvc from "../../../pages/cms/cart/cart.service";

const FeHeader = () => {

  // const[loggedInUser,setLoggedInUser]=useState();
  // const navigate=useNavigate();
  const [query, setQuery] = useSearchParams();
  const {theme,toggleTheme}=useContext(ThemeContext)
  const [totalCount,setTotalCount]=useState();

  //root is central store data stored in store page
  const loggedInUser=useSelector((root)=>{
    return root?.User?.user;
  });

  const getCartDetail=useCallback(async()=>{
      try{
        const response=await cartSvc.getMyCart()
        setTotalCount(response?.meta?.totalCount)
      }catch(exception){
        console.log(exception)
      }
  },[])

  useEffect(()=>{
    let token=localStorage.getItem("_au")||null;
    if(token){
      getCartDetail()
    }
  },[])
  // const loggedInUser = JSON.parse(localStorage.getItem("_ud")) || null;
  //store data from one component that can be shared with other component- Redux ,alternative of Redux localStorage


  //eslai redux le hatayo 
  // const getLoggedInUser=async()=>{
  //   try{
  //     const response=await authsvc.getLoggedInUserDetail()
  //     // console.log(response)
  //     setLoggedInUser(response.result)

  //   }catch(exception){

  //   }
  // }
    
  // useEffect(()=>{
  //   if(localStorage.getItem("_au")){
  //     getLoggedInUser()
  //   }
  // },[])

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
                navigate('/login')
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

            <NavDropdown title="Category" id="baisc-nav-dropdown">
              <NavLink  className={"dropdown-item"} to="/category/clothing">Clothings</NavLink>
              <NavLink  className={"dropdown-item"} to="/category/smart-phone">Smartphone</NavLink>
             
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
              <Nav.Item>
                <NavLink className="nav-link" to="/cart">
                  Cart({totalCount|| 0})
                </NavLink>
              </Nav.Item>
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