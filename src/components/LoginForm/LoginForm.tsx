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
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getimg/`,{
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
          <h1 style={{textAlign: "center"}}>Gestion des Marchés</h1>
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start">
              <Carousel className="w-100 d-block" controls={false} interval={2000} fade={true} indicators={true}
                        style={{borderWidth: "1px", borderRadius: "8px"}}>
                {pics.map((item, index) => (
                    <Carousel.Item key={index} style={{borderWidth: "1px", borderRadius: "8px"}}>
                      <img
                          src={item.src}
                          alt={""}
                          height={500}
                          className="d-block w-100"
                          style={{borderWidth: "1px", borderRadius: "8px"}}
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