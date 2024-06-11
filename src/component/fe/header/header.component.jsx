
import { useCallback, useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, Button, Image } from "react-bootstrap";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2'
import authsvc from "../../../pages/auth/auth.service";
import { ThemeContext } from "../../../config/theme.config";
import { useDispatch, useSelector } from "react-redux";
import cartSvc from "../../../pages/cms/cart/cart.service";
import logo1 from "../../../assets/images/logo1.png"
import brandSvc from "../../../pages/cms/brand/brand.service";
import categorySvc from "../../../pages/cms/category/category.service";
import {logouts} from '../../../reducer/user.reducer'

const FeHeader = () => {

  const dispatch=useDispatch();

  const navigate=useNavigate();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [query, setQuery] = useSearchParams();

  const { theme, toggleTheme } = useContext(ThemeContext)

  const loggedInUser = useSelector((root) => {
    return root?.User?.user;
  });

  let totalCount = useSelector((root) => {
    return root?.Cart?.total || 0
  });

  const getAllBrands = async (config) => {
    try {
        const brandresult = await brandSvc.listAllBrands(config);
        console.log()
        setBrand(brandresult.result)
        
    } catch (exception) {
        console.log(exception)
    } 
}

const getAllCategorys = async (config) => {
  try {
      const categoryresult = await categorySvc.listAllCategorys(config);
      console.log()
      setCategory(categoryresult.result)
      
  } catch (exception) {
      console.log(exception)
  } 
}

  useEffect(()=>{
    const token=localStorage.getItem("_au")|| null;
    if(token){
      getAllBrands({ page: 1, limit: 15, search: null })
      getAllCategorys({ page: 1, limit: 15, search: null })
    }

    
  },[])


  const logout = (e) => {
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
        // localStorage.removeItem("_au")
        // localStorage.removeItem("_ud")
        dispatch(logouts())
        navigate('/login')
      }
    });

  }

  return (
    <Navbar expand={"lg"} className="bg-body-tertiary" bg={theme} data-bs-theme={theme}>
      <Container fluid>
        <Navbar.Brand >
          <NavLink className="nav-link" to="/">  <Image
            src={logo1}

            alt="logo"
        
            width={70}
            height={50}
          /> 
          </NavLink>
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
              {
                brand && brand.map((brand,ind)=>(
                  <NavLink className={"dropdown-item"} key={ind} to={"/brand/"+brand.slug}>{brand.title}</NavLink>
                ))
              }
            </NavDropdown>

            <NavDropdown title="Category" id="baisc-nav-dropdown">
            {
                category && category.map((cat,ind)=>(
                  <NavLink className={"dropdown-item"} key={ind} to={"/category/"+cat.slug}>{cat.title}</NavLink>
                ))
              }
            </NavDropdown>
          
          </Nav>
          <Form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault() }}>
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
         
          </Form>

          <Nav>
            
            {
              loggedInUser ? <>
              <Nav.Item>
              <NavLink className="nav-link" to="/cart">
                Cart({totalCount || 0})
              </NavLink>
            </Nav.Item>
                <Nav.Item>
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
          <Button onClick={toggleTheme} size="sm" variant='link' className={`text-${theme === 'light' ? 'dark' : 'light'}`}>
            <i className='fas fa-moon'></i>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default FeHeader;