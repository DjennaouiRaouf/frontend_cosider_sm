import React, {useContext} from "react";
import {Routes as Router, Route, Navigate} from 'react-router-dom'
import LoginForm from "../../LoginForm/LoginForm";
import {AuthContext} from "../AuthContext/AuthContext";
import {PermissionContext} from "../PermissionContext/PermissionContext";
import Signup from "../../Signup/Signup";
import Contrat from "../../Contrat/Contrat";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Client from "../../Client/Client";
import DQE from "../../DQE/DQE";
import DQEParams from "../../DQE/DQEParams";
import Attachements from "../../Attachements/Attachements";
import AttachementsParams from "../../Attachements/AttachementsParams";
import NT from "../../NT/NT";
import InvoiceParams from "../../Invoice/InvoiceParams";
import Invoice from "../../Invoice/Invoice";
import Avances from "../../Avances/Avances";
import AvancesParams from "../../Avances/AvancesParams";
import Flash from "../../Flash/Flash";
import FlashParams from "../../Flash/FlashParams";
import EncaissementsParams from "../../Encaissements/EncaissementsParams";
import Encaissements from "../../Encaissements/Encaissements";
import EtatCreance from "../../EtatCreance/EtatCreance";
import CautionsParams from "../../Cautions/CautionsParams";
import Cautions from "../../Cautions/Cautions";
import WorkState from "../../TaskState/TaskState";
import Sites from "../../Sites/Sites";

const Routes: React.FC<any> = () => {

    const {authenticated} = useContext(AuthContext);
    const {permission, setPermission} = useContext(PermissionContext);

    return (
        <Router>
            <Route
                path="/"
                element={
                    !authenticated ? (
                        <LoginForm/>
                    ) : (
                        <Navigate to="/contrat"/>
                    )
                }
            />





             <Route
              path="/etat_creance"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <EtatCreance/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
             <Route
              path="/contrat"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Contrat/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
             <Route
              path="/caution"
              element={
                  authenticated ? (
                      <>

                          <CautionsParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
              <Route
              path="/caution/liste_caution/:nt/:pole"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Cautions/>


                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
<Route
              path="/sites"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Sites/>


                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
               <Route
              path="/dqe"
              element={
                  authenticated ? (
                      <>
                          <DQEParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
            <Route
              path="/nt"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <NT/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
             <Route
              path="/attachements"
              element={
                  authenticated ? (
                      <>
                          <AttachementsParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

                    <Route
              path="/attachements/liste_att/:nt/:pole/:month"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Attachements/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />




            <Route
              path="/invoice"
              element={
                  authenticated ? (
                      <>
                          <InvoiceParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
            <Route
                path="/encaissement"
                element={
                    authenticated ? (
                        <>
                            <EncaissementsParams/>



                        </>
                    ) : (
                        <Navigate to="/"  />
                    )
                }
            />

            <Route
                path="/encaissement/historique_encaissement/:cid/:fid"
                element={
                    authenticated ? (
                        <>
                            <NavigationBar/>
                            <Encaissements/>



                        </>
                    ) : (
                        <Navigate to="/"  />
                    )
                }
            />



                    <Route
              path="/invoice/liste_f/:nt/:pole"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Invoice/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />



                         <Route
              path="/dqe/liste_dqe/:nt/:pole"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <DQE/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

             <Route
              path="/dqe/liste_dqe/:cid/state"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <WorkState/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

            <Route
                path="/flash"
                element={
                    authenticated ? (
                        <>
                            <NavigationBar/>
                            <FlashParams/>



                        </>
                    ) : (
                        <Navigate to="/"  />
                    )
                }
            />
            <Route
                path="/flash/liste_flash/:nt/:pole/:month"
                element={
                    authenticated ? (
                        <>
                            <NavigationBar/>
                            <Flash/>



                        </>
                    ) : (
                        <Navigate to="/"  />
                    )
                }
            />

              <Route
              path="/avance"
              element={
                  authenticated ? (
                      <>
                          <AvancesParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

               <Route
              path="/avance/liste_avance/:nt/:pole"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Avances/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

              <Route
              path="/client"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Client/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
              <Route
              path="/signup"
              element={
                          <Signup/>
              }
          />

        </Router>
    );
}
  export default Routes