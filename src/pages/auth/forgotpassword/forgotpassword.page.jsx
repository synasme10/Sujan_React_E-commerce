import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { EmailInputComponent } from "../../../component/common/form/input.component";
import authsvc from "../auth.service";
import { toast } from "react-toastify";
const RenewPasswordPage = () => {
    const navigate = useNavigate();
    const schema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Emails is required"),
    })
    const { control, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: yupResolver(schema)
        });

    const submitForm = async (data) => {
        try {
            const forgotpassword = await authsvc.forgotpassword(data);
            console.log(forgotpassword)
            toast.success(forgotpassword.message)

        } catch (exception) {
            // console.log(exception)
            toast.error(exception?.data?.message)
        }
    }
    return (
        <>
            <Container className={'p-3 my-5 bg-dark'}>
                <Row>
                    <Col sm={12} >
                        <h1 className="text-center text-light">
                            Forgot Password </h1>
                    </Col>
                </Row>

                <Row>
                    <Col className='bg-dark-subtle py-3' sm={12} md={{ offset: 3, span: 8 }} lg={{ offset: 3, span: 6 }}>
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
                                <Col sm={{ span: 9, offset: 3 }}>
                                    <Button variant="danger" type="reset" size="sm" className="me-1">
                                        <i className='fa fa-trash'></i>Cancel
                                    </Button>

                                    <Button variant="success" type="submit" size="sm" className="me-1">
                                        <i className='fa fa-paper-plane'></i>Send Link
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>


                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default RenewPasswordPage;