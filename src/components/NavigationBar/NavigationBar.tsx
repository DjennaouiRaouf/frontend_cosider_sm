import * as React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import {PermissionContext} from "../Context/PermissionContext/PermissionContext";
import Avatar from 'react-avatar';
import logo from '../../images/logo.png';
import Cookies from 'js-cookie';
type NavigationBarProps = {
  //
};

const NavigationBar: React.FC<any> = () => {
        const[username,setUsername]=useState("");
    const { authenticated,setAuthenticated } = useContext(AuthContext);
    const navigate=useNavigate();
    const logout = async () => {
                await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/logout/`,{
                withCredentials:true,
                headers:{
                    Authorization: `Token ${Cookies.get("token")}`,
                }
                })
                    .then((response: any) => {
                        setAuthenticated(null);
                    })
                    .catch((error: any) => {
                    });

                setAuthenticated(null);
                Cookies.remove('role');
                Cookies.remove('token');


    };

    const whoami= async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/whoami/`,{
            headers:{
                Authorization: `Token ${Cookies.get("token")}`
            }

        })
            .then((response: any) => {
                setUsername(response.data.whoami);
            })
            .catch((error: any) => {

            });

    };


    useEffect(() => {
        whoami();
    });

    const link = (url:string) => {
        navigate(url);
    }



    const { permission } = useContext(PermissionContext);
  return (
      <>
         <Navbar expand="lg" className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
            <Container style={{border:"none"}}>
                <Navbar.Brand>
              <span>
                <img width={100} height={39} src={logo} />
              </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/client">Clients</Nav.Link>
                        <Nav.Link href="/sites">Poles</Nav.Link>
                        <Nav.Link href="/nt">NT</Nav.Link>
                         <NavDropdown title="Marché" id="basic-nav-dropdown">
                             <Nav.Link href="/contrat">Contrats Actuels</Nav.Link>
                             <Nav.Link href="/dqe">DQE Actuel</Nav.Link>
                        </NavDropdown>


                         <NavDropdown title="Avenant" id="basic-nav-dropdown">
                             <Nav.Link href="/avenant_contrat">Historique des Contrats</Nav.Link>
                             <Nav.Link href="/avenant_dqe">Historique des DQE</Nav.Link>
                        </NavDropdown>

                        <Nav.Link href="/avance">Avances</Nav.Link>
                        <Nav.Link href="/caution">Cautions</Nav.Link>
                        <NavDropdown title="Production" id="basic-nav-dropdown">
                             <NavDropdown.Item href="/flash">Réalisations mensuelles</NavDropdown.Item>
                            <NavDropdown.Item href="/attachements">Attachements</NavDropdown.Item>

                        </NavDropdown>





                        <NavDropdown title="Facturation" id="basic-nav-dropdown">
              <NavDropdown.Item href="/invoice">Factures</NavDropdown.Item>
              <NavDropdown.Item href="/encaissement">Encaissements
              </NavDropdown.Item>
                            <NavDropdown.Item href="/etat_creance">Etat des Creances
              </NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                    <Nav className="navbar-nav ms-auto">
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-item dropdown no-arrow">
                                <a
                                    className="dropdown-toggle nav-link"
                                    aria-expanded="false"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                >
                    <span className="d-none d-lg-inline me-2 text-gray-600 small">
                       {username}
                    </span>

                                    <Avatar name={username} size="32" round={true} src={""}

                                    />
                                </a>
                                <div  className="dropdown-menu shadow dropdown-menu-end animated--grow-in"
                                      data-bs-popper="none">
                                    <a className="dropdown-item" href="/profile">
                                        <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />
                                        &nbsp;Profil
                                    </a>

                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" onClick={logout}>
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                                        &nbsp;Déconnexion
                                    </a>
                                </div>
                            </div>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      </>
  );
};

export default NavigationBar;
