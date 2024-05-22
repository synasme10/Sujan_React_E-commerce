import { useEffect, useState } from "react";
import { Container,Row,Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../component/common/loading/loading.component";
import { useForm } from "react-hook-form";
import authsvc from "../auth.service";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { PasswordInputComponent } from "../../../component/common/form/input.component";

const ActivatePage=()=>{

    //logic: activation
    //token verification
    //success  bhayo bhane password entry form password ra confirm password

    const params=useParams();
    const navigate=useNavigate();
    const[loading,setLoading]=useState(true);

    const passwordSchema=Yup.object({
        password:Yup.string().min(8).max(20).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,25}$/,{message:"password must contain one lowercase, one uppercase, a number, one special character and should be of 8-25 character long"}).required("Password is required"),
        confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],"Password and Confirm password doesn't match")

    })

    const {control,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(passwordSchema)
    }
    );

    //async why because promise garxa kunai pani api call le teslai handle garna then or catch use or aysnc and await
    const getVerifyToken=async()=>{
        try{
            const response=await authsvc.verifyToken(params.token)
            console.log(response)
            setLoading(false)
        }
        catch(exception){
            console.log(exception);
            toast.error("Error verifying token")
            navigate('/register')
        }
    }

    //useeffect hook import where first parameter is callback  and second parameter is dependency
    //one time execute/render
    useEffect(()=>{
        getVerifyToken()
    },[])

    const submitForm=async(data)=>{
        console.log(data)
        try{
            let response= await authsvc.setActivation(data, params.token)
            toast.success(response.message)
            navigate("/login")

        }catch(exception){
        console.log(exception)
        toast.error("Password cannot be set. Please contact admin")
        navigate('/')
    }
}
    return(
        <>
        {
            loading?<LoadingComponent/>:<>
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
                                <Form.Label className="col-sm-3">Password: </Form.Label>
                                <Col sm={9}>
                                    <PasswordInputComponent
                                        name={"password"}
                                        control={control}
                                        errMsg={errors?.password?.message}
                                    />

                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Password: </Form.Label>
                                <Col sm={9}>
                                    <PasswordInputComponent
                                        name={"confirmPassword"}
                                        control={control}
                                        errMsg={errors?.confirmPassword?.message}
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

               
            </Container>
            </>
        }
      
        </>
    )
}

export default ActivatePage;