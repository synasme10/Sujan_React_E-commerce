import { Routes,Route, BrowserRouter } from "react-router-dom";


import AboutusComponent from "./component/fe/aboutus/aboutus.component";
import HomePageLayout from "./pages/layout/home.layout";
import Adminlayout from "./pages/layout/admin.layout";

import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/auth/login/login.page";
import RegisterPage from "./pages/auth/register/register.page";
import DashboardPage from "./pages/cms/dashboard/dashboard.page";
import BrandDetailPage from "./pages/brand/brand-detail.page";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Routings=()=>{
    return (
      <>
      <ToastContainer theme="colored"/>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePageLayout/>}>
              <Route index element={<HomePage/>}></Route> 

              {/* <Route path="chat"></Route> */}
              <Route path="login" element={<LoginPage/>}></Route> 
              <Route path="register" element={<RegisterPage/>}></Route> 
              <Route path="brand/:slug" element={<BrandDetailPage/>}></Route>
              <Route path="about-us" element={<AboutusComponent/>}></Route>              
            </Route>

            <Route path="/admin" element={<Adminlayout/>}>
              <Route index element={<DashboardPage/>}></Route>
            
            </Route>
        </Routes>
     </BrowserRouter>
     </>
        
    )
}

export default Routings;