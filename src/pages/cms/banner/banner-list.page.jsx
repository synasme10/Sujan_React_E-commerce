import { Badge, Card, CardBody, CardFooter, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import AdminBreadCrumb from "../../../component/cms/breadcrumb/breadcrumb.component";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../component/common/loading/loading.component";
import bannerSvc from "./banner.service";
import banner1 from "../../../assets/images/banner1.jpg"
import banner2 from "../../../assets/images/banner2.jpg";
import TableImage from "../../../component/cms/table/table-image.component";
import TableStatus from "../../../component/cms/table/table-status.component";
import TableAction from "../../../component/cms/table/table-actions.component";
import { toast } from "react-toastify";

const BannerList = () => {


    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    let [pageNo,setPageNo]=useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 15,
        noOfPages: 1
     
    })

    const getAllBanners = async (config) => {
        try {
            const bannerresult = await bannerSvc.listAllBanners(config);
            console.log()
            setData(bannerresult.result)
            let pageNo= 15;
           

            pageNo=((+bannerresult.meta.currentPage-1)*bannerresult.meta.limit)+1;
            setPageNo(pageNo);
            setPagination({
                total: bannerresult.meta.total,
                page: bannerresult.meta.currentPage,
                limit: bannerresult.meta.limit,
               
                noOfPages: Math.ceil(bannerresult.meta.total/bannerresult.meta.limit)
            })
        } catch (exception) {
            console.log(exception)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllBanners({ page: 1, limit: 15, search: null })
    }, [])



    const deleteData = async (id) => {
        try {
            const response = await bannerSvc.deleteById(id)
            getAllBanners({ page: 1, limit: 15, search: null })
            toast.success("Banner Deleted Successfully")
        } catch (exception) {
            toast.error("Banner cannot be deleted at this moment")
            console.log(exception)
        }

    }
    console.log(pageNo)
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Banner List</h1>
            
                <AdminBreadCrumb
                    data={
                        [
                            {
                                title: "Home",
                                link: "/"
                            },
                            {
                                title: "Dashboard",
                                link: "/admin"
                            },

                            {
                                title: "Banner List",
                                link: null
                            }]
                    }
                />

                <Card className="mb-4">
                    <Card.Header>
                        <Container>
                            <Row>
                                <Col sm={12} md={6}>
                                    <h4>
                                        Banner List
                                    </h4>
                                </Col>
                                <Col sm={12} md={6}>
                                    <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/banner/create">
                                        <i className="fa fa-plus"></i>&nbsp; Add Banner
                                    </NavLink>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Header>
                    <CardBody>
                        <Table size="sm" striped hover bordered>
                            <thead className="table-dark">
                                <tr>
                                    <th>S.N.</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Link</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <>
                                        <tr>
                                            <td colSpan={6}>
                                                <LoadingComponent />
                                            </td>
                                        </tr>
                                    </> : <>
                                        {
                                         
                                            data && data.length ? <>
                                                {
                                                    data.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{pageNo++}</td>
                                                            <td>{row.title}</td>
                                                            <td> 
                                                                {/* <TableImage image={row.image}/> */}
                                                                {/* <img src={`${import.meta.env.VITE_IMAGE_URL}/${row.image}`} alt="" className="img img-fluid banner-small"/>   */}
                                                                <img src={banner1} alt="" className="img img-fluid banner-small" />
                                                                {row.image}
                                                            </td>

                                                            <td>
                                                                <a href={row.url} target="_banner">
                                                                    {
                                                                        row.url
                                                                    }
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <TableStatus status={row.status} />

                                                            </td>
                                                            <td className="text-center">
                                                                <TableAction
                                                                    deleteAction={deleteData}
                                                                    id={row._id}
                                                                    editUrl={"/admin/banner/"+row._id}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </> : <tr>
                                                <td colSpan={6}>
                                                    <p className="py-1 text-center">No Data Found</p>
                                                </td>
                                            </tr>
                                        }
                                    </>
                                }
                            </tbody>
                            <tfoot>

                            </tfoot>
                        </Table>
                        {
                            pagination? <>
                                <Pagination className="float-end" size="sm">
                                    {
                                        pagination.page !== 1 ? <>
                                            <Pagination.First  onClick={(e)=>{
                                                 getAllBanners({ page: 1, limit: pagination.limit, search: null })
                                            }}/>
                                            <Pagination.Prev onClick={(e)=>{
                                                 getAllBanners({ page: (+pagination.page-1), limit: pagination.limit, search: null })
                                            }} />

                                        </> : <></>
                                    }
                                    {
                                      Array(pagination.noOfPages).fill(null).map((val,ind) => (
                                        <Pagination.Item onClick={(e)=>{
                                            getAllBanners({ page: ind+1, limit: pagination.limit, search: null })
                                       }}active={(pagination.page === (ind+1)) ? true : false} key={ind}>{ind+1}</Pagination.Item>
                                     
                                    ))
                                    }
                                    {
                                        pagination.page !== pagination.noOfPages ? <>
                                            <Pagination.Next onClick={(e)=>{
                                                //+ kina gareko bhanda kaile kai string set bhairako hunxa tesaile
                                                 getAllBanners({ page: (+pagination.page+1), limit: pagination.limit, search: null })
                                            }} />
                                            <Pagination.Last onClick={(e)=>{
                                                 getAllBanners({ page: pagination.noOfPages, limit: pagination.limit, search: null })
                                            }} />
                                        </> : <></>
                                    }
                                </Pagination>
                                </> : <></>
                        }
                    </CardBody>
                
                </Card>

            </div>
        </>
    )
}

export default BannerList;

