import { Button, Navbar } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ThemeContext } from '../../../config/theme.config'
import { useDispatch } from 'react-redux'
import { logouts } from '../../../reducer/user.reducer'
const CmsHeader=()=>{

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {theme,toggleTheme}=useContext(ThemeContext)

    const sidebarToggle=(e)=>{
        e.preventDefault()
        document.body.classList.toggle('sb-sidenav-toggled')
      
    }

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
                dispatch(logouts())
                navigate('/login')
            }
          });
  
    }

    return(
     <>
          <Navbar className={`sb-topnav`} bg={theme} variant={theme}>
            <Navbar.Brand className='ps-3' href='/admin'>
                Admin Panel
            </Navbar.Brand>
            <Button  onClick={sidebarToggle} size='sm' variant='link' className='order-1 order-lg-0 me-4 me-lg-0'>
            <i className={`fas fa-bars text-${theme === 'light'? 'dark':'light'}`}></i>
            </Button>
            <Button onClick={toggleTheme}  size="sm" variant='link' className={`text-${theme === 'light'? 'dark':'light'}`}>
                <i className='fas fa-moon'></i>
            </Button>
            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>

               <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        {/* <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li> */}
                        <li><a onClick={logout} className="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </Navbar>
    </>
    )
}

export default CmsHeader;