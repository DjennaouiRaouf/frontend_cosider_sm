import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

type ProfileProps = {
  //
};

const Profile: React.FC<any> = () => {
  const[profile,setProfile]=useState<any>({});

  const getCurrentProfile = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/userprofile/`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          console.log(response.data);
          setProfile(response.data);

        })
        .catch((error:any) => {
          console.log(error);
        });
  }
  const handleInputChange = (e:any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });

  };
  const submitForm = async(e:any) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData:any=profile

    delete formData['full_name']
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/editusr/`,formData,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          console.log(response);
          getCurrentProfile()


        })
        .catch((error:any) => {
          console.log(error);
        });
  }
  useEffect(() => {
    getCurrentProfile()
  },[]);
  return(
      <>
        <div className="container">
          <div className="row flex-lg-nowrap">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <div className="row">
                          <div className="col-12 col-sm-auto mb-3">
                            <div className="mx-auto" style={{ width: 140 }}>
                              <div
                                  className="d-flex justify-content-center align-items-center rounded"
                                  style={{
                                    height: 140,
                                    backgroundColor: "rgb(233, 236, 239)"
                                  }}
                              >
                        <span
                            style={{
                              color: "rgb(166, 168, 170)",
                              font: "bold 8pt Arial"
                            }}

                        >
                          <i className="fas fa-user-cog" style={{fontSize:85}}></i>
                        </span>
                              </div>
                            </div>
                          </div>
                          <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                              <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                                {profile.fullname}
                              </h4>
                              <p className="mb-0">{profile.username}</p>
                              <div className="text-muted">
                                <small>Dernière connexion : {profile.login}</small>
                              </div>
                              <div className="mt-2"></div>
                            </div>
                            <div className="text-center text-sm-right">
                      <span className="badge badge-secondary">
                        administrator
                      </span>
                              <div className="text-muted">
                                <small>Date d’inscription : {profile.joined}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a href="" className="active nav-link">
                              Paramétres
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" onSubmit={submitForm} >
                              <div className="row">
                                <div className="col">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Nom et Prénom</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="full_name"
                                            value={profile.full_name|| ''}
                                            disabled={true}
                                            onChange={(e)=>handleInputChange(e)}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Nom d'utilisateur</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="username"

                                            value={profile.username || ''}
                                            onChange={(e)=>handleInputChange(e)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-5">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="email"
                                            value={profile.email || ''}
                                            onChange={(e)=>handleInputChange(e)}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                              <div className="row mt-5">
                                <div className="col-12 col-sm-6 mb-3">
                                  <div className="mb-2">
                                    <b>Changer le mot de passe </b>
                                  </div>
                                  <div className="row mt-5">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Mot de passe actuel</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="current_password"
                                            value={profile.current_password || ''}
                                            onChange={(e)=>handleInputChange(e)}

                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-5">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Nouveau mot de passe</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="new_password"
                                            value={profile.new_password || ''}
                                            onChange={(e)=>handleInputChange(e)}


                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-5">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>
                                          Confirmer le{" "}
                                          <span className="d-none d-xl-inline">
                                    mot de passe
                                  </span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="confirm_new_password"
                                            onChange={(e)=>handleInputChange(e)}
                                            value={profile.confirm_new_password || ''}

                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                                  <div className="row">
                                    <div className="col">
                                      <ul style={{width:'100%'}}>

                                        <li className="text-start">
                                        <span style={{ color: "var(--body-quiet-color)" }}>
                                          Votre mot de passe ne peut pas trop ressembler à vos autres informations
                                          personnelles.
                                        </span>
                                        </li>
                                        <li className="text-start">
                                          Votre mot de passe doit contenir au minimum 8 caractères
                                        </li>
                                        <li className="text-start">
                                        <span style={{ color: "var(--body-quiet-color)" }}>
                                          Votre mot de passe ne peut pas être un mot de passe couramment utilisé.
                                        </span>
                                        </li>
                                        <li className="text-start">
                                        <span style={{ color: "var(--body-quiet-color)" }}>
                                          Votre mot de passe ne peut pas être entièrement numérique.
                                        </span>
                                        </li>

                                      </ul>

                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col d-flex justify-content-end">
                                  <button className="btn btn-primary" type="submit" style={{ background: "#df162c", borderWidth: 0 }}>
                                    Modifier
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
  );
};

export default Profile;