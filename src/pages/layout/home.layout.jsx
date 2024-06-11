import { Outlet } from "react-router-dom";
import FeFooter from "../../component/fe/footer/footer.component";
import FeHeader from "../../component/fe/header/header.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { sayHello } from "../../reducer/user.reducer";


const HomePageLayout=()=>{  


  return(
        <>
           <FeHeader/>
             <Outlet/>
           <FeFooter/>

        </>
    )
}

export default HomePageLayout;