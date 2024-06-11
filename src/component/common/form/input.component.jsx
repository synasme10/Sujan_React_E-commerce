import { useController } from "react-hook-form"
import { Form } from "react-bootstrap"
import Select from 'react-select'

export const EmailInputComponent = ({ control, errMsg, name }) => {
    const emailController = useController({

        name: name,
        control,
        defaultValue: "",
      
    })
    return (<>
        <Form.Control

            
            placeholder="Enter Username"
            size="sm"
            {...emailController.field}
       
        />
        <span className="text-danger">{errMsg}</span>
    </>
    )
}


export const PasswordInputComponent = ({ control, errMsg, name }) => {
    const passwordController = useController({
        name: name,
        control,
        defaultValue: "",
       
    })
    return (
        <>
            <Form.Control

                type='password'
                placeholder="Enter Password"
                size="sm"
                {...passwordController.field}
           
            />
            <span className="text-danger">{errMsg}</span>
        </>
    )

}

export const TextInputComponent = ({ control, errMsg, name }) => {
    const usernameController = useController({
        name: name,
        control,
        defaultValue: "",
        // rules:{
        //     required:"Username is required",
        //     pattern:{
        //         value:/^\p{L}+[\p{L}\p{Pd}\p{Zs}']*\p{L}+$|^\p{L}+$/,
        //         message:"name must be alphabet and should have space between name and surname "
        //     }
        // }
    })
    return (<>
        <Form.Control
            type="text"
            placeholder={`Enter your ${name}`}
            size="sm"
            {...usernameController.field}
        //  onChange={handlechange}
        />
        <span className="text-danger">{errMsg}</span>
    </>
    )
}

export const URLInputComponent = ({ control, errMsg, name }) => {
    const urlController = useController({
        name: name,
        control,
        defaultValue: "",
      
    })
    return (<>
        <Form.Control
            type="url"
            placeholder={`Enter your ${name}`}
            size="sm"
            {...urlController.field}
       
        />
        <span className="text-danger">{errMsg}</span>
    </>
    )
}

export const TextAreaInputComponent = ({ control, errMsg, name }) => {
    const textAreaController = useController({
        name: name,
        control,
        defaultValue: "",

    })
    return (<>
        <Form.Control
            placeholder="Enter Address"
            size="sm"
            as={"textarea"}
            rows={5}
            style={{ resize: "none" }}
            {...textAreaController.field}
      
        />
        <span className="text-danger">{errMsg}</span>
    </>
    )
}

export const SelectDropDownComponent = ({ control,isMultiple=false, errMsg, name, options, setValue }) => {
    const selectController = useController({
        name: name,
        control,
        defaultValue: null,

    })
    return (<>
        <Select
            options={options}
            isClearable
            isMulti={isMultiple}
            onChange={(selOpts) => {
                setValue(name, selOpts)
            }}

            className="form-select-sm"
            {...selectController.field}
        />
        <span className="text-danger">{errMsg}</span>
    </>
    )
}

export const ImageUploaderComponent = ({ setError,isMultiple=false, setThumb, setValue, control, name, errMsg }) => {
    const imageUploadCOntroller = useController({
        name: name,
        control,
        
    })
    return (<>
        <Form.Control
            type='file'
            accept='image/*'
            size="sm"
            multiple={isMultiple}
            onChange={(e) => {
                const { files } = e.target;
             

                const allowformat = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'];
                const image = files[0]
              
                let fileextension = image.name.split(".").pop();
                if (!allowformat.includes(fileextension.toLowerCase())) {
                    setError(name, { message: "image format not supported" })
                } else {
                    
                    if (image.size <= 3000000) {
                        setThumb(image)
                        setValue(name,image)

                    } else {
                        setError(name, { message: "Image size should be less than 3MB " })
                    }
                }

              
            }}
        />
         <span className='text-danger'>{errMsg}</span>
    </>
    )
}

