import { useController } from "react-hook-form"
import { Form } from "react-bootstrap"
import Select from 'react-select'

export const EmailInputComponent = ({ control, errMsg, name }) => {
    const emailController = useController({

        name: name,
        control,
        defaultValue: "",
        // rules:{
        //     required:"Email is required",
        //     pattern:{
        //         value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //         message:"Input Valid Email Address"
        //     }
        // }
    })
    return (<>
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


export const PasswordInputComponent = ({ control, errMsg, name }) => {
    const passwordController = useController({
        name: name,
        control,
        defaultValue: "",
        // rules:{
        //     required:"Password is required",
        //     pattern:{
        //         value:/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        //         message:"min 8 letter password, with at least a symbol, upper and lower case letters and a number"
        //     }
        // }
    })
    return (
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
        //  onChange={handlechange}
        />
        <span className="text-danger">{errMsg}</span>
    </>
    )
}

export const SelectDropDownComponent = ({ control, errMsg, name, options, setValue }) => {
    const selectController = useController({
        name: name,
        control,
        defaultValue: null,

    })
    return (<>
        <Select
            options={options}
            isClearable
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

export const ImageUploaderComponent = ({ setError, setThumb, setValue, control, name, errMsg }) => {
    const imageUploadCOntroller = useController({
        name: name,
        control,
    })
    return (<>
        <Form.Control
            type='file'
            accept='image/*'
            size="sm"
            onChange={(e) => {
                const { files } = e.target;
                //    console.log(files);

                const allowformat = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'];
                const image = files[0]
                //size, format , image object data format ma hunxa image ko type size sab tesma hunxa

                //image.ext====>["image","ext"].pop()=>"ext"
                let fileextension = image.name.split(".").pop();
                if (!allowformat.includes(fileextension.toLowerCase())) {
                    setError(name, { message: "image format not supported" })
                } else {
                    //3*kb*bytes normally 3000000 24 chordinxau 10001000 le garxau
                    if (image.size <= 3000000) {
                        setThumb(image)
                        setValue(name,image)

                    } else {
                        setError(name, { message: "Image size should be less than 3MB " })
                    }
                }

                //     console.log(image)
                //    setThumb(files[0])
            }}
        />
         <span className='text-danger'>{errMsg}</span>
    </>
    )
}

