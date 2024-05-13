
import React, { useState } from 'react'

import { useForm } from "react-hook-form";
import { Container,Row,Col, Form, Button, Image,NavLink } from "react-bootstrap"

import { TextAreaInputComponent, EmailInputComponent, PasswordInputComponent, TextInputComponent, SelectDropDownComponent } from "../../../component/common/form/input.component";
import { toast } from 'react-toastify';

const options = [
    { value: 'customer', label: 'customer' },
    { value: 'seller', label: 'seller' }
   
  ]

const RegisterPage=()=>{

    const {handleSubmit,control, setValue, formState: {errors}}=useForm();


    console.log(errors)
    const submitForm = (data) => {
        // e.preventDefault()
        try{
            console.log(data) 

        }catch(exception){
            console.log("Registration failed",exception)
            toast.error(exception?.data?.message)
        }

    }
    
    const [thumb,setThumb]=useState();
    
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
 
  
    return(
        <>
        
        <Container className={'p-3 my-5 bg-dark'}>
            <Row>
            <Col sm={12} >
            <h1 className="text-center text-light">
            Register </h1>
            </Col>
            </Row>

            <Row>
            <Col className='bg-dark-subtle py-3' sm={12} md={{offset:3, span:8}} lg={{offset:2, span: 8}}>
            <Form onSubmit={handleSubmit(submitForm)}>
          
            <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">Full- Name: </Form.Label>
            <Col sm={9}>
       
            <TextInputComponent
              name={"name"}
              control={control}
              errMsg={errors?.name?.message}
            />
            </Col>
            </Form.Group>
            
            <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">Username: </Form.Label>
            <Col sm={9}>

            <EmailInputComponent 
             name={"email"}
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
            <Form.Control 
            type='file'
            accept='image/*' 
             size="sm" 
             onChange={(e)=>
                {
                   const {files}=e.target;
                //    console.log(files);
                   
                   const allowformat=['jpg','jpeg','png','gif','svg','webp','bmp'];
                   const image= files[0]
                   //size, format , image object data format ma hunxa image ko type size sab tesma hunxa

                   //image.ext====>["image","ext"].pop()=>"ext"
                    let fileextension= image.name.split(".").pop();
                    if(!allowformat.includes(fileextension.toLowerCase())){
                        setError("image",{message:"image format not supported"})
                    }else{
                        //3*kb*bytes normally 3000000 24 chordinxau 10001000 le garxau
                        if(image.size<=3000000){
                            setThumb(image)
                            
                        }else{
                            setError("image",{message:"Image size should be less than 3MB "})
                        }
                    }

                //     console.log(image)
                //    setThumb(files[0])
                }
            }
             />
             <span className='text-danger'>{errors?.image?.message}</span>
            </Col>
            <Col sm={2}>
                <Image fluid alt="thumbnail" 
                src={thumb ? URL.createObjectURL(thumb):'https://placehold.co/600x200/dddddd/000000?text=Hello+World'}/>
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
                <Col sm={{span:9, offset:3}}>
                   <Button variant="danger" type="reset" size="sm" className="me-1">
                    <i className='fa fa-trash'></i>Cancel
                    </Button>
            
                    <Button variant="success" type="submit" size="sm" className="me-1">
                    <i className='fa fa-plane'></i>Send
                    </Button>
                </Col>
            </Form.Group>   
            </Form>
            </Col>

            </Row>

            <Col>
            Or
            {/* <NavLink className={"btn btn-sm btn-link"} to={"/login"} >Login</NavLink> */}
            <NavLink className={"btn btn-sm btn-link"} >Login</NavLink>
            </Col>
            </Container>
        </>
    )
}


export default RegisterPage;