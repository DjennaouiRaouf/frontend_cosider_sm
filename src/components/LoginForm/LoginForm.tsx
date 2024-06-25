import * as React from "react";
import {RefObject, useContext, useEffect, useRef, useState} from "react";
import {Button, Carousel, Form, Toast, ToastContainer} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import {PermissionContext} from "../Context/PermissionContext/PermissionContext";


const LoginForm: React.FC<any> = () => {
  const [pics,setPics]=useState<any[]>([]);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });





  const { authenticated,setAuthenticated } = useContext(AuthContext);
  const { permission,setPermission } = useContext(PermissionContext);
  const navigate=useNavigate();

  const getImages = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/images/imglogin/`,{
      headers:{
        "Content-Type":"application/json",
      }
    })
        .then((response) => {
          setPics(response.data);
        })
        .catch((error) => {
        });

  }

const [toast,setToast]=useState<any>({
        shown:false,
        severity:'',
        header:'',
        body:'',
    });


  const authentification = async(e: any) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('username', formData.username);
    fd.append('password', formData.password);
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/login/`,fd,{
      withCredentials:true,
    })
        .then((response:any) => {
          setAuthenticated(Cookies.get('token'));
          const role:string[]=String(Cookies.get('role')).split('|');
          setPermission(role)

        })
        .catch((error:any) => {
                    setToast({shown:true,severity:'rgb(248,215,218)',header:'Authentification',body:JSON.stringify(error.response.data,null,2)})
        });

  }



  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getImages();


  },[]);

  const close = () => {
    navigate('/contrat');
  }
  return (
      <>
      <ToastContainer
                      className="p-3"
                      position={'top-end'}
                      style={{ zIndex: 1}}
                    >
                    <Toast onClose={close}  show={toast.shown} delay={10000} autohide style={{backgroundColor:toast.severity}}>
                      <Toast.Header>

                        <strong className="me-auto">{toast.header}</strong>
                      </Toast.Header>
                      <Toast.Body>{toast.body}</Toast.Body>
                    </Toast>
                    </ToastContainer>
        <div className="col-xl-10 col-xxl-8 container px-4 py-5" style={{
          borderRadius: "8px",
          position: "absolute",
          left: 0,
          right: 0,

          top: "50%",
          transform: "translateY(-50%)",
          msTransform: "translateY(-50%)",
          WebkitTransform: "translateY(-50%)",
          OTransform: "translateY(-50%)"

        }}>
            <h1 className={"text-center"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -64 640 640"
                width="1em"
                height="1em"
                fill="currentColor"
                style={{ fontSize: 78 }}
              >
                {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                <path d="M488 191.1h-152l.0001 51.86c.0001 37.66-27.08 72-64.55 75.77c-43.09 4.333-79.45-29.42-79.45-71.63V126.4l-24.51 14.73C123.2 167.8 96.04 215.7 96.04 267.5L16.04 313.8c-15.25 8.751-20.63 28.38-11.75 43.63l80 138.6c8.875 15.25 28.5 20.5 43.75 11.75l103.4-59.75h136.6c35.25 0 64-28.75 64-64c26.51 0 48-21.49 48-48V288h8c13.25 0 24-10.75 24-24l.0001-48C512 202.7 501.3 191.1 488 191.1zM635.7 154.5l-79.95-138.6c-8.875-15.25-28.5-20.5-43.75-11.75l-103.4 59.75h-62.57c-37.85 0-74.93 10.61-107.1 30.63C229.7 100.4 224 110.6 224 121.6l-.0004 126.4c0 22.13 17.88 40 40 40c22.13 0 40-17.88 40-40V159.1h184c30.93 0 56 25.07 56 56v28.5l80-46.25C639.3 189.4 644.5 169.8 635.7 154.5z" />
              </svg>
              Suivi des Marchés
            </h1>

            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <Carousel className="w-100 d-block" controls={false} interval={2000} fade={true} indicators={true}
                              style={{borderWidth: "1px", borderRadius: "8px"}}>
                        {pics.map((item, index) => (
                            <Carousel.Item key={index} style={{borderWidth: "1px", borderRadius: "8px"}}>

                                <div
                                    style={{
                                        background: `url(${item.src}) center / cover no-repeat`,
                                        height: 350,
                                        width: 610,
                                        borderRadius: 5
                                    }}
                                />

                            </Carousel.Item>
                        ))}
                    </Carousel>

                </div>

                <div className="col-md-10 col-lg-5 mx-auto">

                    <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3"
                          noValidate validated={validated}
                    onSubmit={authentification}>
                <div className="form-floating mb-3">
                  <Form.Group className="w-100" controlId="validation1">
                    <Form.Control
                        name="username"
                        required
                        className="w-100"
                        type="text"
                        placeholder="Nom d'utilisateur" value={formData.username}
                        onChange={(e) => handleInputChange(e)}
                    />

                  </Form.Group>


                </div>
                <div className="form-floating mb-3">
                  <Form.Group className="w-100" controlId="validation2">
                    <Form.Control
                        name="password"
                        required
                        className="w-100"
                        type="password"
                        placeholder="Mot de passe" value={formData.password}
                        onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>


                </div>

                <Button type="submit" className="w-100" style={{background: "#df162c", borderWidth: 0}}>
                  Connexion</Button>
                <hr className="my-4"/>
                  <div className="container d-sm-flex justify-content-sm-center w-100">
                      <a href="/signup">Créer un nouveau compte</a>
                  </div>
              </Form>
            </div>
          </div>
        </div>

      </>


  );
};

export default LoginForm;