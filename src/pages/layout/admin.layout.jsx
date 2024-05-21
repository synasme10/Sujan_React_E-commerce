
import '../../assets/css/admin.css'


import { Outlet } from 'react-router-dom'
import CmsHeader from '../../component/cms/header/cms-header.component'
import CmsFooter from '../../component/cms/footer/cms-footer.component'
import CmsSidebar from '../../component/cms/sidebar/cms-sidebar.component'



const Adminlayout =()=>{
    const loggedInUser=JSON.parse(localStorage.getItem("_ud")) || null

 
    // let loggedInUser={
    //     name:"Sujan Maharjan",
    //     role:"admin"
    // }
  
    return(
        <>
        <CmsHeader/>

        <div id="layoutSidenav">
            {
                loggedInUser.role==='admin'? <CmsSidebar />:<></>
            }
           
            <div id="layoutSidenav_content">
                <main>
                   <Outlet/>
                </main>
                <CmsFooter/>
            </div>
        </div>
       
        </>
    )
}

export default Adminlayout;