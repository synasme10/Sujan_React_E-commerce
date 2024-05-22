import { Badge, Card, CardBody, CardFooter, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import AdminBreadCrumb from "../../../component/cms/breadcrumb/breadcrumb.component";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../component/common/loading/loading.component";
import productSvc from "./product.service";

import TableStatus from "../../../component/cms/table/table-status.component";
import TableAction from "../../../component/cms/table/table-actions.component";
import { toast } from "react-toastify";
import TableImage from "../../../component/cms/table/table-image.component";

const ProductList = () => {


    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    let [pageNo,setPageNo]=useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 15,
        noOfPages: 1
     
    })

    const getAllProducts = async (config) => {
        try {
            const productresult = await productSvc.listAllProducts(config);
            console.log()
            setData(productresult.result)
            let pageNo= 15;
            //first 1 => limit 10 
            //1 dekhi 10 samma
            //2 =>//11-20
            //3 =>//21-30

            pageNo=((+productresult.meta.currentPage-1)*productresult.meta.limit)+1;
            setPageNo(pageNo);
            setPagination({
                total: productresult.meta.total,
                page: productresult.meta.currentPage,
                limit: productresult.meta.limit,
                //math.ceil if calculation decimal ayo bhane
                noOfPages: Math.ceil(productresult.meta.total/productresult.meta.limit)
            })
        } catch (exception) {
            console.log(exception)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllProducts({ page: 1, limit: 15, search: null })
    }, [])


    //eta ko id aunxa from table actions
    const deleteData = async (id) => {
        try {
            const response = await productSvc.deleteById(id)
            getAllProducts({ page: 1, limit: 15, search: null })
            toast.success("Product Deleted Successfully")
        } catch (exception) {
            toast.error("Product cannot be deleted at this moment")
            console.log(exception)
        }

    }
    console.log(pageNo)
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Product List</h1>
                {/* {TODO:Dynamic Control} */}
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
                                title: "Product List",
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
                                        Product List
                                    </h4>
                                </Col>
                                <Col sm={12} md={6}>
                                    <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/product/create">
                                        <i className="fa fa-plus"></i>&nbsp; Add Product
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
                                    <th>Tagline</th>
                                    <th>Image</th>
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
                                            //data array ma cha so data cha ra data ko point gareko lenght should be greater than o
                                            data && data.length ? <>
                                                {
                                                    data.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{pageNo++}</td>
                                                            <td>{row.title}</td>
                                                            <td>{row.tagline}</td>
                                                            <td> 
                                                                <TableImage image={row.image}/>
                                                                {/* <img src={`${import.meta.env.VITE_IMAGE_URL}/${row.image}`} alt="" className="img img-fluid product-small"/>   */}
                                                                {/* <img src={product1} alt="" className="img img-fluid product-small" />
                                                                {row.image} */}
                                                            </td>
                                                            <td>
                                                                <TableStatus status={row.status} />

                                                            </td>
                                                            <td className="text-center">
                                                                <TableAction
                                                                    deleteAction={deleteData}
                                                                    id={row._id}
                                                                    editUrl={"/admin/product/"+row._id}
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
                                                 getAllProducts({ page: 1, limit: pagination.limit, search: null })
                                            }}/>
                                            <Pagination.Prev onClick={(e)=>{
                                                 getAllProducts({ page: (+pagination.page-1), limit: pagination.limit, search: null })
                                            }} />

                                        </> : <></>
                                    }
                                    {
                                      Array(pagination.noOfPages).fill(null).map((val,ind) => (
                                        <Pagination.Item onClick={(e)=>{
                                            getAllProducts({ page: ind+1, limit: pagination.limit, search: null })
                                       }}active={(pagination.page === (ind+1)) ? true : false} key={ind}>{ind+1}</Pagination.Item>
                                     
                                    ))
                                    }
                                    {
                                        pagination.page !== pagination.noOfPages ? <>
                                            <Pagination.Next onClick={(e)=>{
                                                //+ kina gareko bhanda kaile kai string set bhairako hunxa tesaile
                                                 getAllProducts({ page: (+pagination.page+1), limit: pagination.limit, search: null })
                                            }} />
                                            <Pagination.Last onClick={(e)=>{
                                                 getAllProducts({ page: pagination.noOfPages, limit: pagination.limit, search: null })
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

export default ProductList;

