import { Badge, Card, CardBody, CardFooter, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import AdminBreadCrumb from "../../../component/cms/breadcrumb/breadcrumb.component";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../component/common/loading/loading.component";
import userSvc from "./user.service";

import TableStatus from "../../../component/cms/table/table-status.component";
import TableAction from "../../../component/cms/table/table-actions.component";
import { toast } from "react-toastify";
import TableImage from "../../../component/cms/table/table-image.component";

const UserList = () => {


    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [customer,setCustomer]=useState(true);
   

    const getAllUsers = async (config) => {
        try {
            const userresult = await userSvc.listAllUsers(config);
            console.log(userresult)
            setData(userresult.result)
           
        } catch (exception) {
            console.log(exception)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllUsers({role:"customer"})
    }, [])


 
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">User List</h1>
              
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
                                title: "User List",
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
                                        User List
                                    </h4>
                                </Col>
                                <Col sm={12} md={6}>
                                    <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/user/create">
                                        <i className="fa fa-plus"></i>&nbsp; Add User
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
                                            
                                            data && data.length ? <>
                                                {
                                                    data.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{pageNo++}</td>
                                                            <td>{row.title}</td>
                                                            <td>{row.tagline}</td>
                                                            <td> 
                                                                <TableImage image={row.image}/>
                                                                {/* <img src={`${import.meta.env.VITE_IMAGE_URL}/${row.image}`} alt="" className="img img-fluid user-small"/>   */}
                                                                {/* <img src={user1} alt="" className="img img-fluid user-small" />
                                                                {row.image} */}
                                                            </td>
                                                            <td>
                                                                <TableStatus status={row.status} />

                                                            </td>
                                                            <td className="text-center">
                                                                <TableAction
                                                                    deleteAction={deleteData}
                                                                    id={row._id}
                                                                    editUrl={"/admin/user/"+row._id}
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
                    </CardBody>
                
                </Card>

            </div>
        </>
    )
}

export default UserList;

