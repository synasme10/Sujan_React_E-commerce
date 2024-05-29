import React, { useContext } from "react";
import { ThemeContext } from "../../../config/theme.config";
import SidebarItem from "../../../component/cms/sidebar/sidebar-menu-item.component";

const SellerSideBar=()=>{

    const loggedInUser=JSON.parse(localStorage.getItem("_ud")) ||null;
    const {theme}=useContext(ThemeContext)

    // const theme=localStorage.getItem("_tm")
    console.log("i am them",{theme})

    // const loggedInUser={
    //     name:"Sujan Maharjan"
    // }
    
    const sidebarItems=[
       {
            name:"",
            items:[
                {
                name:"Home",
                icon:"fa-home",
                url:"/"
            }
            ,
            {
                name:"Dashboard",
                icon:"fa-tachometer-alt",
                url:"/seller"
            }
        ]
        },
        {
            name:"Core Features",
            items:[
                {
                    name:"Brand Manager",
                    icon:"fa-barcode",
                    url:"/seller/brand"
                },
                {
                    name:"Category Manager",
                    icon:"fa-sitemap",
                    url:"/seller/category"
                },
              
                {
                    name:"Products Manager",
                    icon:"fa-basket-shopping",
                    url:"/seller/product"
                },
                {
                    name:"Order Manager",
                    icon:"fa-shopping-cart",
                    url:"/seller/order"
                }
                ]
        },
        {
            name:"Add On Features",
            items:[
            {
                name:"Offers Manager",
                icon:"fa-gifts",
                url:"/admin/offers"
            },
            {
                name:"Promocode Manager",
                icon:"fa-bullhorn",
                url:"/admin/promocode"
            }
        ]
        }
 
    
]   

    return(
        <>
           <div id="layoutSidenav_nav">
                <nav className={`sb-sidenav accordion sb-sidenav-`+theme} id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            {
                                sidebarItems.map((menuList,ind)=>(
                                    
                                    <React.Fragment key={ind}>
                                        {
                                            menuList.name? <div className="sb-sidenav-menu-heading">{menuList.name}</div>:''
                                        }
                                        {
                                            menuList.items.map((item,index)=>(
                                               
                                                    <SidebarItem 
                                                    key={index}
                                                    url={item.url}
                                                    icon={item.icon}
                                                    name={item.name}
                                                 /> 
                                                 
                                            ))
                                        }
                                    </React.Fragment>
                                ))
                            }
                           
                          

                            
        
                          
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {loggedInUser?.name}
                    </div>
                </nav>
            </div>
        </>
    )
}

export default SellerSideBar;