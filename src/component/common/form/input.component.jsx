import { useController } from "react-hook-form"
import { Form } from "react-bootstrap"
import Select from 'react-select'

export const EmailInputComponent=({control, errMsg,name })=>{
    const emailController =useController({
      
        name:name,
        control,
        defaultValue:"",
        // rules:{
        //     required:"Email is required",
        //     pattern:{
        //         value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //         message:"Input Valid Email Address"
        //     }
        // }
    })
    return(<>
        <Form.Control 
        
        // type='email'
        placeholder="Enter Username"
         size="sm" 
        {...emailController.field}
        //  onChange={handlechange}
         />
         <span className="text-danger">{errMsg}</span>
         </>
    )
}


export const PasswordInputComponent=({control, errMsg,name})=>{
    const passwordController =useController({
        name:name,
        control,
        defaultValue:"",
        // rules:{
        //     required:"Password is required",
        //     pattern:{
        //         value:/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        //         message:"min 8 letter password, with at least a symbol, upper and lower case letters and a number"
        //     }
        // }
    })
    return(
        <>
        <Form.Control
          
            type='password'
            placeholder="Enter Password"
             size="sm" 
             {...passwordController.field}
             //  onChange={handlechange}
             />
             <span className="text-danger">{errMsg}</span>
        </>
    )

}

export const TextInputComponent=({control, errMsg,name })=>{
    const usernameController =useController({
        name:name,
        control,
        defaultValue:"",
        // rules:{
        //     required:"Username is required",
        //     pattern:{
        //         value:/^\p{L}+[\p{L}\p{Pd}\p{Zs}']*\p{L}+$|^\p{L}+$/,
        //         message:"name must be alphabet and should have space between name and surname "
        //     }
        // }
    })
    return(<>
        <Form.Control 
        type="text"
        placeholder="Enter Full Name"
         size="sm" 
        {...usernameController.field}
        //  onChange={handlechange}
         />
         <span className="text-danger">{errMsg}</span>
         </>
    )
}

export const TextAreaInputComponent=({control, errMsg,name })=>{
    const addressController =useController({
        name:name,
        control,
        defaultValue:"",
      
    })
    return(<>
        <Form.Control 
        placeholder="Enter Address"
         size="sm" 
         as={"textarea"}
         rows={5}
         style={{resize:"none"}}
        {...addressController.field}
        //  onChange={handlechange}
         />
         <span className="text-danger">{errMsg}</span>
         </>
    )
}

export const SelectDropDownComponent=({control, errMsg,name,options,setValue })=>{
    const selectController =useController({
        name:name,
        control,
        defaultValue:"",
    
    })
    return(<>
         <Select 
             options={options}
             isClearable
             onChange={(selOpts)=>{
                setValue(name, selOpts)
             }}
            
             className="form-select-sm"
             {...selectController.field}
            />
         <span className="text-danger">{errMsg}</span>
         </>
    )
}
