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
import RevisionParams from "../../Revision/RevisionParams";
import Revision from "../../Revision/Revision";
import ContratAvenant from "../../ContratAvenant/ContratAvenant";
import DQEAVParams from "../../DQEAvenant/DQEAVParams";
import DQEAV from "../../DQEAvenant/DQEAV";
import ErrorRoute from "../../ErrorRoute/ErrorRoute";
import ScrollToTopBtn from "../../ScrollToTopBtn/ScrollToTopBtn";
import ProductionStockeeParams from "../../ProductionStockee/ProductionStockeeParams";
import ProductionStockee from "../../ProductionStockee/ProductionStockee";

const AppRoutes: React.FC<any> = () => {

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
                            <ScrollToTopBtn/>
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
                            <ScrollToTopBtn/>
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
                            <ScrollToTopBtn/>
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
                            <ScrollToTopBtn/>
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
              path="/avenant_dqe"
              element={
                  authenticated ? (
                      <>
                          <DQEAVParams/>



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
                            <ScrollToTopBtn/>
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
                            <ScrollToTopBtn/>
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
                path="/revision"
                element={
                    authenticated ? (
                        <>
                            <RevisionParams/>



                        </>
                    ) : (
                        <Navigate to="/"  />
                    )
                }
            />


                        <Route
                path="/revision/rev_items/:nt/:pole"
                element={
                    authenticated ? (
                        <>

                             <NavigationBar/>
                                <ScrollToTopBtn/>
                            <Revision/>



                        </>
                    ) : (
                        <Navigate to="/"  />
                    )
                }
            />



                        <Route
                path="/avenant_contrat"
                element={
                    authenticated ? (
                        <>

                             <NavigationBar/>
                                <ScrollToTopBtn/>
                            <ContratAvenant/>



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
                        <div className={"container"}>
                             <NavigationBar/>
                                <ScrollToTopBtn/>
                            <Encaissements/>



                        </div>
                    ) : (
                        <Navigate to="/"  />
                    )
                }
            />

              <Route
                path="/production_stockee"
                element={
                    authenticated ? (
                        <div className={"container"}>

                            <ProductionStockeeParams/>



                        </div>
                    ) : (
                        <Navigate to="/"  />
                    )
                }
            />
      <Route
              path="/production_stockee/liste_ps/:nt/:pole"
              element={
                  authenticated ? (
                      <>
                           <NavigationBar/>
                                <ScrollToTopBtn/>
                          <ProductionStockee/>



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
                                <ScrollToTopBtn/>
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
                            <ScrollToTopBtn/>
                          <DQE/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

             <Route
              path="*"
              element={

                      <>
                          <ErrorRoute />
                      </>

              }
          />


                         <Route
              path="/avenant_dqe/liste_dqe_av/:nt/:pole/:num_av"
              element={
                  authenticated ? (
                      <>
                           <NavigationBar/>
                            <ScrollToTopBtn/>
                          <DQEAV/>



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
                            <ScrollToTopBtn/>
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
                                <ScrollToTopBtn/>
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
                            <ScrollToTopBtn/>
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
                            <ScrollToTopBtn/>
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

export default AppRoutes;