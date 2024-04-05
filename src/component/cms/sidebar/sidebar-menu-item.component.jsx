const SidebarItem=({url,icon,name})=>{
    return(
        <>
         <a className="nav-link" href={url}>
            <div className="sb-nav-link-icon">
              <i className={`fa ${icon}`}></i></div>
                {name}
        </a>
        </>
    )
}

export default SidebarItem;