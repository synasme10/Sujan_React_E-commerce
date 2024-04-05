import React from "react";
import SidebarItem from "./sidebar-menu-item.component";

const CmsSidebar=()=>{

    const loggedInUser={
        name:"Sujan Maharjan"
    }
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
                url:"/admin"
            }
        ]
        },
        {
            name:"Core Features",
            items:[
                {
                    name:"Banner Manager",
                    icon:"fa-images",
                    url:"/admin/banner"
                },
                {
                    name:"Brand Manager",
                    icon:"fa-barcode",
                    url:"/admin/brand"
                },
                {
                    name:"Category Manager",
                    icon:"fa-sitemap",
                    url:"/admin/category"
                },
                {
                    name:"User Manager",
                    icon:"fa-users",
                    url:"/admin/users"
                },
                {
                    name:"Products Manager",
                    icon:"fa-basket-shopping",
                    url:"/admin/products"
                },
                {
                    name:"Order Manager",
                    icon:"fa-shopping-cart",
                    url:"/admin/order"
                }
                ]
        },
        {
            name:"Add On Features",
            items:[
                {
                name:"Transactions Manager",
                icon:"fa-receipt",
                url:"/admin/transactions"
            },
             {
                name:"Blogs Manager",
                icon:"fa-newspaper",
                url:"/admin/blogs"
            },
            {
                name:"Tags Manager",
                icon:"fa-tag",
                url:"/admin/tags"
            },
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
                <nav className={`sb-sidenav accordion sb-sidenav-dark`} id="sidenavAccordion">
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

export default CmsSidebar;