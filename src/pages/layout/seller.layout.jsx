
import '../../assets/css/admin.css'


import { Outlet } from 'react-router-dom'
import CmsHeader from '../../component/cms/header/cms-header.component'
import CmsFooter from '../../component/cms/footer/cms-footer.component'

import { useSelector } from 'react-redux'
import FeFooter from '../../component/fe/footer/footer.component'
import SellerSideBar from '../seller/sellerpanel/seller-sidebar.component'

const Sellerlayout =()=>{
    let loggedInUser=useSelector((root)=>{

        return root?.User?.user
    })


    return(
        <>
        <CmsHeader/>

        <div id="layoutSidenav">
            {
                loggedInUser?.role==='seller'? <SellerSideBar />:<></>
            }
           
            <div id="layoutSidenav_content">
                <main>
                   <Outlet/>
                </main>
                <CmsFooter/>
            </div>
        </div>
       <FeFooter/>
        </>
    )
}

export default Sellerlayout;