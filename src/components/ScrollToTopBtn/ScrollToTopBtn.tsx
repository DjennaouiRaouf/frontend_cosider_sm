import * as React from "react";
import "./ScrollToTopBtn.css";
type ScrollToTopBtnProps = {
  //
};

const ScrollToTopBtn: React.FC<any> = () => {

     const handleScrollToTop = () => {
       window.scrollTo({ top: 0, behavior: 'smooth' });

     };

     return (
         <>
             <div className="my-3"><a className="btn btn-primary btn-lg me-2 pulse-wave" role="button"
                                      onClick={handleScrollToTop}
                                      style={{
                                          "position": "fixed",
                                          "bottom": "20px",
                                          "right": "30px",
                                          "backgroundColor":"#df162c",
                                          "zIndex": "99"
                                      }}><i className="fas fa-caret-up" style={{fontSize:16}}></i>

                                              </a></div>

         </>
     );
};

export default ScrollToTopBtn;
