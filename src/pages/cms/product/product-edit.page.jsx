import { Card, Container, Row, Col, CardBody, CardFooter, Form, Image, Button } from "react-bootstrap";
import AdminBreadCrumb from "../../../component/cms/breadcrumb/breadcrumb.component";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ImageUploaderComponent, SelectDropDownComponent, TextInputComponent, URLInputComponent } from "../../../component/common/form/input.component";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import productSvc from "./product.service";
import { toast } from "react-toastify";
import brandSvc from "../brand/brand.service";
import categorySvc from "../category/category.service";

const EditProduct = () => {

    const [productDetail, setProductDetail] = useState();
    const params = useParams();
   

    const productRules = Yup.object({
        title: Yup.string().min(2, "Title should be atlease 2 character long").required("Title is required"),
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Un-Publish)$/, "Status should be either Publish or Unpublish"),
            value: Yup.string().matches(/^(active|inactive)$/, "value should be either active or inactive"),
        }, "Status should be provided").required("Select Status")
        // image:Yup.string().required(),
    })

    const navigate = useNavigate();
    const [thumb, setThumb] = useState();
    const [brand, setBrand] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, setError, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(productRules)
    });
   
   

  
    const submitForm =  async(data) => {
        try {

            setLoading(true);
            const formattedData = {
                ...data,
                status: data.status.value,
                category:data.category.value,
                brand:data.brand.value
            }

            console.log(formattedData)
            const response = await productSvc.updateProductsbyID(params.id, formattedData)
            toast.success(response?.message)
            navigate('/admin/product')
            // console.log(response)

            // console.log(data)
        } catch (exception) {
            console.log(exception)
            toast.error("Product cannot be created")
        } finally {
            setLoading(false)
        }
    }

    const getProductDetail = async () => {
        try {
            const response = await productSvc.getProductById(params.id)
            console.log(response)
            setValue('title', response?.result?.title)
            setValue('description', response.result.description)
            setValue('price', response.result.price)
            setValue('discount', response.result.discount)
            setValue('status', {
                label: (response.result.status === "active" ? "Publish" : "Un-Publish"),
                value: response.result.status
            })
            setValue('brand',{
                    label: response.result?.brand?.title,
                    value: response.result.brand._id
            }) 
          
        
            setValue('category',{
                label:response.result.category[0].title,
                value: response.result.category[0]._id
        }) 
           
            // setProductDetail(response.result)
            setThumb(import.meta.env.VITE_IMAGE_URL + '/' + response.result.image)
            
        } catch (exception) {
            console.log(exception)
        }
    }

    const getAllBrands = async (config) => {
        try {
            const brandresult = await brandSvc.listAllBrands(config);
            console.log()
            setBrand(brandresult.result)

        } catch (exception) {
            console.log(exception)
        }
    }

    const getAllCategorys = async (config) => {
        try {
            const categoryresult = await categorySvc.listAllCategorys(config);
            console.log()
            setCategory(categoryresult.result)

        } catch (exception) {
            console.log(exception)
        }
    }


    useEffect(() => {
        getProductDetail()
        let token=localStorage.getItem("_au")||null;
        if(token){
            getAllBrands({ page: 1, limit: 15, search: null })
            getAllCategorys({ page: 1, limit: 15, search: null })
        }
    }, [params])

    // console.log({errors}) check errors
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Edit Product</h1>
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
                                link: "/admin/product"
                            },
                            {
                                title: "Edit Product",
                                link: null
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
                                        product Edit
                                    </h4>
                                </Col>
                                {/* <Col sm={12} md={6}>
                                    <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/product/create">
                                        <i className="fa fa-plus"></i>&nbsp; Add product
                                    </NavLink>
                                </Col> */}
                            </Row>
                        </Container>
                    </Card.Header>
                    <CardBody>
                        <Form onSubmit={handleSubmit(submitForm)}>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Product:</Form.Label>
                                <Col sm={9}>
                                    <TextInputComponent
                                        name={'title'}
                                        control={control}
                                        errMsg={errors?.title?.message}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Description:</Form.Label>
                                <Col sm={9}>
                                    <TextInputComponent
                                        name={'description'}
                                        control={control}
                                        errMsg={errors?.description?.message}
                                    />
                                </Col>
                            </Form.Group>


                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Category:</Form.Label>
                                <Col sm={9}>
                                    <SelectDropDownComponent
                                        name={'category'}
                                        control={control}
                                        errMsg={errors?.category?.message}
                                        const options={category && category.map(d => ({
                                            "value": d._id,
                                            "label": d.title

                                        }))}
                                         

                                      setValue={setValue}
                                       
                                    
                                        
                                    />

                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Brand:</Form.Label>
                                <Col sm={9}>
                                    <SelectDropDownComponent
                                        name={'brand'}
                                        control={control}
                                        errMsg={errors?.brand?.message}
                                        options={brand && brand.map(b => ({
                                            "value": b._id,
                                            "label": b?.title

                                        }))}
                                        setValue={setValue}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Price:</Form.Label>
                                <Col sm={9}>
                                    <TextInputComponent
                                        name={'price'}
                                        control={control}
                                        errMsg={errors?.price?.message}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Discount(In %):</Form.Label>
                                <Col sm={9}>
                                    <TextInputComponent
                                        name={'discount'}
                                        control={control}
                                        errMsg={errors?.discount?.message}
                                    />
                                </Col>
                            </Form.Group>


                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Status:</Form.Label>
                                <Col sm={9}>
                                    <SelectDropDownComponent
                                        name={'status'}
                                        control={control}
                                        errMsg={errors?.status?.message}
                                        options={
                                            [
                                                { value: "active", label: "Publish" },
                                                { value: "inactive", label: "Un-Publish" },
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
                                        name={"images"}
                                        control={control}
                                        errMsg={errors?.images?.message}
                                        setError={setError}
                                        setValue={setValue}
                                        setThumb={setThumb}
                                        isMultiple={true}
                                    />

                                </Col>
                                <Col sm={2}>
                                    <Image fluid alt="thumbnail"
                                        src={thumb ? 
                                        (typeof thumb==='object')?URL.createObjectURL(thumb):thumb : 'https://placehold.co/600x200/dddddd/000000?text=Hello+World'} />
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

export default EditProduct;