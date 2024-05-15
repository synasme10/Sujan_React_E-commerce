import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button, Image, NavLink } from "react-bootstrap"
import * as Yup from "yup";
import { TextAreaInputComponent, EmailInputComponent, PasswordInputComponent, TextInputComponent, SelectDropDownComponent, ImageUploaderComponent } from "../../../component/common/form/input.component";
import { toast } from 'react-toastify';
import authsvc from '../auth.service';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

const options = [
    { value: 'admin', label: 'Customer' },
    { value: 'seller', label: 'Seller' }
]

const RegisterPage = () => {
    const registarSchema = Yup.object({
        //key:""
        name: Yup.string().min(2,"Name should be atlease 2 character long").max(50).required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        address: Yup.string().min(3,"Name should be atlease 3 character long").max(150).required("Address is required"),
        role: Yup.object({
            label:Yup.string().matches(/^(Seller|Customer)$/,"Role should be either Customer or Seller"),
            value:Yup.string().matches(/^(seller|customer)$/,"Role should be either Customer or Seller")
        },"Role should be provided").required("Select Role"),// regular expression
        phone: Yup.string().required()
        // image:Yup.object().optional().nullable()
    })

    const { handleSubmit, control, setValue,setError, formState: { errors } } = useForm({
        resolver:yupResolver(registarSchema)
    });
    const [thumb, setThumb] = useState();
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    //state variable create garxu
    //change event listen garxu
    //validation
    //pass
    //state variable lai populate garxu
    //fail
    //error state populate
    //display gardinxu

    //submit click
    //form submission trigger    

    console.log(errors)
    const submitForm = async(data) => {
        // e.preventDefault()
        setLoading(true)
        try {
            const formattedData={
                ...data,
                role:data.role.value
            }

            const resolve=await authsvc.register(formattedData)
            toast.success("Registration Successfull. Please Check email for activation")
            console.log(data)
            navigate("/")
            //otp base 
            //show otp popup

        } catch (exception) {
            console.log("Registration failed", exception)
            toast.error(exception?.data?.message)
        } finally{
            setLoading(false)
        }

    }

    return (
        <>

            <Container className={'p-3 my-5 bg-dark'}>
                <Row>
                    <Col sm={12} >
                        <h1 className="text-center text-light">
                            Register </h1>
                    </Col>
                </Row>

                <Row>
                    <Col className='bg-dark-subtle py-3' sm={12} md={{ offset: 3, span: 8 }} lg={{ offset: 2, span: 8 }}>
                        <Form onSubmit={handleSubmit(submitForm)}>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Full Name: </Form.Label>
                                <Col sm={9}>

                                    <TextInputComponent
                                        name={"name"}
                                        control={control}
                                        errMsg={errors?.name?.message}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Email: </Form.Label>
                                <Col sm={9}>

                                    <EmailInputComponent
                                        name={"email"}
                                        control={control}
                                        errMsg={errors?.email?.message}
                                    />

                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Phone: </Form.Label>
                                <Col sm={9}>

                                    <TextInputComponent
                                        name={"phone"}
                                        control={control}
                                        errMsg={errors?.phone?.message}
                                    />
                                </Col>
                            </Form.Group>
                            {/* <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Password: </Form.Label>
                                <Col sm={9}>

                                    <PasswordInputComponent
                                        name={"password"}
                                        control={control}
                                        errMsg={errors?.password?.message}
                                    />

                                </Col>
                            </Form.Group> */}

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Address: </Form.Label>
                                <Col sm={9}>

                                    <TextAreaInputComponent
                                        name={"address"}
                                        control={control}
                                        errMsg={errors?.address?.message}

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
                                <Form.Label className="col-sm-3">Role: </Form.Label>
                                <Col sm={9}>
                                    <SelectDropDownComponent
                                        name={"role"}
                                        control={control}
                                        options={options}
                                        errMsg={errors?.role?.message}
                                        setValue={setValue}
                                    />

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
                    </Col>

                </Row>
                <Row>
                <Col>
                    Or
                    {/* <NavLink className={"btn btn-sm btn-link"} to={"/login"} >Login</NavLink> */}
                    <NavLink className={"btn btn-sm btn-link"} >Login</NavLink>
                </Col>
                </Row>
            </Container>
        </>
    )
}


export default RegisterPage;