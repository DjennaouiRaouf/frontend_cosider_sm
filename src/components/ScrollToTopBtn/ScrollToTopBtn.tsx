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

             <a className="btn  btn-sm me-2 wave-pulse" role="button"
                                      onClick={handleScrollToTop}
                                      style={{
                                          "position": "fixed",
                                          "bottom": "20px",
                                          "right": "30px",
                                          "zIndex": "99"
                                      }}><i className="fas fa-caret-up" style={{color:"white",fontSize:20}}></i>

                                              </a>

         </>
     );
};

export default ScrollToTopBtn;
