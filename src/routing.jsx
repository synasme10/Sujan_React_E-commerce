import { Routes,Route, BrowserRouter } from "react-router-dom";


import AboutusComponent from "./component/fe/aboutus/aboutus.component";
import HomePageLayout from "./pages/layout/home.layout";
import Adminlayout from "./pages/layout/admin.layout";

import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/auth/login/login.page";
import RegisterPage from "./pages/auth/register/register.page";
import DashboardPage from "./pages/cms/dashboard/dashboard.page";
import BrandDetailPage from "./pages/brand/brand-detail.page";
import RenewPasswordPage from "./pages/auth/forgotpassword/forgotpassword.page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Error404 from "./pages/error/Error404.page";

import ActivatePage from "./pages/auth/activate/activate.page";
import CheckPermission from "./config/permission.config";
import VerifyForgotPage from "./pages/auth/forgotpassword/verifyforgetpw.page";
import { BannerList,AddBanner,EditBanner } from "./pages/cms/banner";
import { BrandList,AddBrand,EditBrand } from "./pages/cms/brand";
import { ProductList,AddProduct,EditProduct } from "./pages/cms/product";
import { CategoryList,AddCategory,EditCategory } from "./pages/cms/category";
import UserList from "./pages/cms/users/user-list.page";
import { ThemeProvider } from "react-bootstrap";
import { ThemeProviders } from "./config/theme.config";
import CategoryDetailPage from "./pages/category/category-detail.page";
import ProductDetailpage from "./pages/product/product-detail.page";

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
              <Route path="activate/:token" element={<ActivatePage/>}></Route>
              <Route path="forget-password" element={<RenewPasswordPage/>}></Route>
              <Route path="reset-password/:token" element={<VerifyForgotPage/>}></Route>
              <Route path="brand/:slug" element={<BrandDetailPage/>}></Route>
              <Route path="category/:slug" element={<CategoryDetailPage/>}></Route>
              <Route path="product/:slug" element={< ProductDetailpage/>}></Route>
              <Route path="about-us" element={<AboutusComponent/>}></Route>          
              <Route path="*" element={<Error404 goBackUrl={"/"} name={"Home Page"}/>}/>
            </Route>

            <Route path="/admin" element={<CheckPermission accessBy={"admin"}>
               <Adminlayout/>
              </CheckPermission>}>
              <Route index element={<DashboardPage/>}></Route>
              <Route path="banner" element={<BannerList/>}></Route>
              <Route path="banner/create" element={<AddBanner/>}></Route>
              <Route path="banner/:id" element={<EditBanner/>}></Route>

              <Route path="brand" element={<BrandList/>}></Route>
              <Route path="brand/create" element={<AddBrand/>}></Route>
              <Route path="brand/:id" element={<EditBrand/>}></Route>

              <Route path="product" element={<ProductList/>}></Route>
              <Route path="product/create" element={<AddProduct/>}></Route>
              <Route path="product/:id" element={<EditProduct/>}></Route>

              <Route path="users" element={<UserList/>}></Route>
              
              <Route path="category" element={<CategoryList/>}></Route>
              <Route path="category/create" element={<AddCategory/>}></Route>
              <Route path="category/:id" element={<EditCategory/>}></Route>
              <Route path="*" element={<Error404 goBackUrl={"/admin"} name={"Admin Page"}/>}/>
            
            </Route>
        </Routes>
     </BrowserRouter>
     </>
        
    )
}

export default Routings;