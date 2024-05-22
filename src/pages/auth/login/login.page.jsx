
import { useEffect, useState } from "react";
import { Container,Row,Col, Form,Button } from "react-bootstrap";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EmailInputComponent, PasswordInputComponent } from "../../../component/common/form/input.component";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import authsvc from "../auth.service";
import { useDispatch } from "react-redux";
import { setLoggedInuser } from "../../../reducer/user.reducer";


const LoginPage=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const schema=Yup.object({
        email:Yup.string().email("Invalid email format").required("Emails is required"),
        // username:Yup.string().required("Username is required"),
        password:Yup.string().required("Password is required")
        // password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,25}$/,{message:"password must contain one lowercase, one uppercase, a number, one special character and should be of 8-25 character long"}).required("Password is required")
    })


    const {control,handleSubmit, formState: {errors}}=useForm(
        {   
        resolver:yupResolver(schema)
        });

  


    const submitForm = async(data) => {
        // e.preventDefault()
        //validateData
        console.log(data)
        //validate
        //form submit

        try{
            const loginData=await authsvc.login(data);
            dispatch(setLoggedInuser(loginData.result.userDetail))
            toast.success(`Welcome to ${loginData.result.userDetail.role} Panel`)

            let redirectUrl="/"+loginData.result.userDetail.role;
            if(localStorage.getItem('_redirectUrl')){
                redirectUrl=localStorage.getItem('_redirectUrl');
                localStorage.removeItem('_redirectUrl')
            }
            // console.log("I am login")console.log(loginData)
            // navigate("/"+loginData.result.userDetail.role)
            navigate(redirectUrl)
        }
        catch(exception){
            console.log(exception)
            //display toastify message
            // toast.error(exception.data.message)
            toast.error(exception.data.message)

        }
    }

    useEffect(()=>{
        const token=localStorage.getItem("_au") || null
        
        if(token)
            {
                const userDetail=JSON.parse(localStorage.getItem("_ud"))||null
                if(userDetail){
                    navigate('/'+userDetail.role)
                }
                
            }
    },[])
    return(
        <>
        
        <Container className={'p-3 my-5 bg-dark'}>
            <Row>
            <Col sm={12} >
            <h1 className="text-center text-light">
            Login </h1>
            </Col>
            </Row>

            <Row>
            <Col className='bg-dark-subtle py-3' sm={12} md={{offset:3, span:8}} lg={{offset:3, span: 6}}>
            <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">Email: </Form.Label>
            <Col sm={9}>
            <EmailInputComponent 
             name={"email"}
                // name={"username"}
                control={control}
                errMsg={errors?.email?.message}
            />
          
            </Col>
            </Form.Group>

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

          
            {/* <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">ConfirmPassword: </Form.Label>
            <Col sm={9}>
            <Form.Control 
            type='new-password'
            placeholder="Confirm Password"
             size="sm" 
             required/>
            </Col>
            </Form.Group> */}

            <Form.Group className="row mb-3">
                <Col sm={{span:9, offset:3}}>
                <NavLink className={'btn btn-sm btn-link'} to="/forget-password" >Forget Password?</NavLink>
                </Col>
            </Form.Group>
         
            
            <Form.Group className="row mb-3">
                <Col sm={{span:9, offset:3}}>
                   <Button variant="danger" type="reset" size="sm" className="me-1">
                    <i className='fa fa-trash'></i>Cancel
                    </Button>
            
                    <Button variant="success" type="submit" size="sm" className="me-1">
                    <i className='fa fa-paper-plane'></i>Login
                    </Button>
                </Col>
            </Form.Group>   
            </Form>

            
            <Col sm={{span:9, offset:3}}>
            Or
           
            <NavLink className={"btn btn-sm btn-link"} to={"/register"}>Create New Account</NavLink>
            </Col>
          

            </Col>
            
            </Row>

          
            </Container>
        </>
    )
}


export default LoginPage;





  // const [data,setdata]=useState();
    // const [err,setErr]=useState();

    //validation first learn
    // const handlechange= (e)=>{

    //     const {name, value}=e.target;
       

    //     //data={email="", password:""}
    //     setdata({
    //         ...data,  //... is spread operator email="", password=""
    //         [name]:value
    //     })
    // }

    // const validateData=(data)=>{
    //     if(!data.email){
    //         setErr({
    //             ...err,
    //             email:"email is required"
    //         })
    //     }
    //     else if(!(/\S+@\S\.\S+/.test(data.email))){
    //         setErr({
    //             ...err,
    //             email:null
    //         })

    //     }

    //     if (!data.password){
    //         setErr({
    //             ...errr,
    //             password:"password is required"
    //         })
    //     }else if(data.password.length<8){
    //         setErr({
    //             ...err,
    //             password:null
    //         })
    //     }

    //     // /\S+@\S\.\S+/
    // }



    // var p = document.getElementById('newPassword').value,
    //     errors = [];
    // if (p.length < 8) {
    //     errors.push("Your password must be at least 8 characters"); 
    // }
    // if (p.search(/[a-z]/i) < 0) {
    //     errors.push("Your password must contain at least one letter.");
    // }
    // if (p.search(/[0-9]/) < 0) {
    //     errors.push("Your password must contain at least one digit."); 
    // }
    // if (errors.length > 0) {
    //     alert(errors.join("\n"));
    //     return false;
    // }