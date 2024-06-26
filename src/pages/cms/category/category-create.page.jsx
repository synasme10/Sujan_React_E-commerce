import { Card,Container,Row,Col,CardBody,CardFooter,Form,Image, Button } from "react-bootstrap";
import AdminBreadCrumb from "../../../component/cms/breadcrumb/breadcrumb.component";

import { NavLink, useNavigate } from "react-router-dom";
import { ImageUploaderComponent, SelectDropDownComponent, TextInputComponent, URLInputComponent } from "../../../component/common/form/input.component";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import categorySvc from "./category.service";
import { toast } from "react-toastify";

const AddCategory=()=>{


    const categoryRules=Yup.object({
        title:Yup.string().required("Title is required").min(2,"Title should be atlease 4 character long"), 
        // subCategory:Yup.string().required("Sub Category is required"),
        status:Yup.object({
            label:Yup.string().matches(/^(Publish|Un-Publish)$/,"Status should be either Publish or Unpublish"),
            value:Yup.string().matches(/^(active|inactive)$/,"value should be either active or inactive"),
        },"Status should be provided").required("Select Status")
        // image:Yup.string().required(),
    })

    const navigate=useNavigate();
    const [thumb, setThumb] = useState();
    const [loading,setLoading]=useState(false);
    const {control,handleSubmit,setError,setValue,formState:{errors}}=useForm({
        resolver:yupResolver(categoryRules)
    });

    const submitForm=async(data)=>{
        try{
            setLoading(true);
            const formattedData={
                ...data,
                status:data.status.value
            }

            const response=await categorySvc.postCategorys(formattedData)
            toast.success(response?.message)
            navigate('/admin/category')
       
            

        }catch(exception){
            console.log(exception)
            toast.error("category cannot be created")
        }finally{
            setLoading(false)
        }
    }


    return(
        <>
        <div className="container-fluid px-4">
                <h1 className="mt-4">Add category</h1>

                <AdminBreadCrumb
                    data={
                        [
                            {
                                title:"Home",
                                link:"/"
                            },
                            {
                                title:"Dashboard",
                                link:"/admin"
                            },
                          
                            {
                            title:"category List",
                            link:"/admin/category"
                            },
                            {
                                title:"Add category",
                                link:null
                                }
                    ]
                    }
                />

                <Card className="mb-4">
                    <Card.Header>
                        <Container>
                            <Row>
                                <Col sm={12} md={6}>
                                <h4>
                                    category List
                                </h4>
                                </Col>
                                <Col sm={12} md={6}>
                                    <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/category/create">
                                        <i className="fa fa-plus"></i>&nbsp; Add category
                                    </NavLink>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Header>
                    <CardBody>
                        <Form onSubmit={handleSubmit(submitForm)}>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Category:</Form.Label>
                                <Col sm={9}>
                                    <TextInputComponent
                                    name={'title'}
                                    control={control}
                                    errMsg={errors?.title?.message}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Status:</Form.Label>
                                <Col sm={9}>
                                    <SelectDropDownComponent
                                    name={'status'}
                                    control={control}
                                    isMultiple={false}
                                    errMsg={errors?.status?.message}
                                    options={
                                        [
                                        {value:"active",label:"Publish"},
                                        {value:"inactive",label:"Un-Publish"},
                                        ]
                                    }
                                    setValue={setValue}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Image: </Form.Label>
                                <Col sm={7}>
                                    <ImageUploaderComponent
                                        name={"image"}
                                        control={control}
                                        errMsg={errors?.image?.message}
                                        setError={setError}
                                        setValue={setValue}
                                        setThumb={setThumb}
                                    />
                                   
                                </Col>
                                <Col sm={2}>
                                    <Image fluid alt="thumbnail"
                                        src={thumb ? URL.createObjectURL(thumb) : 'https://placehold.co/600x200/dddddd/000000?text=Hello+World'} />
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Col sm={{ span: 9, offset: 3 }}>
                                    <Button disabled={loading} variant="danger" type="reset" size="sm" className="me-1">
                                        <i className='fa fa-trash'></i>Cancel
                                    </Button>

                                    <Button disabled={loading} variant="success" type="submit" size="sm" className="me-1">
                                        <i className='fa fa-plane'></i>Send
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </CardBody>
                    <CardFooter>

                    </CardFooter>
                </Card>
               
            </div>
        </>
    )
}

export default AddCategory;